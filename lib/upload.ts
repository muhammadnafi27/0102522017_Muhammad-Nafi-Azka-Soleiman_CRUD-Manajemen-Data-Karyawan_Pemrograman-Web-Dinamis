import { promises as fs } from "fs";
import path from "path";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function savePhoto(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran foto maksimal adalah 2MB.");
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("Format file harus JPG, PNG, atau WEBP.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.name);
  const filename = `${uniqueSuffix}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Abaikan jika sudah ada
  }

  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function deletePhoto(photoPath: string): Promise<void> {
  try {
    const oldPath = path.join(process.cwd(), "public", photoPath);
    await fs.unlink(oldPath);
  } catch (err) {
    console.error("Gagal menghapus foto lama:", err);
  }
}
