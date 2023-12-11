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
//                                 <h5 class="card-title">${agendamento.dataSelecionada}</h5>
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














//======================================================
















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
                                <h5 class="card-title">${agendamento.dataSelecionada}</h5>
                                <p class="card-text">Agendado para: ${agendamento.horariosSelecionados.join(', ')}h</p>
                                <p class="card-text">Nome: ${agendamento.nome}</p>
                                <p class="card-text">Telefone: ${agendamento.telefone}</p>
                                <p class="card-text">Procedimentos:</p>
                                <ul class="list-group">`;

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
                `;
            });

            tabContent += `</div>`;
        }

        tabContent += `</div>`;
        monthContent.innerHTML += tabContent;
    });

    const tabs = new bootstrap.Tab(document.getElementById('monthTabs'));
    tabs.show(0); // Exibe a primeira aba por padrão ao carregar a página


});














