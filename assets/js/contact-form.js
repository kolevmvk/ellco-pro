document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm'); // ← ispravan ID

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const honeypot = document.getElementById('website').value.trim();
    const token = document.getElementById('formToken').value;

    if (honeypot !== '') {
      document.getElementById('formMessage').innerText = 'Spam detektovan.';
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
      document.getElementById('formMessage').innerText = data.message;
    } catch (err) {
      document.getElementById('formMessage').innerText = 'Greška pri slanju poruke.';
      console.error(err);
    }
  });
  // Generiši token za formu
  const tokenField = document.getElementById('formToken');
  if (tokenField) {
    tokenField.value = btoa(Date.now().toString()); // Base64 timestamp token
  }

});
