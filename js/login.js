import { DBManager } from './DBManager.js';

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const signupEmail = document.getElementById("signupEmail");
const signupPhoneNumer = document.getElementById("signupPhoneNumber");


const sessionStorage = window.sessionStorage


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const db = new DBManager();
    db.init();

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

    loginForm.addEventListener("submit", async e => {
        e.preventDefault();

        const usuario = await db.loginUser(loginUsername.value, loginPassword.value);
        console.log(usuario);
        if(usuario == 0 || usuario == -1)
        {
            setFormMessage(loginForm, "error", "Usuario o contraseña incorrecto/s.");
        }else
        {
            console.log("Hemos iniciado sesión en usuario: " + usuario.user);
            sessionStorage.setItem("username", loginUsername.value)
            window.location.href = "./index.html";
        }
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault()
        if (signupPassword.value!=confirmPassword.value){
            setFormMessage(createAccountForm, "error", "Las contraseñas no coinciden.")
        }else{
            const isRegistered = await db.loginUser(signupUsername.value)
            if(isRegistered==-1){
                const registeredUser = await db.registerUser(signupUsername.value, signupPassword.value, signupEmail.value, signupPhoneNumer.value);
                console.log(registeredUser)
                if(registeredUser == 1){
                    setFormMessage(loginForm, "success", "¡Registrado exitosamente!")
                    loginForm.classList.remove("form--hidden");
                    createAccountForm.classList.add("form--hidden");
                }
            }else{
                setFormMessage(createAccountForm, "error", "Este usuario ya existe.")
            }
        }        
    }); 
});
