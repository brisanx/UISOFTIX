import { DBManager } from './DBManager.js';

const db = new DBManager();
db.init();

function mostrarFormulario() {
  document.getElementById("formularioComentario").style.display = "block";
}

document.addEventListener('DOMContentLoaded', async function() {
  var button = document.createElement('button');
  button.textContent = 'Añadir comentario';
  button.classList.add('btn', 'btn-primary');
  button.setAttribute('id', 'anyadircomentario');

  if (sessionStorage.getItem('username')===null) {
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal');
  } else {
    button.addEventListener('click', mostrarFormulario);
  }

  var container = document.createElement('div');
  container.classList.add('container');
  container.setAttribute('id', 'contanyadircomentario');
  container.appendChild(button);

  var mainContainer = document.getElementById('container');

  if (mainContainer) {
    mainContainer.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
});

document.addEventListener('submit', async function(event) {
  if (event.target && event.target.id === 'comentarioForm') {
    event.preventDefault();

    const libroId = parseInt(document.getElementById('libroId').value);
    const usuario = document.getElementById('usuario').value;
    const valoracion = parseInt(document.getElementById('valoracion').value);
    const descripcion = document.getElementById('descripcion').value;

    await db.anyadirComentario(libroId, usuario, valoracion, descripcion);

    document.getElementById('comentarioForm').reset();
    document.getElementById('formularioComentario').style.display = 'none';
  }
  setTimeout(function() { location.reload(); }, 300);
});
