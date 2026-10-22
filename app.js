'use strict';

/* ==========================================================================
   Ranum - Dashboard Produk UMKM
   PTS Pemrograman Web (26TJ453127)
   Rizki Ramadhan - NIM 2440304010 - Teknik Komputer UBT

   Varian NIM (3 digit terakhir = 010):
   - X = 0 : Dataset Products dari REST API DummyJSON
   - Y = 1 : Filter data + statistik sederhana
   - Z = 0 : Validasi form (nama minimal 5 karakter setelah trim)
   - C = (0 + 1 + 0) mod 4 = 1 : Tombol Retry saat fetch gagal + timestamp
   ========================================================================== */

/* -------------------------------------------------------------------------
   1. Konstanta & State
   ------------------------------------------------------------------------- */

const API_URL = 'https://dummyjson.com/products';
// Endpoint DummyJSON yang selalu merespons HTTP 503, dipakai untuk simulasi gagal
const SIMULATED_FAILURE_URL = 'https://dummyjson.com/http/503';
const FETCH_TIMEOUT_MS = 10000;
const MIN_NAME_LENGTH = 5;
const MIN_NOTES_LENGTH = 10;
const MAX_NOTES_LENGTH = 500;
const SKELETON_CARD_COUNT = 10;

const STORAGE_KEYS = {
  SAVED_INQUIRIES: 'ranum_saved_inquiries_v1',
  LAST_SUCCESS_AT: 'ranum_last_success_at_v1'
};

const DEFAULT_FILTERS = Object.freeze({
  searchQuery: '',
  category: 'ALL',
  availability: 'ALL',
  sortBy: 'DEFAULT'
});

// Label kategori DummyJSON dalam Bahasa Indonesia (fallback: Title Case dari slug)
const CATEGORY_LABELS = {
  beauty: 'Kecantikan',
  fragrances: 'Parfum',
  furniture: 'Furnitur',
  groceries: 'Bahan Pangan',
  'home-decoration': 'Dekorasi Rumah',
  'kitchen-accessories': 'Peralatan Dapur',
  laptops: 'Laptop',
  'mens-shirts': 'Kemeja Pria',
  'mens-shoes': 'Sepatu Pria',
  'mens-watches': 'Jam Tangan Pria',
  'mobile-accessories': 'Aksesori Ponsel',
  motorcycle: 'Sepeda Motor',
  'skin-care': 'Perawatan Kulit',
  smartphones: 'Smartphone',
  'sports-accessories': 'Perlengkapan Olahraga',
  sunglasses: 'Kacamata Hitam',
  tablets: 'Tablet',
  tops: 'Atasan',
  vehicle: 'Kendaraan',
  'womens-bags': 'Tas Wanita',
  'womens-dresses': 'Gaun Wanita',
  'womens-jewellery': 'Perhiasan Wanita',
  'womens-shoes': 'Sepatu Wanita',
  'womens-watches': 'Jam Tangan Wanita'
};

// State terpusat aplikasi
const appState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  isFetching: false,
  products: [],
  filteredProducts: [],
  filters: { ...DEFAULT_FILTERS },
  lastSuccessAt: null, // Date terakhir data berhasil dimuat
  errorMessage: '',
  selectedModalProduct: null
};

// Simulasi gagal sekali untuk demonstrasi tombol Retry: buka index.html?simulasi=gagal
let simulateFailureOnce = new URLSearchParams(window.location.search).get('simulasi') === 'gagal';

/* -------------------------------------------------------------------------
   2. Utilitas Penyimpanan (localStorage dengan cadangan memori)
   ------------------------------------------------------------------------- */

const memoryStorageFallback = {};

function safeGetStorage(key, fallbackValue = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch (err) {
    // localStorage dapat diblokir (mode privat / sandbox); gunakan cadangan memori
  }
  return Object.prototype.hasOwnProperty.call(memoryStorageFallback, key)
    ? memoryStorageFallback[key]
    : fallbackValue;
}

function safeSetStorage(key, value) {
  memoryStorageFallback[key] = value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Nilai tetap tersimpan pada memoryStorageFallback selama sesi aktif
  }
}

