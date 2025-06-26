document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('reservaForm');
  const dataInput       = document.getElementById('data');
  const timeInput       = document.getElementById('hora');
  const listaIndispo    = document.getElementById('listaIndisponiveis');
  const resultOverlay   = document.getElementById('resultOverlay');
  const resultText      = document.getElementById('resultText');
  const resultOkBtn     = document.getElementById('resultOkBtn');

  let currentDay      = null;
  let reservedSlots   = [];

  dataInput.addEventListener('change', async () => {
    clearErrors();
    timeInput.value = '';
    listaIndispo.innerHTML = '';
    const dateVal = dataInput.value;
    if (!dateVal) return;

    currentDay = new Date(dateVal).getDay();
    if ([4,5,6].includes(currentDay)) {
      timeInput.min = '11:00'; timeInput.max = '23:59';
    } else if (currentDay === 0) {
      timeInput.min = '11:00'; timeInput.max = '23:00';
    } else {
      timeInput.min = ''; timeInput.max = '';
    }

    try {
      const res = await fetch(`/api/reservas?date=${dateVal}`);
      reservedSlots = res.ok ? await res.json() : [];
    } catch {
      reservedSlots = [];
    }

    reservedSlots.forEach(horario => {
      const li = document.createElement('li');
      li.textContent = `${horario} — indisponível`;
      listaIndispo.appendChild(li);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();
    if (!dataInput.value) return setError('dataError','Escolha uma data.');
    if (!timeInput.value) return setError('horaError','Escolha um horário.');
    if (reservedSlots.includes(timeInput.value)) {
      return setError('horaError','Horário indisponível. Escolha outro.');
    }

    resultOverlay.style.display = 'flex';
    resultText.textContent = 'Verificando...';
    resultOkBtn.style.display = 'none';

    const payload = {
      nome:     form.nome.value,
      cpf:      form.cpf.value,
      date:     dataInput.value,
      time:     timeInput.value,
      pessoas:  form.pessoas.value,
      telefone: form.telefone.value,
      email:    form.email.value
    };

    try {
      const resp = await fetch('/api/reservas', {
        method: 'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        resultText.textContent = 'Sua reserva foi cadastrada com sucesso!';
      } else {
        resultText.textContent = 'Sua reserva não foi cadastrada com erro! Tente novamente.';
      }
    } catch {
      resultText.textContent = 'Sua reserva não foi cadastrada com erro! Tente novamente.';
    }

    resultOkBtn.style.display = 'block';
  });

  resultOkBtn.addEventListener('click', () => {
    resultOverlay.style.display = 'none';
    form.reset();
    listaIndispo.innerHTML = '';
  });

  function setError(id,msg)   { document.getElementById(id).textContent = msg; }
  function clearErrors()      { document.querySelectorAll('.error').forEach(el=>el.textContent=''); }
});
