// import { app, db } from './config-firebase.js';
// import { collection, addDoc, getFirestore, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";





// let horariosSelecionados = [];
// let colecaoRef;
// let horarioSelecionado; // Declare a variável globalmente


// function mostrarHorariosDisponiveis(selectedDates, dateStr, instance) {
//     const dataSelecionada = new Date(dateStr);
//     const horariosDisponiveis = document.getElementById('horariosDisponiveis');

//     // Limpar os horários disponíveis anteriores
//     horariosDisponiveis.innerHTML = '';

//     // Obter os agendamentos para a data selecionada
//     let agendamentos = localStorage.getItem('dadosAgendamentos');
//     agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//     const horariosAgendadosNessaData = agendamentos
//         .filter(agendamento => agendamento.dataSelecionada === dateStr)
//         .flatMap(agendamento => agendamento.horariosSelecionados);

//     // Criar e exibir os horários disponíveis para o dia selecionado
//     for (let hora = 8; hora <= 19; hora++) {
//         const horario = new Date(dataSelecionada);
//         horario.setHours(hora, 0, 0, 0);

//         const horarioFormatado = horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         const label = document.createElement('label');
//         label.textContent = horarioFormatado;
//         label.classList.add('btn', 'btn-light', 'horario-label');

//         // Desabilitar horários já agendados
//         if (!horariosAgendadosNessaData.includes(horarioFormatado)) {
//             label.addEventListener('click', function () {
//                 if (horarioSelecionado !== horarioFormatado) {
//                     const horarioSelecionadoElement = document.querySelector('.horario-selected');
//                     if (horarioSelecionadoElement) {
//                         horarioSelecionadoElement.classList.remove('horario-selected');
//                     }
//                     label.classList.add('horario-selected');
//                     horarioSelecionado = horarioFormatado;
//                     habilitarBotaoAgendar();
//                 } else {
//                     label.classList.remove('horario-selected');
//                     horarioSelecionado = null;
//                     habilitarBotaoAgendar();
//                 }
//             });
//         }

//         horariosDisponiveis.appendChild(label);
//     }

//     colecaoRef = collection(db, 'nome_da_sua_colecao'); // Substitua 'nome_da_sua_colecao' pelo nome correto da sua coleção no Firestore

// }


// function habilitarBotaoAgendar() {
//     const btnEnviar = document.getElementById('btnEnviar');
//     btnEnviar.disabled = horarioSelecionado === null;
// }

// document.addEventListener('DOMContentLoaded', function () {
//     flatpickr("#datePicker", {
//         dateFormat: 'Y-m-d',
//         onChange: mostrarHorariosDisponiveis
//     });

//     document.getElementById('btnEnviar').addEventListener('click', function () {
//         const horarios = document.querySelectorAll('.horario-selected');
//         horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

//         console.log('Horários selecionados:', horariosSelecionados);
//     });
// });

// // ======================  ARMAZENAMENTO NO LOCALSTORAGE



// document.getElementById('btnEnviar').addEventListener('click', function (event) {
//     event.preventDefault();

//     const horarios = document.querySelectorAll('.horario-selected');
//     const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

//     console.log('Horários selecionados:', horariosSelecionados);

//     // Restante do código de validação permanece igual

//     const nome = document.getElementById('nome').value;
//     const telefone = document.getElementById('telefone').value;
//     const procedimentosSelecionados = [];
//     const procedimentos = document.querySelectorAll('.form-check-input:checked');
//     procedimentos.forEach(procedimento => {
//         procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
//     });
//     const dataSelecionada = document.getElementById('datePicker').value;

//     // Verificação dos horários selecionados na base de dados
//     const q = query(colecaoRef, where('dataSelecionada', '==', dataSelecionada));
//     getDocs(q)
//         .then((querySnapshot) => {
//             let horariosJaAgendados = false;
//             querySnapshot.forEach((doc) => {
//                 const dados = doc.data();
//                 const horariosAgendados = dados.horariosSelecionados;
//                 horariosSelecionados.forEach((horarioSelecionado) => {
//                     if (horariosAgendados.includes(horarioSelecionado)) {
//                         horariosJaAgendados = true;
//                     }
//                 });
//             });

