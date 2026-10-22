# Ranum — Dashboard Etalase Produk UMKM

Proyek Mini Front-End Individual untuk memenuhi Penilaian Tengah Semester (PTS) Mata Kuliah **Pemrograman Web (26TJ453127)** Semester 5, Program Studi Teknik Komputer, Fakultas Teknik, Universitas Borneo Tarakan (2026).

---

## 1. Identitas Mahasiswa

* **Nama Lengkap:** Rizki Ramadhan
* **NIM:** 2440304010
* **Program Studi / Kelas:** Teknik Komputer — Universitas Borneo Tarakan
* **Mata Kuliah:** Pemrograman Web (`26TJ453127`)

---

## 2. Nama Aplikasi dan Deskripsi Singkat

**Ranum** adalah aplikasi web *Interactive Data Dashboard* yang dirancang sebagai etalase digital dan pusat katalog produk UMKM yang melayani pengiriman dari Tarakan, Kalimantan Utara. 

Aplikasi ini memuat data produk secara *real-time* dari REST API publik **DummyJSON**, menyajikan kurasi produk unggulan (*Top Rated*), menyediakan fitur pencarian, penyaringan berlapis (kategori dan status stok), pengurutan, kalkulasi statistik harga otomatis, rincian spesifikasi produk melalui modal dialog, serta formulir konsultasi/pemesanan produk dengan validasi *client-side* dan penyimpanan riwayat lokal berbasis `localStorage`.

---

## 3. Perhitungan Variasi Soal Berdasarkan NIM

Berdasarkan ketentuan soal, variasi proyek ditentukan dari **3 digit terakhir NIM** (`2440304010` $\rightarrow$ **`010`**):

* **Digit $X = 0$** $\rightarrow$ **Dataset: Products** | **Tema: Dashboard Produk/UMKM**
* **Digit $Y = 1$** $\rightarrow$ **Fitur Utama: Filter data + statistik sederhana**
* **Digit $Z = 0$** $\rightarrow$ **Validasi Form Tambahan: Nama minimal 5 karakter**
* **Perhitungan Challenge Individual ($C$):**
  $$S = X + Y + Z = 0 + 1 + 0 = 1$$
  $$C = S \bmod 4 = 1 \bmod 4 = 1$$
* **Hasil $C = 1$** $\rightarrow$ **Challenge Individual: Tombol Retry ketika Fetch gagal + waktu terakhir data berhasil dimuat**

| Komponen | Nilai Digit | Ketentuan Soal | Implementasi pada Ranum |
| :--- | :---: | :--- | :--- |
| **Dataset ($X$)** | `0` | Products (Dashboard Produk/UMKM) | Katalog produk dari `https://dummyjson.com/products` |
| **Fitur Utama ($Y$)** | `1` | Filter data + statistik sederhana | Filter kata kunci, kategori, status stok, sorting, serta 4 metrik statistik otomatis |
| **Validasi Form ($Z$)** | `0` | Nama minimal 5 karakter | Validasi input nama $\ge 5$ karakter setelah `.trim()`, ditambah validasi email/WA, produk, dan catatan |
| **Challenge ($C$)** | `1` | Tombol Retry saat Fetch gagal + timestamp | Tombol "Coba Lagi" saat error/offline + badge waktu pembaruan terakhir (WITA) tersimpan di `localStorage` |

---

## 4. Dataset / API yang Digunakan

Aplikasi ini menggunakan dataset **Products** dari REST API publik **DummyJSON**. Setiap objek produk mentah dari API dinormalisasi melalui fungsi `normalizeProduct(raw)` agar memiliki struktur properti yang aman dan konsisten (`id`, `title`, `description`, `category`, `price`, `discountPercentage`, `rating`, `stock`, `brand`, `sku`, `thumbnail`, dan `images`). Selain itu, slug kategori bahasa Inggris diterjemahkan ke dalam label Bahasa Indonesia melalui kamus `CATEGORY_LABELS`.

---

## 5. Fitur Utama dan Challenge