function readStoredTimestamp() {
  const iso = safeGetStorage(STORAGE_KEYS.LAST_SUCCESS_AT, null);
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

/* -------------------------------------------------------------------------
   3. Utilitas Format
   ------------------------------------------------------------------------- */

// Harga DummyJSON dalam Dolar AS, sehingga ditampilkan apa adanya dalam USD
const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function formatPrice(value) {
  return priceFormatter.format(Number(value) || 0);
}

// Contoh hasil: "21 Okt 2026, 23:16 WITA" (zona waktu Asia/Makassar)
const witaFormatter = new Intl.DateTimeFormat('id-ID', {
  timeZone: 'Asia/Makassar',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
});

function formatTimestampWITA(date) {
  const parts = witaFormatter.formatToParts(date);
  const pick = type => (parts.find(part => part.type === type) || {}).value || '';
  return `${pick('day')} ${pick('month').replace('.', '')} ${pick('year')}, ${pick('hour')}:${pick('minute')} WITA`;
}

function formatCategoryLabel(slug) {
  if (!slug) return 'Lainnya';
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return String(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getStockStatusMeta(stockCount) {
  const stock = Number(stockCount) || 0;
  if (stock <= 0) return { code: 'OUT_OF_STOCK', label: 'Stok Habis', cssClass: 'stock-out' };
  if (stock <= 10) return { code: 'LOW_STOCK', label: `Sisa ${stock}`, cssClass: 'stock-low' };
  return { code: 'IN_STOCK', label: `Stok ${stock}`, cssClass: 'stock-ok' };
}

function escapeXml(text) {
  return String(text).replace(/[<>&'"]/g, char => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
  }[char]));
}

/* -------------------------------------------------------------------------
   4. Fetch API: Mengambil & Memetakan Data DummyJSON (Digit X = 0)
   ------------------------------------------------------------------------- */

// Pemetaan satu objek mentah API ke bentuk data yang dipakai antarmuka
function normalizeProduct(raw) {
  const images = Array.isArray(raw.images) ? raw.images.filter(Boolean) : [];
  const stock = Number(raw.stock);
  return {
    id: Number(raw.id),
    title: String(raw.title || 'Produk Tanpa Nama'),
    description: String(raw.description || ''),
    category: String(raw.category || 'lainnya'),
    price: Number(raw.price) || 0,
    discountPercentage: Number(raw.discountPercentage) || 0,
    rating: Number(raw.rating) || 0,
    stock: Number.isFinite(stock) ? stock : 0,
    brand: raw.brand ? String(raw.brand) : '',
    sku: raw.sku ? String(raw.sku) : '',
    thumbnail: raw.thumbnail || images[0] || '',
    images
  };
}

async function fetchProducts(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    // Status HTTP selain 2xx dianggap gagal
    if (!response.ok) {
      const statusText = response.statusText ? ` ${response.statusText}` : '';
      throw new Error(`Server merespons dengan status HTTP ${response.status}${statusText}.`);
    }

    const payload = await response.json();
    if (!payload || !Array.isArray(payload.products)) {
      throw new Error('Format data dari API tidak sesuai (properti "products" tidak ditemukan).');
    }

    return payload.products.map(normalizeProduct);
  } finally {
    clearTimeout(timeoutId);
  }
}

function describeFetchError(error) {
  if (error && error.name === 'AbortError') {
    return `Permintaan melebihi batas waktu ${FETCH_TIMEOUT_MS / 1000} detik. Periksa koneksi internet Anda.`;
  }
  if (!navigator.onLine) {
    return 'Perangkat sedang offline. Periksa koneksi internet Anda, lalu tekan "Coba Lagi".';
  }
  if (error instanceof TypeError) {
    return 'Tidak dapat terhubung ke server DummyJSON (jaringan terputus atau permintaan diblokir).';
  }
  if (error instanceof SyntaxError) {
    return 'Respons server bukan data JSON yang valid.';
  }
  return (error && error.message) || 'Terjadi kesalahan yang tidak terduga.';
}

async function loadProducts() {
  if (appState.isFetching) return;
  appState.isFetching = true;
  setUiState('loading');

  const url = simulateFailureOnce ? SIMULATED_FAILURE_URL : API_URL;
  simulateFailureOnce = false;

  try {
    const products = await fetchProducts(url);

    appState.products = products;
    appState.lastSuccessAt = new Date();
    safeSetStorage(STORAGE_KEYS.LAST_SUCCESS_AT, appState.lastSuccessAt.toISOString());

    populateCategoryFilter(products);
    populateProductSelect(products);
    renderFeaturedSection(products);
    setUiState('success');
    renderCatalogAndStats();
  } catch (error) {
    console.error('[Ranum] Gagal memuat data produk:', error);
    appState.errorMessage = describeFetchError(error);
    setUiState('error');
  } finally {
    appState.isFetching = false;
  }
}

/* -------------------------------------------------------------------------
   5. Filter & Statistik (Digit Y = 1)
   ------------------------------------------------------------------------- */

const SORTERS = {
  PRICE_ASC: (a, b) => a.price - b.price,
  PRICE_DESC: (a, b) => b.price - a.price,
  RATING_DESC: (a, b) => b.rating - a.rating,
  TITLE_ASC: (a, b) => a.title.localeCompare(b.title, 'id')
};

function computeFilteredProducts(products, filters) {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter(item => {
    const haystack = [item.title, item.description, item.brand, item.category, formatCategoryLabel(item.category)]
      .join(' ')
      .toLowerCase();
    const matchesQuery = query === '' || haystack.includes(query);
    const matchesCategory = filters.category === 'ALL' || item.category === filters.category;
    const matchesAvailability =
      filters.availability === 'ALL' || getStockStatusMeta(item.stock).code === filters.availability;
    return matchesQuery && matchesCategory && matchesAvailability;
  });

  const sorter = SORTERS[filters.sortBy];
  return sorter ? [...filtered].sort(sorter) : filtered;
}

function computeCatalogStatistics(items, totalCount) {
  const count = items.length;
  if (count === 0) {
    return { count: 0, totalCount, averagePrice: 0, mostExpensive: null, categoryCount: 0 };
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const mostExpensive = items.reduce((max, item) => (item.price > max.price ? item : max), items[0]);
  const categoryCount = new Set(items.map(item => item.category)).size;

  return { count, totalCount, averagePrice: totalPrice / count, mostExpensive, categoryCount };
}

function isFilterActive(filters) {
  return filters.searchQuery.trim() !== '' || filters.category !== 'ALL' || filters.availability !== 'ALL';
}

/* -------------------------------------------------------------------------
   6. Validasi Form (Digit Z = 0)
   ------------------------------------------------------------------------- */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_REGEX = /^(?:\+?62|0)8\d{7,11}$/;

function findProductById(id) {
  return appState.products.find(item => String(item.id) === String(id)) || null;
}

const FIELD_VALIDATORS = {
  name(value) {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Nama lengkap wajib diisi.';
    if (trimmed.length < MIN_NAME_LENGTH) {
      return `Nama lengkap minimal ${MIN_NAME_LENGTH} karakter (saat ini ${trimmed.length} karakter, spasi di awal/akhir tidak dihitung).`;
    }
    return '';
  },

  contact(value) {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Alamat email atau nomor WhatsApp wajib diisi.';
    if (trimmed.includes('@')) {
      return EMAIL_REGEX.test(trimmed) ? '' : 'Format email tidak valid. Contoh yang benar: nama@email.com.';
    }
    const normalizedPhone = trimmed.replace(/[\s\-.()]/g, '');
    return PHONE_REGEX.test(normalizedPhone)
      ? ''
      : 'Nomor WhatsApp tidak valid. Gunakan format Indonesia, contoh: 081234567890 atau +6281234567890.';
  },

  product(value) {
    if (appState.products.length === 0) {
      return 'Daftar produk belum tersedia. Muat ulang data produk terlebih dahulu.';
    }
    if (!value) return 'Silakan pilih salah satu produk dari katalog.';
    if (!findProductById(value)) return 'Produk yang dipilih tidak ditemukan di katalog.';
    return '';
  },

  notes(value) {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Pesan atau catatan wajib diisi.';
    if (trimmed.length < MIN_NOTES_LENGTH) {
      return `Pesan minimal ${MIN_NOTES_LENGTH} karakter agar kebutuhan Anda jelas (saat ini ${trimmed.length} karakter).`;
    }
    if (trimmed.length > MAX_NOTES_LENGTH) return `Pesan maksimal ${MAX_NOTES_LENGTH} karakter.`;
    return '';
  }
};

function validateInquiryForm(values) {
  const errors = {};
  Object.keys(FIELD_VALIDATORS).forEach(field => {
    const message = FIELD_VALIDATORS[field](String(values[field] || ''));
    if (message) errors[field] = message;
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleaned: {
      name: String(values.name || '').trim(),
      contact: String(values.contact || '').trim(),
      productId: String(values.product || ''),
      purpose: String(values.purpose || ''),
      notes: String(values.notes || '').trim()
    }
  };
}

/* -------------------------------------------------------------------------
   7. Referensi DOM
   ------------------------------------------------------------------------- */

const dom = {};

function cacheDomElements() {
  const byId = id => document.getElementById(id);

  Object.assign(dom, {
    headerSearchForm: byId('header-search-form'),
    headerSearchInput: byId('header-search-input'),
    mobileNavToggle: byId('mobile-nav-toggle'),
    primaryNav: byId('primary-navigation'),
    heroProductCount: byId('hero-product-count'),
    storeCatalogSummary: byId('store-catalog-summary'),

    lastUpdatedBadge: byId('last-updated-badge'),
    lastUpdatedState: byId('last-updated-state'),
    lastUpdatedText: byId('last-updated-text'),
    refreshBtn: byId('refresh-data-btn'),
    loadingState: byId('loading-state'),
    errorState: byId('error-state'),
    errorMessage: byId('error-message'),
    errorLastSuccess: byId('error-last-success'),
    retryBtn: byId('retry-btn'),

    featuredGrid: byId('featured-grid'),

    summaryScopeLabel: byId('summary-scope-label'),
    statAveragePrice: byId('stat-average-price'),
    statHighestProduct: byId('stat-highest-product'),
    statHighestPrice: byId('stat-highest-price'),
    statProductCount: byId('stat-product-count'),
    statProductTotal: byId('stat-product-total'),
    statCategoryCount: byId('stat-category-count'),

    catalogFilterForm: byId('catalog-filter-form'),
    filterFieldset: byId('filter-fieldset'),
    catalogSearchInput: byId('catalog-search-input'),
    categoryFilter: byId('category-filter'),
    availabilityFilter: byId('availability-filter'),
    sortFilter: byId('sort-filter'),
    resetFilterBtn: byId('reset-filter-btn'),
    catalogResultInfo: byId('catalog-result-info'),
    catalogEmpty: byId('catalog-empty'),
    emptyResetBtn: byId('empty-reset-btn'),
    catalogGrid: byId('catalog-grid'),

    inquiryForm: byId('product-inquiry-form'),
    formErrorSummary: byId('form-error-summary'),
    inquiryName: byId('inquiry-name'),
    inquiryNameHint: byId('inquiry-name-hint'),
    inquiryContact: byId('inquiry-contact'),
    inquiryProduct: byId('inquiry-product'),
    inquiryPurpose: byId('inquiry-purpose'),
    inquiryNotes: byId('inquiry-notes'),
    inquiryNotesHint: byId('inquiry-notes-hint'),
    resetInquiryBtn: byId('reset-inquiry-btn'),
    inquirySuccessBanner: byId('inquiry-success-banner'),
    inquirySuccessBody: byId('inquiry-success-body'),
    savedInquiriesList: byId('saved-inquiries-list'),
    clearInquiriesBtn: byId('clear-inquiries-btn'),

    productModal: byId('product-detail-modal'),
    modalCloseBtn: byId('modal-close-btn'),
    modalCategory: byId('modal-product-category'),
    modalImageContainer: byId('modal-image-container'),
    modalTitle: byId('modal-product-title'),
    modalPrice: byId('modal-product-price'),
    modalDescription: byId('modal-product-description'),
    modalSpecs: byId('modal-product-specs'),
    modalInquireBtn: byId('modal-inquire-btn')
  });

  // Pasangan input dan elemen pesan error untuk setiap field yang divalidasi
  dom.formFields = {
    name: { input: dom.inquiryName, error: byId('inquiry-name-error') },
    contact: { input: dom.inquiryContact, error: byId('inquiry-contact-error') },
    product: { input: dom.inquiryProduct, error: byId('inquiry-product-error') },
    notes: { input: dom.inquiryNotes, error: byId('inquiry-notes-error') }
  };
}

/* -------------------------------------------------------------------------
   8. Pembuat Elemen UI
   ------------------------------------------------------------------------- */

function createEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function createPlaceholderSvg(product) {
  const initial = escapeXml((product.title || '?').trim().charAt(0).toUpperCase() || '?');
  const label = escapeXml(formatCategoryLabel(product.category).slice(0, 24));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#EFE9DC"/>
    <circle cx="200" cy="130" r="56" fill="#1E3F2B"/>
    <text x="200" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="56" fill="#F7F3EB">${initial}</text>
    <text x="200" y="240" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#5C4332">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function createProductImage(product, { large = false } = {}) {
  const img = document.createElement('img');
  img.alt = 'Foto produk ' + product.title;
  img.loading = large ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.width = 400;
  img.height = 300;

  const source = large ? product.images[0] || product.thumbnail : product.thumbnail;
  const fallback = createPlaceholderSvg(product);
  img.src = source || fallback;
  if (source) {
    img.addEventListener('error', () => { img.src = fallback; }, { once: true });
  }
  return img;
}

function createRatingEl(rating) {
  const wrap = createEl('span', 'product-rating');
  const star = createEl('span', 'rating-star', '\u2605');
  star.setAttribute('aria-hidden', 'true');
  const srLabel = createEl('span', 'visually-hidden', 'Rating ');
  const srSuffix = createEl('span', 'visually-hidden', ' dari 5');
  wrap.append(star, srLabel, document.createTextNode(' ' + rating.toFixed(1)), srSuffix);
  return wrap;
}

function createDetailButton(product, label, variant) {
  const btn = createEl('button', `btn ${variant} btn-sm`, label);
  btn.type = 'button';
  btn.dataset.productId = String(product.id);
  btn.setAttribute('aria-label', `${label}: ${product.title}`);
  return btn;
}

function createPriceBlock(product) {
  const wrap = createEl('div', 'product-price-wrap');
  wrap.appendChild(createEl('span', 'product-price', formatPrice(product.price)));
  if (product.discountPercentage > 0) {
    wrap.appendChild(createEl('span', 'product-discount', `Diskon ${product.discountPercentage.toFixed(0)}%`));
  }
  return wrap;
}

function createProductCard(product) {
  const card = createEl('article', 'product-card');

  const media = createEl('div', 'product-media');
  media.appendChild(createProductImage(product));

  const body = createEl('div', 'product-body');

  const metaTop = createEl('div', 'product-meta-top');
  const stockMeta = getStockStatusMeta(product.stock);
  metaTop.append(
    createEl('span', 'product-category-tag', formatCategoryLabel(product.category)),
    createEl('span', `product-stock-tag ${stockMeta.cssClass}`, stockMeta.label)
  );

  const title = createEl('h3', 'product-title', product.title);

  const subMeta = createEl('div', 'product-sub-meta');
  subMeta.appendChild(createRatingEl(product.rating));
  if (product.brand) subMeta.appendChild(createEl('span', 'product-brand', product.brand));

  const desc = createEl('p', 'product-desc', product.description);

  const footer = createEl('div', 'product-footer');
  footer.append(createPriceBlock(product), createDetailButton(product, 'Lihat Detail', 'btn-secondary'));

  body.append(metaTop, title, subMeta, desc, footer);
  card.append(media, body);
  return card;
}

function createSkeletonCard() {
  const card = createEl('div', 'skeleton-card');
  card.setAttribute('aria-hidden', 'true');
  card.appendChild(createEl('div', 'skeleton-block skeleton-media'));
  const body = createEl('div', 'skeleton-body');
  ['w-40', 'w-90', 'w-70', 'w-90', 'w-50'].forEach(width => {
    body.appendChild(createEl('div', `skeleton-block skeleton-line ${width}`));
  });
  card.appendChild(body);
  return card;
}

/* -------------------------------------------------------------------------
   9. Render: State UI (Loading / Error / Success) - Challenge C = 1
   ------------------------------------------------------------------------- */

function setUiState(status) {
  appState.status = status;
  const isLoading = status === 'loading';
  const hasData = appState.products.length > 0;

  dom.loadingState.classList.toggle('hidden', !isLoading);
  dom.errorState.classList.toggle('hidden', status !== 'error');

  // aria-disabled (bukan disabled) agar fokus keyboard tidak hilang dari tombol
  [dom.retryBtn, dom.refreshBtn].forEach(btn => btn.setAttribute('aria-disabled', String(isLoading)));
  dom.retryBtn.textContent = isLoading ? 'Memuat\u2026' : 'Coba Lagi';
  dom.refreshBtn.textContent = isLoading ? 'Memuat\u2026' : 'Segarkan Katalog';

  dom.catalogGrid.setAttribute('aria-busy', String(isLoading));
  dom.filterFieldset.disabled = !hasData;
  dom.inquiryProduct.disabled = !hasData;

  if (!hasData) {
    renderNoDataState(isLoading);
  }

  if (status === 'error') {
    dom.errorMessage.textContent = appState.errorMessage;
    dom.errorLastSuccess.textContent = buildLastSuccessSentence(hasData);
  }

  renderTimestampBadge();
  renderHeroBadge();
}

function buildLastSuccessSentence(hasData) {
  if (!appState.lastSuccessAt) {
    return 'Data produk belum pernah berhasil dimuat di perangkat ini.';
  }
  const base = `Pembaruan stok terakhir berhasil: ${formatTimestampWITA(appState.lastSuccessAt)}.`;
  return hasData ? `${base} Katalog di bawah masih menampilkan data dari pemuatan tersebut.` : base;
}

function renderTimestampBadge() {
  const STATE_LABELS = { idle: 'Menyiapkan', loading: 'Memuat', success: 'Berhasil', error: 'Gagal' };
  dom.lastUpdatedBadge.dataset.state = appState.status;
  dom.lastUpdatedState.textContent = STATE_LABELS[appState.status] || '';

  dom.lastUpdatedText.replaceChildren();
  if (!appState.lastSuccessAt) {
    dom.lastUpdatedText.textContent = 'Pembaruan Stok Terakhir: Belum pernah dimuat';
    return;
  }
  const time = createEl('time', '', formatTimestampWITA(appState.lastSuccessAt));
  time.dateTime = appState.lastSuccessAt.toISOString();
  dom.lastUpdatedText.append('Pembaruan Stok Terakhir: ', time);
}

function renderHeroBadge() {
  const { status, products } = appState;
  if (products.length > 0) {
    const categoryCount = new Set(products.map(item => item.category)).size;
    const summaryText = `${products.length} produk \u00b7 ${categoryCount} kategori`;
    if (dom.heroProductCount) {
      dom.heroProductCount.textContent = summaryText;
    }
    if (dom.storeCatalogSummary) {
      dom.storeCatalogSummary.textContent = summaryText;
    }
  } else if (status === 'error') {
    if (dom.heroProductCount) {
      dom.heroProductCount.textContent = 'Data belum tersedia';
    }
    if (dom.storeCatalogSummary) {
      dom.storeCatalogSummary.textContent = 'Data belum tersedia';
    }
  } else {
    if (dom.heroProductCount) {
      dom.heroProductCount.textContent = 'Memuat produk\u2026';
    }
    if (dom.storeCatalogSummary) {
      dom.storeCatalogSummary.textContent = 'Memuat katalog\u2026';
    }
  }
}

function renderNoDataState(isLoading) {
  dom.catalogEmpty.classList.add('hidden');
  dom.catalogGrid.classList.remove('hidden');

  if (isLoading) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < SKELETON_CARD_COUNT; i += 1) fragment.appendChild(createSkeletonCard());
    dom.catalogGrid.replaceChildren(fragment);
    renderFeaturedSkeleton();
    renderStatsPlaceholder('\u2026');
    dom.catalogResultInfo.textContent = 'Memuat produk dari DummyJSON\u2026';
    setProductSelectPlaceholder('Memuat daftar produk\u2026');
    return;
  }

  // Gagal dan belum ada data sama sekali
  const box = createEl('div', 'grid-unavailable');
  box.appendChild(createEl('p', 'grid-unavailable-text', 'Katalog belum dapat ditampilkan karena data produk gagal dimuat.'));
  const retryInline = createEl('button', 'btn btn-retry btn-sm', 'Coba Lagi');
  retryInline.type = 'button';
  retryInline.id = 'retry-inline-btn';
  retryInline.addEventListener('click', handleRetryClick);
  box.appendChild(retryInline);
  dom.catalogGrid.replaceChildren(box);

  dom.featuredGrid.replaceChildren(
    createEl('p', 'featured-empty-note', 'Produk pilihan akan tampil setelah data berhasil dimuat.')
  );
  renderStatsPlaceholder('\u2013');
  dom.catalogResultInfo.textContent = 'Data produk belum tersedia.';
  setProductSelectPlaceholder('Daftar produk belum tersedia');
}

function renderStatsPlaceholder(symbol) {
  dom.statAveragePrice.textContent = symbol;
  dom.statHighestProduct.textContent = symbol;
  dom.statHighestPrice.textContent = symbol;
  dom.statProductCount.textContent = symbol;
  dom.statProductTotal.textContent = `dari ${symbol} produk`;
  dom.statCategoryCount.textContent = symbol;
}

/* -------------------------------------------------------------------------
   10. Render: Produk Pilihan, Katalog, Statistik
   ------------------------------------------------------------------------- */

function renderFeaturedSkeleton() {
  const primary = createEl('div', 'skeleton-card skeleton-featured');
  primary.setAttribute('aria-hidden', 'true');
  primary.append(createEl('div', 'skeleton-block skeleton-media'), createSkeletonCard().lastChild);

  const side = createEl('div', 'featured-side-stack');
  side.append(createSkeletonCard(), createSkeletonCard());
  dom.featuredGrid.replaceChildren(primary, side);
}

function renderFeaturedSection(products) {
  const topThree = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
  if (topThree.length === 0) {
    dom.featuredGrid.replaceChildren(createEl('p', 'featured-empty-note', 'Belum ada produk untuk ditampilkan.'));
    return;
  }

  const [primaryItem, ...secondaryItems] = topThree;

  // Kartu utama
  const primaryCard = createEl('article', 'featured-primary-card');
  const primaryMedia = createEl('div', 'product-media');
  primaryMedia.appendChild(createProductImage(primaryItem, { large: true }));

  const primaryContent = createEl('div', 'featured-content');
  const primaryMeta = createEl('div', 'product-meta-top');
  primaryMeta.append(
    createEl('span', 'product-category-tag', formatCategoryLabel(primaryItem.category)),
    createRatingEl(primaryItem.rating)
  );
  const primaryFooter = createEl('div', 'product-footer');
  primaryFooter.append(createPriceBlock(primaryItem), createDetailButton(primaryItem, 'Lihat Rincian', 'btn-primary'));
  primaryContent.append(
    primaryMeta,
    createEl('h3', 'product-title featured-title', primaryItem.title),
    createEl('p', 'product-desc', primaryItem.description),
    primaryFooter
  );
  primaryCard.append(primaryMedia, primaryContent);

  // Kartu sekunder
  const sideStack = createEl('div', 'featured-side-stack');
  secondaryItems.forEach(item => {
    const card = createEl('article', 'featured-secondary-card');
    const thumb = createEl('div', 'featured-thumb');
    thumb.appendChild(createProductImage(item));

    const content = createEl('div', 'featured-secondary-content');
    const meta = createEl('div', 'product-meta-top');
    meta.append(createEl('span', 'product-category-tag', formatCategoryLabel(item.category)), createRatingEl(item.rating));
    const footer = createEl('div', 'product-footer');
    footer.append(createPriceBlock(item), createDetailButton(item, 'Rincian', 'btn-secondary'));
    content.append(meta, createEl('h3', 'product-title', item.title), footer);

    card.append(thumb, content);
    sideStack.appendChild(card);
  });

  dom.featuredGrid.replaceChildren(primaryCard, sideStack);
}

function renderStatistics(stats, filterActive) {
  dom.summaryScopeLabel.textContent = filterActive ? 'Cakupan: Hasil Filter Aktif' : 'Cakupan: Seluruh Katalog';
  dom.summaryScopeLabel.dataset.active = String(filterActive);

  dom.statProductCount.textContent = String(stats.count);
  dom.statProductTotal.textContent = `dari ${stats.totalCount} produk`;

  if (stats.count === 0) {
    dom.statAveragePrice.textContent = formatPrice(0);
    dom.statHighestProduct.textContent = 'Tidak ada produk';
    dom.statHighestPrice.textContent = '\u2013';
    dom.statCategoryCount.textContent = '0';
    return;
  }

  dom.statAveragePrice.textContent = formatPrice(stats.averagePrice);
  dom.statHighestProduct.textContent = stats.mostExpensive.title;
  dom.statHighestPrice.textContent = formatPrice(stats.mostExpensive.price);
  dom.statCategoryCount.textContent = String(stats.categoryCount);
}

function renderCatalogAndStats() {
  const { products, filters } = appState;
  if (products.length === 0) return;

  const filtered = computeFilteredProducts(products, filters);
  appState.filteredProducts = filtered;

  renderStatistics(computeCatalogStatistics(filtered, products.length), isFilterActive(filters));
  dom.catalogResultInfo.textContent = `Menampilkan ${filtered.length} dari ${products.length} produk.`;

  if (filtered.length === 0) {
    dom.catalogEmpty.classList.remove('hidden');
    dom.catalogGrid.classList.add('hidden');
    dom.catalogGrid.replaceChildren();
    return;
  }

  dom.catalogEmpty.classList.add('hidden');
  dom.catalogGrid.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  filtered.forEach(product => fragment.appendChild(createProductCard(product)));
  dom.catalogGrid.replaceChildren(fragment);
}

/* -------------------------------------------------------------------------
   11. Render: Pilihan Dropdown
   ------------------------------------------------------------------------- */

function populateCategoryFilter(products) {
  const countByCategory = products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(countByCategory).sort((a, b) =>
    formatCategoryLabel(a).localeCompare(formatCategoryLabel(b), 'id')
  );

  const options = [
    new Option(`Semua Kategori (${categories.length})`, 'ALL'),
    ...categories.map(cat => new Option(`${formatCategoryLabel(cat)} (${countByCategory[cat]})`, cat))
  ];
  dom.categoryFilter.replaceChildren(...options);

  if (!categories.includes(appState.filters.category)) appState.filters.category = 'ALL';
  dom.categoryFilter.value = appState.filters.category;
}

function populateProductSelect(products) {
  const previous = dom.inquiryProduct.value;
  const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title, 'id'));

  const options = [
    new Option('Pilih produk dari katalog\u2026', ''),
    ...sorted.map(item => new Option(`${item.title} (${formatPrice(item.price)})`, String(item.id)))
  ];
  dom.inquiryProduct.replaceChildren(...options);
  if (previous && findProductById(previous)) dom.inquiryProduct.value = previous;
}

