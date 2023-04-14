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
	 * Registra el usuario con los datos proporcionados
	 * Te devuelve un valor numérico para asegurarte que ha sido correcto
	 * 0 es error
	 * 1 es correcto
	 */
	registerUser(user, password) {
		let result = 0;
		try {
			setDoc(doc(DBManager.BD, "userInfo", user),
				{
					password: password,
					user: user
				});
			result = 1;
		} catch (e) {
			console.error("Error registrando al usuario: ", e);
		}
		return result;
	};

	/**
	 * El método loginUser necesita 2 parametros, el usuario y la contraseña,
	 * este comprueba que esté registrado, en caso de error de las credenciales
	 * te devuelve el valor numérico 0, y en caso del usuario no existir te devuelve -1.
	 * En el caso de haber acertado te devuelve un objeto con los parametros:
	 * user y password
	 */
	async loginUser(user, password) {
		const docRef = doc(DBManager.BD, "userInfo", user);
		const docSnap = await getDoc(docRef);
		let userResult= 0;

		if (docSnap.exists()) {
			if (password == docSnap.get("password")) {
				userResult =
				{
					password: password,
					user: user
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
}
