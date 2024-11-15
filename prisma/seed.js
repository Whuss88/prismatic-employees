const prisma = require("./index")

const seed = async() => {
  const employees = [];
  for (let i = 0; i < 10; i++) {
    employees.push({ name: `Employee ${i + 1}`});
  }
  await prisma.employee.createMany({data: employees})
}

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1)
  })