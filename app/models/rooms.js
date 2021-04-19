class Room {
    constructor(name, users) {
        this.name = name
        this.users = users
    }
}
let roomWind = new Room("wind", 0)
let roomFire = new Room("fire", 0)
let roomWater = new Room("water", 0)
let roomEarth = new Room("earth", 0)

const allRooms = [roomWind, roomFire, roomWater, roomEarth]

module.exports = allRooms
