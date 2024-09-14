// Function to toggle the course dropdown visibility
function toggleDropdown() {
    const dropdownList = document.querySelector('.dropdown-list');
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
}

// Function to hide dropdown when clicked outside
document.addEventListener('click', function(event) {
    const dropdownList = document.querySelector('.dropdown-list');
    const dropdownHeader = document.querySelector('.dropdown-header');

    // Check if the clicked target is outside the dropdown
    if (!dropdownHeader.contains(event.target) && !dropdownList.contains(event.target)) {
        dropdownList.style.display = 'none';
    }
});

// Function to collect selected courses
function getSelectedCourses() {
    const selectedCourses = Array.from(document.querySelectorAll('input[name="courses"]:checked'))
        .map(course => course.value);
    return selectedCourses.join(', ');
}

// Handling form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const program = document.getElementById('program').value;
    const name = document.getElementById('name').value;
    const usn = document.getElementById('usn').value;
    const semester = document.getElementById('semester').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const selectedCourses = getSelectedCourses();
    const signatureFile = document.getElementById('signature').files[0];

    // Create FormData to submit via POST request
    const formData = new FormData();
    formData.append('program', program);
    formData.append('name', name);
    formData.append('usn', usn);
    formData.append('semester', semester);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('courses', selectedCourses);
    formData.append('signature', signatureFile);

    // Submit form data via Fetch API (Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' with the actual URL)
    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Form submitted successfully!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
