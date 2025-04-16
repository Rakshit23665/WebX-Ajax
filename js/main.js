document.addEventListener('DOMContentLoaded', function() {
    const collegeInput = document.getElementById('college');
    const collegeSuggestions = document.getElementById('collegeSuggestions');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');
    const registrationForm = document.getElementById('registrationForm');
    const registrationMessage = document.getElementById('registrationMessage');

    // College suggestions
    collegeInput.addEventListener('focus', async function() {
        const colleges = await api.getColleges();
        showSuggestions(colleges);
    });

    collegeInput.addEventListener('input', async function() {
        const colleges = await api.getColleges();
        const filtered = colleges.filter(c => 
            c.toLowerCase().includes(this.value.toLowerCase())
        );
        showSuggestions(filtered);
    });

    function showSuggestions(colleges) {
        collegeSuggestions.innerHTML = '';
        if (colleges.length === 0) {
            collegeSuggestions.style.display = 'none';
            return;
        }
        
        colleges.forEach(college => {
            const div = document.createElement('div');
            div.textContent = college;
            div.addEventListener('click', () => {
                collegeInput.value = college;
                collegeSuggestions.style.display = 'none';
            });
            collegeSuggestions.appendChild(div);
        });
        collegeSuggestions.style.display = 'block';
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!collegeInput.contains(e.target) && !collegeSuggestions.contains(e.target)) {
            collegeSuggestions.style.display = 'none';
        }
    });

    // Username validation
    usernameInput.addEventListener('blur', async function() {
        const username = this.value.trim();
        if (!username) return;
        
        const available = await api.checkUsername(username);
        usernameError.textContent = available ? '' : 'Username already taken';
    });

    // Password match check
    confirmPasswordInput.addEventListener('input', function() {
        passwordError.textContent = 
            passwordInput.value !== this.value ? 'Passwords do not match' : '';
    });

    // Form submission
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (passwordInput.value !== confirmPasswordInput.value) {
            passwordError.textContent = 'Passwords do not match';
            return;
        }
        
        if (usernameError.textContent) return;
        
        try {
            const result = await api.registerUser({
                name: document.getElementById('name').value,
                college: collegeInput.value,
                username: usernameInput.value,
                password: passwordInput.value
            });
            
            registrationMessage.textContent = 'Successfully Registered!';
            registrationMessage.className = 'message success';
            registrationForm.reset();
        } catch (error) {
            registrationMessage.textContent = 'Registration failed';
            registrationMessage.className = 'message error';
        }
    });
}); 