// Get info from the localStorage
const username = localStorage.getItem("user")
document.getElementById("username").innerHTML = username

const avatar = localStorage.getItem("avatar")
document.getElementById("avatarImage").src = avatar

const gameRoom = localStorage.getItem("gameRoom")
document.getElementById("gameRoom").innerHTML = gameRoom

document.getElementById("invalid").style.display = "none"

let roomFrom
let roomFor

// Display Winner Div alert
document.getElementById("winnerDiv").style.display = "none"

// Players
let player1 = localStorage.getItem("user")
let player2 = "Player 2"

// Drag and Drop
function allowDrop(ev) {
    ev.preventDefault()
}

function drag(ev) {
    roomFrom = ev.path[1].id
    ev.dataTransfer.setData("text", ev.target.id)
}

async function drop(ev) {
    ev.preventDefault()
    roomFor = ev.path[0].id
    var data = ev.dataTransfer.getData("text")

    fetch("http://localhost:3002/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
            roomFrom: roomFrom,
            roomFor: roomFor,
        }),
    }).then(
        await function (res) {
            console.log(res.status)

            if (res.status === 202) {
                ev.target.appendChild(document.getElementById(data))
                document.getElementById("playBtn").disabled = false
            }
            if (res.status === 401) {
                document.getElementById("invalid").style.display = "inherit"

                setTimeout(function () {
                    document.getElementById("invalid").style.display = "none"
                }, 2500)
            }
            if (res.status === 205) {
                ev.target.appendChild(document.getElementById(data))
                document.getElementById("playBtn").disabled = true
            }
        }
    )
}
// Logout function
function logout() {
    localStorage.clear()
    window.location.replace("http://localhost:3001/login")
}
// Activate gameZone
document.getElementById("tresContainer").style.display = "none"
function activateGame() {
    document.getElementById("tresContainer").style.display = "inherit"
    document.getElementById("waitingRoom").style.display = "none"
}
// Game usability

let turn = 0
let pitch = []
function btnPulse(event, position) {
    turn++
    const btn = event.target
    const color = turn % 2 ? "red" : "green"
    btn.style.backgroundColor = color
    pitch[position] = color
    if (winner()) {
        fetch("/endgame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        }).then(function (res) {
            if (res.status === 200) {
                document.getElementById("winnerDiv").style.display = "inherit"
                document
                    .querySelectorAll(".gameButton")
                    .forEach((button) => (button.disabled = true))
                if (color === "red") {
                    console.log(color)
                    document.getElementById("winner").innerHTML = player1
                }
                if (color === "green") {
                    console.log(color)
                    document.getElementById("winner").innerHTML = player2
                }
            }
        })
    }
}
function winner() {
    if (pitch[0] == pitch[1] && pitch[1] == pitch[2] && pitch[0]) {
        return true
    } else if (pitch[3] === pitch[4] && pitch[3] === pitch[5] && pitch[3]) {
        return true
    } else if (pitch[6] === pitch[7] && pitch[6] === pitch[8] && pitch[6]) {
        return true
    } else if (pitch[0] === pitch[3] && pitch[0] === pitch[6] && pitch[0]) {
        return true
    } else if (pitch[1] === pitch[4] && pitch[1] === pitch[7] && pitch[1]) {
        return true
    } else if (pitch[2] === pitch[5] && pitch[2] === pitch[8] && pitch[2]) {
        return true
    } else if (pitch[0] === pitch[4] && pitch[0] === pitch[8] && pitch[0]) {
        return true
    } else if (pitch[2] === pitch[4] && pitch[2] === pitch[6] && pitch[2]) {
        return true
    }

    return false
}
document
    .querySelectorAll(".gameButton")
    .forEach((button, i) =>
        button.addEventListener("click", (e) => btnPulse(e, i))
    )
