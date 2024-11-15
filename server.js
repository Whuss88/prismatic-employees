const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json())
app.use((req,res,next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})



app.use("/employees", require("./api/employee"))

app.get("/", (req,res,next) => {
  res.send(`Welcome to the Prismatic Employees API.`)
})

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})