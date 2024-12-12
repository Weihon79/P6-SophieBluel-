const loginApi = "http://localhost:5678/api/users/login";

document
    .getElementById('loginform')
    .addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
        
    let response = await fetch(loginApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });

    if (response.status != 200) {
        const errorBox = document.createElement("div");
        errorBox.className = ("loginError")
        errorBox.innerHTML = "L'e-mail ou le mot de passe est erroné";
        document.querySelector('form').prepend(errorBox);
    } else {
        let result = await response.json();
        const token = result.token;
        sessionStorage.setItem("authToken", token);
        window.location.href ="index.html";
        console.log(token);
    }

}
