"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { savePhoto, deletePhoto } from "@/lib/upload";
import { validateEmployeeData } from "@/lib/employee-validation";

export async function createEmployee(formData: FormData) {
  const data = validateEmployeeData(formData);

  // Validasi Email Unik
  const existingEmail = await prisma.employee.findUnique({ where: { email: data.email } });
  if (existingEmail) {
    throw new Error("Email sudah terdaftar. Silakan gunakan email lain.");
  }

  let photoPath = null;
  if (data.photo) {
    photoPath = await savePhoto(data.photo);
  }

  await prisma.employee.create({
    data: {
      name: data.name,
      email: data.email,
      gender: data.gender,
      status: data.status,
      positionId: data.positionId,
      photoPath,
      skills: {
        connect: data.skillIds.map(id => ({ id }))
      }
    }
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function updateEmployee(id: number, formData: FormData) {
  const data = validateEmployeeData(formData);

  // Cek email duplikat
  const existingEmail = await prisma.employee.findUnique({ where: { email: data.email } });
  if (existingEmail && existingEmail.id !== id) {
    throw new Error("Email sudah digunakan oleh karyawan lain.");
  }

  const oldEmployee = await prisma.employee.findUnique({ where: { id } });
  let photoPath = oldEmployee?.photoPath;

  // Jika ada foto baru
  if (data.photo) {
    photoPath = await savePhoto(data.photo);
    if (oldEmployee?.photoPath) {
      await deletePhoto(oldEmployee.photoPath);
    }
  }

  await prisma.employee.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      gender: data.gender,
      status: data.status,
      positionId: data.positionId,
      photoPath,
      skills: {
        set: [], 
        connect: data.skillIds.map(skillId => ({ id: skillId })) 
      }
    }
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployeeAction(id: number) {
  const employee = await prisma.employee.findUnique({ where: { id } });

  if (employee?.photoPath) {
    await deletePhoto(employee.photoPath);
  }

  await prisma.employee.delete({
    where: { id }
  });
  
  revalidatePath("/employees");
}
