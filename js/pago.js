import { DBManager } from './DBManager.js';

const username = sessionStorage.getItem("username")
let listaProductos = [];
var carritoMapJSON = sessionStorage.getItem("carritoMap")
var carritoMap = new Map(JSON.parse(carritoMapJSON))
console.log(carritoMap)
let pedidoHTML = "";
let totalHTML = ""

const db = new DBManager();
db.init();

const pagarForm = document.getElementById("pagarFinal")
//Carga los libros desde un array de ids
function cargarLibrosInicial() {
  console.log("ahi vamos")
  let total = 0;
  for (let [id, cant] of carritoMap) {
    var libro = listaProductos.find(function (book) {
      return book.id == id
    })
    renderOrder(libro, cant)
    console.log(libro.precio)
    console.log(total)

    total += (parseFloat((libro.precio).replace(",", "."))) * cant;
  }
  renderTotal(total)
}



// Función para renderizar el pedido
function renderOrder(libro, cant) {

  pedidoHTML += `
      <div class="row">
      <div class="card bg-light id="${libro.id}">
      <div class="card-body d-flex justify-content-between align-items-center">
      <div class="col">
        <h5 class="card-title mb-0"><small class="text-muted">${cant}x </small>${libro.titulo}</h5>
        <small class="text-muted">${libro.autor}</small>
      </div>
        <p class="card-text mb-0">${libro.precio}€</p>
      </div>
    </div>
    
      </div>
    `;
  document.getElementById("pedido").innerHTML = pedidoHTML;
}

// Función para renderizar el total
function renderTotal(total) {

  totalHTML += `
  <div class="container p-3 border-top">
  <div class="card bg-light">
  <div class="card-body d-flex justify-content-between">
    <h5 class="card-title">Total (EUR)</h5>
    <h5 class="card-text">${((total).toFixed(2)).replace(".", ",")}€</h5>
  </div>
</div>
</div>
  `;
  document.getElementById("total").innerHTML = totalHTML;
}

async function fetchBooks() {
  try {
    const response = await fetch('libros.json');
    const data = await response.json();
    listaProductos = data.books;
    cargarLibrosInicial()
  } catch (error) {
    console.log(error);
  }
}
fetchBooks()


pagarForm.addEventListener("submit", async e =>{
  e.preventDefault()
  var orderFinal = carritoToOrder(carritoMap) 
  console.log(orderFinal)

  if (username != null) {
    const orderId = await db.addNewOrder(orderFinal)
    var pedidos = await db.getUserOrders(username)
    console.log(pedidos)
    pedidos.push(orderId)
    console.log(pedidos)
    await db.setUserOrders(username, pedidos)
    console.log(await db.getUserOrders(username))
  } 

  carritoMap = new Map()
  carritoMapJSON = JSON.stringify(Array.from(carritoMap.entries()))
  sessionStorage.setItem("carritoMap", carritoMapJSON)
  console.log(carritoMapJSON)

  window.location.href ="pago_confirmado.html"
})


function carritoToOrder(map) {
  var lista = []
  // Recorre cada elemento del mapa
  map.forEach(function (value, key) {
    // Agrega la key a la lista value veces
    for (let i = 0; i < value; i++) {
      lista.push(key);
    }
  });
  return lista
}
