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
//                                 <div class="d-flex justify-content-between mt-3">
//                                 <button class="btn btn-warning btn-edit my-4" data-index="${agendamentos.indexOf(agendamento)}">Editar</button>
//                                 <button class="btn btn-danger btn-delete my-4" data-index="${agendamentos.indexOf(agendamento)}">Deletar</button>
//                                 </div>


//                                 `;


//                         agendamento.procedimentos.forEach(procedimento => {
//                             tabContent += `
//                         <li class="list-group-item">${procedimento}</li>
//                     `;
//                         });

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




//             //-------------------------------- Lógica para o botão de editar


//             //==========================  adicionar um procedimento a um agendamento /FIREBASE

//             function adicionarProcedimento(index) {
//                 const agendamento = agendamentos[index]; // Obtém o agendamento pelo índice

//                 // Abre um modal para adicionar um novo procedimento ao agendamento
//                 const modalBody = document.getElementById('modalBody');
//                 const modalTitle = document.getElementById('modalTitle');

//                 // Preenche o modal para adicionar procedimento
//                 modalTitle.innerText = `Adicionar Procedimento ao Agendamento do Dia ${agendamento.dataSelecionada}`;
//                 modalBody.innerHTML = `
//             <form id="addProcedimentoForm">
//                 <div class="mb-3">
//                     <label for="novoProcedimento" class="form-label">Novo Procedimento:</label>
//                     <input type="text" class="form-control" id="novoProcedimento">
//                 </div>

//                 <button type="submit" class="btn btn-primary">Adicionar Procedimento</button>
//             </form>
//         `;

//                 const addProcedimentoForm = document.getElementById('addProcedimentoForm');

//                 addProcedimentoForm.addEventListener('submit', function (event) {
//                     event.preventDefault();

//                     const novoProcedimento = document.getElementById('novoProcedimento').value;

//                     // Verifica se o campo do novo procedimento não está vazio
//                     if (novoProcedimento.trim() !== '') {
//                         // Adiciona o novo procedimento ao agendamento localmente
//                         agendamento.procedimentos.push(novoProcedimento);

//                         // Salva as alterações localmente (no localStorage)
//                         salvarAgendamentos();

//                         // Envia as alterações para o Firestore
//                         const colecaoRef = collection(db, 'agendamentos');
//                         const docRef = doc(colecaoRef, agendamento.id); // Suponha que cada agendamento tenha um ID no Firestore

//                         // Atualiza o documento no Firestore com os novos procedimentos
//                         updateDoc(docRef, {
//                             nome: agendamento.nome,
//                             telefone: agendamento.telefone,
//                             procedimentos: agendamento.procedimentos
//                         })
//                             .then(() => {
//                                 // Fecha o modal após a adição
//                                 const modal = new bootstrap.Modal(document.getElementById('editModal'));
//                                 modal.hide();

//                                 // Exibe um alerta de sucesso
//                                 alert('Procedimento adicionado com sucesso!');

//                                 // Recarrega a página para refletir as alterações
//                                 location.reload();
//                             })
//                             .catch((error) => {
//                                 // Em caso de erro, mostra um alerta
//                                 alert('Erro ao adicionar procedimento. Por favor, tente novamente.');
//                                 console.error('Erro ao adicionar procedimento:', error);
//                             });
//                     }
//                 });

//                 // Exibe o modal
//                 const modal = new bootstrap.Modal(document.getElementById('editModal'));
//                 modal.show();
//             }


//             // Função para salvar os agendamentos no localStorage / FIREBASE

//             function salvarAgendamentos() {
//                 const colecaoRef = collection(db, 'agendamentos');
//                 const agendamentosLocal = JSON.parse(localStorage.getItem('dadosAgendamentos')) || [];

//                 agendamentosLocal.forEach(agendamento => {
//                     // Verifica se o ID do agendamento é válido antes de adicionar no Firestore
//                     if (agendamento.id && typeof agendamento.id === 'string' && agendamento.id.trim() !== '') {
//                         addDoc(colecaoRef, agendamento)
//                             .then(() => {
//                                 console.log('Agendamento salvo no Firestore:', agendamento);
//                             })
//                             .catch((error) => {
//                                 console.error('Erro ao salvar agendamento no Firestore:', error);
//                             });
//                     } else {
//                         console.error('ID do agendamento inválido!');
//                         // Lidar com a situação em que o ID do agendamento não é válido
//                     }
//                 });
//             }


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


