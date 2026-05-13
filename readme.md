# 🛡️ FakeShield Frontend

> **Platform Deteksi Berita Hoaks Berbasis AI (Natural Language Processing)**

FakeShield adalah aplikasi web modern yang dirancang untuk membantu masyarakat memverifikasi kebenaran informasi. Menggunakan teknologi **AI (Deep Learning)**, platform ini menganalisis karakteristik teks untuk memberikan skor keyakinan apakah sebuah berita tergolong hoaks atau valid.

---

## ✨ Fitur Utama

- **🔍 Deteksi Real-time**: Masukkan teks berita dan dapatkan hasil analisis dalam hitungan detik.
- **📊 Visualisasi Word Attention**: Lihat kata-kata mana yang paling memengaruhi keputusan AI dalam mendeteksi hoaks.
- **📈 Dashboard Statistik**: Pantau tren penyebaran hoaks secara global dan kategori distribusi hasil pemeriksaan.
- **🕒 Riwayat Pemeriksaan**: Simpan dan akses kembali hasil pemeriksaan Anda kapan saja.
- **📰 Berita Terkini**: Integrasi dengan NewsAPI untuk menyajikan berita terbaru yang sedang hangat.
- **📱 Responsive Design**: Tampilan yang optimal di perangkat desktop maupun mobile.

---

## 🚀 Tech Stack

Frontend ini dibangun dengan teknologi modern untuk performa dan pengalaman pengguna yang maksimal:

- **Core**: [React.js 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context API (untuk Autentikasi)
- **Icons**: SVG based icons

---

## 🛠️ Persiapan Lingkungan

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Instalasi
1. Clone repositori ini:
   ```bash
   git clone <repository-url>
   ```
2. Masuk ke direktori project:
   ```bash
   cd fakeshield-frontend
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```

### Konfigurasi Environment
Buat file `.env` di root direktori `fakeshield-frontend` dan tambahkan variabel berikut:
```env
VITE_API_URL=http://localhost:5000
```
*Sesuaikan URL dengan alamat backend Express Anda.*

---

## 🏃 Memulai Pengembangan

Jalankan server pengembangan lokal:
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`.

### Perintah Lainnya
- `npm run build`: Membangun aplikasi untuk produksi (output di folder `dist`).
- `npm run lint`: Menjalankan linter untuk mengecek kualitas kode.
- `npm run preview`: Melihat hasil build produksi secara lokal.

---

## 📁 Struktur Proyek

```text
fakeshield-frontend/
├── public/              # Aset publik (favicon, dll)
├── src/
│   ├── api/             # Konfigurasi Axios & interceptor
│   ├── assets/          # Gambar dan file statis
│   ├── components/      # Komponen UI reusable (Navbar, StatCard, dll)
│   ├── context/         # AuthContext untuk manajemen session
│   ├── hooks/           # Custom React Hooks
│   ├── pages/           # Komponen Halaman (Dashboard, History, Result, Auth)
│   ├── utils/           # Helper functions & formatters
│   ├── App.jsx          # Root routing & layout
│   └── main.jsx         # Entry point aplikasi
├── .env                 # Variabel lingkungan (API URL)
├── tailwind.config.js   # Konfigurasi Tailwind CSS
└── vite.config.js       # Konfigurasi Vite
```

---

## 📡 Panduan Integrasi API (Developer Guide)

Frontend berkomunikasi dengan Backend (Express.js) melalui REST API. Berikut adalah rute-rute utama yang digunakan:

### 🔐 Autentikasi (`/api/auth`)
- `POST /login`: Mendapatkan JWT Token.
- `POST /register`: Pendaftaran user baru.
- `GET /me`: Verifikasi status login & ambil profil user.

### 🔍 Deteksi & Riwayat (`/api/checks` & `/api/history`)
- `POST /api/checks`: Kirim teks untuk dianalisis.
- `GET /api/checks/:id`: Ambil detail hasil analisis spesifik.
- `GET /api/history`: Ambil daftar riwayat pemeriksaan (mendukung pagination).

### 📊 Statistik (`/api/stats`, `/api/trends`, `/api/categories`)
- `GET /api/stats`: Mengambil angka total checks, total hoaks, dan akurasi model.
- `GET /api/trends`: Data grafik tren hoaks per hari (7 hari terakhir).
- `GET /api/categories`: Distribusi hasil pemeriksaan berdasarkan tingkat keyakinan.

---

## 🚨 Catatan Penting
- **Token Security**: Token JWT disimpan di `localStorage` dengan key `fs_token`.
- **Response Format**: Frontend mengharapkan response dalam format objek yang dibungkus properti `data` (misal: `res.data.data`).
- **Error Handling**: Setiap error dari backend wajib mengirimkan field `message` untuk ditampilkan di UI.

---

## 👥 Tim Pengembang (CC26-PSU184)
- **Wahyu Alamsyah** - Frontend Developer
- **Ezhar Mahesa** - Frontend Developer
- **Maulana Dzaky** - AI/ML Engineer

---
© 2026 FakeShield. Dibuat dengan ❤️ untuk Indonesia yang lebih cerdas informasi.
