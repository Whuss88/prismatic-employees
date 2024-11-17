const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json())
app.use((req,res,next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})


app.get("/", (req,res,next) => {
  res.send(`Welcome to the Prismatic Employees API.`)
})

app.use("/employees", require("./api/employee"))

app.use((req,res,next) => {
  next({
    status: 404,
    message: `The endpoint ${req.method} ${req.originalUrl} doesn't exist.`
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status ?? 500)
  res.send(err.message ?? "Sorry! Something went wrong :[")
})


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})