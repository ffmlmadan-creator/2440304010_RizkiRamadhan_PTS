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

// Fungsi utilitas penyimpanan aman ke localStorage
function safeGetStorage(key, fallbackValue = null) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (err) {
    return fallbackValue;
  }
}

function safeSetStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Abaikan jika browser membatasi akses localStorage pada mode privat
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
