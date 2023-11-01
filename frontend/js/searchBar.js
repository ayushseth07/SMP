const searchInput = document.getElementById("searchInput");
const userList = document.getElementById("searchUserList");

searchInput.addEventListener('input', async () => {
    userList.innerHTML = "";
    showUserList();
    const searchTerm = searchInput.value;
    const response = await fetch(`http://localhost:8080/user/searchuser?search=${searchTerm}`, {
        method: 'POST',
    });
    if (response.status == 200) {
        const users = await response.json();
        if (Array.isArray(users.foundUsers)) {
            userList.classList.remove("user-list-item")

            const userListContainer = document.createElement('ul');
            userListContainer.className = "user-list"; // Add a class for styling
            users.foundUsers.forEach(user => {
                const userListItem = document.createElement('li');
                userListItem.className = "user-list-item"; // Add a class for styling
                
                const userEmailLink = document.createElement('a');
                userEmailLink.href = `http://localhost:3000/userInfo?email=${user.email}`; // Link to the search user route
                userEmailLink.textContent = `${user.name}`;
                userEmailLink.classList.add("name-links")
                
                userListItem.appendChild(userEmailLink);
                userListContainer.appendChild(userListItem);

            });
            userList.appendChild(userListContainer);
        } else {
            userList.innerHTML = "No such user found."; // Display a message when no users are found
            userList.classList.add("user-list-item")

        }
    } else if (response.status == 204) {
        userList.innerHTML = "No such user found."; // Display a message when no users are found
        userList.classList.add("user-list-item")

    }
});

document.addEventListener('mousedown', (event) => {
    // Check if the click is outside of search input and user list
    if (!searchInput.contains(event.target) && !userList.contains(event.target)) {
        hideUserList();
    }
});

function showUserList() {
    userList.style.display = "block";
}

function hideUserList() {
    userList.style.display = "none";
}
