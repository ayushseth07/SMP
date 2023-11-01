
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
document.getElementById("addPostButton").addEventListener("click", async function(e){
    e.preventDefault();
    const authToken = await localStorage.getItem('Authorization');
    console.log(authToken);
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    console.log(category);
    if(!uploadedImageURL){
      alert("Choose Image")


    }

    const description = document.getElementById("description").value;



    try {
      const response = await fetch(`http://localhost:8080/post/addPost?authToken=${authToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title,category,uploadedImageURL,description }),
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




