const socket = io('http://localhost:3000')
const messageFrom=document.getElementById('send')
const messageInput=document.getElementById('message-input')
const messageContainer = document.getElementById('maincontainer')
const mC = document.getElementById('maincontainer')
mC.scrollTop=mC.scrollHeight;
const audio = new Audio('pop.mp3')

const name = prompt('what is your name')
appendMessage('You Joined','center')
socket.emit('new-user',name)

socket.on('chat-message-left',data=>{
    appendMessage(`${data.name}: ${data.message}`,'right')
})

socket.on('chat-message-right',data=>{
    appendMessage(`${data.name}: ${data.message}`,'left')
})


socket.on('user-connected',name=>{
    appendMessage(`${name} joined`,'center')
})

socket.on('user-disconnected',name=>{
    appendMessage(`${name} left the chat`,'center')
})

messageFrom.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`,'right')
    socket.emit('send-chat-message',message)
    messageInput.value=''
})


function appendMessage(message,position)
{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    audio.play()
}