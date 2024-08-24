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

document.getElementById("logout-link").addEventListener("click", function (event) {
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
  const studentAttendanceForm = document.getElementById("studentAttendanceForm");
  const giveAttendendanceForm1 = document.getElementById("giveAttendendanceForm1");
  const giveAttendendanceForm2 = document.getElementById("giveAttendendanceForm2");
  const studentAttendanceReport = document.querySelector(".student-attendance-report");
  const giveAttendanceReport = document.querySelector(".give-attendance-report");
  const subjectSelect =document.getElementById("subject");

  const accessToken = localStorage.getItem("access_token");



  attendanceForm.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      event.preventDefault();
      const action = event.target.value;
      if (action === "studentAttendance") {
        attendanceForm.style.display = "none";
        studentAttendanceForm.style.display = "block";
      } else if (action === "giveAttendendance") {
        attendanceForm.style.display = "none";
        giveAttendendanceForm1.style.display = "block";
      }
    }
  });

  studentAttendanceForm.addEventListener("submit", async (event) => {
   
    event.preventDefault();

    const rollNumberInput = document.getElementById("rollNumber").value;

    // console.log(rollNumberInput);
   

    if (!rollNumberInput) {
      
      showErrorToast("Please enter the roll number");
    } else {
      try {
        
        if (!accessToken) {
          throw new Error("Access token is missing");
        }
  
        const response = await fetch(`http://localhost:8080/attendance/Id?collegeId=${rollNumberInput}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        });
    
        
       if(response.ok){
        
        const data = await response.json();
        
        // Hide the form and show the report
        studentAttendanceForm.style.display = "none";
        studentAttendanceReport.style.display = "block";
        
        // Populate student information
        document.getElementById("student-attendance-report-name").textContent = data.firstName+" "+data.lastName;
        document.getElementById("student-attendance-report-collegeId").textContent = data.collegeId;
        document.getElementById("student-attendance-report-roll").textContent = data.rollNo;
        document.getElementById("student-attendance-report-batch").textContent = data.batch;
        document.getElementById("student-attendance-report-semester").textContent = data.sem;
        document.getElementById("student-attendance-report-section").textContent = data.section;
        
        // Populate the attendance table
        const tableBody = document.getElementById("student-attendance-tableBody");
        tableBody.innerHTML = "";
        data.studentSubjectAttendanceResponseList.forEach(item => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = item.subCode;
          row.insertCell(1).textContent = item.subName;
          row.insertCell(2).textContent = item.totalClass;
          row.insertCell(3).textContent = item.presentClass;
          row.insertCell(4).textContent = item.percentage;
        });
        
        showSuccessToast("Report successfully generated");
      }
      else{
        showErrorToast("No Student Present With Id: "+rollNumberInput);
      }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        showErrorToast("Failed to generate report. Please try again later.");
      }
    }
  });


  

  studentAttendanceForm.querySelector('button[type="reset"]').addEventListener("click", () => {
    studentAttendanceForm.style.display = "none";
    attendanceForm.style.display = "block";
  });

  giveAttendendanceForm1.addEventListener("submit", async (event) => {
    event.preventDefault();
    const dateValue = document.getElementById("date").value;
    if (!dateValue) {
      showErrorToast("Please enter a date");
    } else {
      try {
        const selectedDate = new Date(dateValue);
        const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("userId");
        if (!accessToken || !userId) {
          showErrorToast("Access token or user ID not found");
          return;
        }
        const url = `http://localhost:8080/routine/subject/all?day=${dayOfWeek}&teacherId=${userId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          const responseData = await response.json();
          window.subjectDetails = responseData.subjectList;
          subjectSelect.innerHTML = '<option value="">Search</option>';
          responseData.subjectList.forEach((subject, index) => {
            const option = document.createElement("option");
            let optionText = "";
            if (subject.accessType === "S") {
              optionText = `SUB ${subject.subCode} ${subject.subName} (${subject.sem}${subject.section}`;
              if (subject.classType === "Flip") {
                optionText += " - Flip";
              }
              optionText += ")";
              option.style.color = "red";
            } else {
              optionText = `${subject.subCode} ${subject.subName} (${subject.sem}${subject.section}`;
              if (subject.classType === "Flip") {
                optionText += " - Flip";
              }
              optionText += ")";
            }
            option.value = index;
            option.textContent = optionText;
            subjectSelect.appendChild(option);
          });
          document.getElementById("giveAttendendanceForm1").style.display = "none";
          document.getElementById("giveAttendendanceForm2").style.display = "block";
        } else {
          showErrorToast("Failed to fetch data from the server");
        }
      } catch (error) {
        console.error("Error:", error);
        showErrorToast("An error occurred while processing the request");
      }
    }
  });

  document.getElementById("giveAttendendanceForm2").addEventListener("submit", async (event) => {
    event.preventDefault();
    const subjectSelect = document.getElementById("subject");
    if (!subjectSelect.value) {
      showErrorToast("Please select a subject");
    } else {
      const selectedIndex = subjectSelect.value;
      const selectedSubject = window.subjectDetails[selectedIndex];
      const batch = selectedSubject.batch;
      const semester = selectedSubject.sem;
      const section = selectedSubject.section;
      const date = document.getElementById("date").value;
      const subCode = selectedSubject.subCode;
      const subName = selectedSubject.subName;
      const accessType = selectedSubject.accessType;
      const classType = selectedSubject.classType;
      document.getElementById("reportBatch").textContent = batch;
      document.getElementById("reportSemester").textContent = semester;
      document.getElementById("reportSection").textContent = section;
      document.getElementById("reportSubject").textContent = `${subCode} ${subName}`;
      document.getElementById("reportDate").textContent = date;
      const attendanceUrl = `http://localhost:8080/attendance?batch=${batch}&section=${section}&date=${date}&subCode=${subCode}&classType=${classType}`;
      try {
        const attendanceResponse = await fetch(attendanceUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (attendanceResponse.ok) {
          const data = await attendanceResponse.json();
          const tbody = document.querySelector("#data-table tbody");
          document.getElementById("reportTotalClass").textContent =data.totalClass;
          tbody.innerHTML = "";
          data.presentStatusResponseList.forEach((student) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${student.collegeId}</td>
              <td>${student.rollNo}</td>
              <td>${student.firstName+" "+student.lastName}</td>
              <td><input type="checkbox" ${student.status ? "checked" : ""}></td>
              <td>${student.totalPresentClass}</td>
              <td>${student.percentage}</td>
            `;
            row.dataset.collegeId = student.collegeId;
            tbody.appendChild(row);
          });
          showSuccessToast("Attendance logged successfully.");
        } else {
          showErrorToast("Failed to fetch attendance data.");
        }
      } catch (error) {
        console.error("Error logging attendance:", error);
        showErrorToast("Error logging attendance. Please try again.");
      }
  
      giveAttendanceReport.style.display = "block";
      giveAttendendanceForm2.style.display = "none";
    }
  });  

  document.getElementById("submitattendence").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const presentStatusRequests = [];
  
    document.querySelectorAll("#data-table input[type='checkbox']").forEach((checkbox) => {
      presentStatusRequests.push({
        collegeId: checkbox.closest("tr").dataset.collegeId,
        status: checkbox.checked,
      });
    });
  
    const selectedIndex = subjectSelect.value;
    const selectedSubject = window.subjectDetails[selectedIndex];
  
    const batch = selectedSubject.batch;
    const section = selectedSubject.section;
    const date = document.getElementById("reportDate").textContent;
    const subCode = selectedSubject.subCode;
    const classType = selectedSubject.classType;
  
    const requestBody = {
      batch: batch,
      section: section,
      subCode: subCode,
      date: date,
      classType: classType,
      presentStatusRequests: presentStatusRequests,
    };
  
    try {
      const postResponse = await fetch("http://localhost:8080/attendance", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (postResponse.ok) {
        showSuccessToast("Attendance submitted successfully.");
      } else {
        showErrorToast("Failed to submit attendance. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      showErrorToast("Error submitting attendance. Please try again.");
    }
  });  

  giveAttendendanceForm1
    .querySelector('button[type="reset"]')
    .addEventListener("click", () => {
      giveAttendendanceForm1.style.display = "none";
      attendanceForm.style.display = "block";
    });

  giveAttendendanceForm2
    .querySelector('button[type="reset"]')
    .addEventListener("click", () => {
      giveAttendendanceForm2.style.display = "none";
      giveAttendendanceForm1.style.display = "block";
    });

  giveAttendanceReport
    .querySelector('button[type="reset"]')
    .addEventListener("click", () => {
      giveAttendanceReport.style.display = "none";
      giveAttendendanceForm2.style.display = "block";
    });

  document
    .querySelector('.give-attendance-report .attendanceBtn[type="button"]')
    .addEventListener("click", () => {
      giveAttendanceReport.style.display = "none";
      attendanceForm.style.display = "block";
    });

  document
    .querySelector('.student-attendance-report .attendanceBtn[type="button"]')
    .addEventListener("click", () => {
      studentAttendanceReport.style.display = "none";
      attendanceForm.style.display = "block";
    });

 
});

document.addEventListener("DOMContentLoaded", async function() {
  const substituteMenu = document.getElementById("substitute-faculty-menu");
  const subjectSelect = document.getElementById("substitute-subject");
  const substituteForm = document.getElementById("substituteForm");
  const substituteForm1 = document.getElementById("substituteForm1");
  const substituteReport = document.querySelector(".substitute-report");
  const day = new Date().toLocaleString('en-US', { weekday: 'long' }); // Fetch current day

  // Add click event listener to the substitute faculty menu link
  substituteMenu.addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Fetch the user ID and access token from localStorage
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("access_token");

    // Construct the URL for the GET request
    const url = `http://localhost:8080/routine/subject/own?day=${day}&teacherId=${userId}`;

    try {
      // Make the GET request with the access token in the headers
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      window.subjectDetails = responseData.subjectList;
      subjectSelect.innerHTML = '<option value="">Search</option>';
      responseData.subjectList.forEach((subject, index) => {
        const option = document.createElement("option");
        let optionText = `${subject.subCode} ${subject.subName} (${subject.sem}${subject.section}`;
        if (subject.classType === "Flip") {
          optionText += " - Flip";
        }
        optionText += ")";
        option.value = index;
        option.textContent = optionText;
        subjectSelect.appendChild(option);
      });
    } catch (error) {
      console.error("There was a problem with fetching subjects:", error);
    }
  });

  substituteForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch selected subject value
    const selectedIndex = subjectSelect.value;
    const selectedSubject = window.subjectDetails[selectedIndex];

    // Fetch the access token from localStorage
    const accessToken = localStorage.getItem("access_token");

    // Construct the URL for the GET request
    const url = `http://localhost:8080/faculty/all`;

    try {
      // Make the GET request with the access token in the headers
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      // Hide substituteForm and show substituteForm1
      substituteForm.style.display = "none";
      substituteForm1.style.display = "block";

      // Fill the select options in substituteForm1 with response data
      const substituteTeacherSelect = document.getElementById("substitute-teacher");
      substituteTeacherSelect.innerHTML = '<option value="">Search</option>';
      responseData.forEach((teacher) => {
        const option = document.createElement("option");
        option.value = teacher.mailId;
        option.textContent = teacher.name;
        substituteTeacherSelect.appendChild(option);
      });
    } catch (error) {
      console.error("There was a problem with fetching faculty data:", error);
    }
  });

  substituteForm1.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Fetch selected teacher value
    const substituteTeacherSelect = document.getElementById("substitute-teacher");
    const selectedTeacherName = substituteTeacherSelect.options[substituteTeacherSelect.selectedIndex].textContent;
  
    // Fetch selected subject details
    const selectedSubjectIndex = subjectSelect.value;
    const selectedSubjectDetails = window.subjectDetails[selectedSubjectIndex];
  
    // Fetch the access token from localStorage
    const accessToken = localStorage.getItem("access_token");
  
    // Construct the URL for the POST request to substitute
    const substituteUrl = `http://localhost:8080/routine/substitute`;
    const substituteParams = {
      method: "PUT", // Use PUT method based on your requirement
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        batch: selectedSubjectDetails.batch,
        sem: selectedSubjectDetails.sem,
        section: selectedSubjectDetails.section,
        subCode: selectedSubjectDetails.subCode,
        classType: selectedSubjectDetails.classType,
        day: day, // Use the fetched day variable
        subTeacherId: substituteTeacherSelect.value
      })
    };
  
    try {
      // Make the POST request
      const response = await fetch(substituteUrl, substituteParams);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Update substitute report with selected details
      document.getElementById("substitute-reportSubjectName").textContent = selectedSubjectDetails.subName;
      document.getElementById("substitute-reportSubjectCode").textContent = selectedSubjectDetails.subCode;
      document.getElementById("substitute-reportTeacherName").textContent = selectedTeacherName;
  
      substituteReport.style.display = "block";
  
      // Hide substituteForm1 if needed
      substituteForm1.style.display = "none";
  
      console.log("Substitute request successful:", response);
    } catch (error) {
      console.error("There was a problem with substitute request:", error);
    }
  });
  
});




