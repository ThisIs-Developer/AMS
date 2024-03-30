// Function to generate static data for the table with checkboxes in the Attendance column
function generateStaticData() {
  var staticData = [];

  // Generate 20 static data entries
  for (var i = 1; i <= 20; i++) {
    staticData.push({
      rollNo: i,
      student: "Student " + i,
      attendance: "", // Empty string for checkbox (to be populated dynamically)
      totalPresent: Math.floor(Math.random() * 25), // Random total present value for demonstration
      percentage: Math.floor(Math.random() * 100) + "%", // Random percentage for demonstration
    });
  }

  // Get the table body
  var tbody = document.querySelector("#data-table tbody");
  // Clear any existing rows
  tbody.innerHTML = "";
  // Loop through the static data and populate the table
  staticData.forEach(function (item) {
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
        // For other columns, just populate the text content
        cell.textContent = value;
      }
    });
  });
}

// Call generateStaticData() when the page loads to populate the table with static data and checkboxes
document.addEventListener("DOMContentLoaded", generateStaticData);
