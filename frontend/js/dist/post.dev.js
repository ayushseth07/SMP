"use strict";

document.addEventListener('DOMContentLoaded', function _callee5() {
  var confirmationBox, authToken, response, data, postContainer, _postContainer;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          confirmationBox = document.getElementById("confirmation-box"); // const cancelButton = document.getElementById("cancel-button");
          // const confirmButton = document.getElementById("confirm-button");

          _context5.next = 3;
          return regeneratorRuntime.awrap(localStorage.getItem('Authorization'));

        case 3:
          authToken = _context5.sent;

          if (!authToken) {
            _context5.next = 26;
            break;
          }

          _context5.prev = 5;
          _context5.next = 8;
          return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/displayPost?authToken=".concat(authToken), {
            method: 'GET',
            headers: {
              Authorization: authToken
            }
          }));

        case 8:
          response = _context5.sent;

          if (!response.ok) {
            _context5.next = 17;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(response.json());

        case 12:
          data = _context5.sent;
          postContainer = document.getElementById('post-container');
          data.post.forEach(function (post) {
            var postCard = document.createElement('div');
            var postCardContent = document.createElement('div');
            var postCardImage = document.createElement('div');
            var commentOutput = document.createElement('div');
            commentOutput.classList.add('comment-of-email-id');
            commentOutput.id = "comment-of-".concat(post.userid, "-").concat(post.post_id);
            postCard.className = 'post-card';
            postCardContent.className = 'post-card-text';
            postCardImage.className = 'post-card-image';
            postCard.id = "post-card-".concat(post.post_id);
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

                      if (!(commentDisplayContainer.innerHTML === null || commentDisplayContainer.innerHTML.trim() === '')) {
                        _context.next = 24;
                        break;
                      }

                      displayComment.style.color = "red";
                      commentDisplayContainer.style.display = "block";
                      _context.prev = 4;
                      _context.next = 7;
                      return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/comments/".concat(post.post_id, "?authToken=").concat(authToken, "&receiver=").concat(post.userid), {
                        method: 'POST',
                        headers: {
                          Authorization: authToken
                        }
                      }));

                    case 7:
                      _response = _context.sent;

                      if (!(_response.status === 201)) {
                        _context.next = 16;
                        break;
                      }

                      _context.next = 11;
                      return regeneratorRuntime.awrap(_response.json());

                    case 11:
                      comments = _context.sent;
                      commentDisplayContainer.innerHTML = "";
                      comments.data.forEach(function (comment) {
                        commentDisplayContainer.innerHTML += comment.sender_name + ": " + comment.comment_value + "<br>";
                      });
                      _context.next = 17;
                      break;

                    case 16:
                      commentDisplayContainer.innerHTML = "No Comments Yet";

                    case 17:
                      _context.next = 22;
                      break;

                    case 19:
                      _context.prev = 19;
                      _context.t0 = _context["catch"](4);
                      console.log(_context.t0);

                    case 22:
                      _context.next = 27;
                      break;

                    case 24:
                      commentDisplayContainer.innerHTML = "";
                      displayComment.style.color = "white";
                      commentDisplayContainer.style.display = "none";

                    case 27:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[4, 19]]);
            });
            var likeButton = document.createElement('button');
            likeButton.classList.add("like-button");
            likeButton.innerHTML = "<i class='fa-solid fa-heart'>";

            if (post.liked_by.includes(post.userid)) {
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
            commentButton.id = "commentSubmitButton";
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
            var deletePostButton = document.createElement("button");
            deletePostButton.classList.add("delete-post-button");
            deletePostButton.id = "delete-post-".concat(post.post_id);
            deletePostButton.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
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
            postButtonDiv.appendChild(deletePostButton);
            postCardContent.appendChild(postButtonDiv);
            postCardContent.appendChild(commentInput);
            postCardContent.appendChild(commentButton);
            postCardContent.appendChild(commentOutput);
            postCardImage.appendChild(postImage);
            postCardInner.appendChild(postCardContent);
            postCardInner.appendChild(postCardImage);
            postCard.append(postCardInner);
            postContainer.appendChild(postCard);
            document.getElementById("delete-post-".concat(post.post_id)).addEventListener("click", function () {
              confirmationBox.classList.remove('hidden');
              confirmationBox.innerHTML = "<div class=\"confirmation-content\">\n            <p>Are you sure you want to delete this post?</p>\n             <div class=\"confirmation-buttons\">\n                <button id=\"cancel-button-".concat(post.post_id, "\">Cancel</button>\n                <button id=\"confirm-button-").concat(post.post_id, "\">Confirm</button>\n             </div>\n            </div> ");
              document.getElementById("cancel-button-".concat(post.post_id)).addEventListener('click', function () {
                confirmationBox.classList.add("hidden");
              });
              document.getElementById("confirm-button-".concat(post.post_id)).addEventListener('click', function _callee4() {
                var _response2, currentPostCard;

                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        confirmationBox.classList.add("hidden");
                        _context4.prev = 1;
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(fetch("http://localhost:8080/post/deletePost?authToken=".concat(authToken, "&postid=").concat(post.post_id), {
                          method: 'DELETE',
                          headers: {
                            Authorization: authToken
                          }
                        }));

                      case 4:
                        _response2 = _context4.sent;

                        if (_response2.status == 200) {
                          currentPostCard = document.getElementById("post-card-".concat(post.post_id));

                          if (currentPostCard) {
                            currentPostCard.remove();
                          }
                        } else if (_response2.status == 400) {
                          alert("Internal server error");
                        }

                        _context4.next = 11;
                        break;

                      case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4["catch"](1);
                        alert(_context4.t0.message);

                      case 11:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, null, null, [[1, 8]]);
              });
            });
          });
          _context5.next = 19;
          break;

        case 17:
          _postContainer = document.getElementById('post-container');
          _postContainer.innerHTML = "<p>No post yet</p>";

        case 19:
          _context5.next = 24;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](5);
          alert('Error: ' + _context5.t0);

        case 24:
          _context5.next = 27;
          break;

        case 26:
          socket.emit("session-expired", authToken);

        case 27:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[5, 21]]);
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