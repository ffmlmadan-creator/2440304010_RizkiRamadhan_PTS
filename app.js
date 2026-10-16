// Konfigurasi Endpoint REST API Wajib (NIM 2440304010 -> Digit X = 0 -> Products)
const API_CONFIG = {
  PRIMARY_ENDPOINT: 'https://dummyjson.com/products',
  BrokenEndpointForTest: 'https://dummyjson.com/products-invalid-endpoint-404',
  STORAGE_KEYS: {
    LAST_SUCCESS_SYNC: 'kala_seduh_last_sync_timestamp',
    SAVED_INQUIRIES: 'kala_seduh_saved_inquiries_v1'
  }
};

// Salinan cadangan terverifikasi dari struktur asli https://dummyjson.com/products
// Digunakan hanya apabila pengguna menekan tombol "Gunakan Salinan Cadangan API" saat jaringan terputus
const VERIFIED_API_FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
    category: 'beauty',
    price: 9.99,
    rating: 4.94,
    stock: 5,
    brand: 'Essence',
    sku: 'RCH45Q1A',
    availabilityStatus: 'Low Stock',
    ShippingInfo: 'Ships in 1 month'
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description: 'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent.',
    category: 'fragrances',
    price: 49.99,
    rating: 4.85,
    stock: 17,
    brand: 'Calvin Klein',
    sku: 'DZM2JQZE',
    availabilityStatus: 'In Stock',
    ShippingInfo: 'Ships overnight'
  },
  {
    id: 11,
    title: 'Annibale Colombo Bed',
    description: 'The Annibale Colombo Bed is a luxurious and spacious bed frame, crafted with high-quality materials.',
    category: 'furniture',
    price: 1899.99,
    rating: 4.14,
    stock: 47,
    brand: 'Annibale Colombo',
    sku: '4KMDTZWF',
    availabilityStatus: 'In Stock',
    ShippingInfo: 'Ships in 1 month'
  },
  {
    id: 16,
    title: 'Apple',
    description: 'Fresh and crisp apples, suitable for snacking or incorporating into various recipes.',
    category: 'groceries',
    price: 1.99,
    rating: 4.19,
    stock: 9,
    brand: 'Fresh Farm',
    sku: 'QTROUV79',
    availabilityStatus: 'Low Stock',
    ShippingInfo: 'Ships in 2 weeks'
  },
  {
    id: 20,
    title: 'Cooking Oil',
    description: 'Versatile cooking oil suitable for frying, sauteing, and various culinary applications.',
    category: 'groceries',
    price: 4.99,
    rating: 4.8,
    stock: 10,
    brand: 'Pantry Essentials',
    sku: 'B6F79V52',
    availabilityStatus: 'Low Stock',
    ShippingInfo: 'Ships in 1 week'
  },
  {
    id: 27,
    title: 'Honey Jar',
    description: 'Pure and natural honey in a convenient jar, ideal for sweetening beverages or drizzling over food.',
    category: 'groceries',
    price: 6.99,
    rating: 3.5,
    stock: 25,
    brand: 'Nature Hive',
    sku: '46M5O9G6',
    availabilityStatus: 'In Stock',
    ShippingInfo: 'Ships in 1 week'
  },
  {
    id: 29,
    title: 'Juice',
    description: 'Refreshing fruit juice, packed with vitamins and great for staying hydrated.',
    category: 'groceries',
    price: 3.99,
    rating: 3.94,
    stock: 50,
    brand: 'Orchard Press',
    sku: '9W8E1K32',
    availabilityStatus: 'In Stock',
    ShippingInfo: 'Ships in 3-5 business days'
  },
  {
    id: 30,
    title: 'Kiwi',
    description: 'Nutrient-rich kiwi, suitable for snacking or adding a tropical twist to your dishes.',
    category: 'groceries',
    price: 2.49,
    rating: 4.93,
    stock: 0,
    brand: 'Green Orchard',
    sku: '0X1K9P44',
    availabilityStatus: 'Out of Stock',
    ShippingInfo: 'Ships in 1 week'
  }
];

