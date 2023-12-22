
// import { app, db } from './config-firebase.js';
// import { collection, addDoc, getFirestore, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
// import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid'; // Importando a função UUID v4



// let horariosSelecionados = [];
// const colecaoRef = collection(db, 'agendamentos');
// let horarioSelecionado = null; 


// const elemento = document.getElementById('idDoElemento');
// if (elemento !== null) {
//     const valor = elemento.value;
//     // Faça algo com o valor aqui...
// } else {
//     console.error('O elemento com o ID especificado não foi encontrado.');
// }


// function atualizarEventosHorariosDisponiveis() {
//     const horariosDisponiveis = document.querySelectorAll('.horario-label');

//     horariosDisponiveis.forEach(horario => {
//         horario.addEventListener('click', function () {
//             // Remove a classe de todos os horários selecionados anteriormente (se houver algum)
//             const horariosSelecionados = document.querySelectorAll('.horario-selected');
//             horariosSelecionados.forEach(horarioSelecionado => {
//                 horarioSelecionado.classList.remove('horario-selected');
//             });

//             // Adiciona a classe ao horário clicado para destacá-lo como selecionado
//             horario.classList.add('horario-selected');

//             // Armazena o horário selecionado na variável global horarioSelecionado
//             horarioSelecionado = horario.textContent.trim();

//             // Chama a função para habilitar o botão de agendar ou executa outras ações necessárias
//             habilitarBotaoAgendar();
//         });
//     });
// }



// function mostrarHorariosDisponiveis(selectedDates, dateStr, instance) {
//     const hoje = new Date(); // Obtém a data atual
//     const dataSelecionada = new Date(dateStr);
//     const horariosDisponiveis = document.getElementById('horariosDisponiveis');


//     if (dataSelecionada < hoje) {
//         instance.setDate(hoje); // Define a data atual como a data selecionada
//         return;
//     }

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



//         horariosDisponiveis.appendChild(label);
//     }
//     // Após criar os horários disponíveis, atualize os eventos para esses novos elementos
//     atualizarEventosHorariosDisponiveis();

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
//     const nome2 = document.querySelector('nome');
//     const telefone = document.getElementById('telefone').value;
//     const telefone2 = document.querySelector('telefone');
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




//             // Geração de um ID único para o agendamento


//             const idRastreio = uuidv4();


//             const dadosAgendamento = {
//                 idRastreio: idRastreio, // Inclusão do ID único no objeto de agendamento
//                 nome: nome,
//                 telefone: telefone,
//                 procedimentos: procedimentosSelecionados,
//                 dataSelecionada: dataSelecionada,
//                 horariosSelecionados: horariosSelecionados
//             };

//             addDoc(colecaoRef, dadosAgendamento)
//                 .then(() => {

//                     console.log('Agendamento enviado com sucesso!');
//                     const modalContent =
//                         `<div class="modal fade" id="infoAgendamentoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                         <div class="modal-dialog" role="document">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="exampleModalLabel">Detalhes do Agendamento</h5>
//                                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                                         <span aria-hidden="true">&times;</span>
//                                     </button>
//                                 </div>
//                                 <div class="modal-body">
//                                     <p><strong>ID de Rastreamento:</strong> ${dadosAgendamento.idRastreio}</p>
//                                     <p><strong>Nome:</strong> ${dadosAgendamento.nome}</p>
//                                     <p><strong>Telefone:</strong> ${dadosAgendamento.telefone}</p>
//                                     <p><strong>Procedimentos:</strong> ${dadosAgendamento.procedimentos}</p>
//                                     <p><strong>Data Selecionada:</strong> ${dadosAgendamento.dataSelecionada}</p>
//                                     <p><strong>Horários Selecionados:</strong> ${dadosAgendamento.horariosSelecionados}</p>
//                                 </div>
//                                 <div class="modal-footer">
//                                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>`;

//                     // Remove o modal existente antes de inserir um novo
//                     const existingModal = document.getElementById('infoAgendamentoModal');
//                     if (existingModal) {
//                         existingModal.remove();
//                     }

//                     // Adiciona o modal ao final do body do documento
//                     document.body.insertAdjacentHTML('beforeend', modalContent);

//                     // Mostra o modal após o agendamento ser enviado com sucesso
//                     $('#infoAgendamentoModal').modal('show');

//                     // Event listener para fechar o modal ao clicar no botão de fechar
//                     $(document).on('click', '[data-dismiss="modal"]', function () {
//                         $('#infoAgendamentoModal').modal('hide');

//                         // Após fechar o modal, exibir um alerta e atualizar a página
//                         alert('Agendamento realizado com sucesso!');
//                         location.reload(); // Atualiza a página

//                     });

//                     console.log('Agendamento enviado com sucesso!');

//                 })
//                 .catch((error) => {
//                     // Tratamento de erro ao enviar o agendamento
//                     console.error('Erro ao enviar o agendamento:', error);
//                     alert('Erro ao enviar o agendamento. Por favor, tente novamente.');
//                 });
//         });


//     //===================================  AUTENTICAÇÕES


//     // Pega todos os campos que requerem validação
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');


//     // Verifica se todos os campos foram preenchidos ou marcados
//     if (nome2.value.trim() === '' || telefone2.value.trim() === '') {
//         alert('Por favor, preencha todos os campos obrigatórios.');
//         event.preventDefault(); // Impede o envio do formulário se campos estiverem vazios
//         return;
//     }

