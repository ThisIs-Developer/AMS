let batch='';
let section='';

document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sidebarLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            const title = this.querySelector("h3").textContent;

            document.title = "Student | " + title;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('sem-form-submit');
    const cancelBtn = document.getElementById('sem-form-cancel');
    const semForm = document.querySelector('.sem-submit');
    const tableContainer = document.getElementById('table-container');
    const selectSemester = document.querySelector('select[name="choose sem"]');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (selectSemester.value === '') {
            alert('Please select a semester before submitting.');
        } else {
            showTable();
        }
    });

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        semForm.reset();
    });

    function showTable() {
        semForm.style.display = 'none';
        tableContainer.style.display = 'block';
    }
});

document.getElementById('Personal').addEventListener('click', showOnlyPersonalDetails);
document.getElementById('Guardian').addEventListener('click', showOnlyGuardianDetails);
document.getElementById('Semester_Results').addEventListener('click', showOnlySemesterResults);

document.getElementById('attendence-menu').addEventListener('click', showOnlyAttendence);
document.getElementById('dashboard-menu').addEventListener('click', showDashboard);

function showTable() {
    document.querySelector('.sem-submit').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('#table-container').style.display = 'flex';
}

function showOnlyAttendence() {
    document.querySelector('.sem-submit').style.display = 'flex';
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('#table-container').style.display = 'none';
}

function showDashboard() {
    document.querySelector('.sem-submit').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'flex';
}

function resetButtonColors() {
    const buttons = document.querySelectorAll('.dashboard-btn');
    buttons.forEach(button => {
        if (button.id !== 'Personal' && button.id !== 'Guardian' && button.id !== 'Semester_Results') {
            button.style.backgroundColor = 'initial';
        }
    });
}

function hideAllDashboardContent() {
    document.getElementById('address').style.display = 'none';
    document.getElementById('total-marks').style.display = 'none';
    document.getElementById('hs-marks').style.display = 'none';
    document.getElementById('present-details').style.display = 'none';
    document.getElementById('guardian-det').style.display = 'none';
    document.getElementById('sem-result').style.display = 'none';
    document.getElementById('personal-info').style.display = 'none';
}

function showOnlyPersonalDetails() {
    hideAllDashboardContent();
    document.getElementById('student-det').style.display = 'flex';
    document.getElementById('address').style.display = 'flex';
    document.getElementById('total-marks').style.display = 'flex';
    document.getElementById('hs-marks').style.display = 'flex';
    document.getElementById('present-details').style.display = 'flex';
    document.getElementById('Personal').style.backgroundColor = '#28a745';
    document.getElementById('Guardian').style.backgroundColor = '';
    document.getElementById('Semester_Results').style.backgroundColor = '';
}

function showOnlyGuardianDetails() {
    hideAllDashboardContent();
    document.getElementById('guardian-det').style.display = 'flex';
    document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)';
    document.getElementById('Guardian').style.backgroundColor = '#28a745';
    document.getElementById('Semester_Results').style.backgroundColor = '';
}

function showOnlySemesterResults() {
    hideAllDashboardContent();
    document.getElementById('sem-result').style.display = 'flex';
    document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)';
    document.getElementById('Guardian').style.backgroundColor = '';
    document.getElementById('Semester_Results').style.backgroundColor = '#28a745';
}

const themeToggler = document.querySelector('#mode');
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
});

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".sidebar a");

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            menuItems.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            const allContents = document.querySelectorAll(".content");
            allContents.forEach(content => {
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

document.querySelectorAll('.top #menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        sideMenu.style.display = 'block';
    });
});

document.querySelectorAll('.top #close-btn').forEach(button => {
    button.addEventListener('click', () => {
        sideMenu.style.display = 'none';
    });
});

document.getElementById('logout-link').addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = this.getAttribute('href');
});





// document.getElementById('sem-form-submit').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const selectedSemester = document.querySelector('select[name="choose sem"]').value;
//     const accessToken = localStorage.getItem('access_token'); // Get access token from localStorage
//     const collegeId = localStorage.getItem('userId'); // Get collegeId from localStorage
//      console.log("TEST"+" "+batch+" "+section);

