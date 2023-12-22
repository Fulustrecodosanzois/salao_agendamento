// import { app, db } from './config-firebase.js';
// import { collection, addDoc, getFirestore, query, where, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";





// //============================ CÓDIGO

// document.addEventListener('DOMContentLoaded', function () {


//     const colecaoRef = collection(db, 'agendamentos');
//     const agendamentosRef = collection(db, 'agendamentos');


//     getDocs(agendamentosRef)
//         .then(querySnapshot => {
//             const agendamentos = querySnapshot.docs.map(doc => doc.data());

//             const agendamentosPorMes = {};

//             agendamentos.forEach((agendamento, index) => {
//                 const date = new Date(agendamento.dataSelecionada + 'Z');
//                 const month = date.toLocaleString('default', { month: 'long' });
//                 const year = date.getUTCFullYear();
//                 const formattedMonth = `${month} ${year}`;

//                 if (!agendamentosPorMes[formattedMonth]) {
//                     agendamentosPorMes[formattedMonth] = {};
//                 }

//                 const day = date.getUTCDate();
//                 if (!agendamentosPorMes[formattedMonth][day]) {
//                     agendamentosPorMes[formattedMonth][day] = [];
//                 }

//                 agendamentosPorMes[formattedMonth][day].push(agendamento);
//             });

//             const sortedMonths = Object.keys(agendamentosPorMes).sort((a, b) => {
//                 const [aMonth, aYear] = a.split(' ');
//                 const [bMonth, bYear] = b.split(' ');
//                 const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

//                 return monthOrder.indexOf(aMonth.toLowerCase()) - monthOrder.indexOf(bMonth.toLowerCase()) || parseInt(aYear) - parseInt(bYear);
//             });


//             const monthTabs = document.getElementById('monthTabs');
//             const monthContent = document.getElementById('monthContent');

//             sortedMonths.forEach(chaveMes => {
//                 const tabId = chaveMes.replace(/\s/g, '');

//                 // Criação das abas para cada mês
//                 monthTabs.innerHTML += `
//             <li class="nav-item w-50" role="presentation">
//                 <button class="nav-link btn btn-primary w-100 fw-bolder" id="${tabId}-tab" data-bs-toggle="tab" data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}" aria-selected="false">${chaveMes}</button>
//             </li>
//         `;

//                 // Criação do conteúdo de cada aba com os agendamentos correspondentes
//                 const agendamentosPorDia = agendamentosPorMes[chaveMes];
//                 let tabContent = `
//             <div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}-tab">
//         `;


//                 for (const chaveDia in agendamentosPorDia) {



//                     tabContent += `
//                 <h4 class="my-4 bg-info rounded p-3">Dia ${chaveDia}</h4>
//                 <div class="row row-cols-1 row-cols-md-3 g-4">
//             `;

//                     const agendamentosDoDia = agendamentosPorDia[chaveDia];
//                     agendamentosDoDia.forEach(agendamento => {
//                         tabContent += `
//                     <div class="col">
//                         <div class="card">
//                             <div class="card-body">

//                                 <p class="card-text">Agendado para: ${agendamento.horariosSelecionados.join(', ')}h</p>
//                                 <p class="card-text">Nome: ${agendamento.nome}</p>
//                                 <p class="card-text">Telefone: ${agendamento.telefone}</p>
//                                 <p class="card-text">Procedimentos:</p>
//                                 <ul class="list-group">

                                


//                                 `;


//                         agendamento.procedimentos.forEach(procedimento => {
//                             tabContent += `
//                         <li class="list-group-item">${procedimento}</li>
//                     `;
                            
//                         });
//                         tabContent += `
//                             <div class="d-flex justify-content-center ">
                                
//                             <button class="btn btn-danger btn-delete my-4" data-index="${agendamentos.indexOf(agendamento)}">Deletar o agendamento</button>

//                             </div>
//                     `;
                        

//                         tabContent += `
//                                 </ul>
//                             </div>
//                             </div>
//                             </div>