//             if (horariosJaAgendados) {
//                 alert('Desculpe, este horário já foi agendado por outra pessoa.');
//                 return;
//             }

//             // Continuação do código de envio para o Firestore permanece igual

//             const dadosAgendamento = {
//                 idRastreio: generateUniqueID(),
//                 nome: nome,
//                 telefone: telefone,
//                 procedimentos: procedimentosSelecionados,
//                 dataSelecionada: dataSelecionada,
//                 horariosSelecionados: horariosSelecionados
//             };

//             addDoc(colecaoRef, dadosAgendamento)
//                 .then(() => {
//                     // Limpar os campos do formulário após o agendamento ser enviado com sucesso
//                     document.getElementById('nome').value = '';
//                     document.getElementById('telefone').value = '';
//                     // ... (limpar outros campos, se necessário)

//                     console.log('Agendamento enviado com sucesso!');
//                     alert("AGENDAMENTO REALIZADO COM SUCESSO! OBRIGADO!");
//                 })
//                 .catch((error) => {
//                     console.error('Erro ao enviar o agendamento:', error);
//                     alert("Ocorreu um erro ao realizar o agendamento. Tente novamente.");
//                 });
//         })
//         .catch((error) => {
//             console.error('Erro ao verificar horários agendados:', error);
//             alert("Ocorreu um erro ao verificar os horários agendados. Tente novamente.");
//         });
// });

// // Função para gerar um ID único (você pode usar uma biblioteca externa ou implementar a sua lógica para criar IDs únicos)
// function generateUniqueID() {
//     // Implemente sua lógica para gerar um ID único, por exemplo:
//     return 'ID-' + Math.random().toString(36).substr(2, 9);
// }


// //=========================== FORMATAR TELEFONE


// // Função para formatar o número de telefone enquanto o usuário digita
// const telefoneInput = document.getElementById('telefone');
// telefoneInput.addEventListener('input', function (event) {
//     const input = event.target;
//     const value = input.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
//     const formattedValue = formatarTelefone(value); // Formata o número de telefone
//     input.value = formattedValue;
// });

// function formatarTelefone(value) {
//     // Expressão regular para formatar o telefone no padrão (XX) XXXXX XXXX
//     const regex = /^(\d{2})(\d{1})(\d{4})(\d{4})$/;
//     const subst = '($1) $2 $3 $4';
//     return value.replace(regex, subst);
// }


// // Função para carregar os horários disponíveis e bloquear os já agendados
// function carregarHorariosDisponiveis() {
//     // Obter a data selecionada
//     const dataSelecionada = document.getElementById('datePicker').value;

//     // Obter os dados do localStorage se já houver algum agendamento
//     let agendamentos = localStorage.getItem('dadosAgendamentos');
//     agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//     const horariosAgendadosNessaData = agendamentos
//         .filter(agendamento => agendamento.dataSelecionada === dataSelecionada)
//         .flatMap(agendamento => agendamento.horariosSelecionados);

//     const horariosDisponiveis = document.querySelectorAll('.horario-disponivel');

//     // Exibir apenas os horários disponíveis (não agendados) para essa data
//     horariosDisponiveis.forEach(horario => {
//         if (horariosAgendadosNessaData.includes(horario.textContent)) {
//             horario.style.display = 'none';
//         } else {
//             horario.style.display = 'block';
//         }
//     });
// }

// // Chamar a função quando a data for alterada no datepicker
// document.getElementById('datePicker').addEventListener('change', carregarHorariosDisponiveis);

// // Chamar a função para carregar os horários disponíveis inicialmente
// carregarHorariosDisponiveis();


// // Evento de confirmação dentro do modal
// document.getElementById('btnConfirmar').addEventListener('click', function () {
//     // Adicione a lógica de confirmação (ex: enviar dados para o servidor, etc.)
//     // Feche o modal de confirmação se necessário
//     const modalConfirmacao = bootstrap.Modal.getInstance(document.getElementById('modalConfirmacao'));
//     modalConfirmacao.hide();

