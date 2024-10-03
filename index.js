// Load common passwords from the file


let commonPasswords = [];

// Function to fetch common passwords from pass.txt
async function loadCommonPasswords() {
    const response = await fetch('pass.txt');
    const data = await response.text();
    commonPasswords = data.split('\n').map(password => password.trim());
}

loadCommonPasswords();

// Function to update the glow color based on password strength
function updateGlowColor(strength) {
    const container = document.querySelector('.container');
    switch (strength) {
        case 'strong':
            container.style.boxShadow = '0 0 15px rgba(0, 150, 0, 0.5), 0 0 25px rgba(0, 255, 0, 0.3)'; // Green glow
            break;
        case 'moderate':
            container.style.boxShadow = '0 0 15px rgba(255, 165, 0, 0.5), 0 0 25px rgba(255, 255, 0, 0.3)'; // Yellow glow
            break;
        case 'weak':
            container.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.5), 0 0 25px rgba(255, 99, 71, 0.3)'; // Red glow
            break;
        default:
            container.style.boxShadow = 'none'; // Default no glow
    }
}

// Modify the password validation logic
function validatePassword() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const birthDate = document.getElementById('birthDate').value.trim();
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        const password = document.getElementById('password').value.trim();
    
        // Check for empty fields
        if (!firstName || !lastName || !birthDate || !mobileNumber || !password) {
            alert('Please fill in all fields.');
            return; // Exit the function if any field is empty
        }
    
        // Check for whitespace-only inputs
        if (/^\s*$/.test(firstName) || /^\s*$/.test(lastName) || /^\s*$/.test(mobileNumber)) {
            alert('Names and Mobile Number cannot be empty.');
            return;
        }
    
        // Validate names and mobileNumber
        const nameRegex = /^[a-zA-Z]+$/; // Allows only letters
        if (!nameRegex.test(firstName) || firstName.length > 50) {
            alert('First name can only contain letters (no numbers, special characters, or spaces) and must be under 50 characters.');
            return;
        }
    
        if (!nameRegex.test(lastName) || lastName.length > 50) {
            alert('Last name can only contain letters (no numbers, special characters, or spaces) and must be under 50 characters.');
            return;
        }
    
       // Regular expression to check for digits only
        const mobileRegex = /^\d+$/;

        if (!mobileRegex.test(mobileNumber) || mobileNumber.length !== 10) {
            alert('Mobile Number can only contain digits (no alphabets, special characters, or spaces) and must be exactly 10 characters long.');
            return;
        }
    
        // Validate birth date format (YYYY-MM-DD) and ensure it’s not in the future
        const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthDateRegex.test(birthDate)) {
            alert('Please enter a valid birth date in the format DD-MM-YYYY.');
            return;
        }
        const birthDateObj = new Date(birthDate);
        const today = new Date();
        if (birthDateObj > today) {
            alert('Birth date cannot be in the future.');
            return;
        }

    let score = 10; // Initial score
    let feedback = '';

    // Check against common passwords
    if (commonPasswords.includes(password)) {
        score -= 5; // Deduct points for common password
        feedback += 'Password is too common. ';
    }

    // Check for personal details
    if (password.includes(firstName) || password.includes(lastName) || password.includes(birthDate) || password.includes(mobileNumber)) {
        score -= 5; // Deduct points for personal details
        feedback += 'Password contains personal details. ';
    }

    // Check length
    if (password.length < 12) {
        score -= 2; // Deduct points for short password
        feedback += 'Password should be at least 12 characters long. ';
    }

    // Check for special characters
    if (!/[!@#$%^&*]/.test(password)) {
        score -= 2; // Deduct points for no special characters
        feedback += 'Password should include at least one special character. ';
    }

    // Check for digits
    if (!/\d/.test(password)) {
        score -= 1; // Deduct points for no digits
        feedback += 'Password should include at least one digit. ';
    }

    // Check for upper and lowercase letters
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        score -= 1; // Deduct points for missing upper or lowercase letters
        feedback += 'Password should include both upper and lowercase letters. ';
    }

    // Determine strength
    let strength = 'weak'; // Default strength
    if (score >= 8) {
        strength = 'strong';
    } else if (score >= 5) {
        strength = 'moderate';
    }

    // Update glow color based on strength
    updateGlowColor(strength);

    // Display result and feedback
    const result = document.getElementById('result');
    result.textContent = `Your password is ${strength}!`;
    result.className = strength; // Apply class for color
    document.getElementById('feedback').textContent = feedback;
    updateStrengthBar(score);
}

// Function to update the strength bar based on score
function updateStrengthBar(score) {
    const strengthBar = document.querySelector('.strength-bar div');
    strengthBar.style.width = `${(score / 10) * 100}%`;

    // Set the class based on score
    if (score >= 8) {
        strengthBar.className = 'strong-bar';
    } else if (score >= 5) {
        strengthBar.className = 'moderate-bar';
    } else {
        strengthBar.className = 'weak-bar';
    }
}

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text'; // Show password
    } else {
        passwordInput.type = 'password'; // Hide password
    }
});
