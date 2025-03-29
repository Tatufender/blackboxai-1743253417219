function handleGoogleSignIn(response) {
    const errorMessage = document.getElementById('errorMessage');
    
    if (response.credential) {
        const idToken = response.credential;
        
        // In production, verify token with backend
        console.log("Google ID Token:", idToken);
        
        errorMessage.classList.add('hidden');
        alert("Authentication successful! WiFi access granted.");
        
        // Communicate with Android to enable full access
        if (window.AndroidInterface) {
            AndroidInterface.onLoginSuccess();
        }
    } else {
        errorMessage.textContent = "Google authentication failed";
        errorMessage.classList.remove('hidden');
    }
}

// Add Android interface for WebView communication
if (typeof AndroidInterface === 'undefined') {
    var AndroidInterface = {
        onLoginSuccess: function() {
            // Stub for Android interface
        }
    };
}