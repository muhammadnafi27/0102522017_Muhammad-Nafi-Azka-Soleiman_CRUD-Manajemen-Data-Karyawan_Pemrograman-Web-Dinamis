export interface EmployeeFormData {
  name: string;
  email: string;
  gender: string;
  status: string;
  positionId: number;
  skillIds: number[];
  photo: File | null;
}

export function validateEmployeeData(formData: FormData): EmployeeFormData {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const gender = formData.get("gender")?.toString();
  const status = formData.get("status")?.toString();
  const positionIdRaw = formData.get("positionId");
  const skillIdsRaw = formData.getAll("skills");
  const photo = formData.get("photo") as File | null;

  if (!name) {
    throw new Error("Nama lengkap wajib diisi.");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Format email tidak valid.");
  }

  if (gender !== "male" && gender !== "female") {
    throw new Error("Jenis kelamin harus dipilih.");
  }

  if (status !== "active" && status !== "probation" && status !== "inactive") {
    throw new Error("Status karyawan tidak valid.");
  }

  const positionId = Number(positionIdRaw);
  if (!positionId || isNaN(positionId)) {
    throw new Error("Posisi wajib dipilih.");
  }

  const skillIds = skillIdsRaw.map(id => Number(id)).filter(id => !isNaN(id));

  return {
    name,
    email,
    gender,
    status,
    positionId,
    skillIds,
    photo: photo && photo.size > 0 ? photo : null
  };
}
