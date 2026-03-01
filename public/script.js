const socket = io();//is this prebuilt?

// Logic: We emit an event called 'message' with a string
allowed=["visionary","daya","roshan","krishna"]
let username=""
while (!username||username.trim().length<3||!allowed.includes(username.toLowerCase().trim())){
 username=prompt("Enter your name")}
socket.emit('username',username);

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messageArea = document.getElementById('message-area');
const typingArea=document.getElementById("typing-monitor")
const list=document.getElementById("online-users-list")

function show_msg(data){
   console.log('History says:', data.msg);

    // Create a new div for the message
    const messageDiv = document.createElement('div');
    if(data.id && data.id===socket.id){
    messageDiv.classList.add('mymsg');
    }
    else{
        messageDiv.classList.add('othermsg')
    }
    messageDiv.innerText = `${data.user} : `+data.msg;
    
    // Put it in the message area
    messageArea.appendChild(messageDiv);
    
    // Auto-scroll to the bottom--->bujnu parne
    messageArea.scrollTop = messageArea.scrollHeight;
}

// 1. Sending a message (The "Mouth")
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page refresh
    const msg = messageInput.value.trim();
    if (!msg) return; // Ignore empty messages
    
    socket.emit('chat-message', msg); // Send to server
    messageInput.value = ''; // Clear input
});//kina arko banihalxa??

// 2. Receiving a message (The "Ears")
socket.on('message-to-all', (data) => {
 show_msg(data)
});


let typingTimer
messageInput.addEventListener("keydown",()=>{
    socket.emit("typing");

    clearTimeout(typingTimer);

    typingTimer=setTimeout(()=>{
        socket.emit("stop-typing");
    },1000)

})

socket.on("typing",(user)=>{
    typingArea.innerText=`${user} is Typing...`
})
socket.on("hide-typing",()=>
   { typingArea.innerText="";
})


//SHOWS HISTORY 
socket.on("history",(history)=>{
    history.forEach(msg=>{
        show_msg(msg)
    })
})

//For Online Indicator
socket.on("online-users",(users)=>{
    list.innerHTML="";
    users.forEach(user=>{
        if(user===username) return
        const li=document.createElement("li")
        li.textContent=user;
        li.dataset.user=user;
        li.addEventListener("click",()=>openDM(user))
        list.appendChild(li)
    })
})

//FOR PRIVATE MESSAGE
let activeDMUser = null;
function openDM(user){
    activeDMUser=user
    document.getElementById("chat-container").style.display="none";
    document.getElementById("dm-container").style.display="flex";
    document.getElementById("dm-title").textContent=`Chat with ${user}`

}
document.getElementById("back-btn").addEventListener("click",()=>{
        document.getElementById("chat-container").style.display="flex";
        document.getElementById("dm-container").style.display="none";
})


