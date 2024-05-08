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

document.addEventListener('DOMContentLoaded', () => {
    const studentDetailsUrl = '../json/account.json'; 

    fetch(studentDetailsUrl)
        .then(response => response.json())
        .then(data => {
            const students = data.students;

            students.forEach(student => {
                document.getElementById('first-name').value = student.student.name.split(' ')[0];
                document.getElementById('last-name').value = student.student.name.split(' ')[1];
                document.getElementById('department').value = student.student.department;
                document.getElementById('batch').value = student.student.batch;
                document.getElementById('semester').value = student.student.semester;
                document.getElementById('roll-no').value = student.student.id;
                document.getElementById('registration-no').value = student.student['registration no'];

                document.getElementById('present-address').value = student['personal details'].address['present address'].Address;
                document.getElementById('city').value = student['personal details'].address['present address'].city;
                document.getElementById('pin-no').value = student['personal details'].address['present address']['pin no'];
                document.getElementById('permanent-address').value = student['personal details'].address['permanent address'].Address;
                document.getElementById('permanent-city').value = student['personal details'].address['permanent address'].city;
                document.getElementById('permanent-pin').value = student['personal details'].address['permanent address']['pin no'];
                document.getElementById('mobile-no').value = student['personal details'].contact['Mobile No'];
                document.getElementById('email').value = student['personal details'].contact.Email;
                document.getElementById('dob').value = student['personal details'].contact['Date of Birth'];

                document.getElementById('class-x').value = student['personal details'].marks['class-x'];
                document.getElementById('class-xii').value = student['personal details'].marks['class-xii'];
                document.getElementById('diploma').value = student['personal details'].marks.Diploma;
                document.getElementById('graduate').value = student['personal details'].marks.graduation;
                document.getElementById('post-graduate').value = student['personal details'].marks['post graduation'];
                document.getElementById('eng-full-marks').value = student['personal details']['HS Marks'].english['eng-full-marks'];
                document.getElementById('eng-obtained-marks').value = student['personal details']['HS Marks'].english['eng-obtained-marks'];
                document.getElementById('phy-full-marks').value = student['personal details']['HS Marks'].physics['phy-full-marks'];
                document.getElementById('phy-obtained-marks').value = student['personal details']['HS Marks'].physics['phy-obtained-marks'];
                document.getElementById('chem-full-marks').value = student['personal details']['HS Marks'].chemistry['chem-full-marks'];
                document.getElementById('chem-obtained-marks').value = student['personal details']['HS Marks'].chemistry['chem-obtained-marks'];
                document.getElementById('math-full-marks').value = student['personal details']['HS Marks'].math['math-full-marks'];
                document.getElementById('math-obtained-marks').value = student['personal details']['HS Marks'].math['math-obtained-marks'];

                document.getElementById('current-address').value = student['personal details']['Current co-ordinates']['current address'];
                document.getElementById('current-mobile-no').value = student['personal details']['Current co-ordinates']['currnt mobile no'];
                document.getElementById('current-email').value = student['personal details']['Current co-ordinates']['current email'];
                document.getElementById('blood-group').value = student['personal details']['Current co-ordinates']['blood group'];
                document.getElementById('date-of-birth').value = student['personal details']['Current co-ordinates']['date of birth'];

                document.getElementById('guardian-first-name').value = student['guardian details']['guardian-first-name'];
                document.getElementById('guardian-last-name').value = student['guardian details']['guardian-last-name'];
                document.getElementById('guardian-mobile-no').value = student['guardian details']['guardian mobile no'];
                document.getElementById('guardian-email').value = student['guardian details']['guardian email'];
                document.getElementById('guardian-address').value = student['guardian details']['guardian address'];

                document.getElementById('sgpa-1st-sem').value = student.sgpa['1st sem'];
                document.getElementById('sgpa-2nd-sem').value = student.sgpa['2nd sem'];
                document.getElementById('sgpa-3rd-sem').value = student.sgpa['3rd sem'];
                document.getElementById('sgpa-4th-sem').value = student.sgpa['4th sem'];
                document.getElementById('sgpa-5th-sem').value = student.sgpa['5th sem'];
                document.getElementById('sgpa-6th-sem').value = student.sgpa['6th sem'];
                document.getElementById('sgpa-7th-sem').value = student.sgpa['7th sem'];
                document.getElementById('sgpa-8th-sem').value = student.sgpa['8th sem'];
            });
        })
        .catch(error => console.error('Error fetching student details:', error));
});