function setProductSelectPlaceholder(text) {
  dom.inquiryProduct.replaceChildren(new Option(text, ''));
}

/* -------------------------------------------------------------------------
   12. Modal Detail Produk
   ------------------------------------------------------------------------- */

function openProductModal(productId) {
  const product = findProductById(productId);
  if (!product) return;

  appState.selectedModalProduct = product;
  dom.modalCategory.textContent = formatCategoryLabel(product.category);
  dom.modalTitle.textContent = product.title;
  dom.modalPrice.textContent = formatPrice(product.price);
  dom.modalDescription.textContent = product.description;
  dom.modalImageContainer.replaceChildren(createProductImage(product, { large: true }));

  const stockMeta = getStockStatusMeta(product.stock);
  const specs = [
    ['Merek', product.brand || 'Tidak disebutkan'],
    ['Rating', `${product.rating.toFixed(1)} dari 5`],
    ['Ketersediaan', `${stockMeta.label} (${product.stock} unit)`],
    ['Diskon', product.discountPercentage > 0 ? `${product.discountPercentage.toFixed(1)}%` : 'Tidak ada'],
    ['Kode SKU', product.sku || `ID-${product.id}`],
    ['Kategori', formatCategoryLabel(product.category)]
  ];

  dom.modalSpecs.replaceChildren(
    ...specs.map(([label, value]) => {
      const row = createEl('div', 'modal-spec-row');
      row.append(createEl('dt', '', label), createEl('dd', '', value));
      return row;
    })
  );

  if (typeof dom.productModal.showModal === 'function') {
    dom.productModal.showModal();
  } else {
    dom.productModal.setAttribute('open', '');
  }
}

