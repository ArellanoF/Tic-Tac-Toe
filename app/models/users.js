class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}
const user1 = new User("hector", "1111")
const user2 = new User("paco", "1111")
const user3 = new User("test", "1111")

const users = [user1, user2, user3]

module.exports = users
