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
    appendMessage(`You: \n ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
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
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`SERVER: ${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`SERVER: ${name} disconnected`)
})



function appendMessage(message) {
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageContainer.append(messageElement)
    
}