// Function to show a warning toast message using Toastify
const showWarningToast = (message) => {
  const toastContent = document.createElement('div');
  toastContent.classList.add('toast-content');

  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-exclamation-triangle', 'toast-icon');
  icon.style.paddingLeft = '10px';
  toastContent.appendChild(icon);

  const messageElement = document.createElement('span');
  messageElement.textContent = message;
  toastContent.appendChild(messageElement);

  const toast = Toastify({
      node: toastContent,
      duration: 3000,
      gravity: 'top',
      position: 'center',
      backgroundColor: '#f1a90f',
      progressBar: true,
      style: {
          padding: '20px 2px',
          borderRadius: '8px',
      }
  });

  toast.showToast();
}

// Function to transfer data from teacher.html to index2.html
function transferData(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get selected values from teacher.html
  var batch = document.getElementById("batch").value;
  var sem = document.getElementById("Sem").value;
  var subject = document.getElementById("subject").value;
  var date = document.getElementById("date").value;

  // Check if any of the required fields are not selected
  if (!batch || !sem || !subject || !date) {
      showWarningToast('Please select all required fields.');
      return false; // Stop the form submission
  }

  // Save data to sessionStorage to transfer to index2.html
  sessionStorage.setItem("batch", batch);
  sessionStorage.setItem("sem", sem);
  sessionStorage.setItem("subject", subject);
  sessionStorage.setItem("date", date);

  // Redirect to index2.html
  window.location.href = "teacher2.html";

  return true; // Allow the form submission
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

// Attach the transferData() function to the form's submit event
document.getElementById("submit").addEventListener("click", function(event) {
  transferData(event);
});