//     if (selectedSemester && collegeId) {
//        const url = `http://localhost:8080/student-profile/attendance?collegeId=${collegeId}&batch=${batch}&sem=${selectedSemester}&section=${section}`;


//          console.log(url);

//         fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); // Print the data in console
//             const tableBody = document.querySelector('#Attendance-table tbody');
//             tableBody.innerHTML = ''; // Clear any existing rows
    
//             data.forEach(subject => {
//                 const row = document.createElement('tr');
    
//                 const subCodeCell = document.createElement('td');
//                 subCodeCell.textContent = subject.subCode;
//                 row.appendChild(subCodeCell);
    
//                 const subNameCell = document.createElement('td');
//                 subNameCell.textContent = subject.subName;
//                 row.appendChild(subNameCell);
    
//                 const totalClassCell = document.createElement('td');
//                 totalClassCell.textContent = subject.totalClass;
//                 row.appendChild(totalClassCell);
    
//                 const presentClassCell = document.createElement('td');
//                 presentClassCell.textContent = subject.presentClass;
//                 row.appendChild(presentClassCell);
    
//                 const percentageCell = document.createElement('td');
//                 percentageCell.textContent = subject.percentage;
//                 row.appendChild(percentageCell);
    
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         console.warn('Please select a semester and ensure collegeId is available.');
//     }
// });