### A. Fitur Utama (Digit $Y = 1$: Filter Data & Statistik Sederhana)
1. **Filter Multi-Kriteria & Pencarian Real-Time:**
   * Pencarian teks langsung (*real-time input*) berdasarkan nama produk, deskripsi, merek, maupun kategori (tersinkronisasi antara kolom pencarian di Header dan di Katalog).
   * Filter dropdown **Kategori** yang dibuat secara dinamis beserta jumlah produk per kategori.
   * Filter dropdown **Ketersediaan Stok**: Semua Status Stok, Tersedia (`stok > 10`), Stok Terbatas (`1 - 10`), dan Stok Habis (`0`).
   * Pengurutan data (**Sorting**): Urutan Bawaan API, Harga Rendah ke Tinggi, Harga Tinggi ke Rendah, Rating Tertinggi, dan Nama Produk A ke Z.
2. **Panel Statistik Katalog Otomatis ("Sekilas Katalog Kami"):**
   Dihitung secara dinamis menggunakan JavaScript mengikuti hasil filter yang sedang aktif:
   * **Rata-rata Harga** dari produk yang tampil.
   * **Produk Termahal** beserta nominal harganya.
   * **Jumlah Produk Tampil** dibandingkan dengan total seluruh produk di katalog.
   * **Jumlah Kategori Unik** yang terdapat pada hasil filter saat ini.
3. **Kurasi Produk Pilihan (Top Rated) & Modal Detail Produk:**
   * Menampilkan 3 produk dengan rating tertinggi pada bagian "Rekomendasi Spesial".
   * Menampilkan dialog modal spesifikasi lengkap produk (`<dialog>`) dengan tombol pintas "Tanyakan Produk Ini" yang langsung memilih produk tersebut pada formulir konsultasi.

### B. Formulir & Validasi Client-Side (Digit $Z = 0$)
* **Validasi Nama Lengkap (Wajib & Minimal 5 Karakter):** Memastikan input nama yang telah dibersihkan spasinya (`.trim()`) memiliki panjang minimal 5 karakter.
* **Validasi Kontak (Email / Nomor WhatsApp Indonesia):** Memvalidasi format email menggunakan RegEx atau format nomor WhatsApp Indonesia (`08...` atau `+628...`).
* **Validasi Pilihan Produk & Catatan:** Memastikan produk dipilih dari daftar katalog dan catatan berisi antara 10 hingga 500 karakter.
* **Aksesibilitas Pesan Kesalahan & Riwayat Lokal:** Menampilkan pesan kesalahan tekstual yang spesifik di bawah setiap kolom input (`aria-invalid="true"`), ringkasan error di atas form, indikator jumlah karakter langsung (*live hint*), banner konfirmasi berhasil, serta menyimpan 10 riwayat pertanyaan terakhir di `localStorage`.

### C. Challenge Individual ($C = 1$: Tombol Retry & Timestamp)
* **Penanganan Gagal Muat & Tombol Retry:** Jika `fetch()` gagal karena koneksi terputus, melewati batas waktu (*timeout* 10 detik), atau server merespons status HTTP error (selain `2xx`), aplikasi menampilkan banner peringatan error beserta tombol **"Coba Lagi" (`#retry-btn`)** dan tombol **"Segarkan Katalog" (`#refresh-data-btn`)** untuk memicu pemuatan ulang tanpa harus me-*refresh* halaman browser.
* **Waktu Terakhir Data Berhasil Dimuat (Timestamp):** Setiap kali data berhasil diambil dari API, waktu keberhasilan dicatat dalam format zona waktu lokal **`Asia/Makassar` (WITA)** (contoh: `21 Okt 2026, 23:16 WITA`) dan disimpan ke `localStorage` (`ranum_last_success_at_v1`), sehingga tetap dapat ditampilkan sebagai informasi acuan meskipun pemuatan berikutnya gagal.

---

## 6. Cara Menjalankan Project

Proyek ini dibuat murni dengan HTML5, CSS3, dan Vanilla JavaScript tanpa proses *build* atau instalasi paket eksternal:

1. **Ekstrak / Clone Repository:**
   ```bash
   git clone <URL_REPOSITORY_GITHUB_ANDA>
   cd <NAMA_FOLDER_PROJECT>
   ```
