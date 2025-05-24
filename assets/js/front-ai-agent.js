window.addEventListener('load', () => {
  (function () {
    // Elementi
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

    let stripMessageTimeout = null;
    let stripClosed = false;

    function closeStripPopup() {
      console.log("🧨 Pozvano zatvaranje strip popup-a");
      stripClosed = true;
      stripPopup.classList.add('ai-hide');
      if (stripMessageTimeout) {
        clearTimeout(stripMessageTimeout);
        stripMessageTimeout = null;
      }
    }

    stripClose.addEventListener('click', () => {
      console.log("X kliknut");
      closeStripPopup();
    });

    stripStart.addEventListener('click', () => {
      closeStripPopup();
      openChatWizard();
    });

    function initStripPopup() {
      console.log("✅ initStripPopup pozvan");
      console.log("Čekam 4s da prikažem popup...");

      setTimeout(() => {
        if (!stripClosed) {
          console.log("👉 Prikazujem strip popup sada");
          stripPopup.classList.remove('ai-hide');

          stripMessages[0].classList.remove('ai-hide');
          stripMessages[1].classList.add('ai-hide');

          stripMessageTimeout = setTimeout(() => {
            if (!stripClosed) {
              console.log("👉 Menjam poruku u drugu verziju");
              stripMessages[0].classList.add('ai-hide');
              stripMessages[1].classList.remove('ai-hide');
            }
          }, 10000);
        }
      }, 4000);
    }

    function openChatWizard() {
      popup.classList.remove('ai-hide');
      overlay.classList.remove('ai-hide');
      addMessage(steps[0].question);
      createInputElement(steps[0]);
    }

    const steps = [
      {
        type: 'text',
        question: 'Zdravo! Kako se zove vaša firma?',
        placeholder: 'Unesite naziv firme',
        required: true
      },
      {
        type: 'number',
        question: 'Koliko ljudi radi kod vas?',
        placeholder: 'Unesite broj zaposlenih',
        required: true,
        min: 1
      },
      {
        type: 'checkbox',
        question: 'Koje funkcije su vam važne? (izaberi više)',
        options: [
          { value: 'online_zakazivanje', label: 'Online zakazivanje' },
          { value: 'galerija', label: 'Galerija radova' },
          { value: 'blog', label: 'Blog' },
          { value: 'shop', label: 'Online prodaja' },
          { value: 'kontakt', label: 'Kontakt forma' }
        ],
        required: true
      },
      {
        type: 'radio',
        question: 'Da li želite AI asistenta na sajtu?',
        options: [
          { value: 'da', label: 'Da' },
          { value: 'ne', label: 'Ne' },
          { value: 'nisam_siguran', label: 'Nisam siguran' }
        ],
        required: true
      },
      {
        type: 'text',
        question: 'Vaše ime i email za kontakt?',
        placeholder: 'Ime i email',
        required: true,
        isEmail: true
      }
    ];

    let currentStep = 0;
    let userData = {};
    let isTyping = false;

    function showTypingIndicator() {
      isTyping = true;
      typingIndicator.classList.remove('ai-hide');
    }

    function hideTypingIndicator() {
      isTyping = false;
      typingIndicator.classList.add('ai-hide');
    }

    function addMessage(content, isUser = false) {
      const message = document.createElement('div');
      message.className = `ai-message ${isUser ? 'user-message' : ''}`;
      message.textContent = content;
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function createInputElement(step) {
      userReplyContainer.innerHTML = '';

      switch (step.type) {
        case 'text':
        case 'number':
          const input = document.createElement('input');
          input.type = step.isEmail ? 'email' : step.type;
          input.placeholder = step.placeholder;
          input.required = step.required;
          if (step.min) input.min = step.min;
          input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
              handleUserInput(input.value);
            }
          });
          userReplyContainer.appendChild(input);
          input.focus();
          break;

        case 'checkbox':
          const checkboxGroup = document.createElement('div');
          checkboxGroup.className = 'checkbox-group';
          step.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'checkbox-option';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option.value;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(option.label));
            checkboxGroup.appendChild(label);
          });
          const submitBtn = document.createElement('button');
          submitBtn.className = 'submit-btn';
          submitBtn.textContent = 'Dalje';
          submitBtn.addEventListener('click', () => {
            const selected = Array.from(checkboxGroup.querySelectorAll('input:checked'))
              .map(input => input.value);
            if (selected.length > 0) handleUserInput(selected);
          });
          userReplyContainer.appendChild(checkboxGroup);
          userReplyContainer.appendChild(submitBtn);
          break;

        case 'radio':
          const radioGroup = document.createElement('div');
          radioGroup.className = 'radio-group';
          step.options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'radio-option';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'radio-group';
            radio.value = option.value;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option.label));
            radioGroup.appendChild(label);
          });
          const radioSubmitBtn = document.createElement('button');
          radioSubmitBtn.className = 'submit-btn';
          radioSubmitBtn.textContent = 'Dalje';
          radioSubmitBtn.addEventListener('click', () => {
            const selected = radioGroup.querySelector('input:checked');
            if (selected) handleUserInput(selected.value);
          });
          userReplyContainer.appendChild(radioGroup);
          userReplyContainer.appendChild(radioSubmitBtn);
          break;
      }
    }

    async function handleUserInput(value) {
      if (isTyping) return;
      addMessage(value, true);
      const step = steps[currentStep];
      userData[step.type] = value;
      showTypingIndicator();
      await new Promise(resolve => setTimeout(resolve, 1500));
      hideTypingIndicator();
      currentStep++;
      if (currentStep < steps.length) {
        addMessage(steps[currentStep].question);
        createInputElement(steps[currentStep]);
      } else {
        const sendButton = document.createElement('button');
        sendButton.className = 'submit-btn';
        sendButton.textContent = 'Pošalji podatke';
        sendButton.addEventListener('click', sendData);
        userReplyContainer.innerHTML = '';
        userReplyContainer.appendChild(sendButton);
      }
    }

    function generateRecommendation(data) {
      let recommendation = 'Na osnovu vaših odgovora, preporučujem:\n\n';
      if (data.checkbox && data.checkbox.includes('online_zakazivanje')) {
        recommendation += '• Premium paket sa online zakazivanjem\n';
      }
      if (data.checkbox && data.checkbox.includes('shop')) {
        recommendation += '• E-commerce paket sa online prodajom\n';
      }
      recommendation += '\nMožete pogledati demo šablone na našem sajtu.';
      return recommendation;
    }

    async function sendData() {

      const sendButton = userReplyContainer.querySelector('.submit-btn');
      sendButton.disabled = true;
      sendButton.textContent = 'Slanje...';
      try {
        const response = await fetch('/api/ai-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
          addMessage(data.reply);  // ← OVDE se prikazuje AI odgovor
          setTimeout(closePopup, 4000);
        } else {
          throw new Error('Greška pri slanju');
        }

      } catch (error) {
        addMessage('Došlo je do greške. Molimo pokušajte ponovo.');
        sendButton.disabled = false;
        sendButton.textContent = 'Pošalji podatke';
      }


    }

    function closePopup() {
      popup.classList.add('ai-hide');
      overlay.classList.add('ai-hide');
      currentStep = 0;
      userData = {};
      chatMessages.innerHTML = '';
      userReplyContainer.innerHTML = '';
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.classList.contains('ai-hide')) {
        closePopup();
      }
    });

    // Delegirani klik za X – SADA RADI
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-strip-close')) {
        console.log("✅ X kliknut (delegirani)");
        closeStripPopup();
      }
    });

    aiButton.addEventListener('click', openChatWizard);
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);

    initStripPopup();
  })();
});
