# Series Film Favorite

## Deskripsi
Website sederhana untuk menampilkan koleksi series film favorit, menyaring series berdasarkan kategori, dan memvalidasi formulir menggunakan JavaScript DOM.

## Penggunaan AI
AI digunakan sebagai bantuan untuk memahami konsep JavaScript DOM, event delegation, rendering daftar, dan validasi formulir, serta untuk membantu menemukan kesalahan kode.

Saya menguji halaman melalui browser dan menyesuaikan kode dengan proyek saya sendiri.

# PABW P11 — Series Film Favorite

## Deskripsi
Series Film Favorite adalah aplikasi web sederhana untuk menampilkan dan mengelola daftar series. Aplikasi mengambil data dari file JSON, menyediakan filter kategori, fitur favorit, serta formulir untuk menambahkan series.

## Fitur
- Memuat daftar series dari file JSON menggunakan `fetch`.
- Memfilter series berdasarkan kategori.
- Menambahkan dan menghapus favorit.
- Menyimpan kategori aktif dan favorit menggunakan `localStorage`.
- Menangani data penyimpanan yang rusak atau menggunakan versi lama.
- Menambahkan series melalui formulir dengan validasi rating 0–10.
- Menampilkan keadaan pemuatan dan pesan ketika data gagal dimuat atau hasil kosong.

## Struktur Modul JavaScript
- `app.js`: mengatur proses awal aplikasi.
- `api.js`: mengambil data series dari JSON.
- `data.js`: menyimpan data profil dan fungsi pengolahan data.
- `state.js`: mengelola state aplikasi.
- `dom.js`: mengatur tampilan halaman.
- `events.js`: menangani interaksi pengguna.
- `storage.js`: menyimpan dan membaca state dari `localStorage`.

## Penyimpanan
Aplikasi menggunakan key `pabw-p11` dengan versi data `2`. Data yang disimpan adalah kategori aktif dan daftar ID favorit.

## Pengujian
Fitur pemuatan JSON, filter kategori, favorit, penyimpanan setelah halaman dimuat ulang, reset, validasi formulir, serta penanganan data penyimpanan rusak dan versi lama telah diuji.

## Penggunaan AI
AI digunakan sebagai alat bantu untuk memahami konsep, menyusun dan memperbaiki kode, serta menguji fungsi aplikasi. Kode akhir diperiksa dan diuji kembali oleh mahasiswa.
