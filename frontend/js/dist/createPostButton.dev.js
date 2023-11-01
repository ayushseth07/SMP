"use strict";

var cloudName = "dgnltfvp4";
var uploadPreset = "rssp7uaq";
var uploadedImageURL;
var myWidget = cloudinary.createUploadWidget({
  cloudName: cloudName,
  uploadPreset: uploadPreset
}, function (error, result) {
  if (!error && result && result.event === "success") {
    console.log("Done! Here is the image info: ", result.info);
    uploadedImageURL = result.info.secure_url;
    handleImageDisplay(result.info.secure_url);
  }
});
document.getElementById("choose-file").addEventListener("click", function (e) {
  e.preventDefault();
  myWidget.open();
}, false);

function handleImageDisplay(imageUrl) {
  var uploadButton = document.getElementById('choose-file');

  if (imageUrl) {
    uploadButton.disabled = true;
    uploadButton.classList.add('inactive-button');
  } else {
    uploadButton.classList.remove('inactive-button');
  }
}

document.getElementById("addPostButton").addEventListener("click", function _callee(e) {
  var authToken, title, category, description, response, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(localStorage.getItem('Authorization'));

        case 3:
          authToken = _context.sent;
          console.log(authToken);
          title = document.getElementById("title").value;
          category = document.getElementById("category").value;
          console.log(category);

          if (!uploadedImageURL) {
            alert("Choose Image");
          }

          description = document.getElementById("description").value;
          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/addPost?authToken=".concat(authToken), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: title,
              category: category,
              uploadedImageURL: uploadedImageURL,
              description: description
            })
          }));

        case 13:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 18;
            break;
          }

          window.location.href = "/post";
          _context.next = 22;
          break;

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(response.json());

        case 20:
          errorData = _context.sent;

          if (errorData) {
            alert("All fields are required");
          } else {
            alert(errorData.error || "Login failed");
          }

        case 22:
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](10);
          console.error("Error: " + _context.t0);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 24]]);
});