//             //======================= EDITAR AGENDAMENTO JÁ SALVO / FIREBASE
//             function editarAgendamento(index) {
//                 const agendamento = agendamentos[index];

//                 if (!agendamento || !agendamento.idRastreio) {
//                     console.error('Agendamento inválido ou ID não encontrado.');
//                     console.log('Objeto agendamento:', agendamento);
//                     return;
//                 }

//                 const colecaoRef = collection(db, 'agendamentos');
//                 const docRef = doc(colecaoRef, agendamento.idRastreio);

//                 const modalBody = document.getElementById('modalBody');
//                 const modalTitle = document.getElementById('modalTitle');


//                 modalTitle.innerText = `Editar Agendamento do Dia ${agendamento.dataSelecionada}`;
//                 modalBody.innerHTML = `
//                     <form id="editForm">
//                         <div class="mb-3">
//                             <label for="editNome" class="form-label">Nome:</label>
//                             <input type="text" class="form-control" id="editNome" value="${agendamento.nome}">
//                         </div>
//                         <div class="mb-3">
//                             <label for="editTelefone" class="form-label">Telefone:</label>
//                             <input type="text" class="form-control" id="editTelefone" value="${agendamento.telefone}">
//                         </div>
//                         <div class="mb-3">
//                             <label for="editProcedimentos" class="form-label">Procedimentos:</label>
//                             <ul class="list-group" id="editProcedimentos"></ul>
//                             <div class="input-group mt-3">
//                                 <input type="text" class="form-control" id="newProcedimento" placeholder="Novo Procedimento">
//                                 <button type="button" class="btn btn-primary" id="btnAddProcedimento">Adicionar</button>
//                             </div>
//                         </div>
//                         <button type="submit" class="btn btn-primary">Salvar Alterações</button>
//                     </form>
//                 `;

//                 const editForm = document.getElementById('editForm');
//                 const newProcedimentoInput = document.getElementById('newProcedimento');
//                 const procedimentosList = document.getElementById('editProcedimentos');

//                 editForm.addEventListener('submit', function (event) {
//                     event.preventDefault();

//                     agendamento.nome = document.getElementById('editNome').value;
//                     agendamento.telefone = document.getElementById('editTelefone').value;

//                     updateDoc(docRef, {
//                         nome: agendamento.nome,
//                         telefone: agendamento.telefone,
//                         procedimentos: agendamento.procedimentos
//                     })
//                         .then(() => {
//                             alert("Alterações salvas com sucesso!");
//                             location.reload(); // Recarrega a página após as alterações
//                         })
//                         .catch((error) => {
//                             console.error("Erro ao salvar alterações:", error);
//                             alert("Erro ao salvar alterações. Por favor, tente novamente.");
//                         });
//                 });

//                 const btnAddProcedimento = document.getElementById('btnAddProcedimento');

//                 btnAddProcedimento.addEventListener('click', function () {
//                     const newProcedimentoValue = newProcedimentoInput.value.trim();
//                     if (newProcedimentoValue !== '') {
//                         agendamento.procedimentos.push(newProcedimentoValue);
//                         newProcedimentoInput.value = '';
//                         atualizarListaProcedimentos();
//                     }
//                 });

//                 newProcedimentoInput.addEventListener('keypress', function (event) {
//                     if (event.key === 'Enter') {
//                         const newProcedimentoValue = newProcedimentoInput.value.trim();
//                         if (newProcedimentoValue !== '') {
//                             agendamento.procedimentos.push(newProcedimentoValue);
//                             newProcedimentoInput.value = '';
//                             atualizarListaProcedimentos();
//                         }
//                     }
//                 });


//                 function atualizarListaProcedimentos() {


//                     procedimentosList.innerHTML = '';

//                     agendamento.procedimentos.forEach((procedimento, procedimentoIndex) => {
//                         procedimentosList.innerHTML += `
//                             <li class="list-group-item d-flex justify-content-between">
//                                 <span>${procedimento}</span>
//                                 <button class="btn btn-danger btn-sm btn-delete-procedimento" data-procedimento-index="${procedimentoIndex}">Excluir</button>
//                             </li>
//                         `;
//                     });

