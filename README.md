# HRMS - Manajemen Data Karyawan

Aplikasi **HRMS (Human Resource Management System)** adalah proyek aplikasi web dinamis berbasis *dashboard* yang dirancang untuk mengelola data karyawan perusahaan secara terpusat, efisien, dan modern. 

Proyek ini dibangun untuk memenuhi kriteria pengembangan aplikasi web modern dengan mengimplementasikan konsep *Server-Side Rendering* (SSR), *Client-Side Interactivity*, serta manipulasi database relasional menggunakan ekosistem **Next.js**.

## 🌟 Fitur Unggulan

Proyek ini tidak hanya sekadar menampilkan data, tetapi mengimplementasikan logika *Dynamic Web Programming* yang kompleks, di antaranya:

- **Dashboard Analitik Dinamis**: Menampilkan statistik *real-time* mengenai total karyawan, tingkat keaktifan, distribusi departemen, dan keterampilan dominan yang dimiliki karyawan.
- **Operasi CRUD Terintegrasi (Create, Read, Update, Delete)**: Manajemen data karyawan secara utuh, mendukung relasi database (Jabatan, Departemen, dan Keahlian/Skills).
- **Pencarian, Filter, & Pagination Berbasis URL**: Implementasi pencarian *real-time* (berdasarkan nama/email) dan filter status (Aktif, Probation, Nonaktif) yang disinkronkan dengan *Query Parameters* URL untuk mendukung *shareability*.
- **Upload & Preview Foto Profil Lokal**: Form karyawan dilengkapi validasi ukuran file (Maks. 2MB) dan format ekstensi, serta *live-preview* foto menggunakan `URL.createObjectURL` sebelum data dikirimkan ke server.
- **Server Actions untuk Keamanan Data**: Form *submission* tidak melalui API Routes tradisional, melainkan menggunakan fitur *Server Actions* dari Next.js App Router agar eksekusi logika form (*upload file*, *database query*) dilakukan langsung dan aman di sisi server.
- **Antarmuka Modern (Glassmorphism & Responsive)**: Desain UI/UX kelas atas dengan palet warna *Teal*, animasi mikro, *collapsible sidebar* (bisa dilipat/dibuka), dan sepenuhnya dioptimalkan untuk akses dari perangkat desktop maupun mobile.

## 🛠 Teknologi yang Digunakan

Aplikasi ini menggunakan pendekatan *Full-Stack* dengan spesifikasi teknis berikut:

- **Frontend & Backend Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) (Strict Typing)
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **ORM (Object-Relational Mapping)**: [Prisma ORM](https://www.prisma.io/)
- **Relational Database**: MySQL
- **Ikon**: [Lucide React](https://lucide.dev/)

## 📸 Tangkapan Layar (Screenshots)

### 1. Dashboard Analitik
Halaman utama yang memberikan wawasan cepat (*birds-eye view*) mengenai metrik penting sumber daya manusia di perusahaan.
![Dashboard](docs/screenshots/01-dashboard.png)

### 2. Daftar Karyawan (Data Table)
Tabel data dinamis yang dilengkapi dengan fitur *Search*, *Filter* Status, *Pagination*, dan desain data tabular yang bersih dan ergonomis.
![Data Karyawan](docs/screenshots/02-data-karyawan.png)

### 3. Form Tambah/Edit Karyawan
Formulir *multi-input* interaktif yang menangani relasi data (pilihan dropdown jabatan bergantung pada departemen) dan pratinjau foto profil secara *real-time*.
![Tambah Karyawan](docs/screenshots/03-tambah-karyawan.png)

### 4. Detail Tabel Aksi
*Close-up* dari tabel data yang memuat *Badge* Status warna-warni, *Pill* Keahlian (Skills), serta tombol navigasi aksi yang intuitif.
![Tabel Detail](docs/screenshots/04-tabel-detail.png)

## 🚀 Cara Menjalankan Proyek Secara Lokal

### Prasyarat Instalasi
Pastikan komputer Anda sudah terinstal:
- [Node.js](https://nodejs.org/) (Minimal v18.x)
- Server Database MySQL (dapat menggunakan XAMPP, MAMP, atau Docker)

### Langkah-langkah Menjalankan

1. **Unduh atau Clone Repositori Ini**
   Buka terminal, lalu masuk ke folder proyek hasil unduhan Anda:
   ```bash
   cd manajemen-data-karyawan
   ```

2. **Instalasi Dependensi Node Modules**
   ```bash
   npm install
   ```

3. **Konfigurasi Database MySQL**
   - Buat database kosong di MySQL Anda (misalnya: `hrms_db`).
   - Buat file bernama `.env` di dalam folder *root* proyek ini.
   - Tambahkan *Connection String* MySQL Anda ke dalam file `.env`:
     ```env
     DATABASE_URL="mysql://username:password@localhost:3306/hrms_db"
     ```
     *(Silakan sesuaikan `username`, `password`, dan nama database `hrms_db` dengan kredensial milik Anda).*

4. **Jalankan Migrasi Skema Prisma**
   Perintah ini akan secara otomatis membuat struktur tabel yang diperlukan langsung di dalam database MySQL Anda.
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

6. **Akses Aplikasi Melalui Browser**
   Buka URL berikut di browser Anda: [http://localhost:3000](http://localhost:3000)

---
**Muhammad Nafi Azka Soleiman**  
**Nomor Induk Mahasiswa (NIM) : 0102522017**  
**IF22A**  
**Tugas Pemrograman Web Dinamis**
