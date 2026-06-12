-- =====================================================================
--  db_karyawan.sql
--  Database untuk Modul: CRUD Lengkap dengan Next.js, Prisma ORM & MySQL
-- ---------------------------------------------------------------------
--  Struktur tabel dibuat MENGIKUTI hasil migrasi Prisma (prisma migrate dev)
--  sehingga langsung kompatibel dengan kode pada modul:
--    - Nama tabel huruf besar di depan (Department, Position, Skill, Employee)
--    - Tabel relasi Many-to-Many implisit Prisma: `_EmployeeToSkill`
--    - Tipe String  -> VARCHAR(191)
--    - Tipe DateTime-> DATETIME(3)
--
--  Cara pakai (XAMPP / phpMyAdmin):
--    1. Buka phpMyAdmin
--    2. Tab "Import" -> pilih file ini -> Go
--    3. Database "db_karyawan" beserta tabel & data akan terbentuk otomatis
--    4. Karena tabel sudah ada, kamu TIDAK perlu menjalankan
--       `npx prisma migrate dev` maupun `npx prisma db seed` lagi.
--
--  Catatan Foto:
--    Kolom `photoPath` sudah disediakan sebagai TEMPAT menyimpan path foto
--    (mis. '/uploads/namafile.jpg'). Sesuai permintaan, semua diisi NULL
--    (belum ada foto), tapi kolomnya sudah siap dipakai.
-- =====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- ---------------------------------------------------------------------
--  Buat database
-- ---------------------------------------------------------------------
DROP DATABASE IF EXISTS `db_karyawan`;
CREATE DATABASE `db_karyawan`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `db_karyawan`;


-- =====================================================================
--  STRUKTUR TABEL
-- =====================================================================

