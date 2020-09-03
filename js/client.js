const socket = io('http://localhost:8000');

const form = document.querySelector("form");
const message = document.querySelector("input");
const messageContainer = document.querySelector(".container");
const name = prompt("Enter your name !");
const audio = new Audio("ring.mp3");

const append=(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add("msg");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left")
    audio.play();
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const msg = message.value;
    append(`You: ${msg}`,'right');
    socket.emit("send",msg);
    message.value="";
    
})

socket.emit("new-user-joined",name);
socket.on("user-joined",name=>{
    append(`${name} joined the chat`,'right');
})

socket.on("receive",data=>{
    append(`${data.name}: ${data.message}`,"left");
})

socket.on("left",name=>{
    append(`${name}: left the chat`,"left");
})