// Modul Koleksi Contoh Biji Kopi Lokal (Terpisah secara arsitektur & berlabel jujur [DATA CONTOH])
const SAMPLE_COFFEE_COLLECTION = [
  {
    id: 901,
    title: '[DATA CONTOH] Arabika Gayo Dataran Tinggi 250g',
    description: 'Contoh produk etalase untuk simulasi katalog biji kopi lokal kategori seduh manual (Filter Roast).',
    category: 'single-origin-filter',
    price: 8.50,
    rating: 4.90,
    stock: 24,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-01',
    availabilityStatus: 'In Stock',
    isSamplePlaceholder: true
  },
  {
    id: 902,
    title: '[DATA CONTOH] Arabika Kintamani Bali 250g',
    description: 'Contoh produk etalase untuk simulasi katalog biji kopi lokal dengan profil sangrai medium.',
    category: 'single-origin-filter',
    price: 8.20,
    rating: 4.82,
    stock: 18,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-02',
    availabilityStatus: 'In Stock',
    isSamplePlaceholder: true
  },
  {
    id: 903,
    title: '[DATA CONTOH] Racikan Espresso Rumah Teduh 500g',
    description: 'Contoh produk etalase untuk simulasi campuran biji kopi lokal khusus mesin espresso rumahan.',
    category: 'espresso-blend',
    price: 14.00,
    rating: 4.88,
    stock: 7,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-03',
    availabilityStatus: 'Low Stock',
    isSamplePlaceholder: true
  },
  {
    id: 904,
    title: '[DATA CONTOH] Robusta Temanggung Fine 500g',
    description: 'Contoh produk etalase untuk simulasi kopi tubruk dan kopi susu harian dengan body tebal.',
    category: 'robusta-lokal',
    price: 9.50,
    rating: 4.65,
    stock: 32,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-04',
    availabilityStatus: 'In Stock',
    isSamplePlaceholder: true
  },
  {
    id: 905,
    title: '[DATA CONTOH] Arabika Flores Bajawa 250g',
    description: 'Contoh produk etalase untuk simulasi biji kopi sangrai medium-dark.',
    category: 'single-origin-filter',
    price: 8.90,
    rating: 4.79,
    stock: 4,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-05',
    availabilityStatus: 'Low Stock',
    isSamplePlaceholder: true
  },
  {
    id: 906,
    title: '[DATA CONTOH] Paket Kertas Saring V60 02 (100 Lembar)',
    description: 'Contoh produk perlengkapan seduh manual untuk melengkapi simulasi etalase toko kopi.',
    category: 'perlengkapan-seduh',
    price: 5.25,
    rating: 4.70,
    stock: 0,
    brand: 'Kala Seduh [Contoh]',
    sku: 'KS-SMP-06',
    availabilityStatus: 'Out of Stock',
    isSamplePlaceholder: true
  }
];

// State terpusat aplikasi
const appState = {
  activeSource: 'api', // 'api' | 'coffee_sample'
  apiProducts: [],
  activeDataset: [],
  filteredProducts: [],
  filters: {
    searchQuery: '',
    category: 'ALL',
    availability: 'ALL',
    sortBy: 'DEFAULT'
  },
  isSimulatingError: false,
  selectedModalProduct: null
};

// Fungsi utilitas penyimpanan aman ke localStorage dengan cadangan memori sesi
const memoryStorageFallback = {};

function safeGetStorage(key, fallbackValue = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (err) {
    // Gunakan cadangan memori apabila akses localStorage dibatasi sandbox
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
    // Nilai tetap terjaga pada memoryStorageFallback selama sesi aktif
  }
}

// Pengambilan data REST API menggunakan Fetch API dan async/await
async function fetchProductsFromApi(customUrl = API_CONFIG.PRIMARY_ENDPOINT) {
  const response = await fetch(customUrl);
  if (!response.ok) {
    throw new Error('Status HTTP ' + response.status + ' saat memuat katalog.');
  }
  const payload = await response.json();
  if (!payload || !Array.isArray(payload.products)) {
    throw new Error('Format JSON katalog tidak sesuai spesifikasi.');
  }
  return payload.products;
}

