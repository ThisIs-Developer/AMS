// Function to transfer data from teacher.html to index2.html
function transferData() {
  // Get selected values from teacher.html
  var batch = document.getElementById("batch").value;
  var sem = document.getElementById("Sem").value;
  var subject = document.getElementById("subject").value;
  var date = document.getElementById("date").value;

  // Save data to sessionStorage to transfer to index2.html
  sessionStorage.setItem("batch", batch);
  sessionStorage.setItem("sem", sem);
  sessionStorage.setItem("subject", subject);
  sessionStorage.setItem("date", date);

  // Redirect to index2.html
  window.location.href = "teacher2.html";
}

// Function to set input values in teacher2.html from sessionStorage
function setInputValues() {
  // Retrieve stored data from sessionStorage
  var batch = sessionStorage.getItem("batch");
  var sem = sessionStorage.getItem("sem");
  var subject = sessionStorage.getItem("subject");
  var date = sessionStorage.getItem("date");

  // Populate the input fields in teacher2.html
  document.getElementById("Batch").value = batch;
  document.getElementById("Sem").value = sem;
  document.getElementById("Subject").value = subject;
  document.getElementById("Date").value = date;
}

// Call setInputValues() when the page loads to populate input fields
document.addEventListener("DOMContentLoaded", setInputValues);

// Function to populate the table with dynamic data including checkboxes for the Attendance column
function populateTable() {
  // Fetch dynamic data from database using AJAX
  fetch("url_to_your_database_api")
    .then((response) => response.json())
    .then((data) => {
      var tbody = document.querySelector("#data-table tbody");
      tbody.innerHTML = "";
      data.forEach(function (item) {
        var row = tbody.insertRow();
        Object.entries(item).forEach(function ([key, value]) {
          var cell = row.insertCell();
          if (key === "attendance") {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "attendance";
            checkbox.value = "present";
            cell.appendChild(checkbox);
          } else {
            cell.textContent = value;
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", populateTable);

// Function to set the maximum date for the date input field based on the current IST date and time
function setMaxDate() {
  var now = new Date(); // Current UTC date and time
  var istOffset = 330; // IST offset in minutes (+5:30)
  now.setMinutes(now.getMinutes() + istOffset); // Convert UTC to IST

  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Increment the day by 1

  document.getElementById("date").max = tomorrow.toISOString().split("T")[0];
}

// Set max date on page load and adjust as necessary
document.addEventListener("DOMContentLoaded", setMaxDate);
