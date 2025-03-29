document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('remember').checked;

        // Clear previous errors
        errorMessage.classList.add('hidden');
        
        // Simple validation
        if (!username || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Simulate login request
        simulateLogin(username, password, rememberMe);
    });

    function simulateLogin(username, password, rememberMe) {
        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Signing in...';

        // Simulate API call delay
        setTimeout(() => {
            // Mock validation - in a real app this would be a server call
            if (username === 'admin' && password === 'password123') {
                // Successful login
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Success!';
                setTimeout(() => {
                    alert(`Welcome ${username}! Remember me: ${rememberMe}`);
                    // In a real app, you would redirect here
                    // window.location.href = '/dashboard';
                }, 500);
            } else {
                // Failed login
                showError('Invalid username or password');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign in';
            }
        }, 1500);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
});