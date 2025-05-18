document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('cta-trigger');
  const actions = document.getElementById('cta-actions');
  const msgBtn = document.getElementById('cta-msg');
  const popup = document.getElementById('telegram-agent-popup');
  const closeBtn = document.getElementById('cta-close');

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    document.getElementById('cta-actions').classList.add('hidden');
    document.getElementById('cta-trigger').classList.remove('hidden');
  });
}


  if (trigger) {
    trigger.addEventListener('click', () => {
      trigger.classList.add('hidden');
      actions.classList.remove('hidden');
    });
  }

  if (msgBtn && popup) {
    msgBtn.addEventListener('click', () => {
      popup.style.display = 'block';
      popup.classList.add('centered');
      actions.classList.add('hidden');
    });
  }
});
