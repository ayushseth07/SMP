document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem('Authorization');
    if (authToken != "null") {      
        window.location.href = "http://localhost:3000/allPosts";
 }
    else {
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
    
            try {
                const response = await fetch("http://localhost:3000/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                if (response.status === 200) {
                    const tokenData = await response.json();
                    const name = tokenData.name;
                    localStorage.setItem("name", name);
                    const authToken = tokenData.Authorization;
    
                    localStorage.setItem("Authorization", authToken); // Store the token
                    window.location.href = "http://localhost:3000/allPosts";
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || "Login failed");
                }
            } catch (error) {
                console.error("Error: " + error);
            }
    
    
        });
        const forgotPasswordButton = document.getElementById("forgotPassword");
        forgotPasswordButton.addEventListener("click", async (e) => {
            e.preventDefault();
    
            const email = document.getElementById("email").value;
    
            try {
                const response = await fetch("/user/sendResetLink", {
                    method: "GET"
                });
    
                if (response.status === 200) {
                    alert("Password reset link sent to your email.");
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || "Failed to send reset link.");
                }
            } catch (error) {
                console.error("Error: " + error);
            }
        });

    }
})