function closeProductModal() {
  if (typeof dom.productModal.close === 'function' && dom.productModal.open) {
    dom.productModal.close();
  } else {
    dom.productModal.removeAttribute('open');
  }
}

/* -------------------------------------------------------------------------
   13. Form: Tampilan Error, Hint, Riwayat
   ------------------------------------------------------------------------- */

function setFieldError(field, message) {
  const { input, error } = dom.formFields[field];
  if (message) {
    input.setAttribute('aria-invalid', 'true');
    error.textContent = message;
    error.classList.remove('hidden');
  } else {
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    error.classList.add('hidden');
  }
}

function validateSingleField(field) {
  const message = FIELD_VALIDATORS[field](String(dom.formFields[field].input.value || ''));
  setFieldError(field, message);
  return message;
}

function clearFormErrors() {
  Object.keys(dom.formFields).forEach(field => setFieldError(field, ''));
  dom.formErrorSummary.classList.add('hidden');
  dom.formErrorSummary.textContent = '';
}

function updateFieldHints() {
  const nameLength = dom.inquiryName.value.trim().length;
  dom.inquiryNameHint.textContent =
    `Minimal ${MIN_NAME_LENGTH} karakter (spasi di awal/akhir tidak dihitung). Terisi: ${nameLength}/${MIN_NAME_LENGTH}.`;
  dom.inquiryNameHint.classList.toggle('hint-ok', nameLength >= MIN_NAME_LENGTH);

  const notesLength = dom.inquiryNotes.value.trim().length;
  dom.inquiryNotesHint.textContent =
    `${notesLength}/${MAX_NOTES_LENGTH} karakter (minimal ${MIN_NOTES_LENGTH} karakter).`;
  dom.inquiryNotesHint.classList.toggle('hint-ok', notesLength >= MIN_NOTES_LENGTH);
}

