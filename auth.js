// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.username);
            
            // Close modal and update UI
            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            updateAuthUI();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
    }
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.username);
            
            // Close modal and update UI
            document.getElementById('authModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            updateAuthUI();
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (err) {
        console.error('Registration error:', err);
        alert('Registration failed. Please try again.');
    }
});

// Update UI based on auth status
function updateAuthUI() {
    const token = localStorage.getItem('token');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (token) {
        const username = localStorage.getItem('username');
        authButtons.innerHTML = `
            <div class="user-greeting">Welcome, ${username}</div>
            <button id="logoutBtn" class="btn">Logout</button>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', logout);
    } else {
        authButtons.innerHTML = `
            <button id="loginBtn" class="btn">Login</button>
            <button id="registerBtn" class="btn btn-primary">Register</button>
        `;
        
        // Reattach event listeners
        document.getElementById('loginBtn').addEventListener('click', () => {
            document.getElementById('authModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        document.getElementById('registerBtn').addEventListener('click', () => {
            document.getElementById('authModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Switch to register tab
            document.querySelector('.tab-btn[data-tab="register"]').click();
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    updateAuthUI();
}

// Initialize auth UI
document.addEventListener('DOMContentLoaded', updateAuthUI);