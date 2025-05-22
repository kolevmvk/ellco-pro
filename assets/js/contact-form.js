document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const tokenField = document.getElementById('formToken');

  if (!form) return;

  // Generiši token
  if (tokenField) {
    tokenField.value = btoa(Date.now().toString());
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const honeypot = document.getElementById('website').value.trim();
    const token = tokenField.value;

    // Resetuj poruku i klase
    formMessage.innerText = '';
    formMessage.className = 'form-message';

    if (honeypot !== '') {
      formMessage.innerText = 'Spam detektovan.';
      formMessage.classList.add('error');
      return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
      const res = await fetch('https://ellco-pro.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, website: honeypot, token })
      });

      const data = await res.json();

      if (res.ok && data.message.toLowerCase().includes('uspešno')) {
        formMessage.innerText = data.message;
        formMessage.classList.add('success');
        form.reset();
        if (tokenField) {
          tokenField.value = btoa(Date.now().toString()); // regeneriši token
        }
      } else {
        formMessage.innerText = data.message || 'Greška pri slanju.';
        formMessage.classList.add('error');
      }

    } catch (err) {
      formMessage.innerText = 'Greška pri slanju poruke.';
      formMessage.classList.add('error');
      console.error(err);
    }
  });
});
