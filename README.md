# Ranum Kopi Nusantara - Etalase Digital Produk & Kebutuhan Seduh

Dokumentasi resmi proyek Penilaian Tengah Semester (PTS) Mata Kuliah **Pemrograman Web (26TJ453127)** Program Studi Teknik Komputer, Fakultas Teknik, Universitas Borneo Tarakan.

> **Catatan Arsitektur Antarmuka:** Sesuai prinsip pengembangan storefront bisnis yang bersih, seluruh informasi akademik (Nama, NIM, perhitungan varian, jawaban penjelasan kode, dan AI Usage Log) ditempatkan secara terpisah di dalam berkas `README.md` dan `AI_USAGE_LOG.md` ini agar tampilan website (`index.html`) tetap murni berfungsi sebagai etalase toko bagi pengunjung.

## 1. Identitas Mahasiswa

| Atribut | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | Rizki Ramadhan |
| **NIM** | 2440304010 |
| **Program Studi** | Teknik Komputer - Fakultas Teknik, Universitas Borneo Tarakan |
| **Mata Kuliah** | Pemrograman Web (`26TJ453127`) - Semester 5 |

## 2. Nama Aplikasi dan Deskripsi Singkat

**Ranum Kopi Nusantara** adalah aplikasi web etalase digital (*front-end storefront*) berbasis HTML5, CSS3, dan Vanilla JavaScript yang dirancang dengan gaya editorial minimalis hangat (*warm cream*, *espresso brown*, dan *deep forest green*). Aplikasi ini memungkinkan pengunjung menjelajahi produk dari REST API secara interaktif, menyaring produk berdasarkan kata kunci, kategori, dan status stok secara bersamaan, melihat ringkasan statistik katalog secara *real-time*, membaca rincian spesifikasi produk pada modal yang aksesibel, serta mencatat permintaan informasi produk dengan validasi *client-side* dan penyimpanan `localStorage`.

## 3. Perhitungan Variasi Soal Berdasarkan NIM (`2440304010`)

Tiga digit terakhir dari NIM **2440304010** adalah **010**:
- **Digit X = 0**
  - **Dataset Wajib**: `Products` (`https://dummyjson.com/products`)
  - **Tema Project**: Dashboard Produk / UMKM (diwujudkan sebagai Etalase Digital Brand Lokal *Ranum*)
- **Digit Y = 1**
  - **Fitur Utama Wajib**: Filter data + statistik sederhana (pencarian kata kunci, filter kategori, filter ketersediaan stok, pengurutan, tombol atur ulang filter, serta kalkulasi dinamis jumlah produk, rata-rata harga, produk harga tertinggi, dan jumlah kategori)
- **Digit Z = 0**
  - **Form & Validasi Tambahan**: Nama minimal 5 karakter (`String(values.name).trim().length >= 5`), dilengkapi validasi kontak, pilihan produk katalog, dan catatan pertanyaan dengan pesan kesalahan spesifik di bawah kolom input
- **Perhitungan Challenge Individual (`C`)**:
  - `S = X + Y + Z = 0 + 1 + 0 = 1`
  - `C = S mod 4 = 1 mod 4 = 1`
  - **Challenge Individual (`C = 1`)**: Tombol **Retry ("Coba Lagi")** ketika `fetch()` gagal + informasi **waktu terakhir data berhasil dimuat** yang dipertahankan di `localStorage` apabila percobaan pemuatan berikutnya gagal.

## 4. Dataset / REST API & Kejujuran Arsitektur Data

- **Endpoint Utama Wajib**: `https://dummyjson.com/products`
- **Penanganan Konflik Domain Secara Jujur**:
  Endpoint `https://dummyjson.com/products` secara bawaan mengembalikan 30 produk lintas kategori umum (*beauty*, *fragrances*, *furniture*, *groceries*). Agar aplikasi tidak memalsukan data (tidak mengganti judul/gambar maskara atau furnitur menjadi biji kopi palsu) dan tidak mencampurkan statistik antar-dataset, kode pada `app.js` menerapkan **pemisahan arsitektur sumber data**:
  1. **Mode Katalog Produk API (`activeSource = 'api'`, Default Aktif)**: Memanggil `fetch('https://dummyjson.com/products')`, menampilkan produk API apa adanya beserta gambar, kategori, stok, dan harga asli, serta menghitung seluruh statistik murni dari dataset API tersebut.
  2. **Mode Koleksi Biji Kopi (`activeSource = 'coffee_sample'`, Berlabel `[DATA CONTOH]`)**: Modul data terpisah (`SAMPLE_COFFEE_COLLECTION`) dengan skema identik untuk mendemonstrasikan bagaimana mesin filter dan statistik yang sama bekerja pada produk biji kopi lokal berlabel contoh (`[DATA CONTOH]`). Saat mode ini dipilih, statistik dihitung murni dari koleksi contoh tersebut.

