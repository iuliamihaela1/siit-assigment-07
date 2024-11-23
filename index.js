document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Gather form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    // Post the data to the register endpoint
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Parse and log the response
        const responseData = await response.json();

        // Optional: Display success or error message
        if (response.ok) {
            event.target.style.display = 'none';
            document.getElementsByClassName('registration-form')[0].innerHTML = JSON.stringify(responseData.user, null, 2);
            console.log(responseData.accessToken)
        } else {
            document.getElementsByClassName('registration-form')[0].innerHTML += `Error: ${responseData.message || 'Registration failed.'}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementsByClassName('registration-form')[0].innerHTML += `Error: ${error || 'Registration failed.'}`;
    }
});