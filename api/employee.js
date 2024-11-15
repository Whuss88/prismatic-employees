const express = require("express")
const router = express.Router()
module.exports = router 

router.get("/", (req,res,next) => {
  res.send(`Welcome to the Prismatic Employees API.`)
})