## 5. Fitur Utama dan Challenge yang Diimplementasikan

1. **Integrasi Fetch API (`async/await`)**: Mengambil data dari `https://dummyjson.com/products` dengan pemeriksaan `response.ok` dan blok `try...catch`.
2. **Filter Kombinasi & Pencarian (`Y = 1`)**: Menyaring produk secara simultan berdasarkan kata kunci pencarian (judul, deskripsi, kategori), pilihan kategori dinamis, status ketersediaan stok (*Tersedia > 10*, *Stok Terbatas 1-10*, *Stok Habis 0*), serta pengurutan harga/nama dan tombol **Atur Ulang Filter**.
3. **Ringkasan Katalog Dinamis (`Y = 1`)**: Menghitung secara *real-time* menggunakan `reduce()`, `filter()`, dan `map()` empat metrik utama: Jumlah Produk Tampil, Rata-rata Harga, Produk Harga Tertinggi, dan Jumlah Kategori, lengkap dengan penanda cakupan (*Seluruh Katalog Aktif* vs *Hasil Penyaringan Aktif*).
4. **Form Permintaan Informasi Produk (`Z = 0`)**: Validasi *client-side* yang memastikan nama lengkap minimal 5 karakter setelah `.trim()`, format email/nomor telepon valid, produk dipilih, dan catatan minimal 10 karakter. Data yang valid disimpan ke `localStorage` dan ditampilkan pada daftar riwayat di halaman.
5. **Loading, Error State, Tombol Coba Lagi & Timestamp (`C = 1`)**: Menampilkan indikator pemuatan saat request berlangsung, menampilkan panel pesan kendala dengan tombol **Coba Lagi** saat gagal, serta menyimpan waktu keberhasilan sinkronisasi terakhir di `localStorage` (`ranum_last_sync_timestamp`) sehingga waktu keberhasilan sebelumnya tetap terlihat meskipun percobaan berikutnya gagal.

## 6. Cara Menjalankan Project

1. Ekstrak folder project `PTS_PEMWEB_2440304010_RIZKI_RAMADHAN`.
2. Buka folder di teks editor (misalnya VS Code) atau jalankan server HTTP statis lokal:
   ```bash
   python3 -m http.server 8080
   ```
3. Buka peramban (Chrome/Firefox/Edge) dan akses `http://localhost:8080` (atau buka berkas `index.html` secara langsung).
4. Untuk menguji **Error State & Tombol Coba Lagi (Challenge C = 1)** dengan cepat saat demonstrasi video, klik tombol **"Uji Gangguan Koneksi"** pada bar status katalog, amati pesan kendala beserta waktu pembaruan terakhir yang tetap terjaga, lalu klik tombol **"Coba Lagi"**.

## 7. Screenshot Desktop dan Mobile

Berkas tangkapan layar tampilan aplikasi pada ukuran Desktop dan Mobile disertakan di dalam folder `screenshots/`:
- **Tampilan Desktop (`1280x800`)**: `screenshots/desktop-view.png`
- **Tampilan Mobile (`390x844`)**: `screenshots/mobile-view.png`

## 8. Endpoint REST API

- **Method**: `GET`
- **URL Endpoint Utama**: `https://dummyjson.com/products`
- **Format Respons**: JSON (`{ "products": [...], "total": 194, "skip": 0, "limit": 30 }`)

## 9. Jawaban 10 Pertanyaan Penjelasan Kode (Komponen 4)

### 1. Alur sejak halaman dibuka sampai data REST API tampil
Saat dokumen HTML selesai dimuat, event listener `DOMContentLoaded` pada `app.js` menjalankan empat langkah berurutan:
1. Memanggil `cacheDomElements()` untuk menyimpan referensi seluruh elemen DOM ke dalam objek `dom`.
2. Memanggil `updateTimestampDisplay()` dan `renderSavedInquiries()` untuk membaca waktu sinkronisasi terakhir serta riwayat formulir dari `localStorage`.
3. Memanggil `bindEvents()` untuk mendaftarkan seluruh event listener pada filter, tombol pencarian, modal, dan formulir.
4. Memanggil fungsi asinkron `loadApiCatalog(false)` yang menampilkan *loading state* melalui `showLoadingState()`, memanggil `await fetchProductsFromApi(API_CONFIG.PRIMARY_ENDPOINT)`, menyimpan waktu sinkronisasi melalui `recordSuccessfulSyncTimestamp()`, lalu memanggil `activateDataset()` yang mengeksekusi `populateCategoryAndProductSelects()`, `renderFeaturedSection()`, dan `renderCatalogAndStats()` untuk merender kartu produk ke `#catalog-grid`.

