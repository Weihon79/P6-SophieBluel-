// auth.js
export function toggleLoginLogout() {
    const loginLink = document.querySelector("#loginLink");
  
    if (sessionStorage.authToken) {
      loginLink.textContent = "logout";
      loginLink.addEventListener("click", logout);
    } else {
      loginLink.textContent = "login";
      loginLink.removeEventListener("click", logout);
    }
  }
  
  function logout(event) {
    event.preventDefault();
    sessionStorage.removeItem("authToken");
    window.location.reload();
  }
  