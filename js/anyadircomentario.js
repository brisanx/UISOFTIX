import { DBManager } from './DBManager.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

  const db = new DBManager();
  db.init();

  function mostrarFormulario() {
      document.getElementById("formularioComentario").style.display = "block";
  }

  document.getElementById("comentarioForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const libroId = document.getElementById("libroId").value
    const usuario = document.getElementById("usuario").value;
    const valoracion = document.getElementById("valoracion").value;
    const descripcion = document.getElementById("descripcion").value;

    await db.anyadirComentario(libroId, usuario, valoracion, descripcion);

    // Restablecer el formulario y ocultarlo
    document.getElementById("comentarioForm").reset();
    document.getElementById("formularioComentario").style.display = "none";
  });

  document.addEventListener('DOMContentLoaded', function() {
    var button = document.createElement('button');
    button.textContent = 'Añadir comentario';
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('id', 'anyadircomentario');
  
    if (sessionStorage.getItem('username') !== null) {
      button.addEventListener('click', mostrarFormulario);
    } else {
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#exampleModal');
    }
  
    var container = document.createElement('div');
    container.classList.add('container'); // Clase del contenedor
    container.setAttribute('id', 'contanyadircomentario');
    container.appendChild(button);
  
    var mainContainer = document.getElementById('container'); // Reemplaza 'container' con el ID de tu contenedor principal
  
    if (mainContainer) {
      mainContainer.appendChild(container);
    } else {
      // Si no tienes un contenedor principal específico, puedes agregar el contenedor al cuerpo del documento
      document.body.appendChild(container);
    }
  });