### 2. Mengapa setelah `fetch()` selesai masih perlu memeriksa `response.ok`?
Pada Fetch API, fungsi `fetch()` hanya akan melempar (*reject*) *Promise* apabila terjadi kegagalan jaringan tingkat rendah (misalnya perangkat terputus dari internet atau kegagalan DNS). Jika server merespons dengan status HTTP error seperti `404 Not Found` atau `500 Internal Server Error`, `fetch()` tetap dianggap berhasil (*resolved*). Oleh karena itu, pada fungsi `fetchProductsFromApi()`, kita wajib memeriksa `if (!response.ok)` dan melempar `new Error('Status HTTP ' + response.status + '...')` agar status HTTP 404/500 masuk ke blok `catch (error)` pada `loadApiCatalog()` dan menampilkan panel Error State beserta tombol **Coba Lagi**, bukan mencoba merender objek JSON yang kosong/rusak.

### 3. Transformasi satu data JSON dari API menjadi elemen DOM yang terlihat
Setiap objek produk di dalam array `payload.products` memiliki properti seperti `id`, `title`, `description`, `category`, `price`, `stock`, `rating`, dan `thumbnail`. Di dalam fungsi `renderCatalogAndStats()`, setiap objek dipetakan menjadi elemen `<article class="product-card">`:
- `product.thumbnail` (atau fallback SVG jika gambar gagal dimuat) dimasukkan ke dalam `<div class="product-media"><img src="..." alt="Foto produk ..."></div>`.
- `product.category` diformat dengan `formatCategoryLabel()` menjadi `<span class="product-category-tag">`.
- `product.stock` dievaluasi oleh `getStockStatusMeta(product.stock)` menjadi badge `<span class="product-stock-tag">` dengan kelas status (`stock-ok`, `stock-low`, atau `stock-out`).
- `product.title` dan `product.description` diisi menggunakan `textContent` ke elemen `<h3 class="product-title">` dan `<p class="product-desc">`.
- `product.price` diformat melalui `formatPriceUSD(product.price)` ke `<span class="product-price">`, disandingkan dengan `<button class="btn btn-secondary">Lihat Detail</button>` yang memanggil `openProductModal(product.id)`.

### 4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500?
Ketiga kondisi tersebut ditangkap oleh blok `try...catch` di dalam fungsi `loadApiCatalog()`:
- Jika internet terputus, `await fetch(customUrl)` langsung melempar `TypeError` (Failed to fetch).
- Jika endpoint salah atau server mengembalikan HTTP 404/500, pemeriksaan `if (!response.ok)` di dalam `fetchProductsFromApi()` melempar `Error('Status HTTP 404...')`.
- Eksekusi kemudian berpindah ke blok `catch (error)` yang memanggil `showErrorState(...)`. Fungsi ini menyembunyikan indikator loading (`#catalog-loading`) dan grid produk (`#catalog-grid`), lalu menampilkan kontainer `#catalog-error` yang berisi penjelasan kendala, menampilkan waktu keberhasilan sinkronisasi sebelumnya dari `localStorage` tanpa menimpanya, serta menyediakan tombol **Coba Lagi** (`#retry-fetch-btn`).

### 5. Cara kerja fitur berdasarkan digit Y (`Y = 1`: Filter data + statistik sederhana)
Setiap kali pengguna mengetik pada `#catalog-search-input` (event `input`), mengubah `#category-filter`, `#availability-filter`, atau `#sort-filter` (event `change`), ataupun menekan `#reset-filter-btn` (event `click`), aplikasi memperbarui objek `appState.filters` lalu memanggil `renderCatalogAndStats()`.
Di dalam `renderCatalogAndStats()`:
1. Fungsi `computeFilteredProducts(dataset, appState.filters)` menyaring array produk menggunakan `Array.prototype.filter()` dengan memeriksa kecocokan kata kunci (`includes`), kesamaan kategori, dan kategori stok dari `getStockStatusMeta()`, kemudian mengurutkan salinan array menggunakan `Array.prototype.sort()`.
2. Fungsi `computeCatalogStatistics(filtered, dataset)` menghitung jumlah item tampil, rata-rata harga (menggunakan `Array.prototype.reduce()`), produk dengan harga tertinggi (menggunakan `Array.prototype.reduce()`), dan jumlah kategori unik (menggunakan `new Set(filteredItems.map(...)).size`), lalu memperbarui elemen `#stat-product-count`, `#stat-average-price`, `#stat-highest-product`, dan `#stat-category-count`.