2. **Menjalankan Secara Normal:**
   * Buka file `index.html` langsung menggunakan browser modern (Google Chrome, Microsoft Edge, atau Mozilla Firefox), **atau**
   * Jalankan menggunakan ekstensi **Live Server** di VS Code (klik kanan `index.html` $\rightarrow$ *Open with Live Server*).
3. **Cara Menguji Simulasi Fetch Gagal & Tombol Retry (Challenge $C = 1$):**
   * Tambahkan parameter `?simulasi=gagal` pada URL di browser, contoh: `index.html?simulasi=gagal`.
   * Pada pemuatan pertama, aplikasi akan sengaja memanggil endpoint simulasi HTTP 503 (`https://dummyjson.com/http/503`) sehingga **Error State** tampil.
   * Klik tombol **"Coba Lagi"**, maka aplikasi akan mengambil data dari endpoint normal (`https://dummyjson.com/products`) dan katalog berhasil dimuat.

---

## 7. Screenshot Tampilan Desktop, Tablet, dan Mobile

> *Catatan: File gambar screenshot juga disertakan langsung di dalam folder project dan sudah disesuaikan dengan tampilan desktop, tablet, serta mobile.*

* **Tampilan Desktop ($\ge 1024\text{px}$):**
  ![Screenshot Desktop](screenshots/tampilan%20dekstop.png)
* **Tampilan Tablet ($\ge 768\text{px}$ dan $\le 1023\text{px}$):**
  ![Screenshot Tablet](screenshots/tampilan%20tablet.png)
* **Tampilan Mobile ($\le 480\text{px}$):**
  ![Screenshot Mobile](screenshots/tampilan%20mobile.png)

---

## 8. Endpoint REST API

1. **Endpoint Utama (Dataset Products):**
   ```http
   GET [https://dummyjson.com/products](https://dummyjson.com/products)
   ```
   *Digunakan untuk mengambil daftar produk utama beserta atribut harga, kategori, stok, rating, deskripsi, merek, SKU, dan gambar.*
2. **Endpoint Simulasi Gangguan Server (Khusus Pengujian Tombol Retry):**
   ```http
   GET [https://dummyjson.com/http/503](https://dummyjson.com/http/503)
   ```
   *Hanya dipanggil satu kali apabila URL memiliki query parameter `?simulasi=gagal` untuk mendemonstrasikan Error State dan fungsi tombol Retry.*

---

## 9. Jawaban 10 Pertanyaan Penjelasan Kode

### 1. Jelaskan alur sejak halaman dibuka sampai data REST API tampil. Sebutkan nama fungsi pada project Anda.
1. Saat dokumen HTML selesai dimuat, event listener `DOMContentLoaded` dijalankan.
2. Fungsi `cacheDomElements()` dipanggil untuk menyimpan referensi seluruh elemen DOM ke dalam objek `dom`, dilanjutkan `readStoredTimestamp()` untuk membaca waktu keberhasilan terakhir dari `localStorage`, `bindEvents()` untuk memasang seluruh *event listener*, `renderSavedInquiries()` untuk menampilkan riwayat konsultasi, dan `updateFieldHints()`.
3. Selanjutnya fungsi asinkron `loadProducts()` dipanggil. Fungsi ini mengubah status aplikasi menjadi `'loading'` melalui `setUiState('loading')` yang menampilkan *loading spinner* serta 6 kartu kerangka (*skeleton cards*) lewat `renderNoDataState(true)`.
4. `loadProducts()` memanggil `fetchProducts(url)` yang mengeksekusi `fetch()` ke `https://dummyjson.com/products`, memeriksa `response.ok`, mengurai JSON dengan `response.json()`, dan memetakan setiap item melalui `normalizeProduct()`.
5. Setelah data produk diterima, `loadProducts()` memperbarui `appState.products` dan `appState.lastSuccessAt`, menyimpan timestamp ke `localStorage` via `safeSetStorage()`, lalu memanggil `populateCategoryFilter()`, `populateProductSelect()`, `renderFeaturedSection()`, `setUiState('success')`, dan `renderCatalogAndStats()` untuk merender seluruh kartu produk beserta statistiknya ke layar.

