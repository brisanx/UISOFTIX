import { DBManager } from "./DBManager.js";

const db = new DBManager();
db.init();

export async function funcionEnArchivo2(id) {
  try {
    const comentarios = await db.cargarComentarios();
    const comentariosObjeto = JSON.parse(comentarios); // Convertir JSON a objeto
    const comentariosFiltrados = comentariosObjeto.filter(
      (comentario) => comentario.idLibro === id
    );
    // Realiza las acciones necesarias con los comentarios obtenidos
    return comentariosFiltrados;
  } catch (error) {
    console.error("Error al obtener los comentarios propios:", error);
    return [];
  }
}
