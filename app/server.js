const express = require("express")
const app = express()
const userController = require("./controllers/userController")
const path = require("path")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Login

app.get("/", userController.get)
app.post("/login", userController.post)

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname + "/templates/", "game.html"))
})

app.listen(3002, () => {
    console.log("Server running on 3002")
})
