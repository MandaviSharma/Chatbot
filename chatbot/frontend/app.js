function openChat() {
    document.getElementById("chat-container").style.display = "block";
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    // Ensure there's input to send
    if (userInput === '') return;

    // Display the user message on the chat UI
    displayMessage(userInput, 'user');

    try {
        // Make POST request to Rasa webhook
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: 'user',  // You can use any unique ID here
                message: userInput
            })
        });

        // Parse the JSON response
        const responseData = await response.json();

        // Display Rasa's response in the chat UI
        if (responseData && responseData.length > 0) {
            responseData.forEach(res => {
                displayMessage(res.text, 'bot');
            });
        } else {
            displayMessage('Sorry, I did not understand that.', 'bot');
        }

    } catch (error) {
        console.error('Error:', error);
        displayMessage('Error communicating with the chatbot server.', 'bot');
    }
    
    // Clear the input box after sending the message
    document.getElementById('user-input').value = '';
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function appendMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function openChat() {
    document.getElementById("chat-container").style.display = "block";
}

function closeChat() {
    document.getElementById("chat-container").style.display = "none";
}
