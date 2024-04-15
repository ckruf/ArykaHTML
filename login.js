document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(`User: ${username}, Password: ${password}`);
    
    if (username === "admin" && password === "secret") {
        window.location.href = './admin.html'; // Redirect to the admin dashboard
    } else {
        // Display an error message if the login credentials are wrong
        alert('Incorrect username or password. Please try again.');
    }
});
