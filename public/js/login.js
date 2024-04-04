const loginFormHandler = async (event) => {
  event.preventDefault();

  // Retrieve values from login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Client-side validation
  if (!email || !password) {
      alert('Please enter both email and password.');
      return;
  }

  try {
      // Fetch user information from DB
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      // Reroute to homepage or alert no login available
      if (response.ok) {
          document.location.replace('/');
      } else {
          const responseData = await response.json();
          alert(responseData.error || 'Failed to log in.');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      alert('An unexpected error occurred. Please try again later.');
  } finally {
      // Clear form fields after submission
      document.querySelector('#email-login').value = '';
      document.querySelector('#password-login').value = '';
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
