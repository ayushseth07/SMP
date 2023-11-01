
let userName;
let authorization;
let email;
document.addEventListener("DOMContentLoaded",async function getName() {
    userName = localStorage.getItem("name");
    authorization = localStorage.getItem("Authorization");
    profileImage = localStorage.getItem("profileImage");
   
    if (userName) {
        socket.emit('setUsername', {userName,authorization});
        console.log(profileImage)
        document.getElementById("profileImageHeading").innerHTML = `<img src=${profileImage} class="profileImage"/>`;
        document.getElementById("publicChatHeading").innerHTML = " " + userName;
    }
    return userName;
} )


async function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    
    socket.emit("message", message);
  

    messageInput.value = "";
}

socket.on("message", (message) => {
    const post = document.getElementById("post1");
    const messageElement = document.createElement("div");
    const currentTime = new Date();

    const formattedTime = `${currentTime.getHours()} : ${currentTime.getMinutes()} : ${currentTime.getSeconds()}`;
    messageElement.innerText = message + " Time: " + formattedTime;

    post.appendChild(messageElement);
});



socket.on("setUsername", (message) => {
    const post = document.getElementById("post");
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    post.appendChild(messageElement);
});
