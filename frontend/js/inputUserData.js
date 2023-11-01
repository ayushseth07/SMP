
const cloudName = "dgnltfvp4"; 
const uploadPreset = "rssp7uaq"; 
let uploadedImageURL ;



const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,

  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      uploadedImageURL=result.info.secure_url
        handleImageDisplay(result.info.secure_url);
    }
  }
);
document.getElementById("choose-file").addEventListener(
    "click",
    function (e) {
        e.preventDefault();        
      myWidget.open();
    },
    false
  );

  function handleImageDisplay(imageUrl) {
    const uploadButton = document.getElementById('choose-file');
  
    if (imageUrl) {
      
     uploadButton.disabled = true;
      uploadButton.classList.add('inactive-button');
    } else {
    uploadButton.classList.remove('inactive-button');

    }
  }
  document.getElementById("addDataButton").addEventListener("click", async function(e){
    e.preventDefault();
    const authToken = await localStorage.getItem('Authorization');    
    const profile = document.getElementById("profile").value;
    const gender = document.getElementById("gender").value;
    const company = document.getElementById("company").value;
    const bloodGroup = document.getElementById("bloodgroup").value;
    if(!uploadedImageURL){
      alert("Choose Image")
    }

    const age = document.getElementById("age").value;

    console.log( profile,gender,uploadedImageURL,age,company,bloodGroup )
    try {
      const response = await fetch(`http://localhost:8080/user/addUserData?authToken=${authToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ profile,gender,uploadedImageURL,age,company,bloodGroup }),
      });

      if (response.status === 200) {

        window.location.href = "/post";
    } else {
        const errorData = await response.json();
        if(errorData){
          alert("All fields are required");
        }else{
          alert(errorData.error || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  });