//                     const btnsExcluirProcedimento = document.querySelectorAll('.btn-delete-procedimento');

//                     btnsExcluirProcedimento.forEach(btn => {
//                         btn.addEventListener('click', function (event) {
//                             const procedimentoIndex = event.target.getAttribute('data-procedimento-index');
//                             agendamento.procedimentos.splice(procedimentoIndex, 1);
//                             atualizarListaProcedimentos();

//                             if (agendamento.idRastreio && typeof agendamento.idRastreio === 'string' && agendamento.idRastreio.trim() !== '') {
//                                 const colecaoRef = collection(db, 'agendamentos');
//                                 const docRef = doc(colecaoRef, agendamento.idRastreio);

//                                 updateDoc(docRef, {
//                                     procedimentos: agendamento.procedimentos
//                                 })
//                                     .then(() => {
//                                         console.log('Procedimento removido com sucesso no Firestore!');
//                                     })
//                                     .catch(error => {
//                                         console.error('Erro ao remover procedimento no Firestore:', error);
//                                     });
//                             } else {
//                                 console.error('ID do documento inválido!');
//                             }
//                         });
//                     });
//                 }


//                 atualizarListaProcedimentos();

//                 const modal = new bootstrap.Modal(document.getElementById('editModal'));
//                 modal.show();

//                 modal._element.addEventListener('hidden.bs.modal', function () {
//                     location.reload();
//                 });
//             }



//             // --------------------- manipuladores de eventos botões editar / deletar


//             document.body.addEventListener('click', function (event) {
//                 if (event.target.classList.contains('btn-delete')) {
//                     const index = parseInt(event.target.getAttribute('data-index'), 10);
//                     if (!isNaN(index)) {
//                         deletarAgendamento(index, colecaoRef); // Chame a função deletarAgendamento passando o índice e a referência da coleção
//                     }
//                 }

//                 if (event.target.classList.contains('btn-edit')) {
//                     const index = parseInt(event.target.getAttribute('data-index'), 10);
//                     if (!isNaN(index)) {
//                         editarAgendamento(index);
//                     }
//                 }

//                 if (event.target.classList.contains('btn-add-procedimento')) {
//                     const index = parseInt(event.target.getAttribute('data-index'), 10);
//                     if (!isNaN(index)) {
//                         adicionarProcedimento(index);
//                     }
//                 }
//             });



//         });





// })


// //=======================================  VOLTA AO TOPO


