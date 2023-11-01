

// document.getElementById("close-button").addEventListener("click", function () {
//   document.getElementById("right-div").style.display = "none";
// })

document.addEventListener('DOMContentLoaded', async function () {

  // var toggleButton = document.querySelector(".toggle-active-users");
  // toggleButton.addEventListener("click", function () {
  //   var parentDiv = this.parentElement;
  //   var userList = parentDiv.querySelector("ul");
  //   const activeUserList = document.getElementById("users-list-container")

  //   if (userList.style.display === "none" || userList.style.display === "") {
  //     activeUserList.style.height = "30vh";
  //     userList.style.display = "block";
  //   } else {
  //     activeUserList.style.height = "5vh";

  //     userList.style.display = "none";
  //   }
  // });
  let likedPostEmail;
  const authToken = await localStorage.getItem('Authorization');

  if (authToken) {
    try {
      const response = await fetch(`http://localhost:8080/post/allPost?authToken=${authToken}`, {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const postContainer = document.getElementById('post-container');

        data.post.forEach((post) => {
          const postCard = document.createElement('div');
          const postCardContent = document.createElement('div');
          const postCardImage = document.createElement('div');

          const commentOutput = document.createElement('div');
          commentOutput.id = `comment-of-${post.userid}-${post.post_id}`;

          postCard.className = 'post-card';
          postCardContent.className = 'post-card-text';
          postCardImage.className = 'post-card-image';
          const postTitle = document.createElement('h3');
          postTitle.textContent = post.title;

          const postDescription = document.createElement('p');
          postDescription.textContent = post.description;

          const likeCount = document.createElement('p');
          likeCount.textContent = `Likes: ${post.likes}`;

          const displayComment = document.createElement('button');
          displayComment.innerHTML = '<i class="fa-regular fa-comment"></i>';
          displayComment.classList.add("display-comment");
          displayComment.addEventListener('click', async () => {
            const commentDisplayContainer = document.getElementById(`comment-of-${post.userid}-${post.post_id}`);
            displayComment.style.color = "red";
            if (commentDisplayContainer.innerHTML === null || commentDisplayContainer.innerHTML.trim() === '') {
              try {
                const response = await fetch(`http://localhost:8080/post/comments/${post.post_id}?authToken=${authToken}&receiver=${post.userid}`, {
                  method: 'POST',
                  headers: {
                    Authorization: authToken,
                  },
                });
                if (response.status === 201) {

                  const comments = await response.json();
                  commentDisplayContainer.innerHTML = "";
                  comments.data.forEach((comment) => {
                    commentDisplayContainer.innerHTML += `<a href="http://localhost:3000/userInfo?email=${comment.email}" class="name-links">${comment.sender_name}:</a> ${comment.comment_value}<br>`;

                  })

                } else {
                  commentDisplayContainer.innerHTML = "No Comments Yet";

                }
              }
              catch (error) {
                console.log(error)
              }
            }

            else {
              commentDisplayContainer.innerHTML = "";
              displayComment.style.color = "white"
            }

          });

          const likeButton = document.createElement('button');
          likeButton.classList.add("like-button")
          likeButton.innerHTML = "<i class='fa-solid fa-heart'>";

          if (post.liked_by.includes(data.loggedInUser)) {
            likeButton.classList.add("unlike-icon")
          } else {
            likeButton.classList.add("like-icon")
          }
          likeButton.addEventListener('click', async () => {

            if (likeButton.classList.contains("like-icon")) {
              const event = "like";
              const postId = post.post_id;
              likedPostEmail = post.userid;
              socket.emit("updateNotification", { likedPostEmail, authToken, postId, event });
              post.likes++;
              likeCount.textContent = `Likes: ${post.likes}`;
              likeButton.classList.remove("like-icon")
              likeButton.classList.add("unlike-icon")
            }
            else if (likeButton.classList.contains("unlike-icon")) {
              const postId = post.post_id;
              likedPostEmail = post.userid;
              const event = "unlike";
              likeButton.classList.remove("unlike-icon")
              likeButton.classList.add("like-icon")
              socket.emit("updateNotification", { likedPostEmail, authToken, postId, event });
              post.likes--;
              likeCount.textContent = `Likes: ${post.likes}`;
            }
          });


          const postImage = document.createElement('img');
          postImage.src = post.image_url;
          postImage.alt = 'Post Image';

          const commentInput = document.createElement('input');
          commentInput.for = "comment";
          commentInput.classList.add('comment');
          commentInput.id = `comments-${post.userid}-${post.post_id}`;
          commentInput.placeholder = "Add Comment"

          const commentButton = document.createElement('button');
          commentButton.style.display = "none";

          commentInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              event.preventDefault();
              commentButton.click();
            }
          });

          commentButton.addEventListener("click", async function () {
            var inputValue = document.getElementById(`comments-${post.userid}-${post.post_id}`).value;
            const postId = post.post_id;
            likedPostEmail = post.userid;
            socket.emit("addComment", { inputValue, postId, likedPostEmail, authToken })
            inputValue.value = "";

          });
          const postDate = getFromatedDate(post.date_created);
          const titleBar = document.createElement('div');
          titleBar.classList.add("title-bar")
          titleBar.innerHTML = `<i class="fa-solid fa-user"></i> <a href="http://localhost:3000/userInfo?email=${post.userid}" class="name-links">${post.user_name}</a> <span>${postDate}</span>`;
          const postBy = document.createElement('h3');
          const postButtonDiv = document.createElement('div');
          const postCardInner = document.createElement('div');
          postCardInner.classList.add("post-card-inner")
          postButtonDiv.classList.add("post-buttons")
          postBy.innerHTML = post.user_name;
          postCard.appendChild(titleBar)
          postCardContent.appendChild(postTitle);
          postCardContent.appendChild(postDescription);
          postCardContent.appendChild(likeCount);
          postButtonDiv.appendChild(likeButton);
          postButtonDiv.appendChild(displayComment);
          postCardContent.appendChild(postButtonDiv)
          postCardContent.appendChild(commentInput);
          postCardContent.appendChild(commentButton);
          postCardContent.appendChild(commentOutput);
          postCardImage.appendChild(postImage);
          postCardInner.appendChild(postCardContent);
          postCardInner.appendChild(postCardImage);
          postCard.append(postCardInner)
          postContainer.appendChild(postCard);

        });
        socket.on("displayComment", (data) => {
          console.log(data);
          const commentSection = document.getElementById(`comment-of-${data.receiver}-${data.postid}`)
          const singlePara = document.createElement('p');
          singlePara.innerHTML = data.value;
          commentSection.appendChild(singlePara);
        });
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Error: ' + error);
    }
  }
});

function getFromatedDate(dateString) {

  const currentDate = new Date(dateString);
  const now = new Date();
  const timeDifference = now - currentDate;
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor(timeDifference / oneDayInMillis);
  let formattedDate;
  if (daysAgo === 0) {
    formattedDate = "Today";
  } else if (daysAgo === 1) {
    formattedDate = "1 day ago";
  } else {
    formattedDate = daysAgo + " days ago";
  }

  return formattedDate;

}