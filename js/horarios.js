// Importando as configurações do Firebase
import { db } from './config-firebase.js';
import { collection, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Função para obter o nome do mês a partir do número do mês
function getMonthName(monthNumber) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return months[monthNumber - 1];
}

// Função para exibir os agendamentos na página HTML
// ... (código anterior)

// Função para exibir os agendamentos na página HTML
async function displayAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');

    try {
        // Obtendo a data atual para organizar por mês
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth() + 1; // Mês atual (de 0 a 11, por isso +1)
        const nomeMes = getMonthName(mes); // Obtendo o nome do mês

        // Referência à coleção do mês atual no Firestore
        const monthRef = collection(db, 'appointments', `${ano}`, nomeMes);
        const querySnapshot = await getDocs(monthRef);

        // Exibindo os agendamentos na página HTML
        querySnapshot.forEach((doc) => {
            const appointmentData = doc.data();

            // Verificando se os dados do documento são válidos antes de acessar
            if (appointmentData && appointmentData.nome && appointmentData.procedimento) {
                const appointmentElement = document.createElement('div');
                appointmentElement.classList.add('card', 'my-2');
                appointmentElement.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${appointmentData.nome}</h5>
                        <p class="card-text">Procedimento: ${appointmentData.procedimento.nome}</p>
                        <p class="card-text">Valor: ${appointmentData.procedimento.valor}</p>
                        <p class="card-text">Timestamp: ${appointmentData.timestamp.toDate()}</p>
                    </div>
                `;
                appointmentsList.appendChild(appointmentElement);
            } else {
                console.error("Invalid appointment data:", appointmentData);
            }
        });
    } catch (error) {
        console.error("Error getting appointments: ", error);
    }
}

// Chamar a função para exibir os agendamentos ao carregar a página
document.addEventListener('DOMContentLoaded', displayAppointments);
