const path = require("path")
const Users = require("../models/users")

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, "../views", "login.html"))
    },
    post: (req, res) => {
        userLogged = req.body.user
        passLogged = req.body.password
        Users.forEach((user) => {
            if (user.username === userLogged && user.password === passLogged) {
                res.status(202)
                res.sendFile(path.join(__dirname, "../views", "game.html"))
            }
            if (passLogged !== user.password) {
                res.status(401)
                res.end()
            }
        })
    },
}