### 2. Mengapa setelah `fetch()` selesai Anda masih perlu memeriksa `response.ok`? Jelaskan dengan kasus pada aplikasi Anda.
Promise dari `fetch()` **hanya akan mengalami *reject* (masuk ke `catch`) apabila terjadi kegagalan tingkat jaringan** (seperti perangkat *offline*, DNS gagal, atau dihentikan oleh `AbortController`). Jika server berhasil dihubungi tetapi mengembalikan kode status HTTP error seperti `404 Not Found` atau `503 Service Unavailable`, `fetch()` tetap menganggap permintaan tersebut berhasil (*resolved*).

Pada aplikasi Ranum (di dalam fungsi `fetchProducts`), ketika mode simulasi gagal (`?simulasi=gagal`) dijalankan dan memanggil `https://dummyjson.com/http/503`, server merespons dengan HTTP 503. Tanpa pemeriksaan `if (!response.ok)`, kode akan lanjut mengeksekusi `response.json()` pada respons error dan gagal menampilkan pesan status HTTP yang tepat. Dengan memeriksa `if (!response.ok)`, aplikasi dapat melempar error (`throw new Error(...)`) secara eksplisit sehingga ditangkap oleh blok `catch` di `loadProducts()` dan menampilkan pesan *"Server merespons dengan status HTTP 503..."* beserta tombol Retry.

### 3. Pilih satu data JSON dari API dan jelaskan bagaimana data tersebut diubah menjadi elemen DOM yang terlihat.
Contoh satu objek produk dari array `products` pada JSON DummyJSON:
```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara...",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 10.48,
  "rating": 2.56,
  "stock": 99,
  "brand": "Essence",
  "thumbnail": "[https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp](https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp)"
}
```
Proses transformasinya menjadi elemen DOM:
1. Objek mentah dinormalisasi oleh `normalizeProduct(raw)` untuk memastikan tipe datanya aman (misalnya `Number(raw.price)`).
2. Di dalam `renderCatalogAndStats()`, setiap objek produk dikirim ke fungsi `createProductCard(product)`.
3. `createProductCard(product)` membuat elemen `<article class="product-card">` menggunakan fungsi bantu `createEl()` (yang membungkus `document.createElement` dan mengisi `textContent` agar aman dari XSS).
4. Gambar dibuat melalui `createProductImage(product)` (`<img>` dengan `src` dari `product.thumbnail` dan fallback SVG otomatis jika gambar gagal dimuat), label kategori `"beauty"` diubah menjadi `"Kecantikan"` oleh `formatCategoryLabel()`, status stok `99` diubah menjadi badge `"Stok 99"` oleh `getStockStatusMeta()`, dan harga `9.99` diformat menjadi `"$9.99"` oleh `formatPrice()`.
5. Seluruh kartu dimasukkan ke dalam `DocumentFragment` lalu dipasang sekaligus ke `#catalog-grid` menggunakan `dom.catalogGrid.replaceChildren(fragment)`.

### 4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500? Jelaskan penanganannya.
Seluruh kondisi kegagalan tersebut ditangani secara terpusat di dalam blok `try...catch...finally` pada fungsi `loadProducts()` dan diklasifikasikan oleh fungsi `describeFetchError(error)`:
* **Internet terputus / Offline:** `fetch()` melempar `TypeError`. Fungsi `describeFetchError()` memeriksa `!navigator.onLine` dan menghasilkan pesan *"Perangkat sedang offline. Periksa koneksi internet Anda, lalu tekan 'Coba Lagi'."*
* **Koneksi lambat / Timeout:** `AbortController` membatalkan request setelah 10 detik (`FETCH_TIMEOUT_MS = 10000`), menghasilkan `AbortError` dengan pesan batas waktu terlampaui.
* **Endpoint salah atau HTTP 404/500/503:** Kondisi `if (!response.ok)` di `fetchProducts()` melempar `Error` berisi kode status HTTP dari server.
* **Dampak pada UI:** `setUiState('error')` dipanggil untuk menyembunyikan indikator loading, menampilkan banner `#error-state` (`role="alert"`) yang berisi pesan penyebab error, menampilkan informasi kapan terakhir kali data berhasil dimuat (`buildLastSuccessSentence()`), serta menyediakan tombol **Coba Lagi (`#retry-btn`)**. Jika sebelumnya data sudah pernah termuat di sesi tersebut, katalog lama tetap dipertahankan di layar agar pengguna tidak kehilangan tampilan.

