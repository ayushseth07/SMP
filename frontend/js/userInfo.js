document.addEventListener('DOMContentLoaded', async function () {
  const authToken = localStorage.getItem('Authorization');
   const currentURL = window.location.href;
  const url = new URL(currentURL);
  const emailParam = url.searchParams.get('email');
  if (authToken) {
    try {
      const response = await fetch(`http://localhost:8080/user/userInfo?authToken=${authToken}&userInfo=${emailParam}`, {
        method: 'POST',
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const userInfo = await response.json();  
          document.getElementById('name').textContent =" Name : "+ userInfo.data.name;
          document.getElementById('profile').textContent ="Profile : "+ userInfo.data.profile;
          document.getElementById('age').textContent =userInfo.data.age;
          document.getElementById('gender').textContent ="Gender : "+ userInfo.data.sex; 
          document.getElementById('company').textContent ="Comapny : "+ userInfo.data.company; 
          document.getElementById('blood_group').textContent ="Bloog Group : " + userInfo.data.blood_group;
          document.getElementById('total-likes').textContent =userInfo.data.total_likes;
          const userImage = document.getElementById('user-image');
          userImage.src = userInfo.data.image; // Set the image source
        } else {
          console.error('Response is not JSON');
        }
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Error: ' + error);
    }
  }
});
  
 
