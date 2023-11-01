document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("right-div").style.display = "none";
});
document.addEventListener('DOMContentLoaded', async function () {

  var toggleButton = document.querySelector(".toggle-active-users");
  toggleButton.addEventListener("click", function () {
    var parentDiv = this.parentElement;
    var userList = parentDiv.querySelector("ul");
    const activeUserList = document.getElementById("users-list-container")

    if (userList.style.display === "none" || userList.style.display === "") {
      activeUserList.style.height = "30vh";
      userList.style.display = "block";
    } else {
      activeUserList.style.height = "5vh";

      userList.style.display = "none";
    }
  });
  const activeUsersList = document.getElementById("activeUsersList");
  let receiverEmail;
  let currentUserName;

  socket.on("activeUsersList", (data) => {
    const users = data;

    console.log(data[0])
    activeUsersList.innerHTML = "";
    users.forEach((user) => {
      const currentUserEmail = user[0];
      const userName = user[1].name;
      const userElement = document.createElement("li");
      userElement.innerHTML = userName + "<span class='count-span'></span>";
      userElement.id = currentUserEmail;
      userElement.addEventListener("click", () => {
        document.getElementById("private-chat-container").style.display = "block";
        receiverEmail = userElement.id;
        openPrivateChatWithUser(userName, receiverEmail);
      });
      userElement.classList.add("active-user");
      activeUsersList.appendChild(userElement);
    });
  });



  function openPrivateChatWithUser(userName, email) {
    currentUserName = userName;
    console.log(userName)
    document.getElementById("right-div").style.display = "block";
    const modal = document.getElementById("privateChatModal");
    const modalContent = document.getElementById("privateChatContent");
    modalContent.textContent = `Chatting with ${userName}`;
    modal.style.display = "block";

    chatDataDisplay(email)

  }

  function chatDataDisplay(email) {
    socket.emit("loadChats", email);
    socket.on("chatsLoaded", (chats) => {
      const post = document.getElementById("post");
      post.innerHTML = "";

      let currentDay = null;

      chats.forEach((chat) => {
        console.log(chat);
        const messageElement = document.createElement("div");
        const messageDate = new Date(chat.time);
        const formattedTime = messageDate.toLocaleTimeString();
        const formattedDate = messageDate.toLocaleDateString();

        if (formattedDate !== currentDay) {
          currentDay = formattedDate;
          const dayHeader = document.createElement("div");
          dayHeader.textContent = currentDay;
          dayHeader.classList.add("day-header");
          post.appendChild(dayHeader);
        }

        const messageContent = document.createElement("div");
        messageContent.innerHTML = chat.message + "<br>" + formattedTime;
        messageContent.classList.add(
          chat.sender === email ? "message-sent" : "message-received"
        );

        messageElement.appendChild(messageContent);
        post.appendChild(messageElement);
      });
    });
  }

  async function sendPrivateMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    socket.emit("privateMessage", { message, receiverEmail });
    openPrivateChatWithUser(currentUserName, receiverEmail)
    socket.on("privateMessage", (data) => {
      openPrivateChatWithUser(currentUserName, data.receiverEmail)
    });

    messageInput.value = "";

  }
  const sendButton = document.getElementById("send-private-message");
  sendButton.addEventListener("click",sendPrivateMessage);
})