### 5. Jelaskan bagaimana fitur berdasarkan digit Y bekerja. Cantumkan nama fungsi/event yang digunakan.
Untuk digit $Y = 1$ (**Filter data + statistik sederhana**):
* **Event Listener:** Dipasang pada `bindEvents()`, yaitu event `'input'` pada `#catalog-search-input`, event `'change'` pada dropdown `#category-filter`, `#availability-filter`, dan `#sort-filter`, serta event `'click'` pada tombol `#reset-filter-btn`.
* **Alur Filter (`applyFilters` $\rightarrow$ `renderCatalogAndStats` $\rightarrow$ `computeFilteredProducts`):**
  Setiap kali pengguna mengetik atau mengubah dropdown, `applyFilters(partialFilters)` memperbarui objek `appState.filters` lalu memanggil `renderCatalogAndStats()`. Di dalamnya, `computeFilteredProducts(products, filters)` menyaring array `appState.products` menggunakan `.filter()` berdasarkan kecocokan kata kunci (`matchesQuery`), kategori (`matchesCategory`), dan kode stok (`matchesAvailability`), lalu mengurutkan hasilnya menggunakan `.sort()` sesuai fungsi pembanding di objek `SORTERS`.
* **Alur Statistik (`computeCatalogStatistics` & `renderStatistics`):**
  Array hasil filter dikirim ke `computeCatalogStatistics(filtered, products.length)`. Fungsi ini menggunakan `.reduce()` untuk menjumlahkan harga guna menghitung rata-rata (`averagePrice`) dan mencari objek produk dengan harga tertinggi (`mostExpensive`), serta menggunakan `new Set(items.map(...)).size` untuk menghitung jumlah kategori unik (`categoryCount`). Hasilnya ditampilkan ke DOM oleh fungsi `renderStatistics()`.

### 6. Jelaskan bagaimana validasi berdasarkan digit Z bekerja dan mengapa input tidak valid tidak boleh langsung diproses.
Untuk digit $Z = 0$ (**Nama minimal 5 karakter**):
* **Cara Kerja Validasi:** Saat pengguna melakukan *blur* (keluar dari kolom input) atau menekan tombol kirim (`submit` $\rightarrow$ `handleInquirySubmit`), fungsi `validateInquiryForm()` memanggil validator pada objek `FIELD_VALIDATORS`. Pada `FIELD_VALIDATORS.name(value)`, nilai input dibersihkan dulu spasinya menggunakan `value.trim()`. Jika kosong, fungsi mengembalikan pesan wajib diisi; jika panjang `trimmed.length < 5` (`MIN_NAME_LENGTH`), fungsi mengembalikan pesan bahwa nama minimal 5 karakter beserta jumlah karakter saat ini. Jika terdapat field yang tidak valid (`!result.isValid`), fungsi `setFieldError()` memberi atribut `aria-invalid="true"` pada input dan menampilkan teks error di elemen `<p class="field-error">`, lalu fokus keyboard diarahkan otomatis ke kolom pertama yang salah.
* **Mengapa Input Tidak Valid Tidak Boleh Langsung Diproses:**
  1. **Menjaga Integritas & Kualitas Data:** Mencegah masuknya data kosong (misalnya hanya berisi spasi `"     "`), nama singkatan yang tidak jelas, atau nomor kontak palsu ke dalam riwayat penyimpanan (`localStorage`) maupun sistem pemesanan UMKM.
  2. **Mencegah Kegagalan Proses Bisnis:** Jika data kontak atau pilihan produk salah/kosong, tim layanan pelanggan tidak akan bisa menghubungi pelanggan kembali.
  3. **Keamanan & Keandalan Aplikasi:** Memastikan data yang diolah oleh fungsi selanjutnya sudah bersih (`cleaned`) dan sesuai batasan panjang karakter yang diharapkan.

