document.addEventListener('DOMContentLoaded', function() {
    const monthName = document.querySelector('.month-name');
    const daysContainer = document.querySelector('.days');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    let currentDate = new Date();
  
    function renderCalendar() {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
      
      monthName.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
      let days = '';
  
      for (let i = 0; i < firstDayIndex; i++) {
        days += `<div></div>`;
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        days += `<div>${i}</div>`;
      }
  
      daysContainer.innerHTML = days;
  
      const allDays = document.querySelectorAll('.days div');
      allDays.forEach(day => {
        day.addEventListener('click', () => {
          allDays.forEach(d => d.classList.remove('selected'));
          day.classList.add('selected');
          // Aqui você pode adicionar a lógica para agendar o dia selecionado
          console.log(`Data selecionada: ${months[currentDate.getMonth()]} ${day.textContent}, ${currentDate.getFullYear()}`);
        });
      });
    }
  
    renderCalendar();
  
    prevBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  
    nextBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  });
  