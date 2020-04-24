
const socket = io()
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('messages')
const roomContainer = document.getElementById('room-container')


if (messageForm != null) {
    const name = prompt('what is your name')
appendMessage('You joined')
socket.emit('new-user', roomName, name)

messageForm.addEventListener('submit', e => {
    e.preventDefault(); // prevents page reloading
    const message = messageInput.value
    if(message == '/help'){
        appendMessage(`You: ${message}`)
        setTimeout(function(){ appendMessage(`SERVER: function is not working right now :( `) }, 1000);
        messageInput.value = ''
        scrollToBottom();
    }

         else {
            appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
    scrollToBottom();
        }
    
})
}

socket.on('room-created', room => {
    const roomElement = document.createElement('li')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = join
    roomContainer.append(roomElement)
    roomContainer.append(roomlink)
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message} `)
    scrollToBottom();
    
})

socket.on('newImage', data => {
    console.log(data);
    const imgContainer = document.getElementById("gameImg")
    imgContainer.innerHTML = `<img src="${data.gameImg}" alt=""> <h2> What is the name of this game?</h2> `
    
})

socket.on('correct-message', data => {
    appendMessageCorrect(`SERVER: ${data.name} GOOD JOB`)
    scrollToBottom();

})

socket.on('ronde-message', data => {
    appendRonde(`Ronde: ${data.ronde} / 10`)
    scrollToBottom();

})


socket.on('user-connected', name => {
    appendMessage(`SERVER: ${name} connected`)
    scrollToBottom();
})

socket.on('user-disconnected', name => {
    appendMessage(`SERVER: ${name} disconnected`)
})

function appendMessage(message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    
}
function appendMessageCorrect(message) {
    const messageElement = document.createElement('li')
    messageElement.classList.add("correct");
    messageElement.innerText = message
    messageContainer.append(messageElement)
    
}
function appendRonde(message) {
    const messageElement = document.createElement('li')
    messageElement.classList.add("ronde");
    messageElement.innerText = message
    messageContainer.append(messageElement)
    
}



function scrollToBottom() {
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}