// Pembuatan ilustrasi SVG konsisten dengan rasio 4:3 untuk item tanpa gambar eksternal
function createPackagingSvgDataUri(title, category, isSample) {
  const safeTitle = String(title).replace(/\[DATA CONTOH\]\s*/i, '').slice(0, 26);
  const safeCat = String(category).toUpperCase().slice(0, 22);
  const badgeText = isSample ? '[DATA CONTOH]' : 'KATALOG PRODUK';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#EFE9DC"/>
    <rect x="110" y="28" width="180" height="244" rx="6" fill="#FBF9F5" stroke="#231710" stroke-width="2.5"/>
    <rect x="126" y="64" width="148" height="156" fill="#1E3F2B"/>
    <text x="200" y="96" text-anchor="middle" fill="#E3DAC8" font-family="Georgia, serif" font-size="11" letter-spacing="1">${badgeText}</text>
    <text x="200" y="132" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="14" font-weight="bold">${safeTitle}</text>
    <line x1="150" y1="152" x2="250" y2="152" stroke="#E3DAC8" stroke-width="1"/>
    <text x="200" y="178" text-anchor="middle" fill="#F7F3EB" font-family="sans-serif" font-size="11">${safeCat}</text>
    <text x="200" y="204" text-anchor="middle" fill="#E3DAC8" font-family="sans-serif" font-size="10">KALA SEDUH</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function formatPriceUSD(value) {
  const num = Number(value) || 0;
  return '$' + num.toFixed(2);
}

function formatCategoryLabel(slug) {
  if (!slug) return 'Umum';
  return String(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getStockStatusMeta(stockCount) {
  const stock = Number(stockCount) || 0;
  if (stock <= 0) {
    return { code: 'OUT_OF_STOCK', label: 'Stok Habis (0)', cssClass: 'stock-out' };
  }
  if (stock <= 10) {
    return { code: 'LOW_STOCK', label: 'Stok Terbatas (' + stock + ')', cssClass: 'stock-low' };
  }
  return { code: 'IN_STOCK', label: 'Tersedia (' + stock + ')', cssClass: 'stock-ok' };
}

// Penyaringan & pengurutan produk menggunakan filter() dan sort() (Fitur Wajib Y=1)
function computeFilteredProducts(dataset, filters) {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = dataset.filter(item => {
    const titleMatch = String(item.title || '').toLowerCase().includes(query);
    const descMatch = String(item.description || '').toLowerCase().includes(query);
    const categoryMatch = String(item.category || '').toLowerCase().includes(query);
    const matchesQuery = !query || titleMatch || descMatch || categoryMatch;

    const matchesCategory =
      filters.category === 'ALL' || item.category === filters.category;

    const stockMeta = getStockStatusMeta(item.stock);
    const matchesAvailability =
      filters.availability === 'ALL' || stockMeta.code === filters.availability;

    return matchesQuery && matchesCategory && matchesAvailability;
  });

  const sorted = [...filtered];
  if (filters.sortBy === 'PRICE_ASC') {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (filters.sortBy === 'PRICE_DESC') {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (filters.sortBy === 'TITLE_ASC') {
    sorted.sort((a, b) => String(a.title).localeCompare(String(b.title), 'id'));
  }

  return sorted;
}

// Perhitungan Statistik Katalog menggunakan reduce() dan map() (Fitur Wajib Y=1 & Analisis Data)
function computeCatalogStatistics(filteredItems, totalDataset) {
  const count = filteredItems.length;
  const totalCount = totalDataset.length;

  if (count === 0) {
    return {
      countText: '0 dari ' + totalCount + ' produk',
      averagePriceText: '$0.00',
      highestProductText: 'Tidak ada produk tampil',
      categoryCountText: '0 kategori'
    };
  }

  const totalPrice = filteredItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const averagePrice = totalPrice / count;

  const highestItem = filteredItems.reduce((highest, current) => {
    return (Number(current.price) || 0) > (Number(highest.price) || 0) ? current : highest;
  }, filteredItems[0]);

  const uniqueCategories = new Set(filteredItems.map(item => item.category));

  return {
    countText: count + ' dari ' + totalCount + ' produk',
    averagePriceText: formatPriceUSD(averagePrice),
    highestProductText: highestItem.title + ' (' + formatPriceUSD(highestItem.price) + ')',
    categoryCountText: uniqueCategories.size + ' kategori'
  };
}

// Validasi Form Permintaan Informasi Produk (Digit Z = 0: Nama minimal 5 karakter setelah trim)
function validateInquiryForm(values) {
  const errors = {};
  const trimmedName = String(values.name || '').trim();
  const trimmedContact = String(values.contact || '').trim();
  const selectedProduct = String(values.product || '').trim();
  const trimmedNotes = String(values.notes || '').trim();

  if (trimmedName.length < 5) {
    errors.name =
      'Nama lengkap wajib minimal 5 karakter tanpa menghitung spasi di awal/akhir (saat ini ' +
      trimmedName.length +
      ' karakter).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{8,18}$/;
  if (!trimmedContact || (!emailRegex.test(trimmedContact) && !phoneRegex.test(trimmedContact))) {
    errors.contact = 'Masukkan alamat email yang valid atau nomor WhatsApp/telepon (minimal 8 digit).';
  }

  if (!selectedProduct) {
    errors.product = 'Silakan pilih salah satu produk dari daftar katalog.';
  }

  if (trimmedNotes.length < 10) {
    errors.notes = 'Tuliskan rincian pertanyaan minimal 10 karakter agar kebutuhan Anda jelas.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleaned: {
      name: trimmedName,
      contact: trimmedContact,
      product: selectedProduct,
      purpose: values.purpose,
      notes: trimmedNotes
    }
  };
}

// ==========================================================================
// Pengelolaan DOM, State Loading/Error/Empty, Retry & Timestamp (Challenge C=1)
// ==========================================================================

const dom = {};

function cacheDomElements() {
  dom.headerSearchForm = document.getElementById('header-search-form');
  dom.headerSearchInput = document.getElementById('header-search-input');
  dom.mobileNavToggle = document.getElementById('mobile-nav-toggle');
  dom.primaryNav = document.getElementById('primary-navigation');

  dom.featuredGrid = document.getElementById('featured-grid');
  dom.featuredSourceCaption = document.getElementById('featured-source-caption');

  dom.sourceApiBtn = document.getElementById('source-api-btn');
  dom.sourceCoffeeBtn = document.getElementById('source-coffee-btn');
  dom.lastUpdatedText = document.getElementById('last-updated-text');
  dom.refreshCatalogBtn = document.getElementById('refresh-catalog-btn');
  dom.simulateErrorBtn = document.getElementById('simulate-error-btn');
  dom.collectionContextText = document.getElementById('collection-context-text');

  dom.summaryScopeLabel = document.getElementById('summary-scope-label');
  dom.statProductCount = document.getElementById('stat-product-count');
  dom.statAveragePrice = document.getElementById('stat-average-price');
  dom.statHighestProduct = document.getElementById('stat-highest-product');
  dom.statCategoryCount = document.getElementById('stat-category-count');

  dom.catalogFilterForm = document.getElementById('catalog-filter-form');
  dom.catalogSearchInput = document.getElementById('catalog-search-input');
  dom.categoryFilter = document.getElementById('category-filter');
  dom.availabilityFilter = document.getElementById('availability-filter');
  dom.sortFilter = document.getElementById('sort-filter');
  dom.resetFilterBtn = document.getElementById('reset-filter-btn');

  dom.catalogLoading = document.getElementById('catalog-loading');
  dom.catalogError = document.getElementById('catalog-error');
  dom.catalogErrorMessage = document.getElementById('catalog-error-message');
  dom.errorLastUpdatedNote = document.getElementById('error-last-updated-note');
  dom.retryFetchBtn = document.getElementById('retry-fetch-btn');
  dom.fallbackSnapshotBtn = document.getElementById('fallback-snapshot-btn');

  dom.catalogEmpty = document.getElementById('catalog-empty');
  dom.emptyResetBtn = document.getElementById('empty-reset-btn');
  dom.catalogGrid = document.getElementById('catalog-grid');

  dom.inquiryForm = document.getElementById('product-inquiry-form');
  dom.inquiryName = document.getElementById('inquiry-name');
  dom.inquiryNameError = document.getElementById('inquiry-name-error');
  dom.inquiryContact = document.getElementById('inquiry-contact');
  dom.inquiryContactError = document.getElementById('inquiry-contact-error');
  dom.inquiryProduct = document.getElementById('inquiry-product');
  dom.inquiryProductError = document.getElementById('inquiry-product-error');
  dom.inquiryPurpose = document.getElementById('inquiry-purpose');
  dom.inquiryNotes = document.getElementById('inquiry-notes');
  dom.inquiryNotesError = document.getElementById('inquiry-notes-error');
  dom.resetInquiryBtn = document.getElementById('reset-inquiry-btn');
  dom.inquirySuccessBanner = document.getElementById('inquiry-success-banner');
  dom.inquirySuccessBody = document.getElementById('inquiry-success-body');
  dom.savedInquiriesList = document.getElementById('saved-inquiries-list');
  dom.clearInquiriesBtn = document.getElementById('clear-inquiries-btn');

  dom.productModal = document.getElementById('product-detail-modal');
  dom.modalCloseBtn = document.getElementById('modal-close-btn');
  dom.modalCategory = document.getElementById('modal-product-category');
  dom.modalImageContainer = document.getElementById('modal-image-container');
  dom.modalTitle = document.getElementById('modal-product-title');
  dom.modalPrice = document.getElementById('modal-product-price');
  dom.modalDescription = document.getElementById('modal-product-description');
  dom.modalSpecs = document.getElementById('modal-product-specs');
  dom.modalInquireBtn = document.getElementById('modal-inquire-btn');
}

function updateTimestampDisplay() {
  const savedTimestamp = safeGetStorage(API_CONFIG.STORAGE_KEYS.LAST_SUCCESS_SYNC, null);
  if (savedTimestamp) {
    dom.lastUpdatedText.textContent = 'Terakhir diperbarui: ' + savedTimestamp;
    dom.errorLastUpdatedNote.textContent =
      'Waktu terakhir katalog berhasil dimuat: ' + savedTimestamp;
  } else {
    dom.lastUpdatedText.textContent = 'Terakhir diperbarui: Belum pernah dimuat';
    dom.errorLastUpdatedNote.textContent =
      'Waktu terakhir katalog berhasil dimuat: Belum ada riwayat pemuatan sebelumnya.';
  }
}

function recordSuccessfulSyncTimestamp() {
  const now = new Date();
  const formatted = now.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  safeSetStorage(API_CONFIG.STORAGE_KEYS.LAST_SUCCESS_SYNC, formatted);
  updateTimestampDisplay();
}

function showLoadingState() {
  dom.catalogLoading.classList.remove('hidden');
  dom.catalogError.classList.add('hidden');
  dom.catalogEmpty.classList.add('hidden');
  dom.catalogGrid.classList.add('hidden');
}

function showErrorState(friendlyMessage) {
  dom.catalogLoading.classList.add('hidden');
  dom.catalogError.classList.remove('hidden');
  dom.catalogEmpty.classList.add('hidden');
  dom.catalogGrid.classList.add('hidden');
  dom.catalogErrorMessage.textContent = friendlyMessage;
  updateTimestampDisplay();
}

function createProductVisualElement(product) {
  const img = document.createElement('img');
  img.alt = 'Foto produk ' + product.title;
  img.loading = 'lazy';
  const fallbackUri = createPackagingSvgDataUri(
    product.title,
    product.category,
    Boolean(product.isSamplePlaceholder)
  );

  if (product.thumbnail && !product.isSamplePlaceholder) {
    img.src = product.thumbnail;
    img.addEventListener('error', () => {
      img.src = fallbackUri;
    }, { once: true });
  } else {
    img.src = fallbackUri;
  }
  return img;
}

function renderFeaturedSection(dataset) {
  dom.featuredGrid.replaceChildren();
  if (!dataset || dataset.length === 0) {
    const emptyNote = document.createElement('p');
    emptyNote.textContent = 'Produk unggulan akan tampil setelah katalog selesai dimuat.';
    dom.featuredGrid.appendChild(emptyNote);
    return;
  }

  // Ambil 3 produk dengan rating tertinggi menggunakan sort()
  const topThree = [...dataset]
    .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
    .slice(0, 3);

  const primaryItem = topThree[0];
  const secondaryItems = topThree.slice(1);

  if (primaryItem) {
    const primaryCard = document.createElement('article');
    primaryCard.className = 'featured-primary-card';

    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'product-media';
    mediaDiv.appendChild(createProductVisualElement(primaryItem));

    const contentDiv = document.createElement('div');
    const stockMeta = getStockStatusMeta(primaryItem.stock);

    const topMeta = document.createElement('div');
    topMeta.className = 'product-meta-top';

    const catBadge = document.createElement('span');
    catBadge.className = 'product-category-tag';
    catBadge.textContent = formatCategoryLabel(primaryItem.category);

    const stockBadge = document.createElement('span');
    stockBadge.className = 'product-stock-tag ' + stockMeta.cssClass;
    stockBadge.textContent = stockMeta.label;

    topMeta.append(catBadge, stockBadge);

    const titleEl = document.createElement('h3');
    titleEl.className = 'product-title';
    titleEl.textContent = primaryItem.title;

    const descEl = document.createElement('p');
    descEl.className = 'product-desc';
    descEl.textContent = primaryItem.description;

    const footerDiv = document.createElement('div');
    footerDiv.className = 'product-footer';

    const priceEl = document.createElement('span');
    priceEl.className = 'product-price';
    priceEl.textContent = formatPriceUSD(primaryItem.price);

    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'btn btn-primary';
    detailBtn.textContent = 'Lihat Rincian';
    detailBtn.addEventListener('click', () => openProductModal(primaryItem.id));

    footerDiv.append(priceEl, detailBtn);
    contentDiv.append(topMeta, titleEl, descEl, footerDiv);
    primaryCard.append(mediaDiv, contentDiv);
    dom.featuredGrid.appendChild(primaryCard);
  }

  if (secondaryItems.length > 0) {
    const sideStack = document.createElement('div');
    sideStack.className = 'featured-side-stack';

    secondaryItems.forEach(item => {
      const card = document.createElement('article');
      card.className = 'featured-secondary-card';

      const stockMeta = getStockStatusMeta(item.stock);
      const topMeta = document.createElement('div');
      topMeta.className = 'product-meta-top';

      const catBadge = document.createElement('span');
      catBadge.className = 'product-category-tag';
      catBadge.textContent = formatCategoryLabel(item.category);

      const stockBadge = document.createElement('span');
      stockBadge.className = 'product-stock-tag ' + stockMeta.cssClass;
      stockBadge.textContent = stockMeta.label;

      topMeta.append(catBadge, stockBadge);

      const titleEl = document.createElement('h3');
      titleEl.className = 'product-title';
      titleEl.textContent = item.title;

      const descEl = document.createElement('p');
      descEl.className = 'product-desc';
      descEl.textContent = item.description;

      const footerDiv = document.createElement('div');
      footerDiv.className = 'product-footer';

      const priceEl = document.createElement('span');
      priceEl.className = 'product-price';
      priceEl.textContent = formatPriceUSD(item.price);

      const detailBtn = document.createElement('button');
      detailBtn.type = 'button';
      detailBtn.className = 'btn btn-secondary';
      detailBtn.textContent = 'Rincian Produk';
      detailBtn.addEventListener('click', () => openProductModal(item.id));

      footerDiv.append(priceEl, detailBtn);
      card.append(topMeta, titleEl, descEl, footerDiv);
      sideStack.appendChild(card);
    });

    dom.featuredGrid.appendChild(sideStack);
  }
}

function populateCategoryAndProductSelects(dataset) {
  const categories = Array.from(new Set(dataset.map(item => item.category))).sort();

  dom.categoryFilter.replaceChildren();
  const allOption = document.createElement('option');
  allOption.value = 'ALL';
  allOption.textContent = 'Semua Kategori (' + categories.length + ')';
  dom.categoryFilter.appendChild(allOption);

  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = formatCategoryLabel(cat);
    dom.categoryFilter.appendChild(opt);
  });

  // Isi juga pilihan produk pada form permintaan informasi
  const currentSelected = dom.inquiryProduct.value;
  dom.inquiryProduct.replaceChildren();
  const placeholderOpt = document.createElement('option');
  placeholderOpt.value = '';
  placeholderOpt.textContent = 'Pilih produk dari katalog...';
  dom.inquiryProduct.appendChild(placeholderOpt);

  dataset.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.title;
    opt.textContent = item.title + ' (' + formatPriceUSD(item.price) + ')';
    dom.inquiryProduct.appendChild(opt);
  });

  if (currentSelected) {
    dom.inquiryProduct.value = currentSelected;
  }
}

function renderCatalogAndStats() {
  const dataset = appState.activeDataset;
  const filtered = computeFilteredProducts(dataset, appState.filters);
  appState.filteredProducts = filtered;

  const isFiltered =
    appState.filters.searchQuery.trim() !== '' ||
    appState.filters.category !== 'ALL' ||
    appState.filters.availability !== 'ALL';

  dom.summaryScopeLabel.textContent = isFiltered
    ? 'Cakupan: Hasil Penyaringan Aktif'
    : 'Cakupan: Seluruh Katalog Aktif';

  const stats = computeCatalogStatistics(filtered, dataset);
  dom.statProductCount.textContent = stats.countText;
  dom.statAveragePrice.textContent = stats.averagePriceText;
  dom.statHighestProduct.textContent = stats.highestProductText;
  dom.statCategoryCount.textContent = stats.categoryCountText;

  dom.catalogLoading.classList.add('hidden');
  dom.catalogError.classList.add('hidden');

  if (filtered.length === 0) {
    dom.catalogEmpty.classList.remove('hidden');
    dom.catalogGrid.classList.add('hidden');
    return;
  }

  dom.catalogEmpty.classList.add('hidden');
  dom.catalogGrid.classList.remove('hidden');
  dom.catalogGrid.replaceChildren();

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'product-media';
    mediaDiv.appendChild(createProductVisualElement(product));

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'product-body';

    const metaTop = document.createElement('div');
    metaTop.className = 'product-meta-top';

    const catTag = document.createElement('span');
    catTag.className = 'product-category-tag';
    catTag.textContent = formatCategoryLabel(product.category);

    const stockMeta = getStockStatusMeta(product.stock);
    const stockTag = document.createElement('span');
    stockTag.className = 'product-stock-tag ' + stockMeta.cssClass;
    stockTag.textContent = stockMeta.label;

    metaTop.append(catTag, stockTag);

    const titleEl = document.createElement('h3');
    titleEl.className = 'product-title';
    titleEl.textContent = product.title;

    const descEl = document.createElement('p');
    descEl.className = 'product-desc';
    descEl.textContent = product.description;

    const footerDiv = document.createElement('div');
    footerDiv.className = 'product-footer';

    const priceEl = document.createElement('span');
    priceEl.className = 'product-price';
    priceEl.textContent = formatPriceUSD(product.price);

    const detailBtn = document.createElement('button');
    detailBtn.type = 'button';
    detailBtn.className = 'btn btn-secondary';
    detailBtn.textContent = 'Lihat Detail';
    detailBtn.addEventListener('click', () => openProductModal(product.id));

    footerDiv.append(priceEl, detailBtn);
    bodyDiv.append(metaTop, titleEl, descEl, footerDiv);
    card.append(mediaDiv, bodyDiv);
    dom.catalogGrid.appendChild(card);
  });
}

