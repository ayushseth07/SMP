const forgotPasswordButton = document.getElementById("forgotPassword");
forgotPasswordButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  if(!email){
    alert("Email is required");
  }else{  try {
    const response = await fetch("http://localhost:8080/user/forgetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    });

    if (response.status === 200) {
        
        const data = await response.json();
        localStorage.setItem("Authorization2", data.token)
        console.log(data.link)

    } else if(response.status === 203){
        window.location.href = "http://localhost:8080/user/verify"
    }else if(response.status === 204){
     alert("No such user exists")
  }
    else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to send reset link.");
    }
  } catch (error) {
    console.error("Error: " + error);
  }}



});

