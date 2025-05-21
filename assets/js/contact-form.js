document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm'); // ← ispravan ID

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      });

      const data = await res.json();
      document.getElementById('formMessage').innerText = data.message;
    } catch (err) {
      document.getElementById('formMessage').innerText = 'Greška pri slanju poruke.';
      console.error(err);
    }
  });
});
