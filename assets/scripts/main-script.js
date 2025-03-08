document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded'); // Verify the event listener is set up

    // Check if the form was submitted (after page reload)
    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted === 'true') {
        console.log('Form was previously submitted, showing success message');
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.style.display = 'flex';
            // Clear the flag after showing the message to prevent it from showing on manual reloads
            localStorage.removeItem('formSubmitted');
        } else {
            console.error('Success message element not found');
        }
    }

    // Verify the form element exists
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Form with ID "contact-form" not found');
        return;
    }

    // Handle form submission
    form.addEventListener('submit', function (e) {
        console.log('Form submitted'); // Verify the submit event is triggered
        e.preventDefault(); // Prevent default form submission

        // Show the success message
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            console.log('Showing success message');
            successMessage.style.display = 'flex';
        } else {
            console.error('Success message element not found');
        }

        // Set a flag in localStorage to indicate the form was submitted
        localStorage.setItem('formSubmitted', 'true');
        console.log('Set formSubmitted flag in localStorage');

        // Reload the page
        setTimeout(function () {
            console.log('Reloading page');
            window.location.reload(); // Reload the page
        }, 1000); // Delay to ensure the message is visible
    });
});

// Function to close the success message and clear the flag
function closeSuccessMessage() {
    console.log('Closing success message');
    document.getElementById('success-message').style.display = 'none';
    localStorage.removeItem('formSubmitted'); // Clear the flag
    console.log('Cleared formSubmitted flag from localStorage');
}