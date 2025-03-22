document.addEventListener("DOMContentLoaded", () => {
    render(); // Render stored data when the page loads
});

function sConsole(event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;
    const accept = document.getElementById("accept").checked; // Store as true/false

    if (!validateAge(dob)) {
        alert("Your age must be between 18 and 55");
        return;
    }

    const newEntry = { name, email, password, dob, accepted: accept };

    // Retrieve existing dataset or initialize an empty array
    let dataset = JSON.parse(localStorage.getItem("dataset")) || [];
    dataset.push(newEntry); // Add new entry
    localStorage.setItem("dataset", JSON.stringify(dataset)); // Save to localStorage

    render(); // Update table immediately
}

// Function to validate age (between 18 and 55)
function validateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age calculation if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

// Function to render stored data into the table
function render() {
    const dataset = JSON.parse(localStorage.getItem("dataset")) || [];
    const tableBody = document.getElementById("table_body");
    tableBody.innerHTML = ""; // Clear existing table content

    dataset.forEach((data) => {
        const row = `
            <tr>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.password}</td>
                <td>${data.dob}</td>
                <td>${data.accepted ? "true" : "false"}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}
