"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

// Fungsi helper untuk menyimpan file upload
async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Buat nama unik agar tidak bentrok
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.name);
  const filename = `${uniqueSuffix}${ext}`;
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, filename);

  // Pastikan direktori ada
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Abaikan jika folder sudah ada
  }

  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function createEmployee(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const gender = formData.get("gender") as string;
  const status = formData.get("status") as string;
  const positionId = Number(formData.get("positionId"));
  const skillIds = formData.getAll("skills").map(id => Number(id));
  const photo = formData.get("photo") as File | null;

  // Validasi Email Unik
  const existingEmail = await prisma.employee.findUnique({ where: { email } });
  if (existingEmail) {
    throw new Error("Email sudah terdaftar. Silakan gunakan email lain.");
  }

  let photoPath = null;
  if (photo && photo.size > 0) {
    photoPath = await saveFile(photo);
  }

  await prisma.employee.create({
    data: {
      name,
      email,
      gender,
      status,
      positionId,
      photoPath,
      skills: {
        connect: skillIds.map(id => ({ id }))
      }
    }
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function updateEmployee(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const gender = formData.get("gender") as string;
  const status = formData.get("status") as string;
  const positionId = Number(formData.get("positionId"));
  const skillIds = formData.getAll("skills").map(skillId => Number(skillId));
  const photo = formData.get("photo") as File | null;

  // Cek jika email dipakai oleh karyawan lain
  const existingEmail = await prisma.employee.findUnique({ where: { email } });
  if (existingEmail && existingEmail.id !== id) {
    throw new Error("Email sudah digunakan oleh karyawan lain.");
  }

  const oldEmployee = await prisma.employee.findUnique({ where: { id } });

  let photoPath = oldEmployee?.photoPath; // Gunakan foto lama sebagai default

  // Jika ada foto baru yang di-upload
  if (photo && photo.size > 0) {
    photoPath = await saveFile(photo);
    
    // (Opsional) Hapus foto lama untuk menghemat storage
    if (oldEmployee?.photoPath) {
      try {
        const oldPath = path.join(process.cwd(), "public", oldEmployee.photoPath);
        await fs.unlink(oldPath);
      } catch (err) {
        console.error("Gagal menghapus foto lama:", err);
      }
    }
  }

  await prisma.employee.update({
    where: { id },
    data: {
      name,
      email,
      gender,
      status,
      positionId,
      photoPath,
      skills: {
        set: [], // Clear relasi lama
        connect: skillIds.map(skillId => ({ id: skillId })) // Hubungkan yang baru
      }
    }
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployee(id: number) {
  const employee = await prisma.employee.findUnique({ where: { id } });

  if (employee?.photoPath) {
    try {
      const oldPath = path.join(process.cwd(), "public", employee.photoPath);
      await fs.unlink(oldPath);
    } catch (err) {
      console.error("Gagal menghapus foto:", err);
    }
  }

  await prisma.employee.delete({
    where: { id }
  });
  
  revalidatePath("/employees");
}
