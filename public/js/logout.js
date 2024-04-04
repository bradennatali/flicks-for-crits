const logout = async () => {
    //fetch the logout route
    const response = await fetch('/login/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    //bring the user back to the login page
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  };
  document.querySelector('#logout').addEventListener('click', logout);