// // Função para rolar a página para o topo
// function topFunctionModal() {
//     document.body.scrollTop = 0; // Para navegadores que não suportam 'document.documentElement'
//     document.documentElement.scrollTop = 0; // Para navegadores que suportam 'document.documentElement'
// }






















































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
                                <div class="d-flex justify-content-between mt-3">
                                <button class="btn btn-warning btn-edit my-4" data-index="${agendamentos.indexOf(agendamento)}">Editar</button>
                                <button class="btn btn-danger btn-delete my-4" data-index="${agendamentos.indexOf(agendamento)}">Deletar</button>
                                </div>


                                `;


                        agendamento.procedimentos.forEach(procedimento => {
                            tabContent += `
                        <li class="list-group-item">${procedimento}</li>
                    `;
                        });

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




            //-------------------------------- Lógica para o botão de editar


            //==========================  adicionar um procedimento a um agendamento /FIREBASE

            function adicionarProcedimento(index) {
                const agendamento = agendamentos[index]; // Obtém o agendamento pelo índice

                // Abre um modal para adicionar um novo procedimento ao agendamento
                const modalBody = document.getElementById('modalBody');
                const modalTitle = document.getElementById('modalTitle');

                // Preenche o modal para adicionar procedimento
                modalTitle.innerText = `Adicionar Procedimento ao Agendamento do Dia ${agendamento.dataSelecionada}`;
                modalBody.innerHTML = `
            <form id="addProcedimentoForm">
                <div class="mb-3">
                    <label for="novoProcedimento" class="form-label">Novo Procedimento:</label>
                    <input type="text" class="form-control" id="novoProcedimento">
                </div>
    
                <button type="submit" class="btn btn-primary">Adicionar Procedimento</button>
            </form>
        `;

                const addProcedimentoForm = document.getElementById('addProcedimentoForm');

                addProcedimentoForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    const novoProcedimento = document.getElementById('novoProcedimento').value;

                    // Verifica se o campo do novo procedimento não está vazio
                    if (novoProcedimento.trim() !== '') {
                        // Adiciona o novo procedimento ao agendamento localmente
                        agendamento.procedimentos.push(novoProcedimento);

                        // Salva as alterações localmente (no localStorage)
                        salvarAgendamentos();

                        // Envia as alterações para o Firestore
                        const colecaoRef = collection(db, 'agendamentos');
                        const docRef = doc(colecaoRef, agendamento.id); // Suponha que cada agendamento tenha um ID no Firestore

                        // Atualiza o documento no Firestore com os novos procedimentos
                        updateDoc(docRef, {
                            nome: agendamento.nome,
                            telefone: agendamento.telefone,
                            procedimentos: agendamento.procedimentos
                        })
                            .then(() => {
                                // Fecha o modal após a adição
                                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                                modal.hide();

                                // Exibe um alerta de sucesso
                                alert('Procedimento adicionado com sucesso!');

                                // Recarrega a página para refletir as alterações
                                location.reload();
                            })
                            .catch((error) => {
                                // Em caso de erro, mostra um alerta
                                alert('Erro ao adicionar procedimento. Por favor, tente novamente.');
                                console.error('Erro ao adicionar procedimento:', error);
                            });
                    }
                });

                // Exibe o modal
                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                modal.show();
            }


            // Função para salvar os agendamentos no localStorage / FIREBASE

            function salvarAgendamentos() {
                const colecaoRef = collection(db, 'agendamentos');
                const agendamentosLocal = JSON.parse(localStorage.getItem('dadosAgendamentos')) || [];

                agendamentosLocal.forEach(agendamento => {
                    // Verifica se o ID do agendamento é válido antes de adicionar no Firestore
                    if (agendamento.id && typeof agendamento.id === 'string' && agendamento.id.trim() !== '') {
                        addDoc(colecaoRef, agendamento)
                            .then(() => {
                                console.log('Agendamento salvo no Firestore:', agendamento);
                            })
                            .catch((error) => {
                                console.error('Erro ao salvar agendamento no Firestore:', error);
                            });
                    } else {
                        console.error('ID do agendamento inválido!');
                        // Lidar com a situação em que o ID do agendamento não é válido
                    }
                });
            }


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


            //======================= EDITAR AGENDAMENTO JÁ SALVO / FIREBASE
            function editarAgendamento(index) {
                const agendamento = agendamentos[index];

                if (!agendamento || !agendamento.idRastreio) {
                    console.error('Agendamento inválido ou ID não encontrado.');
                    console.log('Objeto agendamento:', agendamento);
                    return;
                }

                const colecaoRef = collection(db, 'agendamentos');
                const docRef = doc(colecaoRef, agendamento.idRastreio);

                const modalBody = document.getElementById('modalBody');
                const modalTitle = document.getElementById('modalTitle');


                modalTitle.innerText = `Editar Agendamento do Dia ${agendamento.dataSelecionada}`;
                modalBody.innerHTML = `
                    <form id="editForm">
                        <div class="mb-3">
                            <label for="editNome" class="form-label">Nome:</label>
                            <input type="text" class="form-control" id="editNome" value="${agendamento.nome}">
                        </div>
                        <div class="mb-3">
                            <label for="editTelefone" class="form-label">Telefone:</label>
                            <input type="text" class="form-control" id="editTelefone" value="${agendamento.telefone}">
                        </div>
                        <div class="mb-3">
                            <label for="editProcedimentos" class="form-label">Procedimentos:</label>
                            <ul class="list-group" id="editProcedimentos"></ul>
                            <div class="input-group mt-3">
                                <input type="text" class="form-control" id="newProcedimento" placeholder="Novo Procedimento">
                                <button type="button" class="btn btn-primary" id="btnAddProcedimento">Adicionar</button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </form>
                `;

                const editForm = document.getElementById('editForm');
                const newProcedimentoInput = document.getElementById('newProcedimento');
                const procedimentosList = document.getElementById('editProcedimentos');

                editForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    agendamento.nome = document.getElementById('editNome').value;
                    agendamento.telefone = document.getElementById('editTelefone').value;

                    updateDoc(docRef, {
                        nome: agendamento.nome,
                        telefone: agendamento.telefone,
                        procedimentos: agendamento.procedimentos
                    })
                        .then(() => {
                            alert("Alterações salvas com sucesso!");
                            location.reload(); // Recarrega a página após as alterações
                        })
                        .catch((error) => {
                            console.error("Erro ao salvar alterações:", error);
                            alert("Erro ao salvar alterações. Por favor, tente novamente.");
                        });
                });

                const btnAddProcedimento = document.getElementById('btnAddProcedimento');

                btnAddProcedimento.addEventListener('click', function () {
                    const newProcedimentoValue = newProcedimentoInput.value.trim();
                    if (newProcedimentoValue !== '') {
                        agendamento.procedimentos.push(newProcedimentoValue);
                        newProcedimentoInput.value = '';
                        atualizarListaProcedimentos();
                    }
                });

                newProcedimentoInput.addEventListener('keypress', function (event) {
                    if (event.key === 'Enter') {
                        const newProcedimentoValue = newProcedimentoInput.value.trim();
                        if (newProcedimentoValue !== '') {
                            agendamento.procedimentos.push(newProcedimentoValue);
                            newProcedimentoInput.value = '';
                            atualizarListaProcedimentos();
                        }
                    }
                });


                function atualizarListaProcedimentos() {


                    procedimentosList.innerHTML = '';

                    agendamento.procedimentos.forEach((procedimento, procedimentoIndex) => {
                        procedimentosList.innerHTML += `
                            <li class="list-group-item d-flex justify-content-between">
                                <span>${procedimento}</span>
                                <button class="btn btn-danger btn-sm btn-delete-procedimento" data-procedimento-index="${procedimentoIndex}">Excluir</button>
                            </li>
                        `;
                    });

                    const btnsExcluirProcedimento = document.querySelectorAll('.btn-delete-procedimento');

                    btnsExcluirProcedimento.forEach(btn => {
                        btn.addEventListener('click', function (event) {
                            const procedimentoIndex = event.target.getAttribute('data-procedimento-index');
                            agendamento.procedimentos.splice(procedimentoIndex, 1);
                            atualizarListaProcedimentos();

                            if (agendamento.idRastreio && typeof agendamento.idRastreio === 'string' && agendamento.idRastreio.trim() !== '') {
                                const colecaoRef = collection(db, 'agendamentos');
                                const docRef = doc(colecaoRef, agendamento.idRastreio);

                                updateDoc(docRef, {
                                    procedimentos: agendamento.procedimentos
                                })
                                    .then(() => {
                                        console.log('Procedimento removido com sucesso no Firestore!');
                                    })
                                    .catch(error => {
                                        console.error('Erro ao remover procedimento no Firestore:', error);
                                    });
                            } else {
                                console.error('ID do documento inválido!');
                            }
                        });
                    });
                }


                atualizarListaProcedimentos();

                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                modal.show();

                modal._element.addEventListener('hidden.bs.modal', function () {
                    location.reload();
                });
            }



            // --------------------- manipuladores de eventos botões editar / deletar


            document.body.addEventListener('click', function (event) {
                if (event.target.classList.contains('btn-delete')) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10);
                    if (!isNaN(index)) {
                        deletarAgendamento(index, colecaoRef); // Chame a função deletarAgendamento passando o índice e a referência da coleção
                    }
                }

                if (event.target.classList.contains('btn-edit')) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10);
                    if (!isNaN(index)) {
                        editarAgendamento(index);
                    }
                }

                if (event.target.classList.contains('btn-add-procedimento')) {
                    const index = parseInt(event.target.getAttribute('data-index'), 10);
                    if (!isNaN(index)) {
                        adicionarProcedimento(index);
                    }
                }
            });



        });





})


//=======================================  VOLTA AO TOPO


// Função para rolar a página para o topo
function topFunctionModal() {
    document.body.scrollTop = 0; // Para navegadores que não suportam 'document.documentElement'
    document.documentElement.scrollTop = 0; // Para navegadores que suportam 'document.documentElement'
}


//=============================== 









