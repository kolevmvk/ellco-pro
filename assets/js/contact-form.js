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

    // Resetuj poruku
    formMessage.innerText = '';
    formMessage.style.color = '';
    
    if (honeypot !== '') {
      formMessage.innerText = 'Spam detektovan.';
      formMessage.style.color = 'red';
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

      formMessage.innerText = data.message;

      if (res.ok) {
        formMessage.style.color = 'green';
        form.reset();
        if (tokenField) {
          tokenField.value = btoa(Date.now().toString()); // regeneriši token
        }
      } else {
        formMessage.style.color = 'red';
      }

    } catch (err) {
      formMessage.innerText = 'Greška pri slanju poruke.';
      formMessage.style.color = 'red';
      console.error(err);
    }
  });
});