document.getElementById('sem-form-submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const selectedSemester = document.querySelector('select[name="choose sem"]').value;
    const accessToken = localStorage.getItem('access_token'); // Get access token from localStorage
    const collegeId = localStorage.getItem('userId'); // Get collegeId from localStorage
    const batch = "2021-2025"; // Assuming batch is a static value based on your previous examples
    const section = "A"; // Assuming section is a static value based on your previous examples

    if (selectedSemester && collegeId) {
        const url = `http://localhost:8080/student-profile/attendance?collegeId=${collegeId}&batch=${batch}&sem=${selectedSemester}&section=${section}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return the parsed JSON promise
        })
        .then(data => {
            console.log(data); // Print the data in console
            
            const tableBody = document.querySelector('#Attendence-table tbody');
            tableBody.innerHTML = ''; // Clear any existing rows

            data.forEach(subject => {
                const row = document.createElement('tr');
    
                const subCodeCell = document.createElement('td');
                subCodeCell.textContent = subject.subCode;
                row.appendChild(subCodeCell);
    
                const subNameCell = document.createElement('td');
                subNameCell.textContent = subject.subName;
                row.appendChild(subNameCell);
    
                const totalClassCell = document.createElement('td');
                totalClassCell.textContent = subject.totalClass;
                row.appendChild(totalClassCell);
    
                const presentClassCell = document.createElement('td');
                presentClassCell.textContent = subject.presentClass;
                row.appendChild(presentClassCell);
    
                const percentageCell = document.createElement('td');
                percentageCell.textContent = subject.percentage;
                row.appendChild(percentageCell);
    
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error appropriately, e.g., display an error message to the user
        });
    } else {
        console.warn('Please select a semester and ensure collegeId is available.');
    }
});




document.addEventListener("DOMContentLoaded", function () {
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return params.get('data');
    }

    // Retrieve and parse the JSON string from the URL
    const jsonString = decodeURIComponent(getQueryParams());
    const profileData = JSON.parse(jsonString);

    batch=profileData.educationalDetails.batch;
    section=profileData.educationalDetails.section;

    // Print the data to the console
    console.log('Profile Data:', profileData);

    // Display the data on the page
    // const profileDiv = document.getElementById('profile');
    // profileDiv.textContent = JSON.stringify(profileData, null, 2);

       // Fill educational details
       document.getElementById('first-name').value = profileData.educationalDetails.firstName;
       document.getElementById('last-name').value = profileData.educationalDetails.lastName;
       document.getElementById('department').value = profileData.educationalDetails.department;
       document.getElementById('batch').value = profileData.educationalDetails.batch;
       document.getElementById('semester').value = profileData.educationalDetails.sem;
       document.getElementById('roll-no').value = profileData.educationalDetails.rollNo;
       document.getElementById('registration-no').value = profileData.educationalDetails.regNo;
       document.getElementById('clgID').value = profileData.educationalDetails.collegeId;
   
       // Fill personal information
       document.getElementById('mobile-no').value = profileData.personalInformation.mobileNo;
       document.getElementById('email').value = profileData.personalInformation.email;
       document.getElementById('dob').value = profileData.personalInformation.dob;
       document.getElementById('blood-group').value = profileData.personalInformation.bloodGroup;
   
       // Fill current contact
       document.getElementById('current-mobile-no').value = profileData.currentContact.mobileNo;
       document.getElementById('current-email').value = profileData.currentContact.email;
   
       // Fill address information
       document.getElementById('present-address').value = profileData.addressInformation.presentAddress;
       document.getElementById('city').value = profileData.addressInformation.presentCity;
       document.getElementById('state').value = profileData.addressInformation.presentState;
       document.getElementById('pin-no').value = profileData.addressInformation.presentPin;
       document.getElementById('permanent-address').value = profileData.addressInformation.permanentAddress;
       document.getElementById('permanent-city').value = profileData.addressInformation.permanentCity;
       document.getElementById('permanent-state').value = profileData.addressInformation.permanentState;
       document.getElementById('permanent-pin').value = profileData.addressInformation.permanentPin;
   
       // Fill guardian details
       document.getElementById('guardian-first-name').value = profileData.guardianDetails.firstName;
       document.getElementById('guardian-last-name').value = profileData.guardianDetails.lastName;
       document.getElementById('guardian-mobile-no').value = profileData.guardianDetails.mobileNo;
       document.getElementById('guardian-email').value = profileData.guardianDetails.email;
       document.getElementById('guardian-address').value = profileData.guardianDetails.presentAddress;
   
       // Fill HS marks
       document.getElementById('class-x').value = profileData.marks.matricPercentage;
       document.getElementById('class-xii').value = profileData.marks.hsPercentage;
       document.getElementById('diploma').value = profileData.marks.diplomaPercentage;
       document.getElementById('eng-full-marks').value = profileData.marks.englishTotal;
       document.getElementById('eng-obtained-marks').value = profileData.marks.englishObtained;
       document.getElementById('phy-full-marks').value = profileData.marks.physicsTotal;
       document.getElementById('phy-obtained-marks').value = profileData.marks.physicsObtained;
       document.getElementById('chem-full-marks').value = profileData.marks.chemistryTotal;
       document.getElementById('chem-obtained-marks').value = profileData.marks.chemistryObtained;
       document.getElementById('math-full-marks').value = profileData.marks.mathTotal;
       document.getElementById('math-obtained-marks').value = profileData.marks.mathObtained;
   
       // Fill semester results
       document.getElementById('sgpa-1st-sem').value = profileData.semesterMarks.sem1;
       document.getElementById('sgpa-2nd-sem').value = profileData.semesterMarks.sem2;
       document.getElementById('sgpa-3rd-sem').value = profileData.semesterMarks.sem3;
       document.getElementById('sgpa-4th-sem').value = profileData.semesterMarks.sem4;
       document.getElementById('sgpa-5th-sem').value = profileData.semesterMarks.sem5;
       document.getElementById('sgpa-6th-sem').value = profileData.semesterMarks.sem6;
       document.getElementById('sgpa-7th-sem').value = profileData.semesterMarks.sem7;
       document.getElementById('sgpa-8th-sem').value = profileData.semesterMarks.sem8;

       //current-co 
       document.getElementById('current-co-address').value=profileData.currentCoOrdinate.presentAddress;
       document.getElementById('current-co-pin-code').value=profileData.currentCoOrdinate.presentPin;
       document.getElementById('current-co-city').value=profileData.currentCoOrdinate.presentCity;
     


   
});