### 7. Jika project Anda menggunakan `localStorage`, jelaskan data apa yang disimpan, kapan data dibaca/diubah, dan alasan penggunaannya.
Aplikasi Ranum menggunakan `localStorage` melalui fungsi pembungkus `safeGetStorage()` dan `safeSetStorage()` (yang juga dilengkapi cadangan objek di memori `memoryStorageFallback` jika browser memblokir akses storage) untuk menyimpan **dua jenis data**:
1. **Waktu Terakhir Data Berhasil Dimuat (`ranum_last_success_at_v1`):**
   * **Data yang disimpan:** String tanggal format ISO (`Date.toISOString()`) dari waktu terakhir `fetchProducts()` berhasil.
   * **Kapan dibaca/diubah:** Dibaca satu kali saat aplikasi diinisialisasi (`DOMContentLoaded` $\rightarrow$ `readStoredTimestamp()`) dan diperbarui setiap kali `loadProducts()` berhasil mengambil data dari API.
   * **Alasan penggunaan:** Memenuhi kebutuhan Challenge $C = 1$ agar ketika pengguna membuka kembali aplikasi dalam kondisi *offline* atau API sedang gangguan, pengguna tetap mengetahui kapan terakhir kali katalog berhasil diperbarui di perangkat tersebut.
2. **Riwayat Pertanyaan Konsultasi Produk (`ranum_saved_inquiries_v1`):**
   * **Data yang disimpan:** Array berisi maksimal 10 objek pertanyaan terakhir (`name`, `contact`, `productId`, `productTitle`, `purpose`, `notes`, `createdAt`).
   * **Kapan dibaca/diubah:** Dibaca saat halaman dimuat (`renderSavedInquiries()`), ditambahkan ketika formulir konsultasi lolos validasi di `handleInquirySubmit()`, dan dihapus ketika pengguna menekan tombol `#clear-inquiries-btn`.
   * **Alasan penggunaan:** Karena aplikasi berjalan di sisi *client* tanpa *backend database* khusus untuk form, `localStorage` memungkinkan pengguna melihat kembali catatan pertanyaan yang pernah mereka kirimkan meskipun halaman telah di-*refresh*.

### 8. Pilih satu fungsi JavaScript penting, lampirkan potongan maksimal 15 baris, lalu jelaskan input – proses – output.
Berikut adalah fungsi `computeCatalogStatistics(items, totalCount)` (13 baris) pada `app.js`:

```javascript
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
```
* **Input:** Menerima 2 parameter, yaitu `items` (array objek produk hasil filter saat ini) dan `totalCount` (angka jumlah total seluruh produk dari API).
* **Proses:**
  1. Memeriksa jumlah elemen (`count`). Jika `0` (filter tidak menemukan produk), langsung mengembalikan objek nilai default `0` dan `null` agar tidak terjadi pembagian dengan nol (`0 / 0 = NaN`).
  2. Menghitung total seluruh harga produk menggunakan `items.reduce(...)`, kemudian dibagi dengan `count` untuk memperoleh rata-rata harga.
  3. Mencari satu objek produk dengan nilai `price` paling tinggi menggunakan `items.reduce(...)`.
  4. Mengekstrak seluruh nama kategori dengan `items.map(...)` lalu memasukkannya ke dalam objek `Set` untuk menghitung jumlah kategori unik tanpa duplikasi (`.size`).
* **Output:** Mengembalikan sebuah objek statistik `{ count, totalCount, averagePrice, mostExpensive, categoryCount }` yang siap ditampilkan ke panel statistik oleh fungsi `renderStatistics()`.

### 9. Sebutkan bug/error paling sulit selama PTS, penyebabnya, cara menemukannya, dan cara memperbaikinya.
* **Bug/Error yang Dihadapi:** Saat menguji fitur tombol **Bersihkan Formulir (`type="reset"`)** pada form konsultasi, indikator penghitung karakter langsung (*live character hint* seperti `Terisi: 0/5`) tidak kembali ke `0`, melainkan masih menampilkan jumlah karakter sebelum tombol reset ditekan. Selain itu, ketika pengguna mengklik kartu di bagian produk pilihan, event klik terkadang mengenai elemen anak (`<span>` atau teks di dalam tombol) sehingga atribut `data-product-id` bernilai `undefined`.
* **Penyebabnya:**
  1. Event `'reset'` pada elemen `<form>` dieksekusi oleh browser **sebelum** nilai-nilai input di dalam form benar-benar dikosongkan oleh browser, sehingga ketika `updateFieldHints()` langsung dipanggil di dalam handler `'reset'`, nilai `dom.inquiryName.value` masih berisi teks lama.
  2. Pada event delegation, penggunaan `event.target.dataset.productId` hanya membaca elemen persis yang diklik, bukan elemen `<button>` pembungkusnya.
