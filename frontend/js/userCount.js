socket.on("userCount", (count) => {
    const userCountElement = document.getElementById("userCount");
    userCountElement.innerText = `: ${count}`;
});