-- Tabel 1: Department (induk dari Position)
DROP TABLE IF EXISTS `Department`;
CREATE TABLE `Department` (
  `id`   INTEGER      NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel 2: Position (anak dari Department) -- dipakai untuk Cascading Dropdown
DROP TABLE IF EXISTS `Position`;
CREATE TABLE `Position` (
  `id`           INTEGER      NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(191) NOT NULL,
  `departmentId` INTEGER      NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Position_departmentId_idx` (`departmentId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel 3: Skill (untuk relasi Many-to-Many dengan Employee / Checkbox)
DROP TABLE IF EXISTS `Skill`;
CREATE TABLE `Skill` (
  `id`   INTEGER      NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel 4: Employee (tabel utama)
DROP TABLE IF EXISTS `Employee`;
CREATE TABLE `Employee` (
  `id`         INTEGER      NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(191) NOT NULL,
  `email`      VARCHAR(191) NOT NULL,
  `gender`     VARCHAR(191) NOT NULL,                 -- Radio Button: "male" | "female"
  `status`     VARCHAR(191) NOT NULL,                 -- Dropdown: "active" | "inactive" | "probation"
  `photoPath`  VARCHAR(191) NULL,                     -- File Input: tempat menyimpan path foto
  `positionId` INTEGER      NOT NULL,                 -- Cascading Dropdown (relasi ke Position)
  `createdAt`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Employee_email_key` (`email`),
  INDEX `Employee_positionId_idx` (`positionId`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabel relasi Many-to-Many implisit Prisma: Employee <-> Skill
--   A = Employee.id  |  B = Skill.id  (urutan alfabetis: Employee < Skill)
DROP TABLE IF EXISTS `_EmployeeToSkill`;
CREATE TABLE `_EmployeeToSkill` (
  `A` INTEGER NOT NULL,
  `B` INTEGER NOT NULL,
  UNIQUE INDEX `_EmployeeToSkill_AB_unique` (`A`, `B`),
  INDEX `_EmployeeToSkill_B_index` (`B`)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- =====================================================================
--  FOREIGN KEY (relasi antar tabel)
-- =====================================================================

ALTER TABLE `Position`
  ADD CONSTRAINT `Position_departmentId_fkey`
  FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Employee`
  ADD CONSTRAINT `Employee_positionId_fkey`
  FOREIGN KEY (`positionId`) REFERENCES `Position` (`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `_EmployeeToSkill`
  ADD CONSTRAINT `_EmployeeToSkill_A_fkey`
  FOREIGN KEY (`A`) REFERENCES `Employee` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `_EmployeeToSkill`
  ADD CONSTRAINT `_EmployeeToSkill_B_fkey`
  FOREIGN KEY (`B`) REFERENCES `Skill` (`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;


-- =====================================================================
--  DATA MASTER (sama seperti prisma/seed.ts)
-- =====================================================================

-- Department
INSERT INTO `Department` (`id`, `name`) VALUES
  (1, 'Technology'),
  (2, 'Human Resource');

-- Position (mengikuti Department untuk Cascading Dropdown)
INSERT INTO `Position` (`id`, `name`, `departmentId`) VALUES
  (1, 'Frontend Developer', 1),
  (2, 'Backend Developer',  1),
  (3, 'HR Generalist',      2),
  (4, 'Recruitment Staff',  2);

-- Skill (untuk Checkbox / Many-to-Many)
INSERT INTO `Skill` (`id`, `name`) VALUES
  (1, 'React.js'),
  (2, 'Node.js'),
  (3, 'MySQL'),
  (4, 'UI/UX Design');


-- =====================================================================
--  DATA KARYAWAN (10 orang) -- photoPath sengaja NULL (belum ada foto)
-- =====================================================================
INSERT INTO `Employee`
  (`id`, `name`, `email`, `gender`, `status`, `photoPath`, `positionId`, `createdAt`) VALUES
  (1,  'Budi Santoso',    'budi.santoso@email.com',    'male',   'active',    NULL, 1, '2025-01-02 09:00:00.000'),
  (2,  'Siti Nurhaliza',  'siti.nurhaliza@email.com',  'female', 'active',    NULL, 4, '2025-01-03 09:15:00.000'),
  (3,  'Ahmad Fauzi',     'ahmad.fauzi@email.com',     'male',   'probation', NULL, 2, '2025-01-04 10:30:00.000'),
  (4,  'Dewi Lestari',    'dewi.lestari@email.com',    'female', 'active',    NULL, 3, '2025-01-05 11:00:00.000'),
  (5,  'Rizki Pratama',   'rizki.pratama@email.com',   'male',   'inactive',  NULL, 2, '2025-01-06 08:45:00.000'),
  (6,  'Putri Maharani',  'putri.maharani@email.com',  'female', 'active',    NULL, 1, '2025-01-07 13:20:00.000'),
  (7,  'Eko Prasetyo',    'eko.prasetyo@email.com',    'male',   'active',    NULL, 2, '2025-01-08 14:10:00.000'),
  (8,  'Rina Wati',       'rina.wati@email.com',       'female', 'probation', NULL, 4, '2025-01-09 09:50:00.000'),
  (9,  'Doni Kusuma',     'doni.kusuma@email.com',     'male',   'active',    NULL, 1, '2025-01-10 15:30:00.000'),
  (10, 'Maya Sari',       'maya.sari@email.com',       'female', 'active',    NULL, 3, '2025-01-11 10:05:00.000');


-- =====================================================================
--  RELASI KARYAWAN <-> SKILL  (_EmployeeToSkill)
--    A = id Employee  |  B = id Skill
-- =====================================================================
INSERT INTO `_EmployeeToSkill` (`A`, `B`) VALUES
  (1, 1),  -- Budi      : React.js
  (1, 4),  -- Budi      : UI/UX Design
  (2, 3),  -- Siti      : MySQL
  (3, 2),  -- Ahmad     : Node.js
  (3, 3),  -- Ahmad     : MySQL
  (5, 2),  -- Rizki     : Node.js
  (5, 3),  -- Rizki     : MySQL
  (6, 1),  -- Putri     : React.js
  (6, 4),  -- Putri     : UI/UX Design
  (7, 2),  -- Eko       : Node.js
  (8, 3),  -- Rina      : MySQL
  (9, 1),  -- Doni      : React.js
  (9, 2),  -- Doni      : Node.js
  (9, 4),  -- Doni      : UI/UX Design
  (10, 3); -- Maya      : MySQL
  -- (Dewi / id 4 sengaja tanpa skill, untuk menguji tampilan "-" di tabel)


SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================================
--  SELESAI. Total: 2 Department, 4 Position, 4 Skill, 10 Employee.
-- =====================================================================