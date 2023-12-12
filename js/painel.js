// Obter a referência para o corpo da tabela
const corpoTabela = document.getElementById('corpoTabela');

// Função para editar um agendamento
function editarAgendamento(id) {
  // Implemente a lógica de edição aqui
  console.log(`Editar agendamento com ID: ${id}`);
}

// Função para deletar um agendamento
function deletarAgendamento(id) {
  // Implemente a lógica de exclusão aqui
  console.log(`Deletar agendamento com ID: ${id}`);
}

// Exemplo de adição de agendamento à tabela
function adicionarAgendamento(id, data, hora, cliente) {
  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${id}</td>
    <td>${data}</td>
    <td>${hora}</td>
    <td>${cliente}</td>
    <td>
      <a href="#" class="btn btn-primary btn-sm" onclick="editarAgendamento(${id})">Editar</a>
      <button class="btn btn-danger btn-sm" onclick="deletarAgendamento(${id})">Excluir</button>
    </td>
  `;
  corpoTabela.appendChild(novaLinha);
}

// Exemplo: Adicionar agendamento à tabela (chamar essa função com os dados reais)
adicionarAgendamento(1, '12/12/2023', '14:00', 'Maria');