function renderSavedInquiries() {
  const saved = safeGetStorage(STORAGE_KEYS.SAVED_INQUIRIES, []);

  if (!Array.isArray(saved) || saved.length === 0) {
    dom.savedInquiriesList.replaceChildren(
      createEl('li', 'saved-inquiry-empty', 'Belum ada pertanyaan yang disimpan.')
    );
    return;
  }

  dom.savedInquiriesList.replaceChildren(
    ...saved.map(entry => {
      const li = createEl('li', 'saved-inquiry-item');
      li.append(
        createEl('strong', 'saved-inquiry-name', `${entry.name} \u2014 ${entry.purpose || 'Pertanyaan Umum'}`),
        createEl('span', 'saved-inquiry-meta', `Produk: ${entry.productTitle || entry.product || '-'} \u00b7 ${entry.createdAt}`),
        createEl('span', 'saved-inquiry-notes', `Pesan: ${entry.notes}`)
      );
      return li;
    })
  );
}

function handleInquirySubmit(event) {
  event.preventDefault();
  clearFormErrors();
  dom.inquirySuccessBanner.classList.add('hidden');

  const result = validateInquiryForm({
    name: dom.inquiryName.value,
    contact: dom.inquiryContact.value,
    product: dom.inquiryProduct.value,
    purpose: dom.inquiryPurpose.value,
    notes: dom.inquiryNotes.value
  });

  if (!result.isValid) {
    const invalidFields = Object.keys(result.errors);
    invalidFields.forEach(field => setFieldError(field, result.errors[field]));

    dom.formErrorSummary.textContent =
      `Formulir belum dapat dikirim: ${invalidFields.length} isian perlu diperbaiki. Lihat pesan di bawah setiap kolom.`;
    dom.formErrorSummary.classList.remove('hidden');

    const firstFocusable = invalidFields
      .map(field => dom.formFields[field].input)
      .find(input => !input.disabled);
    (firstFocusable || dom.formErrorSummary).focus();
    return;
  }

  const product = findProductById(result.cleaned.productId);
  const record = {
    name: result.cleaned.name,
    contact: result.cleaned.contact,
    productId: result.cleaned.productId,
    productTitle: product ? product.title : '-',
    purpose: result.cleaned.purpose,
    notes: result.cleaned.notes,
    createdAt: formatTimestampWITA(new Date())
  };

  const existing = safeGetStorage(STORAGE_KEYS.SAVED_INQUIRIES, []);
  const updated = [record, ...(Array.isArray(existing) ? existing : [])].slice(0, 10);
  safeSetStorage(STORAGE_KEYS.SAVED_INQUIRIES, updated);
  renderSavedInquiries();

  dom.inquirySuccessBody.textContent =
    `Terima kasih, ${record.name}. Pertanyaan Anda tentang "${record.productTitle}" (${record.purpose}) ` +
    `telah tercatat pada ${record.createdAt} dan tersimpan di riwayat perangkat ini. ` +
    `Tim Ranum akan menghubungi Anda melalui ${record.contact}.`;

  dom.inquiryForm.reset();
  updateFieldHints();
  dom.inquirySuccessBanner.classList.remove('hidden');
  dom.inquirySuccessBanner.focus();
}

