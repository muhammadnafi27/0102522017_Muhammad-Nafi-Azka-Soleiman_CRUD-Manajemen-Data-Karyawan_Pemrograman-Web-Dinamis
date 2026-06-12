import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai proses seeding database...')

  // 1. Seed Departments menggunakan upsert agar aman dijalankan berulang kali
  const deptTech = await prisma.department.upsert({
    where: { id: 1 },
    update: { name: 'Technology' },
    create: { id: 1, name: 'Technology' },
  })

  const deptHR = await prisma.department.upsert({
    where: { id: 2 },
    update: { name: 'Human Resource' },
    create: { id: 2, name: 'Human Resource' },
  })

  const deptFinance = await prisma.department.upsert({
    where: { id: 3 },
    update: { name: 'Finance' },
    create: { id: 3, name: 'Finance' },
  })

  const deptMarketing = await prisma.department.upsert({
    where: { id: 4 },
    update: { name: 'Marketing' },
    create: { id: 4, name: 'Marketing' },
  })

  console.log('✅ Departments berhasil di-seed')

  // 2. Seed Positions (dengan relasi ke Department yang sudah dibuat)
  const positions = [
    { id: 1, name: 'Frontend Developer', departmentId: deptTech.id },
    { id: 2, name: 'Backend Developer', departmentId: deptTech.id },
    { id: 3, name: 'DevOps Engineer', departmentId: deptTech.id },
    { id: 4, name: 'HR Manager', departmentId: deptHR.id },
    { id: 5, name: 'Recruitment Specialist', departmentId: deptHR.id },
    { id: 6, name: 'Financial Analyst', departmentId: deptFinance.id },
    { id: 7, name: 'Accountant', departmentId: deptFinance.id },
    { id: 8, name: 'Marketing Manager', departmentId: deptMarketing.id },
    { id: 9, name: 'Social Media Specialist', departmentId: deptMarketing.id },
  ]

  for (const pos of positions) {
    await prisma.position.upsert({
      where: { id: pos.id },
      update: { name: pos.name, departmentId: pos.departmentId },
      create: pos,
    })
  }

  console.log('✅ Positions berhasil di-seed')

  // 3. Seed Skills
  const skillsData = [
    { id: 1, name: 'React.js' },
    { id: 2, name: 'Next.js' },
    { id: 3, name: 'Node.js' },
    { id: 4, name: 'Prisma' },
    { id: 5, name: 'MySQL' },
    { id: 6, name: 'UI/UX Design' },
    { id: 7, name: 'TypeScript' },
  ]

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: { name: skill.name },
      create: skill,
    })
  }

  console.log('✅ Skills berhasil di-seed')
  console.log('🎉 Seeding selesai!')
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
