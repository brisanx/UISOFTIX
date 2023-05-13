import { funcionEnArchivo2 } from "./cargarcomentario.js";

const URLSearchParams = new window.URLSearchParams(window.location.search);
const id = URLSearchParams.get("id");

let listProducts = [];



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

async function cargarLibrosInicial(){
    console.log("llega cargar")
    var igual = false
    const response = await fetch('libros.json');
      const data = await response.json();
    listProducts = data.books
    for (let [id, cant] of carritoMap) {
      var libro = listProducts.find(function (book) {
        return book.id == id
      })
      addLibro(libro, cant, igual)
    }
  }

// Función para buscar los libros según el título o autor
function searchBooks() {
  tituloHTML=""
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  if(searchQuery!==""){
    tituloHTML += `<h3>Resultados de búsqueda para "${searchQuery}"</h3><br>`;
  }
  const filteredBooks = listProducts.filter((book) => {
    return book.titulo.toLowerCase().includes(searchQuery) || book.autor.toLowerCase().includes(searchQuery);
  });
  renderBooks(filteredBooks);
  return false; 
}

window.searchBooks = searchBooks;


function redirectSearch() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();

  var param = encodeURIComponent(searchQuery);

  window.location.href = 'index.html?busqueda=' + param;
}

window.redirectSearch = redirectSearch;

function renderBook(book) {
    let libroHtml = "<br><br><br><br>";
    libroHtml = `
    <div class="container mt-5 mb-5">
         <div class="card">
            <div class="row g-0" id="${book.id}">
               <div class="col-md-6 border-end" id="imagen">
                  <div class="d-flex flex-column justify-content-center">
                     <div class="main_image">	<img src="${book.portada}" id="mainProductImage" width="350" alt="Portada del libro"> </div>
                     <div class="thumbnail_images">
                        <ul id="thumbnail">
                           <li><img onclick="cambiaImagen(this)" alt="Portada del libro" src="${book.portada}" width="70"></li>
                           <li><img onclick="cambiaImagen(this)" alt="Contraportada del libro" src="${book.contraportada}" width="70"></li>
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

libroHtml += `<div class="containerComentarios"><h1 class="tituloComentarios">Comentarios:</h1></div>
<div id="formularioComentario" style="display: none;">
<h3>Añadir Comentario</h3>
<form id="comentarioForm"> 
    <input type="hidden" id="libroId" value="${book.id}">
    <div>
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" value="${username}" readonly>
    </div>
    <div>
        <label for="valoracion">Valoración:</label>
        <select id="valoracion" required>
        <option value="1">1 Estrella</option>
        <option value="2">2 Estrellas</option>
        <option value="3">3 Estrellas</option>
        <option value="4">4 Estrellas</option>
        <option value="5">5 Estrellas</option>
        </select>
    </div>
    <div>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" required></textarea>
    </div>
    <button type="submit">Enviar Comentario</button>
</form>
</div>
`;

funcionEnArchivo2(book.id).then((comentarios) => {
  console.log("Comentarios propios:", comentarios);
  console.group(comentarios.length);

  if (comentarios.length > 0) {
    for (let i = 0; i < comentarios.length; i++) {
      const comentario = comentarios[i];
      libroHtml += `
        <div class="container mt-4">
          <div class="row"> 
            <div class="col-md-12">
              <div class="card border-0 shadow-sm">
                <div class="card-header border-0 pb-0">
                  <h5 class="card-title">${renderValoracion(comentario.valoracion)}</h5> <!-- Usar comentario.valoracion en lugar de comentarios.valoracion -->
                </div>
                <div class="card-body pt-2">
                  <small class="card-subtitle mb-2 text-muted">${comentario.user}</small> <!-- Usar comentario.user en lugar de comentarios.user -->
                  <p class="card-text">${comentario.Descripcion}</p> <!-- Usar comentario.Descripcion en lugar de comentarios.Descripcion -->
                </div>
              </div>
            </div>
          </div>  
        </div>
      `;
    }
  } else {
    libroHtml += `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 shadow-sm text-center">
            <div class="card-body" id="nocomentario">
              <h2>No hay comentarios para este libro</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }

  document.getElementById("countResults").innerHTML = libroHtml;
})
.catch((error) => {
  console.error("Error al obtener los comentarios propios:", error);
});

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