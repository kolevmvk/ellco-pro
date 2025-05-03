async function handleBookingSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        const messageDiv = document.getElementById('formMessage');
        if (result.success) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Sastanak je uspešno zakazan!';
            form.reset();
        } else {
            messageDiv.className = 'form-message error';
            messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
        }
    } catch (error) {
        const messageDiv = document.getElementById('formMessage');
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
    }
    
    return false;
}