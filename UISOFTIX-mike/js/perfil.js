var boton = document.getElementById("inicio")
var usuario = document.getElementById("usuario")

var username = sessionStorage.getItem("username")
console.log(username)
var loged=false

if(username!==null){
    loged=true
}

if(loged){
    var icon= '<i class="fas fa-user"></i>'
    boton.innerHTML=" Mi perfil"
    boton.href="../perfil.html"
    boton.insertAdjacentHTML("afterbegin", icon)
}

function redirectToCategory(category) {
    window.location.href = `categorias.html?category=${category}`;
  }

var botonCerrar = document.getElementById("cerrar");

botonCerrar.addEventListener("click", function() {
    sessionStorage.clear()
    window.location.href = "index.html";
  });