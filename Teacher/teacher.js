// Function to transfer data from index.html to index2.html
function transferData() {
  // Get selected values from index.html
  var batch = document.getElementById("batch").value;
  var sem = document.getElementById("Sem").value;
  var subject = document.getElementById("subject").value;

  // Save data to sessionStorage to transfer to index2.html
  sessionStorage.setItem("batch", batch);
  sessionStorage.setItem("sem", sem);
  sessionStorage.setItem("subject", subject);

  // Redirect to index2.html
  window.location.href = "index2.html";
}

// Function to set input values in index2.html from sessionStorage
function setInputValues() {
  // Retrieve stored data from sessionStorage
  var batch = sessionStorage.getItem("batch");
  var sem = sessionStorage.getItem("sem");
  var subject = sessionStorage.getItem("subject");

  // Populate the input fields in index2.html
  document.getElementById("Batch").value = batch;
  document.getElementById("Sem").value = sem;
  document.getElementById("Subject").value = subject;
}

// Call setInputValues() when the page loads to populate input fields
document.addEventListener("DOMContentLoaded", setInputValues);

// Function to populate the table with dynamic data including checkboxes for the Attendance column
function populateTable() {
  // Fetch dynamic data from database using AJAX
  // Example: Replace "url_to_your_database_api" with your actual API endpoint
  fetch("url_to_your_database_api")
    .then((response) => response.json())
    .then((data) => {
      // Get the table body
      var tbody = document.querySelector("#data-table tbody");
      // Clear any existing rows
      tbody.innerHTML = "";
      // Loop through the data and populate the table
      data.forEach(function (item) {
        var row = tbody.insertRow();
        Object.entries(item).forEach(function ([key, value]) {
          var cell = row.insertCell();
          if (key === "attendance") {
            // For the "Attendance" column, create a checkbox
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "attendance"; // Set name attribute for grouping
            checkbox.value = "present"; // Set value attribute as needed
            cell.appendChild(checkbox);
          } else {
            // For other columns, populate the text content
            cell.textContent = value;
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Call populateTable() when the page loads to populate the table with dynamic data and checkboxes
document.addEventListener("DOMContentLoaded", populateTable);

// Function to get current date and populate Date input field
function setCurrentDate() {
  var dateInput = document.getElementById("Date");
  var currentDate = new Date().toISOString().split("T")[0]; // Get current date in "yyyy-mm-dd" format
  dateInput.value = currentDate;
}

// Call setCurrentDate() when the page loads to populate Date input field
document.addEventListener("DOMContentLoaded", setCurrentDate);