// Pencarian item spesifik dengan Array.prototype.find() untuk Modal Detail
function openProductModal(productId) {
  const product = appState.activeDataset.find(item => Number(item.id) === Number(productId));
  if (!product) return;

  appState.selectedModalProduct = product;
  dom.modalCategory.textContent = formatCategoryLabel(product.category);
  dom.modalTitle.textContent = product.title;
  dom.modalPrice.textContent = formatPriceUSD(product.price);
  dom.modalDescription.textContent = product.description;

  dom.modalImageContainer.replaceChildren();
  dom.modalImageContainer.appendChild(createProductVisualElement(product));

  const stockMeta = getStockStatusMeta(product.stock);
  const specs = [
    ['Merek / Pembuat', product.brand || 'Kala Seduh'],
    ['Kode SKU', product.sku || 'KS-' + product.id],
    ['Status Stok', stockMeta.label],
    ['Penilaian Produk', (Number(product.rating) || 0).toFixed(2) + ' / 5.00']
  ];

  dom.modalSpecs.replaceChildren();
  specs.forEach(([label, val]) => {
    const wrap = document.createElement('div');
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = val;
    wrap.append(dt, dd);
    dom.modalSpecs.appendChild(wrap);
  });

  if (typeof dom.productModal.showModal === 'function') {
    dom.productModal.showModal();
  } else {
    dom.productModal.setAttribute('open', 'open');
  }
}

