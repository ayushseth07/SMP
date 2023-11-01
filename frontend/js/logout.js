document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('a[href="/logout"]');
    logoutLink.addEventListener('click', async (event) => {
      event.preventDefault();
  
            
          this.localStorage.removeItem('Authorization');
  
          window.location.href = '/login'; 
      
     
    });
  });
  