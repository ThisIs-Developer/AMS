document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  sidebarLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault();
          sidebarLinks.forEach(item => item.classList.remove("active"));
          this.classList.add("active");
          const title = this.querySelector("h3").textContent;

          document.title = "Teacher | " + title;
      });
  });
});document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  sidebarLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault();
          sidebarLinks.forEach(item => item.classList.remove("active"));
          this.classList.add("active");
          const title = this.querySelector("h3").textContent;

          document.title = "Admin | " + title;
      });
  });
});

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".sidebar a");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();

      menuItems.forEach((item) => {
        item.classList.remove("active");
      });

      this.classList.add("active");

      const allContents = document.querySelectorAll(".content");
      allContents.forEach((content) => {
        content.style.display = "none";
      });

      const contentId = this.getAttribute("id").replace("-menu", "-content");
      const contentToShow = document.getElementById(contentId);
      if (contentToShow) {
        contentToShow.style.display = "block";
      }
    });
  });
});

document.querySelectorAll(".top #menu-btn").forEach((button) => {
  button.addEventListener("click", () => {
    sideMenu.style.display = "block";
  });
});

document.querySelectorAll(".top #close-btn").forEach((button) => {
  button.addEventListener("click", () => {
    sideMenu.style.display = "none";
  });
});

document
  .getElementById("logout-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = this.getAttribute("href");
  });

fetch("../json/updates.json")
  .then((response) => response.json())
  .then((data) => {
    const updatesContainer = document.querySelector(".recent-updates .updates");
    const showMoreLink = document.querySelector(".show-more a");

    data.sort((a, b) => {
      const dateA = new Date(a.timeAgo.split("-").reverse().join("-"));
      const dateB = new Date(b.timeAgo.split("-").reverse().join("-"));
      return dateB - dateA;
    });

    const latestUpdates = data.slice(0, 4);

    latestUpdates.forEach((update) => {
      const updateDiv = document.createElement("div");
      updateDiv.classList.add("update");

      const currentDate = new Date();
      const parts = update.timeAgo.split("-");
      const userDate = new Date(parts[2], parts[1] - 1, parts[0]);

      const timeDiff = currentDate.getTime() - userDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursDiff = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      updateDiv.innerHTML = `
                <div class="message">
                    <p><b>${update.title}</b> ${update.description}</p>
                    <small class="text-muted">${formatTimeAgo(
                      daysDiff,
                      hoursDiff
                    )}</small>
                </div>
            `;

      updatesContainer.appendChild(updateDiv);
    });

    showMoreLink.href = "Updates/updates.html";
  })
  .catch((error) => console.error("Error fetching data:", error));

