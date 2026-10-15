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