//                             <div class="d-grid gap-2 d-md-flex justify-content-md-end">
//                                 <button onclick="topFunctionModal()" id="btnTopModal" title="Voltar ao Topo" class="btn btn-success">Subir</button>
//                             </div>
//                 `;
//                     });

//                     tabContent += `</div>`;
//                 }

//                 tabContent += `</div>`;



                
//                 monthContent.innerHTML += tabContent;
//             });

//             const tabs = new bootstrap.Tab(document.getElementById('monthTabs'));
//             tabs.show(0); // Exibe a primeira aba por padrão ao carregar a página




//             //-------------------------------- Lógica para o botão de EXCLUIR


//             // Função para deletar um agendamento no Firebase
//             function deletarAgendamento(index, colecaoRef) {
//                 const agendamentoSelecionado = agendamentos[index];

//                 // Verifica se o agendamento e seu ID são válidos antes de deletar no Firestore
//                 if (agendamentoSelecionado && agendamentoSelecionado.idRastreio) {
//                     const agendamentoId = agendamentoSelecionado.idRastreio;

//                     const consulta = query(colecaoRef, where("idRastreio", "==", agendamentoId));

//                     getDocs(consulta)
//                         .then((querySnapshot) => {
//                             querySnapshot.forEach((doc) => {
//                                 deleteDoc(doc.ref)
//                                     .then(() => {
//                                         console.log('Agendamento removido do Firebase com sucesso!');
//                                         alert("AGENDAMENTO EXCLUIDO COM SUCESSO!!!")
//                                         agendamentos.splice(index, 1);
//                                         location.reload(); // Recarrega a página após a remoção
//                                     })
//                                     .catch((error) => {
//                                         console.error('Erro ao remover o agendamento do Firebase:', error);
//                                     });
//                             });
//                         })
//                         .catch((error) => {
//                             console.error('Erro ao buscar o agendamento para remoção:', error);
//                         });
//                 } else {
//                     console.error('Agendamento ou ID do agendamento não encontrado!');
//                     // Lidar com a situação em que o agendamento ou seu ID não são encontrados
//                 }
//             }


//             // --------------------- manipuladores de eventos botões editar / deletar


//             document.body.addEventListener('click', function (event) {
//                 if (event.target.classList.contains('btn-delete')) {
//                     const index = parseInt(event.target.getAttribute('data-index'), 10);
//                     if (!isNaN(index)) {
//                         deletarAgendamento(index, colecaoRef); // Chame a função deletarAgendamento passando o índice e a referência da coleção
//                     }
//                 }

//             });



//         });

// });






























































// //=============================== 





















