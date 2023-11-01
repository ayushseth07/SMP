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

document.getElementById("addDataButton").addEventListener("click", function _callee(e) {
  var authToken, profile, gender, company, bloodGroup, age, response, errorData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          _context.next = 3;
          return regeneratorRuntime.awrap(localStorage.getItem('Authorization'));

        case 3:
          authToken = _context.sent;
          profile = document.getElementById("profile").value;
          gender = document.getElementById("gender").value;
          company = document.getElementById("company").value;
          bloodGroup = document.getElementById("bloodgroup").value;

          if (!uploadedImageURL) {
            alert("Choose Image");
          }

          age = document.getElementById("age").value;
          console.log(profile, gender, uploadedImageURL, age, company, bloodGroup);
          _context.prev = 11;
          _context.next = 14;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/user/addUserData?authToken=".concat(authToken), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              profile: profile,
              gender: gender,
              uploadedImageURL: uploadedImageURL,
              age: age,
              company: company,
              bloodGroup: bloodGroup
            })
          }));

        case 14:
          response = _context.sent;

          if (!(response.status === 200)) {
            _context.next = 19;
            break;
          }

          window.location.href = "/post";
          _context.next = 23;
          break;

        case 19:
          _context.next = 21;
          return regeneratorRuntime.awrap(response.json());

        case 21:
          errorData = _context.sent;

          if (errorData) {
            alert("All fields are required");
          } else {
            alert(errorData.error || "Login failed");
          }

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](11);
          console.error("Error: " + _context.t0);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 25]]);
});