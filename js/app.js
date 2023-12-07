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

// document.getElementById('btnEnviar').addEventListener('click', function () {
//     const nome = document.getElementById('nome').value;
//     const telefone = document.getElementById('telefone').value;

//     const procedimentosSelecionados = [];
//     const procedimentos = document.querySelectorAll('.form-check-input:checked');
//     procedimentos.forEach(procedimento => {
//         procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
//     });

//     const horarios = document.querySelectorAll('.horario-selected');
//     const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

//     // Criar um objeto para armazenar os dados
//     const dadosAgendamento = {
//         nome: nome,
//         telefone: telefone,
//         procedimentos: procedimentosSelecionados,
//         dataSelecionada: document.getElementById('datePicker').value,
//         horariosSelecionados: horariosSelecionados
//     };

//     // Armazenar os dados no localStorage como JSON
//     localStorage.setItem('dadosAgendamento', JSON.stringify(dadosAgendamento));

//     // Exibir os dados no console (opcional)
//     console.log('Dados de agendamento armazenados no localStorage:', dadosAgendamento);
// });























//=====================================================




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

document.getElementById('btnEnviar').addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const procedimentosSelecionados = [];
    const procedimentos = document.querySelectorAll('.form-check-input:checked');
    procedimentos.forEach(procedimento => {
        procedimentosSelecionados.push(procedimento.nextElementSibling.textContent.trim());
    });

    const horarios = document.querySelectorAll('.horario-selected');
    const horariosSelecionados = Array.from(horarios).map(horario => horario.textContent);

    // Criar um objeto para armazenar os dados
    const dadosAgendamento = {
        nome: nome,
        telefone: telefone,
        procedimentos: procedimentosSelecionados,
        dataSelecionada: document.getElementById('datePicker').value,
        horariosSelecionados: horariosSelecionados
    };

    // Armazenar os dados no localStorage como JSON
    localStorage.setItem('dadosAgendamento', JSON.stringify(dadosAgendamento));

    // Exibir os dados no console (opcional)
    console.log('Dados de agendamento armazenados no localStorage:', dadosAgendamento);
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
