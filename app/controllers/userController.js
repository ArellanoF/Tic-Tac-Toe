const path = require("path")
const User = require("../models/user")

// Users

var user1 = new User()
var user2 = new User()
var user3 = new User()

user1.setUser("hector", "1111")
user2.setUser("paco", "1111")
user3.setUser("test", "1111")
const users = [user1, user2, user3]

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../templates", "login.html"))
    },
    post: (req, res) => {
        userLogged = req.body.user
        passLogged = req.body.password
        users.forEach((user) => {
            if (user.username === userLogged && user.password === passLogged) {
                res.writeHead(202)
                res.sendFile(path.join(__dirname, "../templates", "game.html"))
            }

            if (passLogged !== user.password) {
                res.writeHead(401)
            }
        })
    },
}
