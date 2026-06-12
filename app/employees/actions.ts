"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEmployee(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const gender = formData.get("gender") as string;
  const status = formData.get("status") as string;
  const positionId = Number(formData.get("positionId"));
  const skillIds = formData.getAll("skills").map(id => Number(id));

  await prisma.employee.create({
    data: {
      name,
      email,
      gender,
      status,
      positionId,
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

  // Update data + update many-to-many relationship
  await prisma.employee.update({
    where: { id },
    data: {
      name,
      email,
      gender,
      status,
      positionId,
      skills: {
        set: [], // Clear existing
        connect: skillIds.map(skillId => ({ id: skillId }))
      }
    }
  });

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployee(id: number) {
  await prisma.employee.delete({
    where: { id }
  });
  
  revalidatePath("/employees");
}
