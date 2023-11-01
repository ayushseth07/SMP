
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