### 6. Cara kerja validasi berdasarkan digit Z (`Z = 0`: Nama minimal 5 karakter) dan alasan input tidak valid ditolak
Ketika formulir `#product-inquiry-form` dikirim (event `submit`), `event.preventDefault()` menahan pengiriman bawaan browser dan memanggil `validateInquiryForm()`.
- Di dalam `validateInquiryForm()`, nilai input nama dibersihkan dari spasi di awal dan akhir menggunakan `const trimmedName = String(values.name || '').trim()`.
- Jika `trimmedName.length < 5`, properti `errors.name` diisi pesan kesalahan spesifik yang menyebutkan jumlah karakter saat ini, kemudian `setFieldError()` menambahkan atribut `aria-invalid="true"` pada input dan menampilkan pesan teks pada `<p id="inquiry-name-error">`.
- Input yang tidak valid tidak boleh langsung diproses agar penyimpanan `localStorage` tidak dikotori oleh data kosong/spasi semu (seperti `"     "`), mencegah kesalahan pencatatan identitas pelanggan, dan memberikan umpan balik yang jelas tentang bagian mana yang harus diperbaiki.

### 7. Penggunaan `localStorage` pada project
Project ini menggunakan `localStorage` pada dua skenario utama melalui pembungkus aman `safeGetStorage()` dan `safeSetStorage()`:
1. **Waktu Terakhir Sinkronisasi Katalog (`ranum_last_sync_timestamp`)**: Disimpan di dalam `recordSuccessfulSyncTimestamp()` setiap kali `fetchProductsFromApi()` berhasil memuat data, dan dibaca oleh `updateTimestampDisplay()` saat halaman pertama kali dibuka maupun saat terjadi error. Alasan penggunaannya adalah untuk memenuhi kebutuhan Challenge `C = 1`, yaitu mempertahankan informasi waktu pemuatan terakhir yang berhasil meskipun pemuatan berikutnya gagal atau halaman dimuat ulang.
2. **Riwayat Permintaan Informasi Produk (`ranum_saved_inquiries_v1`)**: Disimpan saat formulir `#product-inquiry-form` lolos validasi dan dibaca oleh `renderSavedInquiries()` saat halaman dibuka. Alasan penggunaannya adalah agar pelanggan tetap dapat melihat catatan permintaannya pada perangkat yang sama meskipun aplikasi berjalan tanpa backend server.

### 8. Potongan satu fungsi JavaScript penting (Maksimal 15 baris: Input - Proses - Output)
Berikut adalah potongan fungsi `computeCatalogStatistics()` pada `app.js`:
```javascript
function computeCatalogStatistics(filteredItems, totalDataset) {
  const count = filteredItems.length;
  if (count === 0) return { countText: '0 dari ' + totalDataset.length + ' produk', averagePriceText: '$0.00', highestProductText: 'Tidak ada produk tampil', categoryCountText: '0 kategori' };
  const totalPrice = filteredItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const highestItem = filteredItems.reduce((max, cur) => (Number(cur.price) > Number(max.price) ? cur : max), filteredItems[0]);
  const uniqueCategories = new Set(filteredItems.map(item => item.category));
  return {
    countText: count + ' dari ' + totalDataset.length + ' produk',
    averagePriceText: formatPriceUSD(totalPrice / count),
    highestProductText: highestItem.title + ' (' + formatPriceUSD(highestItem.price) + ')',
    categoryCountText: uniqueCategories.size + ' kategori'
  };
}
```
- **Input**: Menerima dua parameter array, yaitu `filteredItems` (produk hasil penyaringan aktif) dan `totalDataset` (seluruh produk pada koleksi aktif).
- **Proses**: Memeriksa apakah array hasil filter kosong; jika tidak kosong, menjumlahkan seluruh harga dengan `reduce()` untuk mencari rata-rata, membandingkan harga tiap objek dengan `reduce()` untuk menemukan produk termahal, serta mengekstrak kategori unik dengan `map()` dan `Set`.
- **Output**: Mengembalikan objek berisi 4 string terformat (`countText`, `averagePriceText`, `highestProductText`, `categoryCountText`) yang siap dirender ke bar Ringkasan Katalog.

