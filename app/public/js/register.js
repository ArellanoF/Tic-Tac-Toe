let username = document.querySelector("#username")
let password = document.querySelector("#password")
let submit = document.querySelector("#submit")

submit.addEventListener("click", async (event) => {
    event.preventDefault()
    var registered = false
    if (username.value !== null && password.value !== null) {
        fetch("http://localhost:3002/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({
                user: username.value,
                password: password.value,
            }),
        }).then(
            await function (res) {
                if (res.status === 202) {
                    console.log("Registered")
                   
                    registered = true
                    if (registered) {
                        alert("You are registered correctly! Enjoy the game!")
                        window.location.replace("http://localhost:3002/login")
                    
                    }
                } 
            }
        )
    }
})
