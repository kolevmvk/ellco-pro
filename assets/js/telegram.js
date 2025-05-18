document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('telegram-agent-button');
  const popup = document.getElementById('telegram-agent-popup');
  const form = document.getElementById('telegram-form');
  const status = document.getElementById('telegram-status');
  const submitBtn = form.querySelector('button');
  const closeTelegram = document.getElementById('telegram-close');

if (closeTelegram) {
  closeTelegram.addEventListener('click', () => {
    document.getElementById('telegram-agent-popup').style.display = 'none';
  });
}


  // Prikaz / skrivanje forme
  btn.addEventListener('click', () => {
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
  });

  // 🛡 Honeypot zaštita + delay
  let countdown = 5;
  submitBtn.disabled = true;
  submitBtn.innerText = `Sačekajte ${countdown}s`;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      submitBtn.innerText = `Sačekajte ${countdown}s`;
    } else {
      clearInterval(interval);
      submitBtn.disabled = false;
      submitBtn.innerText = 'Pošalji';
    }
  }, 1000);

  // 🧠 Submit logika
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ako honeypot nije prazan → bot
    if (form.hpot.value !== '') {
      status.innerText = '❌ Bot detektovan.';
      status.style.color = 'crimson';
      return;
    }

    const data = {
      ime: form.ime.value,
      telefon: form.telefon.value,
      poruka: form.poruka.value
    };

    try {
      const res = await fetch('https://ellco-pro.vercel.app/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        status.innerText = '✅ Poruka poslata.';
        status.style.color = 'limegreen';
        form.reset();
        submitBtn.disabled = true;
        submitBtn.innerText = 'Zahvaljujemo!';
      } else {
        throw new Error();
      }
    } catch {
      status.innerText = '❌ Došlo je do greške.';
      status.style.color = 'crimson';
    }
  });
});
