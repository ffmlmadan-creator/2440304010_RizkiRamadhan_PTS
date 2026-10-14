# DESIGN.md: Arah Visual Etalase Biji Kopi Lokal

## 1. Identitas & Karakter Brand
- **Konteks Produk**: Etalase digital brand biji kopi lokal untuk eksplorasi produk dan pengalaman berbelanja seduh rumahan maupun kedai.
- **Kepribadian & Mood**: Minimalis, modern, editorial, dan hangat. Tampilan dirancang layaknya toko kopi lokal sungguhan dengan katalog yang tertata rapi, bukan dashboard admin, laporan penjualan, atau halaman tugas akademik.
- **Nama Brand**: Menunggu konfirmasi pemilik produk dari kandidat yang diusulkan (gunakan penanda `[LOGO]` atau wordmark pilihan setelah dikonfirmasi).

## 2. Palet Warna (Maksimal 3 Warna Inti + Netral)
- **Latar Utama (Warm Cream / Ivory)**: `#F7F3EB` (permukaan halaman utama) dan `#EFE9DC` (sekunder/pembatas halus).
- **Teks & Aksen Struktur (Espresso Brown)**: `#231710` (teks utama, kontras tinggi di atas warm cream) dan `#5C4332` (teks sekunder/metadata).
- **Warna Identitas & Aksen Utama (Deep Forest Green)**: `#1E3F2B` (CTA utama, status aktif, aksen fokus; teks putih `#FFFFFF` di atas `#1E3F2B` memenuhi standar kontras WCAG AA > 10:1).
- **Permukaan Kartu Produk (Putih / Netral Bersih)**: `#FFFFFF` dengan garis batas halus `#DED6C6`.

## 3. Tipografi
- **Heading (Kuat & Editorial)**: Serif bergaya editorial (*Fraunces* atau *Playfair Display*, fallback `Georgia, serif`) untuk judul utama dan nama bagian guna memberi karakter kemasan kopi artisan lokal.
- **Body & Informasi Produk (Nyaman Dibaca)**: Sans-serif bersih (*Plus Jakarta Sans* atau *DM Sans*, fallback `system-ui, sans-serif`) untuk deskripsi, filter, harga, dan spesifikasi agar mudah dipindai.
- **Aturan Skala & Spasi**: Ukuran teks, tinggi baris, dan jarak antarelemen konsisten tanpa penggunaan huruf kapital berjarak lebar berlebihan.

## 4. Layout, Komposisi & Hierarki
- **Header**: Ringkas di bagian atas berisi wordmark brand, kolom pencarian, dan navigasi ke bagian yang benar-benar ada di halaman.
- **Hero Banner**: Lebar penuh dengan komposisi dua kolom seimbang pada desktop (headline pemasaran, deskripsi singkat, dan CTA di satu sisi; visual produk dominan di sisi lain).
- **Bagian Produk Pilihan & Katalog**: Dilengkapi filter kategori, filter ketersediaan stok, pencarian, serta ringkasan katalog yang menyatu secara natural di bar informasi katalog (bukan kartu metrik raksasa ala dashboard).
- **Grid Produk**: Teratur dan lapang (3 kolom pada desktop `>= 1024px`, 2 kolom pada tablet `~768px`, 1 kolom pada mobile `<= 480px`), rasio foto konsisten, informasi harga dan stok mudah dipindai.
- **Batasan Teknik Visual**: Tanpa gradient latar, tanpa glassmorphism, tanpa bayangan tebal yang membuat seluruh komponen melayang, tanpa sudut pill (`border-radius: 999px`) di seluruh elemen, dan tanpa animasi dekoratif berlebihan.

## 5. Liveliness Dials & Design Read
- **Design Read**: Reading this as: Specialty coffee e-commerce storefront for home brewers and local coffee buyers, in a warm minimalist editorial style, dial `ENERGY 2 / RHYTHM 2 / MOTION 1`.
- **Dial**: `ENERGY 2 / RHYTHM 2 / MOTION 1`
  - **ENERGY 2 (Balanced)**: Hangat dan berkarakter melalui kontras tipografi serif editorial dan warna *deep forest green* di atas *warm cream*.
  - **RHYTHM 2 (Consistent with breaks)**: Variasi komposisi antara hero asimetris, bagian kurasi produk pilihan, grid katalog terstruktur, dan bagian konsultasi/kontak produk.
  - **MOTION 1 (Calm)**: Transisi fokus dan hover halus yang fungsional tanpa efek gerak berlebihan.
