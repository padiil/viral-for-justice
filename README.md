# Viral for Justice

Viral for Justice adalah sebuah platform online yang dirancang untuk menjadi wadah bagi siapa saja yang ingin berbagi pengalaman atau kisah tentang ketidakadilan yang mereka alami atau saksikan.

## Tujuan Proyek
- **Meningkatkan kesadaran publik**: Dengan menyediakan platform bagi orang-orang untuk berbagi cerita, diharapkan dapat meningkatkan kesadaran masyarakat akan berbagai bentuk ketidakadilan yang terjadi.
- **Memberikan dukungan**: Platform ini diharapkan dapat menjadi tempat bagi korban ketidakadilan untuk saling mendukung dan merasa tidak sendirian.
- **Mendorong perubahan**: Dengan menyuarakan ketidakadilan, diharapkan dapat mendorong adanya perubahan dan perbaikan sistem yang lebih adil.

## Fitur Utama
- **Pembuatan postingan**: Pengguna dapat membuat postingan dengan teks, gambar, atau video untuk berbagi cerita.
- **Kategori**: Postingan dapat dikelompokkan ke dalam berbagai kategori seperti diskriminasi, korupsi, atau pelanggaran HAM.
- **Komentar dan interaksi**: Pengguna dapat memberikan komentar, memberikan dukungan, atau membagikan postingan.
- **Fitur pencarian**: Pengguna dapat mencari postingan berdasarkan kata kunci atau kategori.

## Teknologi yang Digunakan
- **Frontend**: Vue.js (untuk tampilan depan) dan Tailwind CSS (untuk styling).
- **Backend**: Node.js (untuk menjalankan server) dan Express.js (untuk membuat API).
- **Database**: MongoDB (untuk menyimpan data).

## Struktur Proyek

```
/
├── .gitignore
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── src/
│   ├── client/
│   │   ├── components/
│   │   │   ├── Home.vue
│   │   │   ├── Navbar.vue
│   │   │   └── ...
│   │   ├── assets/
│   │   │   └── ...
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── ...
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── ...
│   ├── server/
│   │   ├── main.js
│   │   ├── models/
│   │   │   ├── user.schema.js
│   │   │   ├── category.schema.js
│   │   │   ├── comment.schema.js
│   │   │   └── ...
│   │   ├── routes/
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── node_modules/
│   └── ...
├── dist/
│   └── ...
└── ...
```

## Cara Menjalankan Proyek

1. Clone repository ini:
   ```bash
   git clone <repository-url>
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd viral-for-justice
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
5. Buka aplikasi di browser:
   ```
   http://localhost:3000
   ```

## Kontribusi
Kami menyambut kontribusi dari siapa pun yang ingin membantu mengembangkan platform ini. Silakan buat pull request atau laporkan masalah di bagian [Issues](https://github.com/username/repository/issues).

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

