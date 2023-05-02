import { DBManager } from './DBManager.js';

const carritoMapJSON = sessionStorage.getItem("carritoMap")
var carritoMap = new Map(JSON.parse(carritoMapJSON))
console.log(carritoMap)
var carro = document.getElementById("carrito")
var elementos = document.getElementById("contador-elem")
var nelem = parseInt(elementos.innerHTML)
var nelemcar = document.getElementById("nelem")

let listProducts = [];
var username = sessionStorage.getItem("username")
document.getElementById("usernameSpan").innerHTML = username;
const db = new DBManager();
db.init();
if(await db.getPhone(username) !== ""){
    document.getElementById("telephoneSpan").innerHTML = await db.getPhone(username);
}else{
    document.getElementById("telephoneSpan").innerHTML = 'No se ha introducido un teléfono';
}
if(await db.getEmail(username) !== ""){
    document.getElementById("emailSpan").innerHTML = await db.getEmail(username);
}else{
    document.getElementById("emailSpan").innerHTML = 'No se ha introducido un email';
}

console.log(db.getEmail(username))
console.log(db.getPhone(username))


async function fetchBooks() {
    try {
      const response = await fetch('libros.json');
      const data = await response.json();
      listProducts = data.books;
      getOrders(username, listProducts);
      cargarLibrosInicial()
    } catch (error) {
      console.log(error);
    }
  }



async function getOrders(username, listProducts){
    const pedidos = await db.getUserOrders(username);

     // Inicializar una lista vacía para almacenar los pedidos
    const orders = [];

    // Para cada IBAN del usuario, obtener los pedidos correspondientes
    for (const id of pedidos) {
        const matchingOrders = await db.getEspecificOrder(id);

        // Agregar los pedidos a la lista de pedidos
        orders.push(...matchingOrders);
  }
  console.log(pedidos)
  console.log(orders)

  let filteredBooks = [];

  orders.forEach((order) => {
    const matchedBook = listProducts.find((book) => book.id == order);
    if (matchedBook) {
      filteredBooks.push(matchedBook);
    }
 });
  console.log(filteredBooks);
  renderBooks(filteredBooks);
}

// Cargar los libros al cargar la página
fetchBooks();

// Función para renderizar los libros
function renderBooks(books = listProducts) {
    let librosHTML = "";
    if(books !== null){
        document.getElementById("titulo").innerHTML = '<h3 class="m-3 d-flex justify-content-center">Libros que has comprado recientemente</h3>';
    }
    books.forEach(libro => {
      librosHTML += `
      <div class="col-sm-3 mt-2">
        <div class="card p-3" id="${libro.id}">
                <div class="d-flex justify-content-center">
                    <a href="pagLibro.html?id=${libro.id}">
                    <img src="${libro.portada}" class="card-img-top" alt="Libro: ${libro.titulo}">
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-center">${libro.titulo}</h5>
                    <p class="card-subtitle text-muted mb-2 d-flex justify-content-center">${libro.autor}</p>
                    <h4 class="card-text mb-3 d-flex justify-content-center">${libro.precio}€</h4>
            </div>
        </div>
    </div>
      `;
    });
    document.getElementById("historial").innerHTML = librosHTML;
  }

  // Función para buscar los libros según el título o autor

  //Carga los libros desde un array de ids
function cargarLibrosInicial() {
  console.log("llega cargar")
  var igual = false
  for (let [id, cant] of carritoMap) {
    var libro = listProducts.find(function (book) {
      return book.id == id
    })
    addLibro(libro, cant, igual)
  }
}

