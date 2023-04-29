const URLSearchParams = new window.URLSearchParams(window.location.search);
const id = URLSearchParams.get("id");

var username = sessionStorage.getItem("username")
var carro = document.getElementById("carrito")
var elementos = document.getElementById("contador-elem")
var nelem = parseInt(elementos.innerHTML)
var nelemcar = document.getElementById("nelem")

let listProducts = [];

//SOLO PRUEBA
const array = [1,2,2,4]
//

async function fetchBook() {
  try {
    const response = await fetch('libros.json');
    const data = await response.json();
    listProducts = data.books
    const book = data.books.find(book => book.id == id);
    renderBook(book);
    cargarLibrosInicial()
  } catch (error) {
    console.log(error);
  }
}

function renderBook(book) {
    let libroHtml = "<br><br><br><br>";
    libroHtml = `
    <div class="container mt-5 mb-5">
         <div class="card">
            <div class="row g-0" id="${book.id}">
               <div class="col-md-6 border-end" id="imagen">
                  <div class="d-flex flex-column justify-content-center">
                     <div class="main_image">	<img src="${book.portada}" id="mainProductImage" width="350"> </div>
                     <div class="thumbnail_images">
                        <ul id="thumbnail">
                           <li><img onclick="cambiaImagen(this)" src="${book.portada}" width="70"></li>
                           <li><img onclick="cambiaImagen(this)" src="${book.contraportada}" width="70"></li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div class="col-md-6" id="datos">
                    <div class="p-3 right-side">
                        <div class="d-flex justify-content-between align-items-center" id="titulo">
                            <h3>${book.titulo}</h3>
                        </div>
                        <div class="d-flex justify-content-between align-items-center" id="autor">
                            <h5>${book.autor}</h5>
                        </div>             
                        <div class="mt-2 pr-3 content" id="texto">
                            <h6>${book.descripcion}</h6>
                        </div>
                        <h3>${book.precio}€</h3>
                        <div class="buttons d-flex flex-row mt-5 gap-3" id="boton">
                          <button onclick="cargaLibro(document.getElementById(${book.id}))" class="btn btn-dark">Añadir al carrito</button>
                        </div>                                                  
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

  if (book.comentarios && book.comentarios.length > 0) {
    for (let i = 0; i < book.comentarios.length; i++) {
        const comentario = book.comentarios[i];
        libroHtml += `
        <div class="container mt-4">
            <div class="row"> 
                <div class="col-md-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header border-0 pb-0">
                            <h5 class="card-tittle">${renderValoracion(comentario.valoracion)}</h5>
                        </div>
                        <div class="card-body pt-2">
                            <small class="card-subtitle mb-2 text-muted">${comentario.usuario}</small>
                            <p class="card-text">${comentario.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
      `;
    }
  } else {
    libroHtml += "No hay comentarios para este libro";
  }

  document.getElementById("countResults").innerHTML = libroHtml;
}

function renderValoracion(valoracion) {
    let valoracionHTML = "";
    for (let i = 0; i < valoracion; i++) {
      valoracionHTML += '<span class="fa fa-star checked"></span>';
    } 
    return valoracionHTML;
  }

fetchBook();

function redirectToCategory(category) {
  window.location.href = `categorias.html?category=${category}`;
}

function cambiaImagen(element) {

  var main_product_image = document.getElementById('mainProductImage');
  main_product_image.src = element.src;
  

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
  var boton = miLibro.querySelector('div[id="datos"]').querySelector('div').querySelector('div[id="boton"]').querySelectorAll('button')[0]
  boton.className="btn btn-success"
  boton.innerHTML = "¡Añadido al carrito!"
}

function returnNormal(libro){
  var miLibro = libro
  var boton = miLibro.querySelector('div[id="datos"]').querySelector('div').querySelector('div[id="boton"]').querySelectorAll('button')[0]
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
