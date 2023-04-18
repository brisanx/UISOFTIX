const URLSearchParams = new window.URLSearchParams(window.location.search);
const id = URLSearchParams.get("id");

async function fetchBook() {
  try {
    const response = await fetch('libros.json');
    const data = await response.json();
    const book = data.books.find(book => book.id == id);
    renderBook(book);
  } catch (error) {
    console.log(error);
  }
}

function renderBook(book) {
    let libroHtml = "<br><br><br><br>";
    libroHtml = `
    <div class="container mt-5 mb-5">
         <div class="card">
            <div class="row g-0" id="libro">
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
                        	<button class="btn btn-outline-dark">Comprar ahora</button>
                          <button onclick="addLibro(document.getElementById('libro'))" class="btn btn-dark">Añadir al carrito</button>
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
