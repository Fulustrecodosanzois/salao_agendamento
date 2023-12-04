

// // Importando as configurações do Firebase
// import { db } from './config-firebase.js';
// import { addDoc, collection, serverTimestamp, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// // Função para obter o nome do mês a partir do número do mês
// function getMonthName(monthNumber) {
//     const months = [
//         "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//         "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//     ];
//     return months[monthNumber - 1];
// }

// // Capturando o formulário
// const form = document.getElementById('appointmentForm');

// // Adicionando um ouvinte de evento para o envio do formulário
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // Capturando os valores do formulário
//     const nome = document.getElementById('floatingInput').value;
//     const procedimentoValue = document.getElementById('procedureSelect').value;
//     const procedimentoText = document.getElementById('procedureSelect').options[document.getElementById('procedureSelect').selectedIndex].text;

//     // Obtendo a data atual para organizar por mês
//     const dataAtual = new Date();
//     const ano = dataAtual.getFullYear();
//     const mes = dataAtual.getMonth() + 1; // Mês atual (de 0 a 11, por isso +1)
//     const nomeMes = getMonthName(mes); // Obtendo o nome do mês

//     // Criando um objeto para armazenar os dados do agendamento
//     const appointmentData = {
//         nome,
//         procedimento: {
//             valor: procedimentoValue,
//             nome: procedimentoText
//         },
//         timestamp: serverTimestamp() // Adicionando um timestamp do servidor do Firebase
//     };

//     try {
//         // Verificando se a pasta do mês já existe, se não, criamos ela
//         const monthRef = collection(db, 'appointments', `${ano}`, nomeMes);
//         const monthSnapshot = await getDocs(monthRef);

//         if (monthSnapshot.empty) {
//             // Se a pasta do mês não existir, a criamos
//             await addDoc(monthRef, { createdOn: Timestamp.fromDate(new Date()) });
//         }

//         // Adicionando os dados do agendamento ao Firestore dentro da pasta do mês correspondente
//         const docRef = await addDoc(monthRef, appointmentData);
//         console.log("Document written with ID: ", docRef.id);

//         // Limpar o formulário após o envio
//         form.reset();
//     } catch (error) {
//         console.error("Error adding document: ", error);
//     }
// });




























// Importando as configurações do Firebase
import { db } from './config-firebase.js';
import { addDoc, collection, serverTimestamp, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Função para obter o nome do mês a partir do número do mês
function getMonthName(monthNumber) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return months[monthNumber - 1];
}

// Capturando o formulário
const form = document.getElementById('appointmentForm');

// Adicionando um ouvinte de evento para o envio do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando os valores do formulário
    const nome = document.getElementById('floatingInput').value;
    const procedimentoValue = document.getElementById('procedureSelect').value;
    const procedimentoText = document.getElementById('procedureSelect').options[document.getElementById('procedureSelect').selectedIndex].text;

    // Obtendo a data atual para organizar por mês
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; // Mês atual (de 0 a 11, por isso +1)
    const nomeMes = getMonthName(mes); // Obtendo o nome do mês

    // Criando um objeto para armazenar os dados do agendamento
    const appointmentData = {
        nome,
        procedimento: {
            valor: procedimentoValue,
            nome: procedimentoText
        },
        timestamp: serverTimestamp() // Adicionando um timestamp do servidor do Firebase
    };

    try {
        // Verificando se a pasta do mês já existe, se não, criamos ela
        const monthRef = collection(db, 'appointments', `${ano}`, nomeMes);
        const monthSnapshot = await getDocs(monthRef);

        if (monthSnapshot.empty) {
            // Se a pasta do mês não existir, a criamos
            await addDoc(monthRef, { createdOn: Timestamp.fromDate(new Date()) });
        }

        // Adicionando os dados do agendamento ao Firestore dentro da pasta do mês correspondente
        const docRef = await addDoc(monthRef, appointmentData);
        console.log("Document written with ID: ", docRef.id);

        // Limpar o formulário após o envio
        form.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

