// Redirect to profile page when profile icon is clicked
function redirectToProfile() {
    window.location.href = 'profile.html';
}

// Display current user details in profile.html
if (window.location.pathname.endsWith('profile.html')) {
    const username = localStorage.getItem('username');
    const userDetails = JSON.parse(localStorage.getItem(username)); // Fetch user details from local storage

    if (userDetails) {
        document.getElementById('profile-username').textContent = userDetails.username;
        document.getElementById('profile-email').textContent = userDetails.email;
        document.getElementById('profile-dob').textContent = userDetails.dob;
        document.getElementById('profile-age').textContent = userDetails.age;
        document.getElementById('profile-role').textContent = userDetails.role;
    } else {
        alert('User details not found!');
        window.location.href = 'index.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('username'); // Clear current session
    window.location.href = 'index.html'; // Redirect to login page
}

// Handle user registration and store details
document.getElementById('register')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userDetails = {
        email: email,
        username: username,
        password: password,
        dob: '', // Set later in user details
        age: '', // Set later in user details
        role: '' // Set later in user details
    };

    localStorage.setItem(username, JSON.stringify(userDetails)); // Store user details in local storage
    localStorage.setItem('username', username); // Set current session
    window.location.href = 'user-details.html'; // Redirect to user details page
});

// Handle user details submission
document.getElementById('submit-details')?.addEventListener('click', function () {
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const role = document.getElementById('role').value;

    const username = localStorage.getItem('username');
    const userDetails = JSON.parse(localStorage.getItem(username)); // Fetch current user details

    if (userDetails) {
        userDetails.dob = dob;
        userDetails.age = age;
        userDetails.role = role;

        localStorage.setItem(username, JSON.stringify(userDetails)); // Update user details in local storage
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
});

// Validate login credentials
document.getElementById('login')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const userDetails = JSON.parse(localStorage.getItem(username)); // Fetch user details from local storage

    if (userDetails && userDetails.password === password) {
        localStorage.setItem('username', username); // Set current session
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    } else {
        alert('Invalid username or password!'); // Display error message
    }
});
// Populate age dropdown dynamically
if (document.getElementById('age')) {
    const ageSelect = document.getElementById('age');
    const minAge = 5; // Minimum age
    const maxAge = 100; // Maximum age

    for (let i = minAge; i <= maxAge; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        ageSelect.appendChild(option);
    }
}

// Display username on user-details.html
if (document.getElementById('display-username')) {
    const username = localStorage.getItem('username');
    document.getElementById('display-username').textContent = username;
}

