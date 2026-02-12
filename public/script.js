const socket = io();//is this prebuilt?

// Logic: We emit an event called 'message' with a string

socket.emit('message', 'Hello Server! Can you hear me?');

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messageArea = document.getElementById('message-area');

// 1. Sending a message (The "Mouth")
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page refresh
    const msg = messageInput.value;
    
    socket.emit('chat-message', msg); // Send to server
    messageInput.value = ''; // Clear input
});//kina arko banihalxa??

// 2. Receiving a message (The "Ears")
socket.on('message-to-all', (data) => {
    console.log('The server says:', data);

    // Create a new div for the message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('msg');
    messageDiv.innerText = data;
    
    // Put it in the message area
    messageArea.appendChild(messageDiv);
    
    // Auto-scroll to the bottom--->bujnu parne


    // messageArea.scrollTop = messageArea.scrollHeight;
});