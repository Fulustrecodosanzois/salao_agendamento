// document.addEventListener('DOMContentLoaded', function () {
//     let agendamentos = localStorage.getItem('dadosAgendamentos');
//     agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//     const agendamentosPorMes = {};

//     agendamentos.forEach((agendamento, index) => {
//         const date = new Date(agendamento.dataSelecionada);
//         const month = date.toLocaleString('default', { month: 'long' });
//         const year = date.getFullYear();
//         const formattedMonth = `${month} ${year}`;

//         if (!agendamentosPorMes[formattedMonth]) {
//             agendamentosPorMes[formattedMonth] = {};
//         }

//         const day = date.getDate();
//         if (!agendamentosPorMes[formattedMonth][day]) {
//             agendamentosPorMes[formattedMonth][day] = [];
//         }

//         agendamentosPorMes[formattedMonth][day].push(agendamento);
//     });

//     const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

//     const sortedMonths = Object.keys(agendamentosPorMes).sort((a, b) => {
//         const aIndex = monthOrder.indexOf(a.split(' ')[0].toLowerCase());
//         const bIndex = monthOrder.indexOf(b.split(' ')[0].toLowerCase());
//         return aIndex - bIndex;
//     });

//     const monthTabs = document.getElementById('monthTabs');
//     const monthContent = document.getElementById('monthContent');

//     sortedMonths.forEach(chaveMes => {
//         const tabId = chaveMes.replace(/\s/g, '');

//         // Criação das abas para cada mês
//         monthTabs.innerHTML += `
//             <li class="nav-item w-50" role="presentation">
//                 <button class="nav-link btn btn-primary w-100 fw-bolder" id="${tabId}-tab" data-bs-toggle="tab" data-bs-target="#${tabId}" type="button" role="tab" aria-controls="${tabId}" aria-selected="false">${chaveMes}</button>
//             </li>
//         `;

//         // Criação do conteúdo de cada aba com os agendamentos correspondentes
//         const agendamentosPorDia = agendamentosPorMes[chaveMes];
//         let tabContent = `
//             <div class="tab-pane fade" id="${tabId}" role="tabpanel" aria-labelledby="${tabId}-tab">
//         `;

//         for (const chaveDia in agendamentosPorDia) {
//             tabContent += `
//                 <h4 class="my-4 bg-info rounded p-3">Dia ${chaveDia}</h4>
//                 <div class="row row-cols-1 row-cols-md-3 g-4">
//             `;

//             const agendamentosDoDia = agendamentosPorDia[chaveDia];
//             agendamentosDoDia.forEach(agendamento => {
//                 tabContent += `
//                     <div class="col">
//                         <div class="card">
//                             <div class="card-body">

//                                 <p class="card-text">Agendado para: ${agendamento.horariosSelecionados.join(', ')}h</p>
//                                 <p class="card-text">Nome: ${agendamento.nome}</p>
//                                 <p class="card-text">Telefone: ${agendamento.telefone}</p>
//                                 <p class="card-text">Procedimentos:</p>
//                                 <ul class="list-group">`;

//                 agendamento.procedimentos.forEach(procedimento => {
//                     tabContent += `
//                         <li class="list-group-item">${procedimento}</li>
//                     `;
//                 });

//                 tabContent += `
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             });

//             tabContent += `</div>`;
//         }

//         tabContent += `</div>`;
//         monthContent.innerHTML += tabContent;
//     });

//     const tabs = new bootstrap.Tab(document.getElementById('monthTabs'));
//     tabs.show(0); // Exibe a primeira aba por padrão ao carregar a página


// });














//=======================================================











