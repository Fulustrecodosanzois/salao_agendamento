// document.addEventListener('DOMContentLoaded', function () {
//     let agendamentos = localStorage.getItem('dadosAgendamentos');
//     agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//     const agendamentosPorMes = {};

//     agendamentos.forEach((agendamento, index) => {
//         const date = new Date(agendamento.dataSelecionada);
//         const day = date.getDate();
//         const month = date.toLocaleString('default', { month: 'long' });
//         const year = date.getFullYear();
//         const formattedMonth = `${month} de ${year}`;

//         if (!agendamentosPorMes[formattedMonth]) {
//             agendamentosPorMes[formattedMonth] = {};
//         }

//         if (!agendamentosPorMes[formattedMonth][day]) {
//             agendamentosPorMes[formattedMonth][day] = [];
//         }

//         agendamentosPorMes[formattedMonth][day].push(agendamento);
//     });

//     const accordionElement = document.getElementById('accordion');
//     let html = '';

//     for (const chaveMes in agendamentosPorMes) {
//         html += `
//             <div class="accordion-item">
//                 <h2 class="accordion-header" id="heading${chaveMes.replace(/\s/g, '')}">
//                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${chaveMes.replace(/\s/g, '')}" aria-expanded="false" aria-controls="collapse${chaveMes.replace(/\s/g, '')}">
//                         ${chaveMes}
//                     </button>
//                 </h2>
//                 <div id="collapse${chaveMes.replace(/\s/g, '')}" class="accordion-collapse collapse" aria-labelledby="heading${chaveMes.replace(/\s/g, '')}" data-bs-parent="#accordion">
//                     <div class="accordion-body">
//                         ${renderizarAgendamentosPorMes(agendamentosPorMes[chaveMes])}
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     accordionElement.innerHTML = html;
// });

// function renderizarAgendamentosPorMes(agendamentosPorDia) {
//     let html = '';

//     for (const chaveDia in agendamentosPorDia) {
//         html += `<div class="day-container">
//             <h3 class="my-3">${chaveDia}</h3>
//             ${renderizarAgendamentos(agendamentosPorDia[chaveDia])}
//         </div>`;
//     }

//     return html;
// }

// function renderizarAgendamentos(agendamentos) {
//     let html = '';

//     agendamentos.forEach((agendamento, index) => {
//         const date = new Date(agendamento.dataSelecionada);
//         const formattedDate = date.toLocaleDateString('pt-BR');

//         html += `
//             <div class="list-group">
//                 <div class="list-group-item list-group-item-action">
//                     <div><strong>Nome:</strong> ${agendamento.nome}</div>
//                     <div><strong>Telefone:</strong> ${agendamento.telefone}</div>
//                     <div><strong>Data Selecionada:</strong> ${formattedDate}</div>
//                     <div><strong>Horários Selecionados:</strong> ${agendamento.horariosSelecionados.join(', ')}</div>
//                     <div><strong>Procedimentos:</strong> ${agendamento.procedimentos.join(', ')}</div>
//                 </div>
//             </div>
//         `;
//     });

//     return html;
// }
































//================================================






















document.addEventListener('DOMContentLoaded', function () {
    let agendamentos = localStorage.getItem('dadosAgendamentos');
    agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

    const agendamentosPorMes = {};

    agendamentos.forEach((agendamento, index) => {
        const date = new Date(agendamento.dataSelecionada);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const formattedMonth = `${month} de ${year}`;

        if (!agendamentosPorMes[formattedMonth]) {
            agendamentosPorMes[formattedMonth] = {};
        }

        if (!agendamentosPorMes[formattedMonth][day]) {
            agendamentosPorMes[formattedMonth][day] = [];
        }

        agendamentosPorMes[formattedMonth][day].push(agendamento);
    });

    const accordionElement = document.getElementById('accordion');
    let html = '';

    for (const chaveMes in agendamentosPorMes) {
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${chaveMes.replace(/\s/g, '')}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${chaveMes.replace(/\s/g, '')}" aria-expanded="false" aria-controls="collapse${chaveMes.replace(/\s/g, '')}">
                        ${chaveMes}
                    </button>
                </h2>
                <div id="collapse${chaveMes.replace(/\s/g, '')}" class="accordion-collapse collapse" aria-labelledby="heading${chaveMes.replace(/\s/g, '')}" data-bs-parent="#accordion">
                    <div class="accordion-body">
                        ${renderizarAgendamentosPorMes(agendamentosPorMes[chaveMes])}
                    </div>
                </div>
            </div>
        `;
    }

    accordionElement.innerHTML = html;
});

function renderizarAgendamentosPorMes(agendamentosPorDia) {
    let html = '';

    for (const chaveDia in agendamentosPorDia) {
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading${chaveDia.replace(/\s/g, '')}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${chaveDia.replace(/\s/g, '')}" aria-expanded="false" aria-controls="collapse${chaveDia.replace(/\s/g, '')}">
                        ${chaveDia}
                    </button>
                </h2>
                <div id="collapse${chaveDia.replace(/\s/g, '')}" class="accordion-collapse collapse" aria-labelledby="heading${chaveDia.replace(/\s/g, '')}" data-bs-parent="#accordion">
                    <div class="accordion-body">
                        ${renderizarAgendamentos(agendamentosPorDia[chaveDia])}
                    </div>
                </div>
            </div>
        `;
    }

    return html;
}

function renderizarAgendamentos(agendamentos) {
    let html = '';

    agendamentos.forEach((agendamento, index) => {
        const date = new Date(agendamento.dataSelecionada);
        const formattedDate = date.toLocaleDateString('pt-BR');

        html += `
            <div class="list-group">
                <div class="list-group-item list-group-item-action">
                    <div><strong>Nome:</strong> ${agendamento.nome}</div>
                    <div><strong>Telefone:</strong> ${agendamento.telefone}</div>
                    <div><strong>Data Selecionada:</strong> ${formattedDate}</div>
                    <div><strong>Horários Selecionados:</strong> ${agendamento.horariosSelecionados.join(', ')}</div>
                    <div><strong>Procedimentos:</strong> ${agendamento.procedimentos.join(', ')}</div>
                </div>
            </div>
        `;
    });

    return html;
}






