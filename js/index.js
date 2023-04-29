
let listProducts = [];

var username = sessionStorage.getItem("username")
var carro = document.getElementById("carrito")
var elementos = document.getElementById("contador-elem")
var nelem = parseInt(elementos.innerHTML)
var nelemcar = document.getElementById("nelem")

//SOLO PRUEBA
const array = [1,2,2,4]
//

// Función para cargar los libros desde un archivo JSON
async function fetchBooks() {
  try {
    const response = await fetch('libros.json');
    const data = await response.json();
    listProducts = data.books;
    cargarLibrosInicial()
    renderBooks();
  } catch (error) {
    console.log(error);
  }
}

// Función para buscar los libros según el título o autor
function searchBooks() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const filteredBooks = listProducts.filter((book) => {
    return book.titulo.toLowerCase().includes(searchQuery) || book.autor.toLowerCase().includes(searchQuery);
  });
  renderBooks(filteredBooks);
}

// Función para renderizar los libros
function renderBooks(books = listProducts) {
  let librosHTML = "";

  books.forEach(libro => {
    librosHTML += `
      <div class="col d-flex" id="${libro.id}">
        <div class="card flex-fill">
          <a href="pagLibro.html?id=${libro.id}">
            <img src="${libro.portada}" class="card-img-top" alt="...">
          </a>
          <div class="card-body">
            <h5 class="card-title">${libro.titulo}</h5>
            <p class="card-subtitle text-muted mb-2">${libro.autor}</p>
            <h4 class="card-text mb-0">${libro.precio}€</h4>
          </div>
          <div class="card-footer">
            <a onclick="cargaLibro(document.getElementById('${libro.id}'))" class="btn btn-dark">Añadir al carrito</a>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById("countResults").innerHTML = librosHTML;
}

// Cargar los libros al cargar la página
fetchBooks();

// Agregar un evento al botón de búsqueda para activar la función searchBooks
document.getElementById("searchButton").addEventListener("click", searchBooks);

function limpiarBusqueda() {
  document.getElementById("searchInput").value = "";
  fetchBooks();
}

function redirectToCategory(category) {
  window.location.href = `categorias.html?category=${category}`;
}



//Por cuestiones de errores con la carga de libros del json he metido las operaciones del carrito aqui

//Carga los libros desde un array de ids
function cargarLibrosInicial(){
  console.log("llega cargar")
  for (var i = 0; i<array.length; i++) {
      console.log("entra bucle")
      var libro = listProducts.find(function(book) {
        return book.id==array[i]
      })
      console.log(libro)
      addLibro(libro)
  }
}

//Le llega un div de libro, le saca la id y lo manda a añadir
function cargaLibro(libroIdDiv){
  var libroId = libroIdDiv.id
  console.log(libroId)
  var libro = listProducts.find(function(book) {
    return book.id==libroId
  })
  console.log(libro)
  addLibro(libro)

  turnGreen(libroIdDiv)
  setTimeout(() => {
      returnNormal(libroIdDiv)
  }, 1000);
}

//Añade el libro al carrito (le llega un objeto Libro del JSON)
function addLibro(libroElegido){
  const miLibro = libroElegido

  console.log(miLibro)
  nelem++
  elementos.innerHTML=nelem
  nelemcar.innerHTML = "Hay "+nelem+" elementos en el carrito"

  var newLibro = document.createElement("div")
  newLibro.className = "container"

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
  newInfoRow1.className="row"

  var newTitulo = document.createElement("h3")
  newTitulo.className="fs-5"
  newTitulo.innerHTML= miLibro.titulo
  newInfoRow1.append(newTitulo)
  newInfo.append(newInfoRow1)

  var newInfoRow2 = document.createElement("div")
  newInfoRow2.className="row"

  var newAutor = document.createElement("h5")
  newAutor.className="fs-6"
  newAutor.innerHTML= miLibro.autor
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
  eliminar.type="button"
  eliminar.className = "btn btn-danger"
  eliminar.innerHTML = "Eliminar"
  newCol2.append(eliminar)
  eliminar.addEventListener("click", removeLibro, false)

  var newCol3 = document.createElement("div")
  newCol3.className = "col-sm"

  var newPrecio = document.createElement("h5")
  newPrecio.innerHTML= miLibro.precio
  sumarPrecio(newPrecio.innerHTML)
  newCol3.append(newPrecio)

  newRow2.append(newCol2)
  newRow2.append(newCol3)
  newLibro.append(newRow2)
  newLibro.append(document.createElement("hr"))
  
  carro.querySelectorAll('div')[1].appendChild(newLibro)
  
  function removeLibro(){
      restarPrecio(newPrecio.innerHTML)
      newLibro.parentNode.removeChild(newLibro) 
      nelem--
      elementos.innerHTML=nelem  
      nelemcar.innerHTML = "Hay "+nelem+" elementos en el carrito"

  }
  
}


function turnGreen(libro){
  var miLibro = libro
  var boton = miLibro.querySelector('div').querySelectorAll('div')[1].querySelector('a')
  boton.className="btn btn-success"
  boton.innerHTML = "¡Añadido al carrito!"
}

function returnNormal(libro){
  var miLibro = libro
  var boton = miLibro.querySelector('div').querySelectorAll('div')[1].querySelector('a')
  boton.className="btn btn-dark"
  boton.innerHTML = "Añadir al carrito"
}

function sumarPrecio(precio){
  var pActualStr = document.getElementById("total").innerHTML
  pActualStr = pActualStr.slice(0, pActualStr.length - 1)
  var pActual = parseFloat(pActualStr.replace("," , "."))

  var pSumar = precio.slice(0, precio.length -1)

  var pFinal = parseFloat(pSumar.replace(",", "."))+pActual

  var pFinalStr = pFinal.toFixed(2).toString()
  pFinalStr = pFinalStr.replace(".", ",")+"€"

  document.getElementById("total").innerHTML = pFinalStr
}

function restarPrecio(precio){
  var pActualStr = document.getElementById("total").innerHTML
  pActualStr = pActualStr.slice(0, pActualStr.length - 1)
  var pActual = parseFloat(pActualStr.replace("," , "."))

  var pRestar = precio.slice(0, precio.length -1)
  pRestar =parseFloat(pRestar.replace(",", "."))
  console.log(pActual)
  console.log(pRestar)
  var pFinal = pActual - pRestar

  var pFinalStr = pFinal.toFixed(2).toString()
  pFinalStr = pFinalStr.replace(".", ",")+"€"

  document.getElementById("total").innerHTML = pFinalStr
}

