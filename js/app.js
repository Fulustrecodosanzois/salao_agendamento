// function mostrarHorariosDisponiveis(selectedDates, dateStr, instance) {
//     const dataSelecionada = new Date(dateStr);
//     const horariosDisponiveis = document.getElementById('horariosDisponiveis');

//     // Limpar os horários disponíveis anteriores
//     horariosDisponiveis.innerHTML = '';

//     // Criar e exibir os horários disponíveis para o dia selecionado
//     for (let hora = 8; hora <= 19; hora++) {
//         const horario = new Date(dataSelecionada);
//         horario.setHours(hora, 0, 0, 0);

//         const horarioFormatado = horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         const label = document.createElement('label');
//         label.textContent = horarioFormatado;
//         label.classList.add('btn', 'btn-light', 'horario-label');

//         // Adicionar um ouvinte de eventos para marcar/desmarcar o horário ao ser clicado
//         label.addEventListener('click', function () {
//             label.classList.toggle('horario-selected');
//             habilitarBotaoAgendar();
//         });

//         horariosDisponiveis.appendChild(label);
//     }
// }

// function habilitarBotaoAgendar() {
//     const horariosSelecionados = document.querySelectorAll('.horario-selected');
//     const btnEnviar = document.getElementById('btnEnviar');

//     btnEnviar.disabled = horariosSelecionados.length === 0;
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

//     // Obter dados do formulário
//     const nome = document.getElementById('nome').value;
//     const telefone = document.getElementById('telefone').value;
//     const procedimentosSelecionados = [];
//     const procedimentos = document.querySelectorAll('.form-check-input:checked');
//     procedimentos.forEach(procedimento => {
//         procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
//     });
//     const horarios = document.querySelectorAll('.horario-selected');
//     const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);
//     const dataSelecionada = document.getElementById('datePicker').value;

//     // Crie uma string com os dados do agendamento
//     const dadosAgendamento = `
//         <p><strong>Nome:</strong> ${nome}</p>
//         <p><strong>Telefone:</strong> ${telefone}</p>
//         <p><strong>Procedimentos:</strong> ${procedimentosSelecionados.join(', ')}</p>
//         <p><strong>Data Selecionada:</strong> ${dataSelecionada}</p>
//         <p><strong>Horários Selecionados:</strong> ${horariosSelecionados.join(', ')}</p>
//     `;

//     // Insira os dados do agendamento no modal
//     document.getElementById('dadosConfirmacao').innerHTML = dadosAgendamento;

//     // Exibir o modal de confirmação
//     const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
//     modalConfirmacao.show();

//     // Evento de confirmação dentro do modal
//     document.getElementById('btnConfirmar').addEventListener('click', function () {
//         // Adicione a lógica de confirmação para armazenar no localStorage
//         const novoAgendamento = {
//             nome: nome,
//             telefone: telefone,
//             procedimentos: procedimentosSelecionados,
//             dataSelecionada: dataSelecionada,
//             horariosSelecionados: horariosSelecionados
//         };

//         // Obtenha os dados do localStorage se já houver algum agendamento
//         let agendamentos = localStorage.getItem('dadosAgendamentos');
//         agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//         // Adicione o novo agendamento à lista de agendamentos
//         agendamentos.push(novoAgendamento);

//         // Armazene os dados atualizados no localStorage como JSON
//         localStorage.setItem('dadosAgendamentos', JSON.stringify(agendamentos));

//         // Feche o modal de confirmação
//         modalConfirmacao.hide();

//         // Recarregue a página para limpar os campos do formulário
//         location.reload();
//     });
// });



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


//     // Limpe os campos do formulário após a confirmação (opcional)
//     document.getElementById('nome').value = '';
//     document.getElementById('telefone').value = '';
//     // Limpe outras informações do formulário conforme necessário...
// });























//============================================= 

















function mostrarHorariosDisponiveis(selectedDates, dateStr, instance) {
    const dataSelecionada = new Date(dateStr);
    const horariosDisponiveis = document.getElementById('horariosDisponiveis');

    // Limpar os horários disponíveis anteriores
    horariosDisponiveis.innerHTML = '';

    // Criar e exibir os horários disponíveis para o dia selecionado
    for (let hora = 8; hora <= 19; hora++) {
        const horario = new Date(dataSelecionada);
        horario.setHours(hora, 0, 0, 0);

        const horarioFormatado = horario.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const label = document.createElement('label');
        label.textContent = horarioFormatado;
        label.classList.add('btn', 'btn-light', 'horario-label');

        // Adicionar um ouvinte de eventos para marcar/desmarcar o horário ao ser clicado
        label.addEventListener('click', function () {
            label.classList.toggle('horario-selected');
            habilitarBotaoAgendar();
        });

        horariosDisponiveis.appendChild(label);
    }
}

function habilitarBotaoAgendar() {
    const horariosSelecionados = document.querySelectorAll('.horario-selected');
    const btnEnviar = document.getElementById('btnEnviar');

    btnEnviar.disabled = horariosSelecionados.length === 0;
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

    // Obter dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const procedimentosSelecionados = [];
    const procedimentos = document.querySelectorAll('.form-check-input:checked');
    procedimentos.forEach(procedimento => {
        procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
    });
    const horarios = document.querySelectorAll('.horario-selected');
    const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);
    const dataSelecionada = document.getElementById('datePicker').value;

    // Crie uma string com os dados do agendamento
    const dadosAgendamento = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Procedimentos:</strong> ${procedimentosSelecionados.join(', ')}</p>
        <p><strong>Data Selecionada:</strong> ${dataSelecionada}</p>
        <p><strong>Horários Selecionados:</strong> ${horariosSelecionados.join(', ')}</p>
    `;

    // Insira os dados do agendamento no modal
    document.getElementById('dadosConfirmacao').innerHTML = dadosAgendamento;

    // Exibir o modal de confirmação
    const modalConfirmacao = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
    modalConfirmacao.show();

    // Evento de confirmação dentro do modal
    document.getElementById('btnConfirmar').addEventListener('click', function () {
        // Adicione a lógica de confirmação para armazenar no localStorage
        const novoAgendamento = {
            nome: nome,
            telefone: telefone,
            procedimentos: procedimentosSelecionados,
            dataSelecionada: dataSelecionada,
            horariosSelecionados: horariosSelecionados
        };

        // Obtenha os dados do localStorage se já houver algum agendamento
        let agendamentos = localStorage.getItem('dadosAgendamentos');
        agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

        // Adicione o novo agendamento à lista de agendamentos
        agendamentos.push(novoAgendamento);

        // Armazene os dados atualizados no localStorage como JSON
        localStorage.setItem('dadosAgendamentos', JSON.stringify(agendamentos));

        // Feche o modal de confirmação
        modalConfirmacao.hide();

        // Recarregue a página para limpar os campos do formulário
        location.reload();
    });
});



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


    // Limpe os campos do formulário após a confirmação (opcional)
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    // Limpe outras informações do formulário conforme necessário...
});