function setMaxDate() {
  var now = new Date(); // Current UTC date and time
  var istOffset = 330; // IST offset in minutes (+5:30)
  now.setMinutes(now.getMinutes() + istOffset); // Convert UTC to IST

  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Increment the day by 1

  document.getElementById("date").max = tomorrow.toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", setMaxDate);


// document.addEventListener("DOMContentLoaded", function () {
//   const form1 = document.getElementById("medicalAttendenceForm1");
//   const form2 = document.getElementById("medicalAttendenceForm2");
//   const reportSection = document.querySelector(".medical-attendence-report");
//   const accessToken = localStorage.getItem("access_token");

//   let finalCollegeId="";
//   form1.addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const collegeId = document.getElementById("medical-attendance").value;
//     if (collegeId === "") {
//       showWarningToast("Please enter College Id.");
//       return;
//     }

//     const userId = localStorage.getItem("userId");
    

//     const url = `http://localhost:8080/routine/subject/all/teacherId?teacherId=${userId}`;

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log(data);

//         form1.style.display = "none";
//         form2.style.display = "block";

//         const subjectSelect = document.getElementById("medical-attendence-subject");
//         subjectSelect.innerHTML = ""; // Clear any existing options

//         data.subjects.forEach(subject => {
//           const optionText = `${subject.subCode} - ${subject.subName} (${subject.sem}${subject.section})`;
//           const option = new Option(optionText, subject.subCode);
//           subjectSelect.appendChild(option);
//         });

//         form2.addEventListener("submit", async function (event) {
//           event.preventDefault();
        
//           const selectedSubject = document.getElementById("medical-attendence-subject").value;
//           const attendanceUrl = `http://localhost:8080/attendance/subject?id=${collegeId}&subCode=${selectedSubject}`;
        
//           try {
//             const attendanceResponse = await fetch(attendanceUrl, {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             });
        
//             const attendanceData = await attendanceResponse.json();
//             const statusCode = attendanceData.statusCode; // Get the status code from the response
        
        
//             // Check if statusCode is "OK" or 200
//             if (statusCode === "OK" || statusCode === 200) {
//               finalCollegeId=attendanceData.collegeId;
//               document.getElementById("medical-attendence-reportTeacher").textContent = attendanceData.name;
//               document.getElementById("medical-attendence-reportId").textContent = attendanceData.collegeId;
//               document.getElementById("medical-attendence-reportBatch").textContent = attendanceData.batch;
//               document.getElementById("medical-attendence-reportSemester").textContent = attendanceData.sem;
//               document.getElementById("medical-attendence-reportSection").textContent = attendanceData.section;
//               document.getElementById("medical-attendence-reportSubject").textContent = selectedSubject;
        
//               const tableBody = document.getElementById("medical-attendance-tableBody");
//               tableBody.innerHTML = "";
        
//               if (attendanceData.statusByDateList && Array.isArray(attendanceData.statusByDateList)) {
//                 attendanceData.statusByDateList.forEach(status => {
//                   const row = document.createElement("tr");
//                   row.innerHTML = `
//                     <td>${status.date}</td>
//                     <td><input type="checkbox" ${status.status ? "checked" : ""} data-initial-status="${status.status}"></td>
//                     <td>${status.classType}</td>
//                   `;
//                   tableBody.appendChild(row);
//                 });
//               }
        
//               reportSection.style.display = "block";
//               form2.style.display = "none";
//             } else {
//               showErrorToast("Invalid Id! Please Check.");
//             }
        
//           } catch (error) {
//             console.error("Error fetching attendance data:", error);
//             showErrorToast("Failed! Try Later!");
//           }
//         });
        
        
//       } else {
//         console.error("Error fetching data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   });

//   // Add event listener for the cancel button
//   const cancelButton = form2.querySelector("button[type='reset']");
//   if (cancelButton) {
//     cancelButton.addEventListener("click", function () {
//       form2.style.display = "none";
//       form1.style.display = "block";
//     });
//   } else {
//     console.error("Cancel button not found");
//   }

//   // Center align submit button in form1
//   const submitButtonForm1 = form1.querySelector("button[type='submit']");
//   if (submitButtonForm1) {
//     submitButtonForm1.style.margin = "auto";
//     submitButtonForm1.style.display = "block";
//   } else {
//     console.error("Submit button in form1 not found");
//   }

//   // Add event listener for the home button in report section
//   const homeButton = reportSection.querySelector("button[type='button']");
//   if (homeButton) {
//     homeButton.addEventListener("click", function () {
//       reportSection.style.display = "none";
//       form1.style.display = "block";
//     });
//   } else {
//     console.error("Home button not found");
//   }

//   document.getElementById("submitMedicalAttendence").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const attendanceRequests = [];
//     document.querySelectorAll("#medicalAttendenceTable input[type='checkbox']").forEach((checkbox) => {
//       attendanceRequests.push({
//         date: checkbox.closest("tr").querySelector("td:nth-child(1)").textContent,
//         classType: checkbox.closest("tr").querySelector("td:nth-child(3)").textContent,
//         curStatus: checkbox.checked,
//         prevStatus: checkbox.dataset.initialStatus === "true",
//       });
//     });

//     const selectedSubject = document.getElementById("medical-attendence-subject").value;
//     const collegeId = document.getElementById("medical-attendance").value;

//     if (selectedSubject) {
//       const requestBody = {
//         collegeId:finalCollegeId,
//         subCode: selectedSubject,
//         attendanceRequests: attendanceRequests,
//       };

//       console.log(requestBody);

//       try {
//         const postResponse = await fetch("http://localhost:8080/attendance/subject/medical", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody),
//         });

//         console.log(postResponse);

//         if (postResponse.ok) {
//           showSuccessToast("Attendance submitted successfully.")
//         } else {
//           showErrorToast("Failed to submit attendance. Please try again.");
//         }
//       } catch (error) {
//         showErrorToast("Failed to submit attendance. Please try again.");
//       }
//     } else {
//       showErrorToast('Please select a subject.')
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const form1 = document.getElementById("medicalAttendenceForm1");
  const form2 = document.getElementById("medicalAttendenceForm2");
  const reportSection = document.querySelector(".medical-attendence-report");
  const accessToken = localStorage.getItem("access_token");

  let finalCollegeId = "";
  form1.addEventListener("submit", async function (event) {
    event.preventDefault();

    const collegeId = document.getElementById("medical-attendance").value;
    if (collegeId === "") {
      showWarningToast("Please enter College Id.");
      return;
    }

    const userId = localStorage.getItem("userId");

    const url = `http://localhost:8080/routine/subject/all/teacherId?teacherId=${userId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);

        form1.style.display = "none";
        form2.style.display = "block";

        const subjectSelect = document.getElementById("medical-attendence-subject");
        subjectSelect.innerHTML = ""; // Clear any existing options

        data.subjects.forEach(subject => {
          const optionText = `${subject.subCode} - ${subject.subName} (${subject.sem}${subject.section})`;
          const option = new Option(optionText, subject.subCode);
          option.dataset.semester = subject.sem; // Store semester in data attribute
          subjectSelect.appendChild(option);
        });

        form2.addEventListener("submit", async function (event) {
          event.preventDefault();

          const selectedSubject = document.getElementById("medical-attendence-subject").value;
          const selectedOption = document.querySelector(`#medical-attendence-subject option[value="${selectedSubject}"]`);
          const selectedSemester = selectedOption ? selectedOption.dataset.semester : null; // Get semester from selected option
          const attendanceUrl = `http://localhost:8080/attendance/subject?id=${collegeId}&subCode=${selectedSubject}&sem=${selectedSemester}`;

       
          try {
            const attendanceResponse = await fetch(attendanceUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const attendanceData = await attendanceResponse.json();
            const statusCode = attendanceData.statusCode; // Get the status code from the response
 
        

            // Check if statusCode is "OK" or 200
            if (statusCode === "OK" || statusCode === 200) {
              finalCollegeId = attendanceData.collegeId;
              document.getElementById("medical-attendence-reportTeacher").textContent = attendanceData.name;
              document.getElementById("medical-attendence-reportId").textContent = attendanceData.collegeId;
              document.getElementById("medical-attendence-reportBatch").textContent = attendanceData.batch;
              document.getElementById("medical-attendence-reportSemester").textContent = attendanceData.sem;
              document.getElementById("medical-attendence-reportSection").textContent = attendanceData.section;
              document.getElementById("medical-attendence-reportSubject").textContent = selectedSubject;

              const tableBody = document.getElementById("medical-attendance-tableBody");
              tableBody.innerHTML = "";

              if (attendanceData.statusByDateList && Array.isArray(attendanceData.statusByDateList)) {
                attendanceData.statusByDateList.forEach(status => {
                  const row = document.createElement("tr");
                  row.innerHTML = `
                    <td>${status.date}</td>
                    <td><input type="checkbox" ${status.status ? "checked" : ""} data-initial-status="${status.status}"></td>
                    <td>${status.classType}</td>
                  `;
                  tableBody.appendChild(row);
                });
              }

              reportSection.style.display = "block";
              form2.style.display = "none";
            } else if(statusCode === "NOT_ACCEPTABLE" || statusCode === 406) {
              showErrorToast("Student Current Sem and Subject Sem Not matched!");
            }
            else{
              showErrorToast("Invalid Id");
            }

          } catch (error) {
            console.error("Error fetching attendance data:", error);
            showErrorToast("Failed! Try Later!");
          }
        });

      } else {
        showErrorToast("Failed to Process With Request")      }
    } catch (error) {
      showErrorToast("Failed to Process With Request")
    }
  });

  // Add event listener for the cancel button
  const cancelButton = form2.querySelector("button[type='reset']");
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      form2.style.display = "none";
      form1.style.display = "block";
    });
  } else {
    console.error("Cancel button not found");
  }

  // Center align submit button in form1
  const submitButtonForm1 = form1.querySelector("button[type='submit']");
  if (submitButtonForm1) {
    submitButtonForm1.style.margin = "auto";
    submitButtonForm1.style.display = "block";
  } else {
    console.error("Submit button in form1 not found");
  }

  // Add event listener for the home button in report section
  const homeButton = reportSection.querySelector("button[type='button']");
  if (homeButton) {
    homeButton.addEventListener("click", function () {
      reportSection.style.display = "none";
      form1.style.display = "block";
    });
  } else {
    console.error("Home button not found");
  }

  document.getElementById("submitMedicalAttendence").addEventListener("submit", async (event) => {
    event.preventDefault();

    const attendanceRequests = [];
    document.querySelectorAll("#medicalAttendenceTable input[type='checkbox']").forEach((checkbox) => {
      attendanceRequests.push({
        date: checkbox.closest("tr").querySelector("td:nth-child(1)").textContent,
        classType: checkbox.closest("tr").querySelector("td:nth-child(3)").textContent,
        curStatus: checkbox.checked,
        prevStatus: checkbox.dataset.initialStatus === "true",
      });
    });

    const selectedSubject = document.getElementById("medical-attendence-subject").value;

    if (selectedSubject) {
      const requestBody = {
        collegeId: finalCollegeId,
        subCode: selectedSubject,
        attendanceRequests: attendanceRequests,
      };

      console.log(requestBody);

      try {
        const postResponse = await fetch("http://localhost:8080/attendance/subject/medical", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        console.log(postResponse);

        if (postResponse.ok) {
          showSuccessToast("Attendance submitted successfully.");
        } else {
          showErrorToast("Failed to submit attendance. Please try again.");
        }
      } catch (error) {
        showErrorToast("Failed to submit attendance. Please try again.");
      }
    } else {
      showErrorToast('Please select a subject.');
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('logout-link').addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('access_token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      window.location.href = '../Logout/logout.html';
    });
});