//     alert("AGENDAMENTO REALIZADO COM SUCESSO! OBRIGADO!")

// });
























//=============================================================





















import { app, db } from './config-firebase.js';
import { collection, addDoc, getFirestore, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";





let horariosSelecionados = [];
let colecaoRef;
let horarioSelecionado; // Declare a variável globalmente


function mostrarHorariosDisponiveis(selectedDates, dateStr, instance) {
    const hoje = new Date(); // Obtém a data atual
    const dataSelecionada = new Date(dateStr);
    const horariosDisponiveis = document.getElementById('horariosDisponiveis');


    if (dataSelecionada < hoje) {
        instance.setDate(hoje); // Define a data atual como a data selecionada
        return;
    }

    // Limpar os horários disponíveis anteriores
    horariosDisponiveis.innerHTML = '';

    // Obter os agendamentos para a data selecionada
    let agendamentos = localStorage.getItem('dadosAgendamentos');
    agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

    const horariosAgendadosNessaData = agendamentos
        .filter(agendamento => agendamento.dataSelecionada === dateStr)
        .flatMap(agendamento => agendamento.horariosSelecionados);

    // Criar e exibir os horários disponíveis para o dia selecionado
    for (let hora = 8; hora <= 19; hora++) {
        const horario = new Date(dataSelecionada);
        horario.setHours(hora, 0, 0, 0);

        const horarioFormatado = horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const label = document.createElement('label');
        label.textContent = horarioFormatado;
        label.classList.add('btn', 'btn-light', 'horario-label');

        // Desabilitar horários já agendados
        if (!horariosAgendadosNessaData.includes(horarioFormatado)) {
            label.addEventListener('click', function () {
                if (horarioSelecionado !== horarioFormatado) {
                    const horarioSelecionadoElement = document.querySelector('.horario-selected');
                    if (horarioSelecionadoElement) {
                        horarioSelecionadoElement.classList.remove('horario-selected');
                    }
                    label.classList.add('horario-selected');
                    horarioSelecionado = horarioFormatado;
                    habilitarBotaoAgendar();
                } else {
                    label.classList.remove('horario-selected');
                    horarioSelecionado = null;
                    habilitarBotaoAgendar();
                }
            });
        }

        horariosDisponiveis.appendChild(label);
    }

    colecaoRef = collection(db, 'nome_da_sua_colecao'); // Substitua 'nome_da_sua_colecao' pelo nome correto da sua coleção no Firestore

}


function habilitarBotaoAgendar() {
    const btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.disabled = horarioSelecionado === null;
}

document.addEventListener('DOMContentLoaded', function () {
    flatpickr("#datePicker", {
        dateFormat: 'Y-m-d',
        onChange: mostrarHorariosDisponiveis
    });

    document.getElementById('btnEnviar').addEventListener('click', function () {
        const horarios = document.querySelectorAll('.horario-selected');
        horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

        console.log('Horários selecionados:', horariosSelecionados);
    });
});

// ======================  ARMAZENAMENTO NO LOCALSTORAGE



document.getElementById('btnEnviar').addEventListener('click', function (event) {
    event.preventDefault();

    const horarios = document.querySelectorAll('.horario-selected');
    const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

    console.log('Horários selecionados:', horariosSelecionados);

    // Restante do código de validação permanece igual

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const procedimentosSelecionados = [];
    const procedimentos = document.querySelectorAll('.form-check-input:checked');
    procedimentos.forEach(procedimento => {
        procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
    });
    const dataSelecionada = document.getElementById('datePicker').value;

    // Verificação dos horários selecionados na base de dados
    const q = query(colecaoRef, where('dataSelecionada', '==', dataSelecionada));
    getDocs(q)
        .then((querySnapshot) => {
            let horariosJaAgendados = false;
            querySnapshot.forEach((doc) => {
                const dados = doc.data();
                const horariosAgendados = dados.horariosSelecionados;
                horariosSelecionados.forEach((horarioSelecionado) => {
                    if (horariosAgendados.includes(horarioSelecionado)) {
                        horariosJaAgendados = true;
                    }
                });
            });

            if (horariosJaAgendados) {
                alert('Desculpe, este horário já foi agendado por outra pessoa.');
                return;
            }

            // Continuação do código de envio para o Firestore permanece igual

            const dadosAgendamento = {
                idRastreio: generateUniqueID(),
                nome: nome,
                telefone: telefone,
                procedimentos: procedimentosSelecionados,
                dataSelecionada: dataSelecionada,
                horariosSelecionados: horariosSelecionados
            };

            addDoc(colecaoRef, dadosAgendamento)
                .then(() => {
                    // Limpar os campos do formulário após o agendamento ser enviado com sucesso
                    document.getElementById('nome').value = '';
                    document.getElementById('telefone').value = '';
                    // ... (limpar outros campos, se necessário)

                    console.log('Agendamento enviado com sucesso!');
                    alert("AGENDAMENTO REALIZADO COM SUCESSO! OBRIGADO!");

                    
                })
                .catch((error) => {
                    console.error('Erro ao enviar o agendamento:', error);
                    alert("Ocorreu um erro ao realizar o agendamento. Tente novamente.");
                });
        })
        .catch((error) => {
            console.error('Erro ao verificar horários agendados:', error);
            alert("Ocorreu um erro ao verificar os horários agendados. Tente novamente.");
        });
});

// Função para gerar um ID único (você pode usar uma biblioteca externa ou implementar a sua lógica para criar IDs únicos)
function generateUniqueID() {
    // Implemente sua lógica para gerar um ID único, por exemplo:
    return 'ID-' + Math.random().toString(36).substr(2, 9);
}


//=========================== FORMATAR TELEFONE


// Função para formatar o número de telefone enquanto o usuário digita
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', function (event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    const formattedValue = formatarTelefone(value); // Formata o número de telefone
    input.value = formattedValue;
});

