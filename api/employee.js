const express = require("express")
const router = express.Router()
const prisma = require("../prisma")

router.use(express.json())

router.get("/", async (req,res,next) => {
  try {
    const employees = await prisma.employee.findMany()
    res.json(employees)
    
  } catch(e) {
    next(e)}
 
})

router.get("/:id", async (req,res,next) => {
  const {id} = req.params 
  try {
    const employee = await prisma.employee.findUnique({ where: { id:parseInt(id)} })
    if (employee) {
      res.json(employee)
    } else {
      res.status(404).send(`Employee with id: ${id} not found`)
    }
  } catch (e){
    next(e)
  }
})
router.post("/", async (req,res,next) => {
  const { name } = req.body
  try {
    const newEmployee = await prisma.employee.create({data: {name} })
    res.status(201).json(newEmployee)
  } catch (e){
    next(e)
  }
})
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("To update an employee, the name is required.");
  }

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(updatedEmployee);
  } catch (e) {
    if (e.code === 'P2025') { 
      res.status(404).send(`Employee with id ${id} not found.`);
    } else {
      next(e);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });
    if (employee) {
      await prisma.employee.delete({ where: { id: parseInt(id) } });
      res.status(204).send(`Employee ${id} deleted`);
    } else {
      res.status(404).send(`Employee with id ${id} not found`);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router