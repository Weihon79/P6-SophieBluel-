const loginApi = "http://localhost:5678/api/users/login";

async function handleSubmit(e) {
    let user = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie',
        };
        
    let response = await fetch(loginApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    });
    
    let result = await response.json();
    console.log(result);
}

handleSubmit();