function closeProductModal() {
  if (typeof dom.productModal.close === 'function' && dom.productModal.open) {
    dom.productModal.close();
  } else {
    dom.productModal.removeAttribute('open');
  }
}

function resetAllFilters() {
  appState.filters = {
    searchQuery: '',
    category: 'ALL',
    availability: 'ALL',
    sortBy: 'DEFAULT'
  };
  dom.catalogSearchInput.value = '';
  dom.headerSearchInput.value = '';
  dom.categoryFilter.value = 'ALL';
  dom.availabilityFilter.value = 'ALL';
  dom.sortFilter.value = 'DEFAULT';
  renderCatalogAndStats();
}

function activateDataset(dataset, sourceType, contextNotice) {
  appState.activeSource = sourceType;
  appState.activeDataset = dataset;

  const isApi = sourceType === 'api';
  dom.sourceApiBtn.classList.toggle('active', isApi);
  dom.sourceApiBtn.setAttribute('aria-pressed', String(isApi));
  dom.sourceCoffeeBtn.classList.toggle('active', !isApi);
  dom.sourceCoffeeBtn.setAttribute('aria-pressed', String(!isApi));

  dom.collectionContextText.textContent = contextNotice;
  dom.featuredSourceCaption.textContent = isApi
    ? 'Menampilkan 3 produk pilihan dengan rating tertinggi dari Katalog Produk API aktif.'
    : 'Menampilkan 3 produk pilihan dari Koleksi Biji Kopi ([DATA CONTOH] terpisah).';

  populateCategoryAndProductSelects(dataset);
  resetAllFilters();
  renderFeaturedSection(dataset);
}