function formatarTelefone(value) {
    // Expressão regular para formatar o telefone no padrão (XX) XXXXX XXXX
    const regex = /^(\d{2})(\d{1})(\d{4})(\d{4})$/;
    const subst = '($1) $2 $3 $4';
    return value.replace(regex, subst);
}


// Função para carregar os horários disponíveis e bloquear os já agendados
function carregarHorariosDisponiveis() {
    // Obter a data selecionada
    const dataSelecionada = document.getElementById('datePicker').value;

    // Obter os dados do localStorage se já houver algum agendamento
    let agendamentos = localStorage.getItem('dadosAgendamentos');
    agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

    const horariosAgendadosNessaData = agendamentos
        .filter(agendamento => agendamento.dataSelecionada === dataSelecionada)
        .flatMap(agendamento => agendamento.horariosSelecionados);

    const horariosDisponiveis = document.querySelectorAll('.horario-disponivel');

    // Exibir apenas os horários disponíveis (não agendados) para essa data
    horariosDisponiveis.forEach(horario => {
        if (horariosAgendadosNessaData.includes(horario.textContent)) {
            horario.style.display = 'none';
        } else {
            horario.style.display = 'block';
        }
    });
}

// Chamar a função quando a data for alterada no datepicker
document.getElementById('datePicker').addEventListener('change', carregarHorariosDisponiveis);

// Chamar a função para carregar os horários disponíveis inicialmente
carregarHorariosDisponiveis();


// Evento de confirmação dentro do modal
document.getElementById('btnConfirmar').addEventListener('click', function () {
    // Adicione a lógica de confirmação (ex: enviar dados para o servidor, etc.)
    // Feche o modal de confirmação se necessário
    const modalConfirmacao = bootstrap.Modal.getInstance(document.getElementById('modalConfirmacao'));
    modalConfirmacao.hide();

    alert("AGENDAMENTO REALIZADO COM SUCESSO! OBRIGADO!")

});

































