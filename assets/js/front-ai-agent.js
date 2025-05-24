window.addEventListener('load', () => {
  (function () {
    const aiButton = document.getElementById('ellco-ai');
    const popup = document.getElementById('ai-popup');
    const overlay = document.getElementById('ai-popup-overlay');
    const closeBtn = document.getElementById('ai-close-btn');
    const chatMessages = document.querySelector('.ai-chat-messages');
    const userReplyContainer = document.querySelector('.user-reply-container');
    const typingIndicator = document.querySelector('.ai-typing-indicator');
    const stripPopup = document.getElementById('ai-strip-popup');
    const stripClose = document.querySelector('.ai-strip-close');
    const stripStart = document.querySelector('.ai-strip-start');
    const stripMessages = document.querySelectorAll('.ai-strip-message');

    let stripClosed = false;
    let stripMessageTimeout = null;

    function closeStripPopup() {
      stripClosed = true;
      stripPopup.classList.add('ai-hide');
      if (stripMessageTimeout) {
        clearTimeout(stripMessageTimeout);
        stripMessageTimeout = null;
      }
    }

    stripClose.addEventListener('click', closeStripPopup);
    stripStart.addEventListener('click', () => {
      closeStripPopup();
      openChat();
    });

    function initStripPopup() {
      setTimeout(() => {
        if (!stripClosed) {
          stripPopup.classList.remove('ai-hide');
          stripMessages[0].classList.remove('ai-hide');
          stripMessages[1].classList.add('ai-hide');
          stripMessageTimeout = setTimeout(() => {
            if (!stripClosed) {
              stripMessages[0].classList.add('ai-hide');
              stripMessages[1].classList.remove('ai-hide');
            }
          }, 10000);
        }
      }, 4000);
    }

    function openChat() {
      popup.classList.remove('ai-hide');
      overlay.classList.remove('ai-hide');
      chatMessages.innerHTML = '';
      addMessage("Zdravo! Postavite mi pitanje ili opišite kakav sajt vam treba.");
      renderInput();
    }

    function addMessage(content, isUser = false) {
      const msg = document.createElement('div');
      msg.className = `ai-message ${isUser ? 'user-message' : ''}`;
      msg.textContent = content;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
      typingIndicator.classList.remove('ai-hide');
    }

    function hideTyping() {
      typingIndicator.classList.add('ai-hide');
    }

    function renderInput() {
      userReplyContainer.innerHTML = '';
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Unesite poruku...';
      input.className = 'ai-user-input';
      input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          const userMsg = input.value.trim();
          addMessage(userMsg, true);
          input.value = '';
          await sendToAI(userMsg);
        }
      });
      userReplyContainer.appendChild(input);
      input.focus();
    }

    async function sendToAI(prompt) {
      showTyping();
      try {
        const response = await fetch('/api/ai-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        addMessage(data.reply || 'AI nije odgovorio.');
      } catch (err) {
        addMessage('Greška u komunikaciji sa AI.');
      } finally {
        hideTyping();
      }
    }

    function closePopup() {
      popup.classList.add('ai-hide');
      overlay.classList.add('ai-hide');
      chatMessages.innerHTML = '';
      userReplyContainer.innerHTML = '';
    }

    aiButton.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.classList.contains('ai-hide')) {
        closePopup();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-strip-close')) {
        closeStripPopup();
      }
    });

    initStripPopup();
  })();
});
