"use strict";

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("right-div").style.display = "none";
});
document.addEventListener('DOMContentLoaded', function _callee4() {
  var toggleButton, likedPostEmail, authToken, response, data, postContainer;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          toggleButton = document.querySelector(".toggle-active-users");
          toggleButton.addEventListener("click", function () {
            var parentDiv = this.parentElement;
            var userList = parentDiv.querySelector("ul");
            var activeUserList = document.getElementById("users-list-container");

            if (userList.style.display === "none" || userList.style.display === "") {
              activeUserList.style.height = "30vh";
              userList.style.display = "block";
            } else {
              activeUserList.style.height = "5vh";
              userList.style.display = "none";
            }
          });
          _context4.next = 4;
          return regeneratorRuntime.awrap(localStorage.getItem('Authorization'));

        case 4:
          authToken = _context4.sent;

          if (!authToken) {
            _context4.next = 25;
            break;
          }

          _context4.prev = 6;
          _context4.next = 9;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/allPost?authToken=".concat(authToken), {
            method: 'GET',
            headers: {
              Authorization: authToken
            }
          }));

        case 9:
          response = _context4.sent;

          if (!response.ok) {
            _context4.next = 19;
            break;
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          data = _context4.sent;
          postContainer = document.getElementById('post-container');
          data.post.forEach(function (post) {
            var postCard = document.createElement('div');
            var postCardContent = document.createElement('div');
            var postCardImage = document.createElement('div');
            var commentOutput = document.createElement('div');
            commentOutput.id = "comment-of-".concat(post.userid, "-").concat(post.post_id);
            postCard.className = 'post-card';
            postCardContent.className = 'post-card-text';
            postCardImage.className = 'post-card-image';
            var postTitle = document.createElement('h3');
            postTitle.textContent = post.title;
            var postDescription = document.createElement('p');
            postDescription.textContent = post.description;
            var likeCount = document.createElement('p');
            likeCount.textContent = "Likes: ".concat(post.likes);
            var displayComment = document.createElement('button');
            displayComment.innerHTML = '<i class="fa-regular fa-comment"></i>';
            displayComment.classList.add("display-comment");
            displayComment.addEventListener('click', function _callee() {
              var commentDisplayContainer, _response, comments;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      commentDisplayContainer = document.getElementById("comment-of-".concat(post.userid, "-").concat(post.post_id));
                      displayComment.style.color = "red";

                      if (!(commentDisplayContainer.innerHTML === null || commentDisplayContainer.innerHTML.trim() === '')) {
                        _context.next = 23;
                        break;
                      }

                      _context.prev = 3;
                      _context.next = 6;
                      return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/comments/".concat(post.post_id, "?authToken=").concat(authToken, "&receiver=").concat(post.userid), {
                        method: 'POST',
                        headers: {
                          Authorization: authToken
                        }
                      }));

                    case 6:
                      _response = _context.sent;

                      if (!(_response.status === 201)) {
                        _context.next = 15;
                        break;
                      }

                      _context.next = 10;
                      return regeneratorRuntime.awrap(_response.json());

                    case 10:
                      comments = _context.sent;
                      commentDisplayContainer.innerHTML = "";
                      comments.data.forEach(function (comment) {
                        commentDisplayContainer.innerHTML += comment.sender_name + ": " + comment.comment_value + "<br>";
                      });
                      _context.next = 16;
                      break;

                    case 15:
                      commentDisplayContainer.innerHTML = "No Comments Yet";

                    case 16:
                      _context.next = 21;
                      break;

                    case 18:
                      _context.prev = 18;
                      _context.t0 = _context["catch"](3);
                      console.log(_context.t0);

                    case 21:
                      _context.next = 25;
                      break;

                    case 23:
                      commentDisplayContainer.innerHTML = "";
                      displayComment.style.color = "white";

                    case 25:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[3, 18]]);
            });
            var likeButton = document.createElement('button');
            likeButton.classList.add("like-button");
            likeButton.innerHTML = "<i class='fa-solid fa-heart'>";

            if (post.liked_by.includes(data.loggedInUser)) {
              likeButton.classList.add("unlike-icon");
            } else {
              likeButton.classList.add("like-icon");
            }

            likeButton.addEventListener('click', function _callee2() {
              var event, postId, _postId, _event;

              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (likeButton.classList.contains("like-icon")) {
                        event = "like";
                        postId = post.post_id;
                        likedPostEmail = post.userid;
                        socket.emit("updateNotification", {
                          likedPostEmail: likedPostEmail,
                          authToken: authToken,
                          postId: postId,
                          event: event
                        });
                        post.likes++;
                        likeCount.textContent = "Likes: ".concat(post.likes);
                        likeButton.classList.remove("like-icon");
                        likeButton.classList.add("unlike-icon");
                      } else if (likeButton.classList.contains("unlike-icon")) {
                        _postId = post.post_id;
                        likedPostEmail = post.userid;
                        _event = "unlike";
                        likeButton.classList.remove("unlike-icon");
                        likeButton.classList.add("like-icon");
                        socket.emit("updateNotification", {
                          likedPostEmail: likedPostEmail,
                          authToken: authToken,
                          postId: _postId,
                          event: _event
                        });
                        post.likes--;
                        likeCount.textContent = "Likes: ".concat(post.likes);
                      }

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            var postImage = document.createElement('img');
            postImage.src = post.image_url;
            postImage.alt = 'Post Image';
            var commentInput = document.createElement('input');
            commentInput["for"] = "comment";
            commentInput.classList.add('comment');
            commentInput.id = "comments-".concat(post.userid, "-").concat(post.post_id);
            commentInput.placeholder = "Add Comment";
            var commentButton = document.createElement('button');
            commentButton.style.display = "none";
            commentInput.addEventListener("keypress", function (event) {
              if (event.key === "Enter") {
                event.preventDefault();
                commentButton.click();
              }
            });
            commentButton.addEventListener("click", function _callee3() {
              var inputValue, postId;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      inputValue = document.getElementById("comments-".concat(post.userid, "-").concat(post.post_id)).value;
                      postId = post.post_id;
                      likedPostEmail = post.userid;
                      socket.emit("addComment", {
                        inputValue: inputValue,
                        postId: postId,
                        likedPostEmail: likedPostEmail,
                        authToken: authToken
                      });
                      inputValue.value = "";

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
            var postDate = getFromatedDate(post.date_created);
            var titleBar = document.createElement('div');
            titleBar.classList.add("title-bar");
            titleBar.innerHTML = '<i class="fa-solid fa-user"></i>' + post.user_name + "<span>".concat(postDate, "</span>");
            var postBy = document.createElement('h3');
            var postButtonDiv = document.createElement('div');
            var postCardInner = document.createElement('div');
            postCardInner.classList.add("post-card-inner");
            postButtonDiv.classList.add("post-buttons");
            postBy.innerHTML = post.user_name;
            postCard.appendChild(titleBar);
            postCardContent.appendChild(postTitle);
            postCardContent.appendChild(postDescription);
            postCardContent.appendChild(likeCount);
            postButtonDiv.appendChild(likeButton);
            postButtonDiv.appendChild(displayComment);
            postCardContent.appendChild(postButtonDiv);
            postCardContent.appendChild(commentInput);
            postCardContent.appendChild(commentButton);
            postCardContent.appendChild(commentOutput);
            postCardImage.appendChild(postImage);
            postCardInner.appendChild(postCardContent);
            postCardInner.appendChild(postCardImage);
            postCard.append(postCardInner);
            postContainer.appendChild(postCard);
          });
          socket.on("displayComment", function (data) {
            console.log(data);
            var commentSection = document.getElementById("comment-of-".concat(data.receiver, "-").concat(data.postid));
            var singlePara = document.createElement('p');
            singlePara.innerHTML = data.sender + " " + data.value;
            commentSection.appendChild(singlePara);
          });
          _context4.next = 20;
          break;

        case 19:
          console.error('Request failed');

        case 20:
          _context4.next = 25;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](6);
          console.error('Error: ' + _context4.t0);

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 22]]);
});

function getFromatedDate(dateString) {
  var currentDate = new Date(dateString);
  var now = new Date();
  var timeDifference = now - currentDate;
  var oneDayInMillis = 24 * 60 * 60 * 1000;
  var daysAgo = Math.floor(timeDifference / oneDayInMillis);
  var formattedDate;

  if (daysAgo === 0) {
    formattedDate = "Today";
  } else if (daysAgo === 1) {
    formattedDate = "1 day ago";
  } else {
    formattedDate = daysAgo + " days ago";
  }

  return formattedDate;
}