### 9. Bug / Error paling sulit selama pengerjaan PTS, penyebab, cara menemukan, dan solusinya
- **Bug / Masalah**: Ketidaksinkronan antara statistik katalog dan tampilan kartu produk ketika pengguna mengetik pencarian cepat dari bilah pencarian di Header (`#header-search-input`), lalu mengubah dropdown kategori di bagian Katalog (`#category-filter`). Selain itu, pada kondisi jaringan terputus, pemanggilan ulang `fetch()` sempat berisiko mengosongkan teks waktu pembaruan terakhir.
- **Penyebab**: Pada rancangan awal, input pencarian di header dan input pencarian di bar katalog belum membaca satu sumber state yang sama (`appState.filters.searchQuery`), dan pembaruan teks timestamp dipanggil sebelum memeriksa apakah `fetch()` berhasil.
- **Cara Menemukan**: Ditemukan saat menguji skenario kombinasi filter (mengetik kata kunci di header lalu memilih kategori di katalog) dan menguji simulasi kegagalan endpoint (`Uji Gangguan Koneksi`) menggunakan Developer Tools Console & Network.
- **Cara Memperbaiki**: Menyatukan seluruh nilai filter ke dalam satu objek state terpusat `appState.filters`, menyinkronkan nilai `dom.headerSearchInput.value` dan `dom.catalogSearchInput.value` pada kedua event listener, serta memastikan `recordSuccessfulSyncTimestamp()` hanya dipanggil di dalam blok `try` tepat setelah `await fetchProductsFromApi()` berhasil mengembalikan array produk.

### 10. Dua perbaikan teknis jika diberi waktu satu minggu lagi beserta alasannya
1. **Implementasi *Pagination* & *URL Query Parameter Sync* (`URLSearchParams`)**: Menyinkronkan status pencarian, kategori, dan ketersediaan stok ke URL browser (misalnya `?category=groceries&stock=IN_STOCK`) sehingga pengunjung dapat membagikan tautan katalog yang sudah terfilter kepada orang lain dan menggunakan tombol *Back/Forward* browser tanpa kehilangan posisi filter.
2. **Pengujian Otomatis Unit & Aksesibilitas (*Automated Testing Suite*)**: Menambahkan pengujian unit otomatis untuk fungsi murni (`computeFilteredProducts`, `computeCatalogStatistics`, `validateInquiryForm`) serta pengujian navigasi fokus keyboard (*focus trap* pada modal dan kontras warna otomatis) agar setiap perubahan kode di masa depan terjamin tidak merusak fungsi yang sudah berjalan.

## 10. AI Usage Log

Sesuai Kebijakan Penggunaan AI pada bagian I dokumen PTS, berikut adalah catatan transparan penggunaan AI selama pengembangan beserta proses verifikasi dan modifikasi yang dilakukan:

| Tanggal | AI / Tool | Tujuan | Prompt / Ringkasan | Bagian Digunakan | Verifikasi / Modifikasi Mahasiswa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 Okt 2026 | Gemini | Audit struktur respons API & perencanaan arsitektur | Memeriksa struktur properti JSON dari `https://dummyjson.com/products` dan merancang pemisahan arsitektur antara data live API dan data contoh toko kopi | Perancangan objek `API_CONFIG` dan struktur state di `app.js` | Memverifikasi langsung properti `products`, `price`, `stock`, dan `category` pada respons JSON serta memastikan data API asli tidak dimanipulasi menjadi produk fiktif. |
| 15 Okt 2026 | Gemini | Penyusunan tata letak CSS Grid responsif & palet warna editorial | Menyusun sistem variabel CSS (`--bg-cream`, `--text-espresso`, `--brand-forest`) dan breakpoint responsif desktop (`>=1024px`), tablet (`~768px`), dan mobile (`<=480px`) | Kerangka dasar variabel dan media queries pada `styles.css` | Menguji langsung tampilan pada ukuran layar 1280px, 768px, dan 390px, memastikan tidak ada *horizontal scrolling*, serta memverifikasi rasio kontras teks memenuhi standar WCAG AA. |
| 16 Okt 2026 | Gemini | Referensi implementasi fungsi statistik (`reduce`) & validasi form (`trim`) | Menyusun fungsi kalkulasi rata-rata harga & produk termahal menggunakan `Array.prototype.reduce()` serta validasi panjang karakter nama minimal 5 karakter setelah `.trim()` | Fungsi `computeCatalogStatistics()` dan `validateInquiryForm()` pada `app.js` | Menguji berbagai kasus batas (*edge cases*) seperti hasil filter 0 produk (agar tidak terjadi pembagian dengan nol `NaN`) dan input nama berisi spasi `"   ab   "` agar ditolak secara akurat. |
