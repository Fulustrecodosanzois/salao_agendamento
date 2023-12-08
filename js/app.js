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
//     event.preventDefault(); // Impede o envio do formulário para permitir validações

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

//     // Obter os dados do localStorage se já houver algum agendamento
//     let agendamentos = localStorage.getItem('dadosAgendamentos');
//     agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

//     // Verificar se há algum agendamento para a mesma data e horário
//     const horarioJaAgendado = agendamentos.some(agendamento => {
//         return (
//             agendamento.dataSelecionada === dataSelecionada &&
//             agendamento.horariosSelecionados.some(horario => horariosSelecionados.includes(horario))
//         );
//     });

//     if (horarioJaAgendado) {
//         alert('Este horário já foi agendado. Por favor, selecione outro horário.');
//         return; // Impede o envio do formulário se o horário já estiver agendado
//     }

//     // Criar um objeto para armazenar os dados do agendamento atual
//     const novoAgendamento = {
//         nome: nome,
//         telefone: telefone,
//         procedimentos: procedimentosSelecionados,
//         dataSelecionada: dataSelecionada,
//         horariosSelecionados: horariosSelecionados
//     };

//     // Adicionar o novo agendamento à lista de agendamentos
//     agendamentos.push(novoAgendamento);

//     // Armazenar os dados atualizados no localStorage como JSON
//     localStorage.setItem('dadosAgendamentos', JSON.stringify(agendamentos));

//     // Exibir os dados no console (opcional)
//     console.log('Todos os agendamentos:', agendamentos);

//     // Limpar o formulário após o envio bem-sucedido (opcional)
//     document.getElementById('nome').value = '';
//     document.getElementById('telefone').value = '';
//     // Limpar outras informações do formulário conforme necessário...

//     // Outras ações após o envio do formulário bem-sucedido, se necessário...
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
























//=================================================================






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

carregarHorariosDisponiveis();

// ======================  ARMAZENAMENTO NO LOCALSTORAGE

document.getElementById('btnEnviar').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o envio do formulário para permitir validações

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

    // Obter os dados do localStorage se já houver algum agendamento
    let agendamentos = localStorage.getItem('dadosAgendamentos');
    agendamentos = agendamentos ? JSON.parse(agendamentos) : [];

    // Verificar se há algum agendamento para a mesma data e horário
    const horarioJaAgendado = agendamentos.some(agendamento => {
        return (
            agendamento.dataSelecionada === dataSelecionada &&
            agendamento.horariosSelecionados.some(horario => horariosSelecionados.includes(horario))
        );
    });

    if (horarioJaAgendado) {
        alert('Este horário já foi agendado. Por favor, selecione outro horário.');
        return; // Impede o envio do formulário se o horário já estiver agendado
    }

    // Criar um objeto para armazenar os dados do agendamento atual
    const novoAgendamento = {
        nome: nome,
        telefone: telefone,
        procedimentos: procedimentosSelecionados,
        dataSelecionada: dataSelecionada,
        horariosSelecionados: horariosSelecionados
    };

    // Adicionar o novo agendamento à lista de agendamentos
    agendamentos.push(novoAgendamento);

    // Armazenar os dados atualizados no localStorage como JSON
    localStorage.setItem('dadosAgendamentos', JSON.stringify(agendamentos));

    // Exibir os dados no console (opcional)
    console.log('Todos os agendamentos:', agendamentos);

    // Limpar o formulário após o envio bem-sucedido (opcional)
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    // Limpar outras informações do formulário conforme necessário...

    // Outras ações após o envio do formulário bem-sucedido, se necessário...
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