function addLibro(libroElegido, cant, igual) {
  const miLibro = libroElegido

  if (igual) {
    nelem++
    elementos.innerHTML = nelem
    nelemcar.innerHTML = "Hay " + nelem + " elementos en el carrito"

    var libros = carro.getElementsByTagName("div")
    for (var i = 0; i < libros.length; i++) {
      if (libros[i].id == miLibro.id) {
        var libroAct = libros[i]
        break
      }
    }
    console.log(libroAct)
    var newCant = libroAct.querySelector('h6')
    newCant.innerHTML = "Cant.: " + cant
    sumarPrecio(miLibro.precio + "€")
  } else {

    for (var i = 0; i < cant; i++) {
      nelem++
    }
    elementos.innerHTML = nelem
    nelemcar.innerHTML = "Hay " + nelem + " elementos en el carrito"

    var newLibro = document.createElement("div")
    newLibro.className = "container"
    newLibro.id = miLibro.id

    var newRow = document.createElement("div")
    newRow.className = "row"

    var newCol = document.createElement("div")
    newCol.className = "col-sm"

    var newImg = document.createElement("img")
    newImg.src = miLibro.portada
    newImg.width = "110"
    newCol.appendChild(newImg)

    var newInfo = document.createElement("div")
    newInfo.className = "container col-sm"

    var newInfoRow1 = document.createElement("div")
    newInfoRow1.className = "row"

    var newTitulo = document.createElement("h3")
    newTitulo.className = "fs-5"
    newTitulo.innerHTML = miLibro.titulo
    newInfoRow1.append(newTitulo)
    newInfo.append(newInfoRow1)

    var newInfoRow2 = document.createElement("div")
    newInfoRow2.className = "row"

    var newAutor = document.createElement("h5")
    newAutor.className = "fs-6"
    newAutor.innerHTML = miLibro.autor
    newInfoRow2.append(newAutor)
    newInfo.append(newInfoRow2)

    newRow.append(newCol)
    newRow.append(newInfo)
    newLibro.append(newRow)

    var newRow2 = document.createElement("div")
    newRow2.className = "row mt-2"

    var newCol2 = document.createElement("div")
    newCol2.className = "col-sm"

    var eliminar = document.createElement("button")
    eliminar.type = "button"
    eliminar.className = "btn btn-danger"
    eliminar.innerHTML = "Eliminar"
    newCol2.append(eliminar)
    eliminar.addEventListener("click", removeLibro, false)

    var newCol3 = document.createElement("div")
    newCol3.className = "col-sm"

    var newPrecio = document.createElement("h5")
    newPrecio.innerHTML = miLibro.precio + "€"
    for (var i = 0; i < cant; i++) {
      sumarPrecio(newPrecio.innerHTML)
    }
    newCol3.append(newPrecio)

    var newCol4 = document.createElement("div")
    newCol4.className = "col-sm"
    var cantidad = document.createElement("h6")
    cantidad.innerHTML = "Cant.: " + cant
    newCol4.append(cantidad)

    newRow2.append(newCol2)
    newRow2.append(newCol4)
    newRow2.append(newCol3)

    newLibro.append(newRow2)
    newLibro.append(document.createElement("hr"))

    carro.querySelectorAll('div')[1].appendChild(newLibro)
  }

  function removeLibro() {
    restarPrecio(newPrecio.innerHTML)
    if (newLibro.querySelector('h6').innerHTML === "Cant.: 1") {
      newLibro.parentNode.removeChild(newLibro)
    }
    nelem--
    elementos.innerHTML = nelem
    nelemcar.innerHTML = "Hay " + nelem + " elementos en el carrito"
    cant = newLibro.querySelector('h6').innerHTML.slice(7, newLibro.querySelector('h6').innerHTML.length)
    cant--
    cantidad.innerHTML = "Cant.: " + cant

    //Elimina el elemento seleccionado del array
    var nf = true
    for (let [id, cant] of carritoMap) {
      console.log(id)
      if (id == miLibro.id) {
        console.log("ELIMINADO")
        if (cant == 1) {
          carritoMap.delete(id)
        } else {
          cant--
          carritoMap.set(id, cant)
        }
        nf = false
      }
    }
    const carritoArrayJSON = JSON.stringify(Array.from(carritoMap.entries()))
    sessionStorage.setItem("carritoMap", carritoArrayJSON)
    console.log(carritoArrayJSON)
  }

}

function sumarPrecio(precio) {
  var pActualStr = document.getElementById("total").innerHTML
  pActualStr = pActualStr.slice(0, pActualStr.length - 1)
  var pActual = parseFloat(pActualStr.replace(",", "."))

  var pSumar = precio.slice(0, precio.length - 1)

  var pFinal = parseFloat(pSumar.replace(",", ".")) + pActual

  var pFinalStr = pFinal.toFixed(2).toString()
  pFinalStr = pFinalStr.replace(".", ",") + "€"

  document.getElementById("total").innerHTML = pFinalStr
}

function restarPrecio(precio) {
  var pActualStr = document.getElementById("total").innerHTML
  pActualStr = pActualStr.slice(0, pActualStr.length - 1)
  var pActual = parseFloat(pActualStr.replace(",", "."))

  var pRestar = precio.slice(0, precio.length - 1)
  pRestar = parseFloat(pRestar.replace(",", "."))
  console.log(pActual)
  console.log(pRestar)
  var pFinal = pActual - pRestar

  var pFinalStr = pFinal.toFixed(2).toString()
  pFinalStr = pFinalStr.replace(".", ",") + "€"

  document.getElementById("total").innerHTML = pFinalStr
}