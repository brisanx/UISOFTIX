import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
	getFirestore, doc, setDoc, query, addDoc, updateDoc,
	where, collection, getDoc, getDocs
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

/*
IMPORTANTE

PARA QUE FUNCIONE DBMANAGER NECESITA:

·Ser llamado como un módulo (type = "module")
·El método en el que se llame debe ser async(esto es necesario para permitir el await)
·llamar a los métodos async de esta clase con await(sino te dará una promesa y solo tu y dios podrás entenderlo xd)

*/

export class DBManager {
	static BD;

	init() {
		// Import the functions you need from the SDKs you need
		// TODO: Add SDKs for Firebase products that you want to use
		// https://firebase.google.com/docs/web/setup#available-libraries

		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyDcbhH3Fx0KdqCBvSgt3mNuiedFaNM1sPo",
			authDomain: "marelibrum-softix.firebaseapp.com",
			projectId: "marelibrum-softix",
			storageBucket: "marelibrum-softix.appspot.com",
			messagingSenderId: "443793966980",
			appId: "1:443793966980:web:c39efdbb685c600e62bfd1",
			measurementId: "G-9XTNQYRLEH"
		  };

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);

		const db = getFirestore(app);
		DBManager.BD = db;

		console.log("DB inicializada correctamente");

	}

	/**
	 * Se registra al usuario con los datos proporcionados
	 * @param user 
	 * @param password 
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
					orders: [],
					email: email,
					phoneNumber: phoneNumber,
					cart:[]
				});
			result = 1;
		} catch (e) {
			console.error("Error registrando al usuario: ", e);
		}
		return result;
	};

	/**
	 * Comprueba que está registrado para iniciar sesión en la web
	 * @param user 
	 * @param password 
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
	 * @param user Usuario del que queremos obtener los pedidos
	 * @returns -1 Si hay error
	 * @returns Lista de pedidos realizados 
	 */
	
	async getOrders(user) {
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("orders");
		}
		return result;
	}

	/**
	 * Actualiza la lista de pedidos del usuario
	 * @param user Usuario al que actualizar la lista de pedidos
	 * @param ordersList La lista de pedidos nueva
	 */
	async setOrders(user, ordersList) {
		try{
			updateDoc(Doc(DBManager, "userInfo", user)),{
				orders: ordersList
			}
		} catch(e){
			console.error("Error updating orders: ", e);
		}
	}

	async getPhone(user){
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("user");
		}
		return result;
	}

	async setPhone(user, phoneNumber){
		//TODO
	}

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
		let result = -1;

		if(docSnap.exists()){
			result = await docSnap.get("cart");
		}
		return result;
	}

	async setCart(user, cart){
		//TODO
	}
}
