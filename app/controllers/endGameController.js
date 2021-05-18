const path = require("path")
const Score = require("../model/score")
const Room = require("../model/room")

module.exports = {
    post: (req, res) => {
        const username = req.body.champion
        const points = req.body.wins
        const roomFor = req.body.roomFor

        if (username) {
            Room.findOneAndUpdate(
                { room: roomFor },
                { users: 0 },
                function (err, room) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(room.room + " room restarted!")
                    }
                }
            )
            Score.findOne({ userName: username }, function (err, score) {
                if (err) {
                    console.log(err)
                    res.status(500)
                } else {
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
                                res.status(500)
                            }
                            if (score) {
                                res.status(200)
                                res.json({
                                    Champion: username,
                                    Score: score.wins,
                                    Room: roomFor + " room restarted!",
                                })
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
                                return res.status(500)
                            }
                            if (score) {
                                res.status(200)
                                res.json({
                                    Champion: username,
                                    Score: score.wins,
                                    Room: roomFor + " room restarted!",
                                })
                            }
                        }
                    )
                }
            })
        }
        /*
         Room.findOneAndUpdate(
            { room: roomFor },
            { users: 0 },
            function (err, room) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(room.room + " room restarted!")
                }
            }
        )
         */
    },
}
