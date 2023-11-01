const socket = io();

socket.on("session-expired", (result)=>{
    localStorage.setItem('Authorization', null)
    window.location.href = "http://localhost:3000/login";
})

socket.on("notification-received",(data)=>{
alert(data.username + " liked your post");
})