function formatTimeAgo(days, hours) {
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

const showSuccessToast = (message) => {
  const toastContent = document.createElement("div");
  toastContent.classList.add("toast-content");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-check-circle", "toast-icon");
  icon.style.paddingLeft = "10px";
  toastContent.appendChild(icon);

  const messageElement = document.createElement("span");
  messageElement.textContent = message;
  toastContent.appendChild(messageElement);

  const toast = Toastify({
    node: toastContent,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "green",
    progressBar: true,
    style: {
      padding: "20px 2px",
      borderRadius: "8px",
    },
  });

  const setToastWidth = () => {
    const messageWidth = message.length * 10;
    toast.options.style.maxWidth = `${messageWidth}px`;

    if (window.innerWidth <= 768) {
      toast.options.style.margin = "0 15px";
    }
  };

  setToastWidth();

  window.addEventListener("resize", setToastWidth);

  toast.showToast();
};

const showErrorToast = (message) => {
  const toastContent = document.createElement("div");
  toastContent.classList.add("toast-content");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-exclamation-circle", "toast-icon");
  icon.style.paddingLeft = "10px";
  toastContent.appendChild(icon);

  const messageElement = document.createElement("span");
  messageElement.textContent = message;
  toastContent.appendChild(messageElement);

  const toast = Toastify({
    node: toastContent,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "red",
    progressBar: true,
    style: {
      padding: "20px 2px",
      borderRadius: "8px",
    },
  });

  const setToastWidth = () => {
    const messageWidth = message.length * 10;
    toast.options.style.maxWidth = `${messageWidth}px`;

    if (window.innerWidth <= 768) {
      toast.options.style.margin = "0 15px";
    }
  };

  setToastWidth();

  window.addEventListener("resize", setToastWidth);

  toast.showToast();
};

const showWarningToast = (message) => {
  const toastContent = document.createElement("div");
  toastContent.classList.add("toast-content");

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-exclamation-triangle", "toast-icon");
  icon.style.paddingLeft = "10px";
  toastContent.appendChild(icon);

  const messageElement = document.createElement("span");
  messageElement.textContent = message;
  toastContent.appendChild(messageElement);

  const toast = Toastify({
    node: toastContent,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: "#f1a90f",
    progressBar: true,
    style: {
      padding: "20px 2px",
      borderRadius: "8px",
    },
  });

  const setToastWidth = () => {
    const messageWidth = message.length * 10;
    toast.options.style.maxWidth = `${messageWidth}px`;

    if (window.innerWidth <= 768) {
      toast.options.style.margin = "0 15px";
    }
  };

  setToastWidth();

  window.addEventListener("resize", setToastWidth);

  toast.showToast();
};

document.addEventListener("DOMContentLoaded", () => {
  const attendanceForm = document.getElementById("attendanceForm");
  const studentAttendanceForm = document.getElementById(
    "studentAttendanceForm"
  );
  const giveAttendendanceForm1 = document.getElementById(
    "giveAttendendanceForm1"
  );
  const giveAttendendanceForm2 = document.getElementById(
    "giveAttendendanceForm2"
  );

  const studentAttendanceReport = document.querySelector(
    ".student-attendance-report"
  );
  const giveAttendanceReport = document.querySelector(
    ".give-attendance-report"
  );

  const rollNumberInput = document.getElementById("rollNumber");
  const subjectSelect = document.getElementById("subject");

  const attendanceTableBody = document
    .getElementById("attendanceTable")
    .getElementsByTagName("tbody")[0];

  const homeButtonStudent = document.querySelector(
    ".student-attendance-report .attendanceBtn"
  );
  const homeButtonGiveAttendance = document.querySelector(
    ".give-attendance-report .attendanceBtn"
  );

  const cancelButtons = document.querySelectorAll(
    '.attendanceBtn[type="reset"]'
  );

  attendanceForm.addEventListener("click", (event) => {
    event.preventDefault();
    const targetBtn = event.target;
    const action = targetBtn.value;

    attendanceForm.style.display = "none";

    if (action === "studentAttendance") {
      studentAttendanceForm.style.display = "block";
    } else if (action === "giveAttendendance") {
      giveAttendendanceForm1.style.display = "block";
    }
  });

  studentAttendanceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const rollNumber = rollNumberInput.value.trim();

    try {
      const response = await fetch("../json/studentAttendance.json");
      const data = await response.json();

      const student = data.students.find(
        (student) => student.roll_number === rollNumber
      );
      if (student) {
        const { name, batch, semester, section, subjects } = student;

        document.getElementById("student-attendance-report-name").textContent =
          name;
        document.getElementById("student-attendance-report-roll").textContent =
          rollNumber;
        document.getElementById("student-attendance-report-batch").textContent =
          batch;
        document.getElementById(
          "student-attendance-report-semester"
        ).textContent = semester;
        document.getElementById(
          "student-attendance-report-section"
        ).textContent = section;

        attendanceTableBody.innerHTML = "";
        subjects.forEach((subject) => {
          const row = attendanceTableBody.insertRow();
          const subjectCell = row.insertCell(0);
          const attendanceCell = row.insertCell(1);

          subjectCell.textContent = subject.subject;
          attendanceCell.textContent = subject.attendance;
        });

        studentAttendanceReport.style.display = "block";
        studentAttendanceForm.style.display = "none";
      } else {
        alert("Student with the provided roll number not found.");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      alert("Error fetching student details. Please try again later.");
    }
  });

  let selectedBatch = "";
  let selectedSemester = "";
  let selectedSection = "";

  giveAttendendanceForm1.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    selectedBatch = formData.get("batch");
    selectedSemester = formData.get("semester");
    selectedSection = formData.get("section");

    if (!selectedBatch || !selectedSemester || !selectedSection) {
      showWarningToast("Please select batch, semester, and section.");
      return;
    }

    try {
      const response = await fetch("../json/subjects.json");
      const data = await response.json();

      if (
        data.hasOwnProperty(selectedBatch) &&
        data[selectedBatch].hasOwnProperty(selectedSemester)
      ) {
        const subjects = data[selectedBatch][selectedSemester];

        subjects.forEach((subject) => {
          const option = document.createElement("option");
          option.value = subject;
          option.textContent = subject;
          subjectSelect.appendChild(option);
        });

        giveAttendendanceForm1.style.display = "none";
        giveAttendendanceForm2.style.display = "block";
      } else {
        showErrorToast(
          "Subjects not found for the selected batch and semester."
        );
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showErrorToast("Error fetching subjects. Please try again later.");
    }
  });

  giveAttendendanceForm2.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const subject = formData.get("subject");
    const date = formData.get("date");

    if (!subject || !date) {
      showWarningToast("Please select subject and date.");
      return;
    }

    try {
      reportBatch.textContent = selectedBatch;
      reportSemester.textContent = selectedSemester;
      reportSection.textContent = section;
      reportSubject.textContent = subject;
      reportDate.textContent = date;

      showSuccessToast("Attendance logged successfully.");
    } catch (error) {
      console.error("Error logging attendance:", error);
      showErrorToast("Error logging attendance. Please try again.");
    }

    giveAttendanceReport.style.display = "block";
    giveAttendendanceForm2.style.display = "none";
  });

  homeButtonStudent.addEventListener("click", () => {
    location.reload();
  });

  homeButtonGiveAttendance.addEventListener("click", () => {
    location.reload();
  });

  cancelButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      attendanceForm.style.display = "inherit";
      studentAttendanceForm.style.display = "none";
      giveAttendendanceForm1.style.display = "none";
      giveAttendendanceForm2.style.display = "none";

      studentAttendanceForm.reset();
      giveAttendendanceForm1.reset();
      giveAttendendanceForm2.reset();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const substituteForm1 = document.getElementById("substituteForm1");
  const substituteForm2 = document.getElementById("substituteForm2");
  const substituteSelectTeacher = document.getElementById("substitute-teacher");
  const substituteSelectSubject = document.getElementById("substitute-subject");
  const substituteReportBatch = document.getElementById(
    "substitute-reportBatch"
  );
  const substituteReportSemester = document.getElementById(
    "substitute-reportSemester"
  );
  const substituteReportSection = document.getElementById(
    "substitute-reportSection"
  );
  const substituteReportSubject = document.getElementById(
    "substitute-reportSubject"
  );
  const substituteReportTeacher = document.getElementById(
    "substitute-reportTeacher"
  );
  const substituteReportDiv = document.querySelector(".substitute-report");
  const substituteHomeButton = document.querySelector(
    ".substitute-report .substituteBtn"
  );

  let selectedSubstituteBatch = "";
  let selectedSubstituteSemester = "";

  fetch("../json/teachers.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher.id;
        option.textContent = teacher.name;
        substituteSelectTeacher.appendChild(option);
      });
    });

  substituteForm1.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    selectedSubstituteBatch = formData.get("batch");
    selectedSubstituteSemester = formData.get("semester");

    if (!selectedSubstituteBatch || !selectedSubstituteSemester) {
      alert("Please select both batch and semester.");
      return;
    }

    try {
      const response = await fetch("../json/subjects.json");
      const data = await response.json();

      if (
        data.hasOwnProperty(selectedSubstituteBatch) &&
        data[selectedSubstituteBatch].hasOwnProperty(selectedSubstituteSemester)
      ) {
        const subjects =
          data[selectedSubstituteBatch][selectedSubstituteSemester];
        substituteSelectSubject.innerHTML = "";

        subjects.forEach((subject) => {
          const option = document.createElement("option");
          option.value = subject;
          option.textContent = subject;
          substituteSelectSubject.appendChild(option);
        });

        substituteForm1.style.display = "none";
        substituteForm2.style.display = "block";
      } else {
        alert("Subjects not found for the selected batch and semester.");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Error fetching subjects. Please try again later.");
    }
  });

  substituteForm2.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const section = formData.get("section");
    const subject = formData.get("subject");
    const teacherId = formData.get("teacher");

    if (!section || !subject || !teacherId) {
      alert("Please select section, subject, and teacher.");
      return;
    }

    try {
      const teacherSelect = document.getElementById("substitute-teacher");
      const selectedTeacher = teacherSelect.querySelector(
        `option[value="${teacherId}"]`
      ).textContent;

      substituteReportBatch.textContent = selectedSubstituteBatch;
      substituteReportSemester.textContent = selectedSubstituteSemester;
      substituteReportSection.textContent = section;
      substituteReportSubject.textContent = subject;
      substituteReportTeacher.textContent = selectedTeacher;

      alert("Successfully assigned substitute teacher.");
    } catch (error) {
      console.error("Error assigning substitute teacher:", error);
      alert("Error assigning substitute teacher. Please try again.");
    }

    substituteReportDiv.style.display = "block";
    substituteForm2.style.display = "none";
  });

  substituteHomeButton.addEventListener("click", () => {
    location.reload();
  });

  const substituteCancelButton = document.querySelector(
    '#substituteForm2 button[type="reset"]'
  );
  substituteCancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    substituteForm1.style.display = "inherit";
    substituteForm2.style.display = "none";
    substituteForm1.reset();
    substituteForm2.reset();

    substituteReportDiv.style.display = "none";
  });
});

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