import { DBManager } from './DBManager.js';

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
                    <img src="${libro.portada}" class="card-img-top" alt="...">
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
