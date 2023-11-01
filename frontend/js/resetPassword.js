document.getElementById('reset-password-button').addEventListener("click", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword.trim() === "" || confirmPassword.trim() === "") {
    alert("All fields are required");
  } else {
    const authorization = localStorage.getItem("Authorization2");
    await saveNewPassword(authorization);
  }

  async function saveNewPassword(authorization) {
    try {
      const response = await fetch(`http://localhost:8080/user/resetPassword?authToken=${authorization}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword })
      });

      if (response.status === 200) {
        window.location.href = "http://localhost:3000/login";
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
      } else if (response.status === 404) {
        const errorData = await response.json();
        alert(errorData.error);
      } else {
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  }
});
