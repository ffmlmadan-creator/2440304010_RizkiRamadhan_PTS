# AI Usage Log - PTS Pemrograman Web (26TJ453127)

- **Nama Mahasiswa**: Rizki Ramadhan
- **NIM**: 2440304010
- **Nama Aplikasi**: Ranum Kopi Nusantara

| Tanggal | AI / Tool | Tujuan | Prompt / Ringkasan | Bagian Digunakan | Verifikasi / Modifikasi Mahasiswa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 14 Okt 2026 | Gemini | Audit struktur respons API & perencanaan arsitektur | Memeriksa struktur properti JSON dari `https://dummyjson.com/products` dan merancang pemisahan arsitektur antara data live API dan data contoh toko kopi | Perancangan objek `API_CONFIG` dan struktur state di `app.js` | Memverifikasi langsung properti `products`, `price`, `stock`, dan `category` pada respons JSON serta memastikan data API asli tidak dimanipulasi menjadi produk fiktif. |
| 15 Okt 2026 | Gemini | Penyusunan tata letak CSS Grid responsif & palet warna editorial | Menyusun sistem variabel CSS (`--bg-cream`, `--text-espresso`, `--brand-forest`) dan breakpoint responsif desktop (`>=1024px`), tablet (`~768px`), dan mobile (`<=480px`) | Kerangka dasar variabel dan media queries pada `styles.css` | Menguji langsung tampilan pada ukuran layar 1280px, 768px, dan 390px, memastikan tidak ada *horizontal scrolling*, serta memverifikasi rasio kontras teks memenuhi standar WCAG AA. |
| 16 Okt 2026 | Gemini | Referensi implementasi fungsi statistik (`reduce`) & validasi form (`trim`) | Menyusun fungsi kalkulasi rata-rata harga & produk termahal menggunakan `Array.prototype.reduce()` serta validasi panjang karakter nama minimal 5 karakter setelah `.trim()` | Fungsi `computeCatalogStatistics()` dan `validateInquiryForm()` pada `app.js` | Menguji berbagai kasus batas (*edge cases*) seperti hasil filter 0 produk (agar tidak terjadi pembagian dengan nol `NaN`) dan input nama berisi spasi `"   ab   "` agar ditolak secara akurat. |
