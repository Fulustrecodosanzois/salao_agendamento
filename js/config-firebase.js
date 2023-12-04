// Importar as funções necessárias dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Configuração do Firebase para o seu aplicativo da web
const firebaseConfig = {
    apiKey: "AIzaSyCx_BnG-rWyX4VbRkeWFCnGdQ4KY5SMzmE",
    authDomain: "salao-43b7d.firebaseapp.com",
    projectId: "salao-43b7d",
    storageBucket: "salao-43b7d.appspot.com",
    messagingSenderId: "756116065361",
    appId: "1:756116065361:web:7695977313a71c4413fc70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; 