* **Cara Menemukannya:** Menggunakan *Developer Tools Console* dan memasang `console.log(dom.inquiryName.value)` di dalam event listener `reset` serta memeriksa `event.target` saat mengklik tombol detail produk.
* **Cara Memperbaikinya:**
  1. Menunda pemanggilan `updateFieldHints()` menggunakan `setTimeout(updateFieldHints, 0)` di dalam event listener `'reset'` agar fungsi dijalankan setelah siklus pengosongan form oleh browser selesai.
  2. Menggunakan metode `event.target.closest('[data-product-id]')` pada fungsi `handleDetailButtonClick()` agar penelusuran DOM selalu menemukan elemen tombol terdekat yang memiliki atribut `data-product-id`.

### 10. Jika diberi satu minggu lagi, sebutkan dua perbaikan teknis yang akan Anda lakukan dan alasannya.
1. **Menambahkan Fitur *Debounce* pada Pencarian & Sinkronisasi Filter ke URL Query Parameters (`URLSearchParams`):**
   * *Alasan:* Saat ini pencarian memfilter 30 produk secara instan pada setiap ketikan (`input` event). Jika dataset berkembang menjadi ribuan produk UMKM, penambahan *debounce* (misalnya jeda 250ms) akan mencegah *render* DOM berulang yang membebani performa. Selain itu, menyimpan state filter aktif ke URL (contoh: `?kategori=groceries&sort=PRICE_ASC`) akan memudahkan pelanggan membagikan tautan katalog yang sudah terfilter kepada orang lain.
2. **Menambahkan Galeri Multi-Gambar (*Image Carousel/Thumbnails*) pada Modal Detail Produk & Paginasi Katalog:**
   * *Alasan:* Data API DummyJSON menyediakan array `images` yang berisi beberapa sudut foto produk, namun saat ini modal hanya menampilkan gambar pertama (`product.images[0]`). Menambahkan pemilih *thumbnail* di dalam modal akan meningkatkan pengalaman pengguna (*UX*) saat memeriksa detail barang sebelum berkonsultasi.

---

## 10. AI Usage Log

Sesuai dengan kebijakan akademik penggunaan AI pada PTS Pemrograman Web, berikut adalah catatan transparan penggunaan AI selama pengerjaan proyek:

| Tanggal | AI / Tool | Tujuan | Prompt / Ringkasan | Bagian Digunakan | Verifikasi / Modifikasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 Okt 2026 | Gemini | Brainstorming konsep visual dan struktur state aplikasi | Diskusi arsitektur state terpusat untuk dashboard katalog produk dengan filter, statistik, dan error state | Struktur objek `appState` dan pemisahan bagian komentar pada `app.js` | Memodifikasi properti state agar sesuai dengan varian NIM `010` ($X=0, Y=1, Z=0, C=1$) dan menguji alur transisi state secara manual |
| 15 Okt 2026 | Gemini | Konsultasi RegEx validasi nomor WhatsApp Indonesia & format zona waktu WITA | Cara memvalidasi nomor telepon awalan `08` / `+628` dan penggunaan `Intl.DateTimeFormat` untuk zona waktu `Asia/Makassar` | Konstanta `PHONE_REGEX` dan fungsi `formatTimestampWITA()` di `app.js` | Menguji berbagai kombinasi input nomor WA/email pada form serta memverifikasi output jam WITA di browser |
| 16 Okt 2026 | Gemini | Review kode akhir dan penyusunan struktur dokumentasi README | Memeriksa kelengkapan kode terhadap rubrik soal PTS dan merapikan format dokumentasi `README.md` | Struktur penulisan dokumen `README.md` | Memastikan seluruh nama fungsi, variabel, dan alur penjelasan kode sesuai 100% dengan implementasi asli pada `app.js`, `index.html`, dan `styles.css` |