async function loadApiCatalog(forceErrorSimulation = false) {
  showLoadingState();
  const targetUrl = forceErrorSimulation
    ? API_CONFIG.BrokenEndpointForTest
    : API_CONFIG.PRIMARY_ENDPOINT;

  try {
    const products = await fetchProductsFromApi(targetUrl);
    appState.apiProducts = products;
    recordSuccessfulSyncTimestamp();
    activateDataset(
      products,
      'api',
      'Menampilkan ' +
        products.length +
        ' produk asli dari endpoint resmi https://dummyjson.com/products tanpa memodifikasi nama, harga, atau kategori.'
    );
  } catch (error) {
    showErrorState(
      'Katalog belum dapat dimuat dari server (' +
        error.message +
        '). Waktu pemuatan terakhir yang berhasil tetap disimpan. Silakan klik "Coba Lagi" atau gunakan salinan cadangan.'
    );
  }
}

function renderSavedInquiries() {
  const saved = safeGetStorage(API_CONFIG.STORAGE_KEYS.SAVED_INQUIRIES, []);
  dom.savedInquiriesList.replaceChildren();

  if (!Array.isArray(saved) || saved.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'saved-inquiry-empty';
    emptyLi.textContent = 'Belum ada permintaan informasi yang disimpan.';
    dom.savedInquiriesList.appendChild(emptyLi);
    return;
  }

  saved.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'saved-inquiry-item';

    const headerStrong = document.createElement('strong');
    headerStrong.textContent = entry.name + ' (' + entry.purpose + ')';

    const metaSpan = document.createElement('div');
    metaSpan.textContent = 'Produk: ' + entry.product + ' | Waktu: ' + entry.createdAt;

    const noteP = document.createElement('div');
    noteP.textContent = 'Pesan: ' + entry.notes;

    li.append(headerStrong, metaSpan, noteP);
    dom.savedInquiriesList.appendChild(li);
  });
}

