import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, doc, setDoc, query, addDoc, updateDoc, where, collection, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js"; // Importa la configuración de Firebase desde un archivo separado

export class DBManager {
  static BD;

  init() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    DBManager.BD = db;

    console.log("DB inicializada correctamente");
  }

	/**
	 * Se registra al usuario con los datos proporcionados
	 * @param {String} user 
	 * @param {String} password 
	 * @returns 0 si ha habido un error
	 * @returns 1 si ha sido exitoso el registro 
	 */
	registerUser(user, password, email, phoneNumber) {
		let result = 0;
		try {
			setDoc(doc(DBManager.BD, "userInfo", user),
				{
					user: user,
					password: password,
					ordersList: [],
					email: email,
					phoneNumber: phoneNumber,
					cart:{}
				});
			result = 1;
		} catch (e) {
			console.error("Error registrando al usuario: ", e);
		}
		return result;
	};

	/**
	 * Comprueba que está registrado para iniciar sesión en la web
	 * @param {String} user 
	 * @param {String} password 
	 * @returns 0 si hay un error con los credenciales
	 * @returns -1 si el usuario no existe
	 * @returns Un objeto con los parámetros usuario y contraseña
	 */
	async loginUser(user, password) {
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let userResult= 0;

		if (docSnap.exists()) {
			if (password == docSnap.get("password")) {
				userResult =
				{
					user: user,
					password: password
				}
			} else {
				console.log("Contraseña incorrecta.");
				userResult = 0;
			}

		} else {
			userResult = -1;
			console.log("Usuario no registrado.");
		}
		return userResult;
	}

	/**
	 * Devuelve una lista de los pedidos realizados por el ususario
	 * @param {String} user Usuario del que queremos obtener los pedidos
	 * @returns -1 Si hay error
	 * @returns Lista de pedidos realizados 
	 */
	async getUserOrders(user) {
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("ordersList");
		}
		return result;
	}

	/**
	 * Actualiza la lista de pedidos del usuario
	 * @param {String} user Usuario al que actualizar la lista de pedidos
	 * @param {List} ordersList La lista de pedidos nueva
	 */
	async setUserOrders(user, orders) {
		try{
			updateDoc(doc(DBManager.BD, "userInfo", user),{
				ordersList: orders
			})
		} catch(e){
			console.error("Error updating orders: ", e);
		}
	}
	/**
	 * Devuelve el teléfono del usuario pasado por parametro
	 * @param {String} user 
	 * @returns -1 si hay un error
	 * @returns El teléfono del usuario
	 */
	async getPhone(user){
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("phoneNumber");
		}
		return result;
	}

	async setPhone(user, phoneNumber){
		//TODO
	}

	/**
	 * Devuelve el email del usuario pasado por parámetro
	 * @param {String} user 
	 * @returns -1 si hay un error
	 * @returns El email del usuario
	 */
	async getEmail(user){
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("email");
		}
		return result;
	}

	async setEmail(user, email){
		//TODO
	}


	async getCart(user){
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = {};

		if(docSnap.exists()	){
			result = await docSnap.get("cart");
		}
		return result;
	}

	async setCart(user, carro){
		try{
			updateDoc(doc(DBManager.BD, "userInfo", user),{
				cart: carro
			})
		} catch(e){
			console.error("Error updating the cart: ", e);
		}
	}

	/**
	 * Función que añade un pedido a la base de datos.
	 * @param {List} books Lista de ids de libros
	 * @returns 0 Si ha habido un error
	 * @returns 1 Si se ha añadido el pedido con éxito
	 */
	async addNewOrder(books){
		const timestamp = new Date();
		var newOrder = []
		const ordersCollection = collection(DBManager.BD, "orders");
		try{
			newOrder = await addDoc(ordersCollection, {
				booksId: books,
				timestamp: timestamp.toLocaleDateString()
			});
		}catch(e){
			console.log("Error añadiendo pedido a la base de datos: ", e)
		}
		console.log(`Doc created with ID ${newOrder.id}`);
		return newOrder.id;
	}

	/**
	 * Función que devuelve la lista de libros pedidos en un pedido específico.
	 * @param {String} orderId Id del pedido 
	 * @returns -1 si hay un error
	 * @returns Lista con los ids de los libros comprados en ese pedido
	 */
	async getEspecificOrder(orderId){
		const docRef = doc(DBManager.BD, "orders", orderId);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("booksId");
		}
		return result;
	}

	async anyadirComentario(libroId, usuario, valoracion, descripcion){
		const commentsCollection = collection(DBManager.BD, "comentarios",libroId,"comentariosPropios");
		try {
            addDoc(commentsCollection,
                {
                    Nombre: usuario,
                    Valoracion: valoracion,
                    Descripcion: descripcion
                });
        } catch (e) {
            console.error("Error a la hora de agregar comentario: ", e);
        }
	}
}