//     let allChecked = true;
//     checkboxes.forEach(function (checkbox) {
//         if (!checkbox.checked) {
//             allChecked = false;
//         }
//     });

//     if (!allChecked) {
//         alert('Por favor, marque todos os procedimentos desejados.');
//         event.preventDefault(); // Impede o envio do formulário se algum checkbox não estiver marcado
//     }
// });




// //----------------------------------------- Função para gerar um ID único



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

// // =============================   FORMATAÇÃO DO TELEFONE

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



































































































































import { app, db } from './config-firebase.js';
import { collection, addDoc, getFirestore, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid'; // Importando a função UUID v4



let horariosSelecionados = [];
const colecaoRef = collection(db, 'agendamentos');
let horarioSelecionado = null; 


const elemento = document.getElementById('idDoElemento');
if (elemento !== null) {
    const valor = elemento.value;
    // Faça algo com o valor aqui...
} else {
    console.error('O elemento com o ID especificado não foi encontrado.');
}


function atualizarEventosHorariosDisponiveis() {
    const horariosDisponiveis = document.querySelectorAll('.horario-label');

    horariosDisponiveis.forEach(horario => {
        horario.addEventListener('click', function () {
            // Remove a classe de todos os horários selecionados anteriormente (se houver algum)
            const horariosSelecionados = document.querySelectorAll('.horario-selected');
            horariosSelecionados.forEach(horarioSelecionado => {
                horarioSelecionado.classList.remove('horario-selected');
            });

            // Adiciona a classe ao horário clicado para destacá-lo como selecionado
            horario.classList.add('horario-selected');

            // Armazena o horário selecionado na variável global horarioSelecionado
            horarioSelecionado = horario.textContent.trim();

            // Chama a função para habilitar o botão de agendar ou executa outras ações necessárias
            habilitarBotaoAgendar();
        });
    });
}



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



        horariosDisponiveis.appendChild(label);
    }
    // Após criar os horários disponíveis, atualize os eventos para esses novos elementos
    atualizarEventosHorariosDisponiveis();

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
    const nome2 = document.querySelector('nome');
    const telefone = document.getElementById('telefone').value;
    const telefone2 = document.querySelector('telefone');
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




            // Geração de um ID único para o agendamento


            const idRastreio = uuidv4();


            const dadosAgendamento = {
                idRastreio: idRastreio, // Inclusão do ID único no objeto de agendamento
                nome: nome,
                telefone: telefone,
                procedimentos: procedimentosSelecionados,
                dataSelecionada: dataSelecionada,
                horariosSelecionados: horariosSelecionados
            };

            addDoc(colecaoRef, dadosAgendamento)
                .then(() => {

                    console.log('Agendamento enviado com sucesso!');
                    const modalContent =
                        `<div class="modal fade" id="infoAgendamentoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Detalhes do Agendamento</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p><strong>ID de Rastreamento:</strong> ${dadosAgendamento.idRastreio}</p>
                                    <p><strong>Nome:</strong> ${dadosAgendamento.nome}</p>
                                    <p><strong>Telefone:</strong> ${dadosAgendamento.telefone}</p>
                                    <p><strong>Procedimentos:</strong> ${dadosAgendamento.procedimentos}</p>
                                    <p><strong>Data Selecionada:</strong> ${dadosAgendamento.dataSelecionada}</p>
                                    <p><strong>Horários Selecionados:</strong> ${dadosAgendamento.horariosSelecionados}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

                    // Remove o modal existente antes de inserir um novo
                    const existingModal = document.getElementById('infoAgendamentoModal');
                    if (existingModal) {
                        existingModal.remove();
                    }

                    // Adiciona o modal ao final do body do documento
                    document.body.insertAdjacentHTML('beforeend', modalContent);

                    // Mostra o modal após o agendamento ser enviado com sucesso
                    $('#infoAgendamentoModal').modal('show');

                    // Event listener para fechar o modal ao clicar no botão de fechar
                    $(document).on('click', '[data-dismiss="modal"]', function () {
                        $('#infoAgendamentoModal').modal('hide');

                        // Após fechar o modal, exibir um alerta e atualizar a página
                        alert('Agendamento realizado com sucesso!');
                        location.reload(); // Atualiza a página

                    });

                    console.log('Agendamento enviado com sucesso!');

                })
                .catch((error) => {
                    // Tratamento de erro ao enviar o agendamento
                    console.error('Erro ao enviar o agendamento:', error);
                    alert('Erro ao enviar o agendamento. Por favor, tente novamente.');
                });
        });


    //===================================  AUTENTICAÇÕES


    // Pega todos os campos que requerem validação
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');


    // Verifica se todos os campos foram preenchidos ou marcados
    if (nome2.value.trim() === '' || telefone2.value.trim() === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        event.preventDefault(); // Impede o envio do formulário se campos estiverem vazios
        return;
    }

    let allChecked = true;
    checkboxes.forEach(function (checkbox) {
        if (!checkbox.checked) {
            allChecked = false;
        }
    });

    if (!allChecked) {
        alert('Por favor, marque todos os procedimentos desejados.');
        event.preventDefault(); // Impede o envio do formulário se algum checkbox não estiver marcado
    }
});




//----------------------------------------- Função para gerar um ID único



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

// =============================   FORMATAÇÃO DO TELEFONE

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