function setFieldError(inputEl, errorEl, message) {
  if (message) {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  } else {
    inputEl.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}

function clearFormErrors() {
  setFieldError(dom.inquiryName, dom.inquiryNameError, '');
  setFieldError(dom.inquiryContact, dom.inquiryContactError, '');
  setFieldError(dom.inquiryProduct, dom.inquiryProductError, '');
  setFieldError(dom.inquiryNotes, dom.inquiryNotesError, '');
}

function bindEvents() {
  // Toggle menu mobile
  dom.mobileNavToggle.addEventListener('click', () => {
    const isOpen = dom.primaryNav.classList.toggle('is-open');
    dom.mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Form pencarian cepat pada header
  dom.headerSearchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = dom.headerSearchInput.value;
    dom.catalogSearchInput.value = query;
    appState.filters.searchQuery = query;
    renderCatalogAndStats();
    const catalogEl = document.getElementById('katalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Sinkronisasi input pencarian katalog & filter kombinasi
  dom.catalogFilterForm.addEventListener('submit', event => {
    event.preventDefault();
  });

  dom.catalogSearchInput.addEventListener('input', event => {
    const val = event.target.value;
    dom.headerSearchInput.value = val;
    appState.filters.searchQuery = val;
    renderCatalogAndStats();
  });

  dom.categoryFilter.addEventListener('change', event => {
    appState.filters.category = event.target.value;
    renderCatalogAndStats();
  });

  dom.availabilityFilter.addEventListener('change', event => {
    appState.filters.availability = event.target.value;
    renderCatalogAndStats();
  });

  dom.sortFilter.addEventListener('change', event => {
    appState.filters.sortBy = event.target.value;
    renderCatalogAndStats();
  });

  dom.resetFilterBtn.addEventListener('click', () => {
    resetAllFilters();
  });

  dom.emptyResetBtn.addEventListener('click', () => {
    resetAllFilters();
  });

  // Pengalih sumber koleksi katalog (Arsitektur Jujur: API Live vs Koleksi Biji Kopi Contoh)
  dom.sourceApiBtn.addEventListener('click', () => {
    if (appState.apiProducts.length > 0) {
      activateDataset(
        appState.apiProducts,
        'api',
        'Menampilkan ' +
          appState.apiProducts.length +
          ' produk asli dari endpoint resmi https://dummyjson.com/products tanpa memodifikasi nama, harga, atau kategori.'
      );
    } else {
      loadApiCatalog(false);
    }
  });

  dom.sourceCoffeeBtn.addEventListener('click', () => {
    activateDataset(
      SAMPLE_COFFEE_COLLECTION,
      'coffee_sample',
      'Menampilkan Koleksi Biji Kopi Lokal ([DATA CONTOH] terpisah). Statistik di bawah dihitung murni dari koleksi contoh ini tanpa dicampur dengan data API.'
    );
  });

  dom.refreshCatalogBtn.addEventListener('click', () => {
    loadApiCatalog(false);
  });

  dom.simulateErrorBtn.addEventListener('click', () => {
    loadApiCatalog(true);
  });

  dom.retryFetchBtn.addEventListener('click', () => {
    loadApiCatalog(false);
  });

  dom.fallbackSnapshotBtn.addEventListener('click', () => {
    appState.apiProducts = VERIFIED_API_FALLBACK_PRODUCTS;
    recordSuccessfulSyncTimestamp();
    activateDataset(
      VERIFIED_API_FALLBACK_PRODUCTS,
      'api',
      'Menampilkan salinan cadangan terverifikasi dari struktur https://dummyjson.com/products (mode offline).'
    );
  });

  // Modal events
  dom.modalCloseBtn.addEventListener('click', () => {
    closeProductModal();
  });

  dom.productModal.addEventListener('click', event => {
    if (event.target === dom.productModal) {
      closeProductModal();
    }
  });

  dom.modalInquireBtn.addEventListener('click', () => {
    const selected = appState.selectedModalProduct;
    closeProductModal();
    if (selected) {
      dom.inquiryProduct.value = selected.title;
      const inquirySection = document.getElementById('konsultasi');
      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: 'smooth' });
      }
      dom.inquiryName.focus();
    }
  });

  // Validasi dan penyimpanan Form Permintaan Informasi Produk
  dom.inquiryForm.addEventListener('submit', event => {
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
      setFieldError(dom.inquiryName, dom.inquiryNameError, result.errors.name);
      setFieldError(dom.inquiryContact, dom.inquiryContactError, result.errors.contact);
      setFieldError(dom.inquiryProduct, dom.inquiryProductError, result.errors.product);
      setFieldError(dom.inquiryNotes, dom.inquiryNotesError, result.errors.notes);
      return;
    }

    const newRecord = {
      ...result.cleaned,
      createdAt: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const existing = safeGetStorage(API_CONFIG.STORAGE_KEYS.SAVED_INQUIRIES, []);
    const updated = [newRecord, ...(Array.isArray(existing) ? existing : [])].slice(0, 10);
    safeSetStorage(API_CONFIG.STORAGE_KEYS.SAVED_INQUIRIES, updated);
    renderSavedInquiries();

    dom.inquirySuccessBody.textContent =
      'Terima kasih, ' +
      result.cleaned.name +
      '. Permintaan informasi untuk "' +
      result.cleaned.product +
      '" telah dicatat pada penyimpanan lokal perangkat ini (website etalase ini berjalan tanpa server pengiriman pesan belakang).';
    dom.inquirySuccessBanner.classList.remove('hidden');
    dom.inquiryForm.reset();
  });

  dom.resetInquiryBtn.addEventListener('click', () => {
    clearFormErrors();
    dom.inquirySuccessBanner.classList.add('hidden');
  });

  dom.clearInquiriesBtn.addEventListener('click', () => {
    safeSetStorage(API_CONFIG.STORAGE_KEYS.SAVED_INQUIRIES, []);
    renderSavedInquiries();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cacheDomElements();
  updateTimestampDisplay();
  renderSavedInquiries();
  bindEvents();
  loadApiCatalog(false);
});
