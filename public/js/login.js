const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // retrieve values from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // fetch user information from DB
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      //reroute to homepage or alert no login available
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  }; 
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  