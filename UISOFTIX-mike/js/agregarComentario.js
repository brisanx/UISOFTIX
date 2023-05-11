import { DBManager } from './DBManager.js';

const db = new DBManager();
db.init();

function mostrarFormulario() {
  document.getElementById("formularioComentario").style.display = "block";
}
window.mostrarFormulario = mostrarFormulario;

document.getElementById("comentarioForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const libroId = document.getElementById("libroId").value
  const usuario = document.getElementById("usuario").value;
  const valoracion = document.getElementById("valoracion").value;
  const descripcion = document.getElementById("descripcion").value;

  try {
    setDoc(doc(db, "comentarios", libroId, 'comentariosPropios'),
      {
        Nombre: usuario,
        Valoracion: valoracion,
        Descripcion: descripcion
      });
  } catch (e) {
    console.error("Error al guardar comentario: ", e);
  }
  

  // Restablecer el formulario y ocultarlo
  document.getElementById("comentarioForm").reset();
  document.getElementById("formularioComentario").style.display = "none";
});

  document.addEventListener('DOMContentLoaded', function() {
    var button = document.createElement('button');
    button.textContent = 'Añadir comentario';
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', mostrarFormulario);
  
    var container = document.getElementById('container'); // Reemplaza 'container' con el ID de tu contenedor
  
    if (container) {
      container.appendChild(button);
    } else {
      // Si no tienes un contenedor específico, puedes agregar el botón al cuerpo del documento
      document.body.appendChild(button);
    }
  });