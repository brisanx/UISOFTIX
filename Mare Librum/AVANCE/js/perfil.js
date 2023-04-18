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