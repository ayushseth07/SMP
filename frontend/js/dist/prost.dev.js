"use strict";

document.addEventListener('DOMContentLoaded', function _callee2() {
  var authToken, response, data, postContainer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(localStorage.getItem('Authorization'));

        case 2:
          authToken = _context2.sent;
          console.log(authToken);

          if (!authToken) {
            _context2.next = 23;
            break;
          }

          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/displayPost?authToken=".concat(authToken), {
            method: 'GET',
            headers: {
              Authorization: authToken
            }
          }));

        case 8:
          response = _context2.sent;

          if (!response.ok) {
            _context2.next = 17;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context2.sent;
          // Access the post container
          postContainer = document.getElementById('post-container'); // Loop through the posts and create cards

          data.post.forEach(function (post) {
            var postCard = document.createElement('div');
            postCard.className = 'post-card'; // Create elements for post content (title, description, and image)

            var postTitle = document.createElement('h3');
            postTitle.textContent = post.title;
            var postDescription = document.createElement('p');
            postDescription.textContent = post.description;
            var postImage = document.createElement('img');
            postImage.src = post.image_url;
            postImage.alt = 'Post Image'; // Display the number of likes

            var likeCount = document.createElement('p');
            likeCount.textContent = "Likes: ".concat(post.likes); // Create a button to like the post

            var likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.addEventListener('click', function _callee() {
              var response;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/likePost/".concat(post.post_id), {
                        method: 'POST',
                        headers: {
                          Authorization: authToken
                        }
                      }));

                    case 2:
                      response = _context.sent;

                      if (response.ok) {
                        // Update the like count in the frontend
                        post.likes++;
                        likeCount.textContent = "Likes: ".concat(post.likes);
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }); // Append content to the card

            postCard.appendChild(postTitle);
            postCard.appendChild(postDescription);
            postCard.appendChild(postImage);
            postCard.appendChild(likeCount);
            postCard.appendChild(likeButton); // Append the card to the container

            postContainer.appendChild(postCard);
          });
          _context2.next = 18;
          break;

        case 17:
          console.error('Request failed');

        case 18:
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](5);
          console.error('Error: ' + _context2.t0);

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 20]]);
});