/* -------------------------------------------------------------------------
   14. Event Handler
   ------------------------------------------------------------------------- */

function handleRetryClick(event) {
  if (event && event.currentTarget && event.currentTarget.getAttribute('aria-disabled') === 'true') return;
  loadProducts().then(() => {
    if (appState.status === 'error') dom.errorState.focus();
  });
}

function applyFilters(partialFilters) {
  appState.filters = { ...appState.filters, ...partialFilters };
  renderCatalogAndStats();
}

function resetAllFilters() {
  appState.filters = { ...DEFAULT_FILTERS };
  dom.catalogSearchInput.value = '';
  dom.headerSearchInput.value = '';
  dom.categoryFilter.value = 'ALL';
  dom.availabilityFilter.value = 'ALL';
  dom.sortFilter.value = 'DEFAULT';
  renderCatalogAndStats();
}

function handleDetailButtonClick(event) {
  const trigger = event.target.closest('[data-product-id]');
  if (trigger) openProductModal(trigger.dataset.productId);
}

function closeMobileNav() {
  dom.primaryNav.classList.remove('is-open');
  dom.mobileNavToggle.setAttribute('aria-expanded', 'false');
}

function bindEvents() {
  // Navigasi mobile
  dom.mobileNavToggle.addEventListener('click', () => {
    const isOpen = dom.primaryNav.classList.toggle('is-open');
    dom.mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
  });
  dom.primaryNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMobileNav();
  });

  // State UI: Retry & muat ulang
  dom.retryBtn.addEventListener('click', handleRetryClick);
  dom.refreshBtn.addEventListener('click', handleRetryClick);

  // Pencarian header disinkronkan dengan pencarian katalog
  dom.headerSearchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = dom.headerSearchInput.value;
    dom.catalogSearchInput.value = query;
    applyFilters({ searchQuery: query });
    document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
  });

  // Filter katalog
  dom.catalogFilterForm.addEventListener('submit', event => event.preventDefault());
  dom.catalogSearchInput.addEventListener('input', event => {
    dom.headerSearchInput.value = event.target.value;
    applyFilters({ searchQuery: event.target.value });
  });
  dom.categoryFilter.addEventListener('change', event => applyFilters({ category: event.target.value }));
  dom.availabilityFilter.addEventListener('change', event => applyFilters({ availability: event.target.value }));
  dom.sortFilter.addEventListener('change', event => applyFilters({ sortBy: event.target.value }));
  dom.resetFilterBtn.addEventListener('click', resetAllFilters);
  dom.emptyResetBtn.addEventListener('click', resetAllFilters);

  // Tombol detail produk (event delegation)
  dom.catalogGrid.addEventListener('click', handleDetailButtonClick);
  dom.featuredGrid.addEventListener('click', handleDetailButtonClick);

  // Modal
  dom.modalCloseBtn.addEventListener('click', closeProductModal);
  dom.productModal.addEventListener('click', event => {
    if (event.target === dom.productModal) closeProductModal();
  });
  dom.modalInquireBtn.addEventListener('click', () => {
    const selected = appState.selectedModalProduct;
    closeProductModal();
    if (!selected) return;
    dom.inquiryProduct.value = String(selected.id);
    setFieldError('product', '');
    document.getElementById('konsultasi').scrollIntoView({ behavior: 'smooth' });
    dom.inquiryName.focus({ preventScroll: true });
  });

  // Form: validasi saat blur, perbarui saat mengetik jika sudah ditandai error
  Object.keys(dom.formFields).forEach(field => {
    const { input } = dom.formFields[field];
    const liveEvent = input.tagName === 'SELECT' ? 'change' : 'input';

    input.addEventListener('blur', () => {
      if (input.value.trim() !== '' || input.dataset.touched === 'true') validateSingleField(field);
      input.dataset.touched = 'true';
    });
    input.addEventListener(liveEvent, () => {
      if (input.getAttribute('aria-invalid') === 'true') validateSingleField(field);
      updateFieldHints();
    });
  });

  dom.inquiryForm.addEventListener('submit', handleInquirySubmit);
  dom.inquiryForm.addEventListener('reset', () => {
    clearFormErrors();
    dom.inquirySuccessBanner.classList.add('hidden');
    Object.values(dom.formFields).forEach(({ input }) => delete input.dataset.touched);
    // Nilai input baru kosong setelah event reset selesai diproses
    setTimeout(updateFieldHints, 0);
  });

  dom.clearInquiriesBtn.addEventListener('click', () => {
    safeSetStorage(STORAGE_KEYS.SAVED_INQUIRIES, []);
    renderSavedInquiries();
  });
}

/* -------------------------------------------------------------------------
   15. Inisialisasi
   ------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  cacheDomElements();
  appState.lastSuccessAt = readStoredTimestamp();
  bindEvents();
  renderSavedInquiries();
  updateFieldHints();
  loadProducts();
});
