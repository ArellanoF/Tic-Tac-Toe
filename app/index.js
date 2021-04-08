const http = require("http")
const fs = require("fs")
const url = require("url")
const util = require("util")
const { StringDecoder } = require("string_decoder")
const formidable = require("formidable")
const User = require("./models/user")
const Game = require("./models/game")
const Room = require("./models/room")

let game = new Game()
var user = new User()
var roomWind = new Room()
var roomFire = new Room()
var roomWater = new Room()
var roomEarth = new Room()

user.setUser("hector", "1111")
roomWind.setRoom("wind", 0)
roomFire.setRoom("fire", 2)
roomWater.setRoom("water", 1)
roomEarth.setRoom("earth", 0)

const allRooms = [roomWind, roomFire, roomWater, roomEarth]

// Create the server
const server = http.createServer((req, res) => {
    // Path
    const path = req.url

    // Routing
    if (req.url === "/login") {
        if (req.method === "POST") {
            let form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err)
                    return
                }

                userLogged = fields.user
                passLogged = fields.password
                if (
                    user.username === userLogged &&
                    user.password === passLogged
                ) {
                    res.writeHead(202)
                } else {
                    res.writeHead(401)
                }
            })
        }
        const index = fs.readFile(
            `${__dirname}/templates/login.html`,
            "utf8",
            (error, data) => {
                if (error) {
                    console.log("Something was wrong!")
                } else {
                    res.end(data)
                }
            }
        )
    } else if (path === "/game") {
        const index = fs.readFile(
            `${__dirname}/templates/game.html`,
            "utf8",
            (error, data) => {
                if (error) {
                    console.log("Something was wrong!")
                } else {
                    res.end(data)
                }
            }
        )
        if (req.method === "POST") {
            let form = new formidable.IncomingForm()
            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err)
                    return
                }

                allRooms.forEach((room) => {
                    if (room.name === fields.roomFor) {
                        if (room.users < 2) {
                            game.setGame(room.users, room.name, null)
                            res.writeHead(202)
                        } else {
                            res.writeHead(401)
                        }
                    }
                })
            })
        }
    } else if (path === "/endgame") {
        res.end("End game")
    } else {
        res.writeHead(404)
        res.end("Page not found!")
    }
})

server.listen(3001, "127.0.0.1", () => {
    console.log("server on!")
})
