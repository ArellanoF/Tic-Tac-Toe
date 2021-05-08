const path = require("path")
const Score = require("../model/score")
const Room = require("../model/room")

module.exports = {
    post: (req, res) => {
        const username = req.body.username
        const points = req.body.wins
        const roomFor = req.body.roomFor

        Room.findOneAndUpdate(
            { room: roomFor },
            { $inc: { users: -1 } },
            function (err, room) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(
                        `User: ${username} deleted from room: ${roomFor}`
                    )
                }
            }
        )

        Score.findOne({ userName: username }, function (err, score) {
            if (err) {
                console.log(err)
                return res.status(500).end()
            }
            if (score) {
                Score.findOneAndUpdate(
                    { userName: username },
                    {
                        $inc: {
                            wins: 1,
                        },
                    },
                    function (err, score) {
                        if (err) {
                            console.log(err)
                            return res.status(500).end()
                        }
                        if (score) {
                            res.status(200)
                            res.end()
                        }
                    }
                )
            }
            if (!score) {
                Score.create(
                    { userName: username, wins: points },
                    function (err, score) {
                        if (err) {
                            console.log(err)
                            return res.status(500).end()
                        }
                        if (score) {
                            res.status(200)
                            res.end()
                        }
                    }
                )
            }
        })
        res.status(200)
        res.end()
    },
}
