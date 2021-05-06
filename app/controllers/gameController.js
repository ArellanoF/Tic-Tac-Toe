const path = require("path")
const allRooms = require("../models/rooms")
const Room = require("../model/room")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "game.html"))
    },
    post: (req, res) => {
        let roomFrom = req.body.roomFrom
        let roomFor = req.body.roomFor

        allRooms.forEach((room) => {
            if (room.name === roomFor) {
                if (room.users < 2) {
                    room.users++
                    res.status(202)
                    if (room.users === 1) {
                        // Player 1
                        let player = {
                            player: room.users,
                        }
                        res.send(player)
                    }
                    if (room.users === 2) {
                        // Player 2
                        let player = {
                            player: room.users,
                        }
                        res.json(player)
                    }
                    res.end()
                } else {
                    res.status(401)
                    res.end()
                }
            }
            if (room.name === roomFrom) {
                room.users--
            }
        })
        if (roomFor === "home") {
            console.log("va a home")
            res.status(205)
            res.end()
        }
        console.log(allRooms)
    },
}
