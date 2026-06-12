# HRMS - Manajemen Data Karyawan

HRMS (Human Resource Management System) adalah aplikasi web modern berbasis dashboard untuk mengelola data karyawan. Dibangun menggunakan teknologi terkini (Next.js 14 App Router, TypeScript, Tailwind CSS v4, Prisma, MySQL) dengan antarmuka yang profesional, *clean*, dan *responsive*.

## Fitur Utama

- **Dashboard Analitik**: Ringkasan jumlah karyawan, status aktif/nonaktif, distribusi departemen dan jabatan, serta statistik keahlian.
- **Manajemen Data (CRUD)**: Tambah, edit, dan hapus data karyawan.
- **Pencarian & Filter**: Cari karyawan berdasarkan nama atau email, dan filter berdasarkan status (Aktif, Probation, Nonaktif).
- **Pagination**: Menampilkan data dalam jumlah tertentu per halaman agar lebih rapi dan cepat diakses.
- **Upload Foto Profil**: Mendukung unggah foto profil karyawan saat penambahan atau pengubahan data.
- **Sidebar Interaktif**: Desain sidebar *glassmorphic* yang dapat di-*collapse* dengan tooltip yang responsif.
- **Desain Modern & Responsif**: Menggunakan tema warna *teal* yang konsisten, desain yang memukau (UI/UX), dan optimal untuk perangkat desktop maupun mobile.

## Teknologi yang Digunakan

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & ORM**: MySQL & [Prisma ORM](https://www.prisma.io/)
- **Icon**: [Lucide React](https://lucide.dev/)

## Tangkapan Layar (Screenshots)

### 1. Dashboard
Halaman utama yang menampilkan ringkasan data, struktur perusahaan, dan distribusi status karyawan.
![Dashboard](docs/screenshots/01-dashboard.png)

### 2. Data Karyawan
Tabel daftar karyawan yang rapi dilengkapi fitur pencarian, filter status, dan pagination.
![Data Karyawan](docs/screenshots/02-data-karyawan.png)

### 3. Tambah Karyawan
Form modern untuk menambahkan data karyawan baru lengkap dengan validasi dan upload foto profil.
![Tambah Karyawan](docs/screenshots/03-tambah-karyawan.png)

### 4. Tabel Detail
Tampilan tabel yang memuat foto profil, jabatan, status, serta tombol aksi yang intuitif.
![Tabel Detail](docs/screenshots/04-tabel-detail.png)

## Cara Menjalankan Proyek Secara Lokal

### Prasyarat
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau terbaru)
- MySQL Server (XAMPP/MAMP atau Docker)

### Langkah-langkah

1. **Clone repositori ini** (atau unduh dan ekstrak ke direktori Anda).

2. **Masuk ke direktori proyek:**
   ```bash
   cd manajemen-data-karyawan
   ```

3. **Instal dependensi:**
   ```bash
   npm install
   ```

4. **Konfigurasi Database:**
   - Buat database baru di MySQL (misalnya: `hrms_db`).
   - Buat file `.env` di *root* proyek.
   - Isi `DATABASE_URL` dengan kredensial MySQL Anda:
     ```env
     DATABASE_URL="mysql://username:password@localhost:3306/hrms_db"
     ```

5. **Jalankan Migrasi Prisma:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```

7. **Akses Aplikasi:**
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---
*Dikembangkan untuk keperluan portofolio oleh Muhammad Nafi Azka Soleiman.*