document.addEventListener('DOMContentLoaded', function () {
    let agendamentos = localStorage.getItem('dadosAgendamentos');
    agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

    const agendamentosPorMes = {};

    agendamentos.forEach((agendamento, index) => {
        const date = new Date(agendamento.dataSelecionada);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const formattedMonth = `${month} ${year}`;

        if (!agendamentosPorMes[formattedMonth]) {
            agendamentosPorMes[formattedMonth] = {};
        }

        const day = date.getDate();
        if (!agendamentosPorMes[formattedMonth][day]) {
            agendamentosPorMes[formattedMonth][day] = [];
        }

        agendamentosPorMes[formattedMonth][day].push(agendamento);
    });

    const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const sortedMonths = Object.keys(agendamentosPorMes).sort((a, b) => {
        const aIndex = monthOrder.indexOf(a.split(' ')[0].toLowerCase());
        const bIndex = monthOrder.indexOf(b.split(' ')[0].toLowerCase());
        return aIndex - bIndex;
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


    // Função para adicionar um procedimento a um agendamento
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
                agendamento.procedimentos.push(novoProcedimento);

                // Salva as alterações
                salvarAgendamentos();

                // Fecha o modal após a adição
                const modal = new bootstrap.Modal(document.getElementById('editModal'));
                modal.hide();

                // Recarrega a página para refletir as alterações
                location.reload();
            }
        });

        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    }



    // Função para salvar os agendamentos no localStorage
    function salvarAgendamentos() {
        localStorage.setItem('dadosAgendamentos', JSON.stringify(agendamentos));
    }

    // Função para deletar um agendamento
    function deletarAgendamento(index) {
        agendamentos.splice(index, 1);
        salvarAgendamentos();
        location.reload(); // Recarrega a página para refletir as alterações após a exclusão
    }

    // Função para editar um agendamento
    function editarAgendamento(index) {
        const agendamento = agendamentos[index]; // Obtém o agendamento pelo índice

        // Abre um modal para edição do agendamento
        const modalBody = document.getElementById('modalBody');
        const modalTitle = document.getElementById('modalTitle');

        // Preenche o modal com os dados do agendamento para edição
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

        // Preenche a lista de procedimentos no modal
        const procedimentosList = document.getElementById('editProcedimentos');
        agendamento.procedimentos.forEach(procedimento => {
            procedimentosList.innerHTML += `<li class="list-group-item">${procedimento}</li>`;
        });

        const editForm = document.getElementById('editForm');

        editForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Atualiza os dados do agendamento com os novos valores do formulário
            agendamento.nome = document.getElementById('editNome').value;
            agendamento.telefone = document.getElementById('editTelefone').value;

            // Adiciona novo procedimento se houver
            const newProcedimento = document.getElementById('newProcedimento').value.trim();
            if (newProcedimento !== '') {
                agendamento.procedimentos.push(newProcedimento);
            }

            // Salva as alterações
            salvarAgendamentos();


            // Fecha o modal após a edição
            const modal = new bootstrap.Modal(document.getElementById('editModal'));
            modal.hide();

            // Recarrega a página para refletir as alterações
            location.reload();
        });

        // Adiciona evento para adicionar novo procedimento
        const btnAddProcedimento = document.getElementById('btnAddProcedimento');
        btnAddProcedimento.addEventListener('click', function () {
            const newProcedimento = document.getElementById('newProcedimento').value.trim();
            if (newProcedimento !== '') {
                const procedimentosList = document.getElementById('editProcedimentos');
                procedimentosList.innerHTML += `<li class="list-group-item">${newProcedimento}</li>`;
                document.getElementById('newProcedimento').value = '';
            }
        });

        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    }






    // --------------------- Adicionando manipuladores de eventos para os botões de editar e deletar



    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                deletarAgendamento(index);
            }
        }

        if (event.target.classList.contains('btn-edit')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                editarAgendamento(index);
            }
        }
    });



    // Adicionando manipuladores de eventos para os botões de adicionar, editar e deletar
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                deletarAgendamento(index);
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


//=======================================  VOLTA AO TOPO

// Função para rolar a página para o topo dentro do modal
function topFunctionModal() {
    document.body.scrollTop = 0; // Para navegadores que não suportam scrollTop
    document.documentElement.scrollTop = 0; // Para navegadores compatíveis com scrollTop
}

