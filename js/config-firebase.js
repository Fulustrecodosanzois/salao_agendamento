// Importar as funções necessárias dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Configuração do Firebase para o seu aplicativo da web
const firebaseConfig = {
    apiKey: "AIzaSyB5S4ENke_2XupAsHTxUUHiwHy184Re0Ns",
    authDomain: "agendamento-39c98.firebaseapp.com",
    projectId: "agendamento-39c98",
    storageBucket: "agendamento-39c98.appspot.com",
    messagingSenderId: "209641895513",
    appId: "1:209641895513:web:6e5e31606d6e27a15ae348"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; 