import { app, db } from './config-firebase.js';
import { collection, addDoc, getFirestore, query, where, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";





//============================ CÓDIGO

document.addEventListener('DOMContentLoaded', function () {

    const colecaoRef = collection(db, 'agendamentos');
    const agendamentosRef = collection(db, 'agendamentos');


    getDocs(agendamentosRef)
        .then(querySnapshot => {
            const agendamentos = querySnapshot.docs.map(doc => doc.data());

            const agendamentosPorMes = {};

            agendamentos.forEach((agendamento, index) => {
                const date = new Date(agendamento.dataSelecionada + 'Z');
                const month = date.toLocaleString('default', { month: 'long' });
                const year = date.getUTCFullYear();
                const formattedMonth = `${month} ${year}`;

                if (!agendamentosPorMes[formattedMonth]) {
                    agendamentosPorMes[formattedMonth] = {};
                }

                const day = date.getUTCDate();
                if (!agendamentosPorMes[formattedMonth][day]) {
                    agendamentosPorMes[formattedMonth][day] = [];
                }

                agendamentosPorMes[formattedMonth][day].push(agendamento);
            });

            const sortedMonths = Object.keys(agendamentosPorMes).sort((a, b) => {
                const [aMonth, aYear] = a.split(' ');
                const [bMonth, bYear] = b.split(' ');
                const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

                return monthOrder.indexOf(aMonth.toLowerCase()) - monthOrder.indexOf(bMonth.toLowerCase()) || parseInt(aYear) - parseInt(bYear);
            });


            const monthTabs = document.getElementById('monthTabs');
            const monthContent = document.getElementById('monthContent');

            sortedMonths.forEach(chaveMes => {
                const tabId = chaveMes.replace(/\s/g, '');

                // Criação das abas para cada mês
                monthTabs.innerHTML += `
            <li class="nav-item w-50" role="presentation">
                <button class="nav-link btn btn-primary w-100 fw-bolder" id="${tabId}-tab" data-bs-toggle="tab" data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}" aria-selected="false">${chaveMes}</button>
            </li>
        `;

                // Criação do conteúdo de cada aba com os agendamentos correspondentes
                const agendamentosPorDia = agendamentosPorMes[chaveMes];
                let tabContent = `
            <div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}-tab">
        `;


                for (const chaveDia in agendamentosPorDia) {



                    tabContent += `
                <h4 class="my-4 bg-info rounded p-3">Dia ${chaveDia}</h4>
                <div class="row row-cols-1 row-cols-md-3 g-4">
            `;

                    const agendamentosDoDia = agendamentosPorDia[chaveDia];
                    agendamentosDoDia.forEach(agendamento => {
                        tabContent += `
                    <div class="col">
                        <div class="card">
                            <div class="card-body">

                                <p class="card-text">Agendado para: ${agendamento.horariosSelecionados.join(', ')}h</p>
                                <p class="card-text">Nome: ${agendamento.nome}</p>
                                <p class="card-text">Telefone: ${agendamento.telefone}</p>
                                <p class="card-text">Procedimentos:</p>
                                <ul class="list-group">

                                


                                `;


                        agendamento.procedimentos.forEach(procedimento => {
                            tabContent += `
                        <li class="list-group-item">${procedimento}</li>
                    `;
                            
                        });
                        tabContent += `
                            <div class="d-flex justify-content-center ">
                                
                            <button class="btn btn-danger btn-delete my-4" data-index="${agendamentos.indexOf(agendamento)}">Deletar o agendamento</button>

                            </div>
                    `;
                        

                        tabContent += `
                                </ul>
                            </div>
                            </div>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button onclick="topFunctionModal()" id="btnTopModal" title="Voltar ao Topo" class="btn btn-success">Subir</button>
                            </div>
                `;
                    });

                    tabContent += `</div>`;
                }

                tabContent += `</div>`;



                
                monthContent.innerHTML += tabContent;
            });

            const tabs = new bootstrap.Tab(document.getElementById('monthTabs'));
            tabs.show(0); // Exibe a primeira aba por padrão ao carregar a página


            //-------------------------------- Lógica para o botão de EXCLUIR


            // Função para deletar um agendamento no Firebase
            function deletarAgendamento(index, colecaoRef) {
                const agendamentoSelecionado = agendamentos[index];

                // Verifica se o agendamento e seu ID são válidos antes de deletar no Firestore
                if (agendamentoSelecionado && agendamentoSelecionado.idRastreio) {
                    const agendamentoId = agendamentoSelecionado.idRastreio;

                    const consulta = query(colecaoRef, where("idRastreio", "==", agendamentoId));

                    getDocs(consulta)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                deleteDoc(doc.ref)
                                    .then(() => {
                                        console.log('Agendamento removido do Firebase com sucesso!');
                                        alert("AGENDAMENTO EXCLUIDO COM SUCESSO!!!")
                                        agendamentos.splice(index, 1);
                                        location.reload(); // Recarrega a página após a remoção
                                    })
                                    .catch((error) => {
                                        console.error('Erro ao remover o agendamento do Firebase:', error);
                                    });
                            });
                        })
                        .catch((error) => {
                            console.error('Erro ao buscar o agendamento para remoção:', error);
                        });
                } else {
                    console.error('Agendamento ou ID do agendamento não encontrado!');
                    // Lidar com a situação em que o agendamento ou seu ID não são encontrados
                }
            }


            // --------------------- manipuladores de eventos botões editar / deletar


            document.body.addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10);
                    if (!isNaN(index)) {
                        deletarAgendamento(index, colecaoRef); // Chame a função deletarAgendamento passando o índice e a referência da coleção
                    }
                }

            });



        });

});



//=============================== 









