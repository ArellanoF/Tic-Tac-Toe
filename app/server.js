const express = require("express")
const app = express()
const path = require("path")

// Controllers
const userController = require("./controllers/userController")
const gameController = require("./controllers/gameController")

// Express utilities
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "/public/css"))
app.use("/js", express.static(__dirname + "/public/js"))

// Login
app.get("/", userController.get)
app.get("/login", userController.get)
app.post("/login", userController.post)

// Game
app.get("/game", gameController.get)
app.post("/game", gameController.post)

// End games
app.get("/end-game")

// Server listening
app.listen(3002, () => {
    console.log("Server running on 3002")
})
