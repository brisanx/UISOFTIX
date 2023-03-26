const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const sessionStorage = window.sessionStorage


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    
    var a = new Array()

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault

        if (signupPassword.value !== confirmPassword.value) {
            setFormMessage(createAccountForm, "error", "Las contraseñas no coinciden")
        } else if (signupUsername.value.length == 0 || signupPassword.value.length == 0) {
            setFormMessage(createAccountForm, "error", "¡Tienes campos vacíos!")
        } else {
            
            user={
                username: signupUsername.value,
                password: btoa(signupPassword.value)
            }
            a.push(user)
            
            localStorage.setItem("all_users", JSON.stringify(a))
            console.log(a)
            setFormMessage(loginForm, "success", "¡Registrado exitosamente!")
            loginForm.classList.remove("form--hidden");
            createAccountForm.classList.add("form--hidden");
        }
    });

    loginForm.addEventListener("submit", async e => {
        e.preventDefault

        if (loginUsername.value.length == 0 || loginPassword.value.length == 0) {
            setFormMessage(loginForm, "error", "¡Tienes campos vacíos!")
        } else {
            a = JSON.parse((localStorage.getItem('all_users')))
            const hash = Object.fromEntries(
                a.map(e => [e.name, e.password])
             )
             
             var username = document.getElementById('loginUsername').value;
             var password = document.getElementById('loginPassword').value;
             
             for (let key of hash)
             {
             
                 if(key[0] === username && key[1]===atob(password))
                  {
                      alert('Login successful');
                      sessionStorage.setItem("user", loginUsername.value)
                      window.location.href = "index.html"
                  }
             
             else
                  {
                      alert('Login fail');
                  }
             }
        }
    });

});