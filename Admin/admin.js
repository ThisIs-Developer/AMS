document.addEventListener("DOMContentLoaded", function () {
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

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

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
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach(icon => {
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

fetch('../json/updates.json')
    .then(response => response.json())
    .then(data => {
        const updatesContainer = document.querySelector('.recent-updates .updates');
        const showMoreLink = document.querySelector('.show-more a');

        data.sort((a, b) => {
            const dateA = new Date(a.timeAgo.split('-').reverse().join('-'));
            const dateB = new Date(b.timeAgo.split('-').reverse().join('-'));
            return dateB - dateA;
        });

        const latestUpdates = data.slice(0, 4);

        latestUpdates.forEach(update => {
            const updateDiv = document.createElement('div');
            updateDiv.classList.add('update');

            const currentDate = new Date();
            const parts = update.timeAgo.split('-');
            const userDate = new Date(parts[2], parts[1] - 1, parts[0]);

            const timeDiff = currentDate.getTime() - userDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            updateDiv.innerHTML = `
                <div class="message">
                    <p><b>${update.title}</b> ${update.description}</p>
                    <small class="text-muted">${formatTimeAgo(daysDiff, hoursDiff)}</small>
                </div>
            `;

            updatesContainer.appendChild(updateDiv);
        });

        showMoreLink.href = 'Updates/updates.html';
    })
    .catch(error => console.error('Error fetching data:', error));

function formatTimeAgo(days, hours) {
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

const showSuccessToast = (message) => {
    const toastContent = document.createElement('div');
    toastContent.classList.add('toast-content');

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-check-circle', 'toast-icon');
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
        backgroundColor: 'green',
        progressBar: true,
        style: {
            padding: '20px 2px',
            borderRadius: '8px',
        }
    });

    const setToastWidth = () => {
        const messageWidth = message.length * 10;
        toast.options.style.maxWidth = `${messageWidth}px`;

        if (window.innerWidth <= 768) {
            toast.options.style.margin = '0 15px';
        }
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};

const showErrorToast = (message) => {
    const toastContent = document.createElement('div');
    toastContent.classList.add('toast-content');

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-exclamation-circle', 'toast-icon');
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
        backgroundColor: 'red',
        progressBar: true,
        style: {
            padding: '20px 2px',
            borderRadius: '8px',
        }
    });

    const setToastWidth = () => {
        const messageWidth = message.length * 10;
        toast.options.style.maxWidth = `${messageWidth}px`;

        if (window.innerWidth <= 768) {
            toast.options.style.margin = '0 15px';
        }
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};

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

    const setToastWidth = () => {
        const messageWidth = message.length * 10;
        toast.options.style.maxWidth = `${messageWidth}px`;

        if (window.innerWidth <= 768) {
            toast.options.style.margin = '0 15px';
        }
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const classSearchForm = document.getElementById('classSearchForm');
    const teacherSearchForm = document.getElementById('teacherSearchForm');
    const roomNoSearchForm = document.getElementById('roomNoSearchForm');

    const classReportDiv = document.querySelector('.class-search-report');
    const tableBody = document.getElementById('tableBody');
    const classBatchSpan = document.getElementById('classBatch-search-report');
    const classSemesterSpan = document.getElementById('classSemester-search-report');
    const classSectionSpan = document.getElementById('classSection-search-report');
    
    const teacherSelect = document.getElementById('teacher');
    const teacherSearchReport = document.querySelector('.teacher-search-report');
    const teacherNameSpan = document.getElementById('teacher-search-report-name');

    const roomNoSelect = document.getElementById('roomNo');
    const roomNoSearchReport = document.querySelector('.roomNo-search-report');
    const roomNoNameSpan = document.getElementById('roomNo-search-report-number');    

    const classSearchHomeButton = document.querySelector('.class-search-report .searchBtn');
    const teacherSearchHomeButton = document.querySelector('.teacher-search-report .searchBtn');
    const roomNoSearchHomeButton = document.querySelector('.roomNo-search-report .searchBtn');
    const cancelButtons = document.querySelectorAll('.searchBtn[type="reset"]');

    const showForm = (formToShow, formToHide) => {
        formToShow.style.display = 'block';
        formToHide.style.display = 'none';
    };

    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const action = event.submitter.value;

        if (action === 'classSearch') {
            showForm(classSearchForm, searchForm);
        } else if (action === 'teacherSearch') {
            showForm(teacherSearchForm, searchForm);
        } else if (action === 'roomNoSearch') {
            showForm(roomNoSearchForm, searchForm);
        }
    });

    classSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedBatch = formData.get('batch');
        const selectedSemester = formData.get('semester');
        const selectedSection = formData.get('section');

        if (!selectedBatch || !selectedSemester || !selectedSection) {
            showWarningToast('Please enter batch, semester, and section.');
            return;
        }

        try {
            const response = await fetch('../json/class.json');
            const data = await response.json();

            if (data[selectedBatch] && data[selectedBatch][selectedSemester] && data[selectedBatch][selectedSemester][selectedSection]) {
                const classDetails = data[selectedBatch][selectedSemester][selectedSection];
                tableBody.innerHTML = '';

                classBatchSpan.textContent = selectedBatch;
                classSemesterSpan.textContent = selectedSemester;
                classSectionSpan.textContent = selectedSection;

                classDetails.forEach(detail => {
                    const row = document.createElement('tr');
                    const courseNameCell = document.createElement('td');
                    courseNameCell.textContent = detail.course_name;
                    row.appendChild(courseNameCell);

                    const totalClassesCell = document.createElement('td');
                    totalClassesCell.textContent = detail.total_classes;
                    row.appendChild(totalClassesCell);

                    const teacherNameCell = document.createElement('td');
                    teacherNameCell.textContent = detail.teacher_name;
                    row.appendChild(teacherNameCell);

                    tableBody.appendChild(row);
                });

                classReportDiv.style.display = 'block';
                classSearchForm.style.display = 'none';
            } else {
                showErrorToast('Class details not found for the selected batch, semester, or section.');
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
            showErrorToast('Error fetching class details. Please try again later.');
        }
    });

    fetch('../json/teachers.json')
    .then(response => response.json())
    .then(data => {
        teacherSelect.innerHTML = '<option value="">Search</option>';
        data.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.name;
            option.textContent = teacher.name;
            teacherSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching teacher data:', error)); 

    teacherSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedTeacherName = formData.get('teacher');
    
        if (!selectedTeacherName) {
            showWarningToast('Please select a teacher.');
            return;
        }   
    
        teacherSearchForm.style.display = 'none';
        teacherSearchReport.style.display = 'block';
    
        teacherNameSpan.textContent = selectedTeacherName;
    });

    fetch('../json/routin.json')
    .then(response => response.json())
    .then(data => {
        roomNoSelect.innerHTML = '<option value="">Search</option>';
        data.room_no.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = room;
            roomNoSelect.appendChild(option);
        });
    });

    roomNoSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedRoomNoNumber = formData.get('roomNo');
    
        if (!selectedRoomNoNumber) {
            showWarningToast('Please select a Room No.');
            return;
        }   
    
        roomNoSearchForm.style.display = 'none';
        roomNoSearchReport.style.display = 'block';
    
        roomNoNameSpan.textContent = selectedRoomNoNumber;
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            searchForm.style.display = 'block';
            classSearchForm.style.display = 'none';
            teacherSearchForm.style.display = 'none';
            roomNoSearchForm.style.display = 'none';

            classSearchForm.reset();
            teacherSearchForm.reset();
            roomNoSearchForm.reset();
        });
    });

    classSearchHomeButton.addEventListener('click', () => {
        location.reload();
    });

    teacherSearchHomeButton.addEventListener('click', () => {
        location.reload();
    });

    roomNoSearchHomeButton.addEventListener('click', () => {
        location.reload();
    });

});

document.getElementById('rollNumber').addEventListener('input', function() {
    var rollNumberInput = this.value;
    var warningMessage = document.getElementById('warningMessage');

    if (/[a-zA-Z]/.test(rollNumberInput) || /[^a-zA-Z0-9]/.test(rollNumberInput)) {
        warningMessage.style.display = 'inline';
    } else {
        warningMessage.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const attendanceForm = document.getElementById('attendanceForm');
    const studentAttendanceForm = document.getElementById('studentAttendanceForm');
    const classAttendanceForm = document.getElementById('classAttendanceForm');
    const subjectsAttendanceForm = document.getElementById('subjectsAttendanceForm');

    const studentAttendanceReport = document.querySelector('.student-attendance-report');
    const classAttendanceReport = document.querySelector('.class-attendance-report');
    const subjectsAttendanceReport = document.querySelector('.subjects-attendance-report');

    const rollNumberInput = document.getElementById('rollNumber');

    const attendanceTableBody = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const classAttendanceTableBody = document.getElementById('classAttendanceTable').getElementsByTagName('tbody')[0];
    const subjectsAttendanceTableBody = document.getElementById('subjectsAttendanceTable').getElementsByTagName('tbody')[0];

    const homeButtonStudent = document.querySelector('.student-attendance-report .attendanceBtn');
    const homeButtonClass = document.querySelector('.class-attendance-report .attendanceBtn');
    const homeButtonSubjects = document.querySelector('.subjects-attendance-report .attendanceBtn');

    const cancelButtons = document.querySelectorAll('.attendanceBtn[type="reset"]');

    attendanceForm.addEventListener('click', (event) => {
        event.preventDefault();
        const targetBtn = event.target;
        const action = targetBtn.value;

        attendanceForm.style.display = 'none';

        if (action === 'studentAttendance') {
            studentAttendanceForm.style.display = 'block';
        } else if (action === 'classAttendance') {
            classAttendanceForm.style.display = 'block';
        } else if (action === 'subjectsAttendance') {
            subjectsAttendanceForm.style.display = 'block';
        }
    });

    studentAttendanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const rollNumber = rollNumberInput.value.trim();

        try {
            const response = await fetch('../json/studentAttendance.json');
            const data = await response.json();

            const student = data.students.find(student => student.roll_number === rollNumber);
            if (student) {
                const {
                    name,
                    batch,
                    semester,
                    section,
                    subjects
                } = student;

                document.getElementById('student-attendance-report-name').textContent = name;
                document.getElementById('student-attendance-report-roll').textContent = rollNumber;
                document.getElementById('student-attendance-report-batch').textContent = batch;
                document.getElementById('student-attendance-report-semester').textContent = semester;
                document.getElementById('student-attendance-report-section').textContent = section;

                attendanceTableBody.innerHTML = '';
                subjects.forEach(subject => {
                    const row = attendanceTableBody.insertRow();
                    const subjectCell = row.insertCell(0);
                    const attendanceCell = row.insertCell(1);

                    subjectCell.textContent = subject.subject;
                    attendanceCell.textContent = subject.attendance;
                });

                studentAttendanceReport.style.display = 'block';
                studentAttendanceForm.style.display = 'none';
            } else {
                alert('Student with the provided roll number not found.');
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
            alert('Error fetching student details. Please try again later.');
        }
    });

    classAttendanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const batch = classAttendanceForm.querySelector('#batch').value;
        const semester = classAttendanceForm.querySelector('#semester').value;
        const section = classAttendanceForm.querySelector('#section').value;

        if (!batch || !semester || !section) {
            showWarningToast('Please enter batch, semester, and section.');
            return;
        }

        try {
            const response = await fetch('../json/classAttendance.json');
            const data = await response.json();

            const classDetails = data[batch][semester][section];
            if (classDetails) {
                document.getElementById('class-attendance-report-batch').textContent = batch;
                document.getElementById('class-attendance-report-semester').textContent = semester;
                document.getElementById('class-attendance-report-section').textContent = section;

                classAttendanceTableBody.innerHTML = '';
                classDetails.forEach(student => {
                    const row = classAttendanceTableBody.insertRow();
                    const nameCell = row.insertCell(0);
                    const rollNumberCell = row.insertCell(1);
                    const attendanceCell = row.insertCell(2);

                    nameCell.textContent = student.student_name;
                    rollNumberCell.textContent = student.roll_number;
                    attendanceCell.textContent = student.attendance;
                });

                classAttendanceReport.style.display = 'block';
                classAttendanceForm.style.display = 'none';
            } else {
                showErrorToast('Class details not found for the selected batch, semester, or section.');
            }
        } catch (error) {
            console.error('Error fetching class attendance details:', error);
            showErrorToast('Error fetching class attendance details. Please try again later.');
        }
    });

    subjectsAttendanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const batch = subjectsAttendanceForm.querySelector('#batch').value;
        const semester = subjectsAttendanceForm.querySelector('#semester').value;
        const section = subjectsAttendanceForm.querySelector('#section').value;

        if (!batch || !semester || !section) {
            showWarningToast('Please enter batch, semester, and section.');
            return;
        }

        try {
            const response = await fetch('../json/subjectsAttendance.json');
            const data = await response.json();

            const subjectsDetails = data[batch][semester][section];
            if (subjectsDetails) {
                document.getElementById('subjects-attendance-report-batch').textContent = batch;
                document.getElementById('subjects-attendance-report-semester').textContent = semester;
                document.getElementById('subjects-attendance-report-section').textContent = section;

                subjectsAttendanceTableBody.innerHTML = '';
                subjectsDetails.forEach(subject => {
                    const row = subjectsAttendanceTableBody.insertRow();
                    const subjectCell = row.insertCell(0);
                    const attendanceCell = row.insertCell(1);

                    subjectCell.textContent = subject.subject;
                    attendanceCell.textContent = subject.attendance;
                });

                subjectsAttendanceReport.style.display = 'block';
                subjectsAttendanceForm.style.display = 'none';
            } else {
                showErrorToast('Class details not found for the selected batch, semester, or section.');
            }
        } catch (error) {
            console.error('Error fetching subjects attendance details:', error);
            showErrorToast('Error fetching subjects attendance details. Please try again later.');
        }
    });

    homeButtonStudent.addEventListener('click', () => {
        location.reload();
    });

    homeButtonClass.addEventListener('click', () => {
        location.reload();
    });

    homeButtonSubjects.addEventListener('click', () => {
        location.reload();
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            attendanceForm.style.display = 'block';
            studentAttendanceForm.style.display = 'none';
            classAttendanceForm.style.display = 'none';
            subjectsAttendanceForm.style.display = 'none';

            studentAttendanceForm.reset();
            classAttendanceForm.reset();
            subjectsAttendanceForm.reset();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const routinForm = document.getElementById('routinForm');
    const newRoutinForm1 = document.getElementById('newRoutinForm1');
    const newRoutinForm2 = document.getElementById('newRoutinForm2');
    const updateRoutinForm1 = document.getElementById('updateRoutinForm1');
    const updateRoutinForm2 = document.getElementById('updateRoutinForm2');

    const newRoutinTeacherSelect = document.getElementById('newRoutinTeacher');
    const newRoutinSubjectSelect = document.getElementById('newRoutinSubject');
    const newRoutinStartTimeSelect = document.getElementById('newRoutinStartTime');
    const newRoutinEndTimeSelect = document.getElementById('newRoutinEndTime');
    const newRoutinRoomNoInput = document.getElementById('newRoutinRoomNo');

    const updateRoutinTeacherSelect = document.getElementById('updateRoutinTeacher');
    const updateRoutinSubjectSelect = document.getElementById('updateRoutinSubject');
    const updateRoutinStartTimeSelect = document.getElementById('updateRoutinStartTime');
    const updateRoutinEndTimeSelect = document.getElementById('updateRoutinEndTime');
    const updateRoutinRoomNoInput = document.getElementById('updateRoutinRoomNo');

    const newReportDiv = document.querySelector('.new-routin-report');
    const updateReportDiv = document.querySelector('.update-routin-report');

    const newHomeButton = document.querySelector('.new-routin-report .routinBtn');
    const updateHomeButton = document.querySelector('.update-routin-report .routinBtn');
    const cancelButtons = document.querySelectorAll('.routinBtn[type="reset"]');

    const showForm = (formToShow, formToHide) => {
        formToShow.style.display = 'block';
        formToHide.style.display = 'none';
    };

    routinForm.addEventListener('submit', event => {
        event.preventDefault();
        const action = event.submitter.value;

        if (action === 'newRoutin') {
            showForm(newRoutinForm1, routinForm);
        } else if (action === 'updateRoutin') {
            showForm(updateRoutinForm1, routinForm);
        }
    });

    fetch('../json/teachers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                option.dataset.teacherId = teacher.id;
                option.dataset.teacherName = teacher.name;
                newRoutinTeacherSelect.appendChild(option);
            });
        });

    fetch('../json/routin.json')
        .then(response => response.json())
        .then(data => {
            data.start_time.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                newRoutinStartTimeSelect.appendChild(option);
            });

            data.end_time.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                newRoutinEndTimeSelect.appendChild(option);
            });

            data.room_no.forEach(room => {
                const option = document.createElement('option');
                option.value = room;
                option.textContent = room;
                newRoutinRoomNoInput.appendChild(option);
            });
        });

    newRoutinForm1.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedBatch = formData.get('newRoutinBatch');
        const selectedSemester = formData.get('newRoutinSemester');
        const selectedSection = formData.get('newRoutinSection');

        if (!selectedBatch || !selectedSemester || !selectedSection) {
            showWarningToast('Please select batch, semester, and section.');
            return;
        }

        try {
            const response = await fetch('../json/subjects.json');
            const data = await response.json();

            if (data.hasOwnProperty(selectedBatch) && data[selectedBatch].hasOwnProperty(selectedSemester)) {
                const subjects = data[selectedBatch][selectedSemester];

                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    newRoutinSubjectSelect.appendChild(option);
                });

                const reportBatch = document.getElementById('new-routin-report-batch');
                const reportSemester = document.getElementById('new-routin-report-semester');
                const reportSection = document.getElementById('new-routin-report-section');

                reportBatch.textContent = selectedBatch;
                reportSemester.textContent = selectedSemester;
                reportSection.textContent = selectedSection;

                newRoutinForm1.style.display = 'none';
                newRoutinForm2.style.display = 'block';
            } else {
                showErrorToast('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again later.');
        }
    });

    newRoutinForm2.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedDay = formData.get('newRoutinDay');
        const selectedSubject = formData.get('newRoutinSubject');
        const selectedTeacherId = formData.get('newRoutinTeacher');
        const selectedStartTime = formData.get('newRoutinStartTime');
        const selectedEndTime = formData.get('newRoutinEndTime');
        const selectedRoomNo = formData.get('newRoutinRoomNo');

        if (!selectedDay || !selectedSubject || !selectedTeacherId || !selectedStartTime || !selectedEndTime || !selectedRoomNo) {
            showWarningToast('Please fill in all fields.');
            return;
        }

        if (selectedEndTime <= selectedStartTime) {
            showWarningToast('End time must be greater than start time.');
            return;
        }

        try {
            const selectedTeacherOption = document.querySelector(`#newRoutinTeacher [value="${selectedTeacherId}"]`);
            const selectedTeacherName = selectedTeacherOption.dataset.teacherName;

            const newReportDay = document.getElementById('new-routin-report-day');
            const newReportSubject = document.getElementById('new-routin-report-subject');
            const newReportTeacher = document.getElementById('new-routin-report-teacher');
            const newReportStartTime = document.getElementById('new-routin-report-startTime');
            const newReportEndTime = document.getElementById('new-routin-report-endTime');
            const newReportRoomNo = document.getElementById('new-routin-report-roomNo');

            newReportDay.textContent = selectedDay;
            newReportSubject.textContent = selectedSubject;
            newReportTeacher.textContent = selectedTeacherName;
            newReportStartTime.textContent = selectedStartTime;
            newReportEndTime.textContent = selectedEndTime;
            newReportRoomNo.textContent = selectedRoomNo;

            newRoutinForm2.style.display = 'none';
            newReportDiv.style.display = 'block';
            showSuccessToast('New Routin added successfully!');
        } catch (error) {
            console.error('Error processing New Routin:', error);
            showErrorToast('Error processing New Routin. Please try again.');
        }
    });

    fetch('../json/teachers.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id;
            option.textContent = teacher.name;
            option.dataset.teacherId = teacher.id;
            option.dataset.teacherName = teacher.name;
            updateRoutinTeacherSelect.appendChild(option); 
        });
    });

    fetch('../json/routin.json')
    .then(response => response.json())
    .then(data => {
        data.start_time.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            updateRoutinStartTimeSelect.appendChild(option);
        });

        data.end_time.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            updateRoutinEndTimeSelect.appendChild(option);
        });

        data.room_no.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = room;
            updateRoutinRoomNoInput.appendChild(option);
        });
    });

    updateRoutinForm1.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedBatch = formData.get('updateRoutinBatch');
        const selectedSemester = formData.get('updateRoutinSemester');
        const selectedSection = formData.get('updateRoutinSection');
    
        if (!selectedBatch || !selectedSemester || !selectedSection) {
            showWarningToast('Please select batch, semester, and section.');
            return;
        }
    
        try {
            const response = await fetch('../json/subjects.json');
            const data = await response.json();
    
            if (data.hasOwnProperty(selectedBatch) && data[selectedBatch].hasOwnProperty(selectedSemester)) {
                const subjects = data[selectedBatch][selectedSemester];
    
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    updateRoutinSubjectSelect.appendChild(option);
                });
    
                const reportBatch = document.getElementById('update-routin-report-batch');
                const reportSemester = document.getElementById('update-routin-report-semester');
                const reportSection = document.getElementById('update-routin-report-section');
    
                reportBatch.textContent = selectedBatch;
                reportSemester.textContent = selectedSemester;
                reportSection.textContent = selectedSection;
    
                updateRoutinForm1.style.display = 'none';
                updateRoutinForm2.style.display = 'block';
            } else {
                showErrorToast('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again later.');
        }
    });
    
    updateRoutinForm2.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedDay = formData.get('updateRoutinDay');
        const selectedSubject = formData.get('updateRoutinSubject');
        const selectedTeacherId = formData.get('updateRoutinTeacher');
        const selectedStartTime = formData.get('updateRoutinStartTime');
        const selectedEndTime = formData.get('updateRoutinEndTime');
        const selectedRoomNo = formData.get('updateRoutinRoomNo');
    
        if (!selectedDay || !selectedSubject || !selectedTeacherId || !selectedStartTime || !selectedEndTime || !selectedRoomNo) {
            showWarningToast('Please fill in all fields.');
            return;
        }
    
        if (selectedEndTime <= selectedStartTime) {
            showWarningToast('End time must be greater than start time.');
            return;
        }
    
        try {
            const selectedTeacherOption = document.querySelector(`#updateRoutinTeacher [value="${selectedTeacherId}"]`);
            const selectedTeacherName = selectedTeacherOption.dataset.teacherName;
    
            const updateReportDay = document.getElementById('update-routin-report-day');
            const updateReportSubject = document.getElementById('update-routin-report-subject');
            const updateReportTeacher = document.getElementById('update-routin-report-teacher');
            const updateReportStartTime = document.getElementById('update-routin-report-startTime');
            const updateReportEndTime = document.getElementById('update-routin-report-endTime');
            const updateReportRoomNo = document.getElementById('update-routin-report-roomNo');
    
            updateReportDay.textContent = selectedDay;
            updateReportSubject.textContent = selectedSubject;
            updateReportTeacher.textContent = selectedTeacherName;
            updateReportStartTime.textContent = selectedStartTime;
            updateReportEndTime.textContent = selectedEndTime;
            updateReportRoomNo.textContent = selectedRoomNo;
    
            updateRoutinForm2.style.display = 'none';
            updateReportDiv.style.display = 'block';
            showSuccessToast('Routin updated successfully!');
        } catch (error) {
            console.error('Error processing Routin update:', error);
            showErrorToast('Error processing Routin update. Please try again.');
        }
    });

    cancelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            routinForm.style.display = 'block';
            newRoutinForm1.style.display = 'none';
            newRoutinForm2.style.display = 'none';
            updateRoutinForm1.style.display = 'none';
            updateRoutinForm2.style.display = 'none';

            newRoutinForm1.reset();
            newRoutinForm2.reset();
            updateRoutinForm1.reset();
            updateRoutinForm2.reset();
        });
    });

    newHomeButton.addEventListener('click', () => {
        location.reload();
    });

    updateHomeButton.addEventListener('click', () => {
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const manageFacultyForm = document.getElementById('manageFacultyForm');
    const addFacultyForm = document.getElementById('addFacultyForm');
    const removeFacultyForm = document.getElementById('removeFacultyForm');
    const addFacultyReport = document.querySelector('.manage-report-add');
    const removeFacultyReport = document.querySelector('.manage-report-remove');
    let facultyMap = new Map();

    const hideAllFormsAndReports = () => {
        const formsAndReports = [manageFacultyForm, addFacultyForm, removeFacultyForm, addFacultyReport, removeFacultyReport];
        formsAndReports.forEach(element => {
            element.style.display = 'none';
        });
    };

    const showFormAndHideOthers = (formToShow) => {
        hideAllFormsAndReports();
        formToShow.style.display = 'block';
    };

    document.querySelector('.op[value="addFaculty"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(addFacultyForm);
    });

    document.querySelector('.op[value="removeFaculty"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(removeFacultyForm);

        fetch('http://localhost:8080/admin/faculty/all')
            .then(response => response.json())
            .then(data => {
                facultyMap = new Map();
                data.forEach(faculty => {
                    facultyMap.set(faculty.name, faculty.mailId);
                });

                const teacherSelect = document.getElementById('teacherSelect');
                teacherSelect.innerHTML = '<option value="">Search</option>';

                facultyMap.forEach((mailId, name) => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    teacherSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching faculty data:', error));
    });

    addFacultyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const facultyName = formData.get('facultyName');
        const facultyEmail = formData.get('facultyEmail');

        const teacherData = {
            name: facultyName,
            mailId: facultyEmail
        };

        fetch('http://localhost:8080/admin/faculty', {
            method: 'POST',
            body: JSON.stringify(teacherData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                showSuccessToast('Successful Add Faculty!');
                document.getElementById('manage-report-add-name').textContent = facultyName;
                document.getElementById('manage-report-add-email').textContent = facultyEmail;
                showFormAndHideOthers(addFacultyReport);
            } else {
                showErrorToast('Failed to Add Faculty!');
            }
        }).catch(error => {
            console.error(error);
            showErrorToast('Failed to Add Faculty!');
        });
    });

    removeFacultyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const facultyName = formData.get('teacherSelect');
    
        if (facultyMap.has(facultyName)) {
            const facultyEmail = facultyMap.get(facultyName);
    
            fetch(`http://localhost:8080/admin/faculty/${facultyEmail}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Failed to Remove faculty');
                }
            }).then(data => {
                console.log('Backend Response:', data);
                document.getElementById('manage-report-add-remove').textContent = facultyName;
                document.getElementById('manage-report-remove-email').textContent = facultyEmail;
                showSuccessToast('Successful Remove Faculty!');
                showFormAndHideOthers(removeFacultyReport);
            }).catch(error => {
                console.error('Error deleting faculty:', error);
                showErrorToast('Error deleting faculty. Please try again later.');
            });
        } else {
            console.error('Faculty Email not found for selected name:', facultyName);
            showErrorToast('Faculty Email not found for selected name:');
        }
    });
    
    document.querySelector('.manage-report-add button').addEventListener('click', () => {
        location.reload();
    });

    document.querySelector('.manage-report-remove button').addEventListener('click', () => {
        location.reload();
    });

    document.querySelector('#addFacultyForm button[type="reset"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(manageFacultyForm);
        addFacultyForm.reset();
    });

    document.querySelector('#removeFacultyForm button[type="reset"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(manageFacultyForm);
        removeFacultyForm.reset();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const detailsStudentForm = document.getElementById('detailsStudentForm');

    const detailsStudentFormRollNo = document.getElementById('detailsStudentFormRollNo');
    const detailsStudentFormSection = document.getElementById('detailsStudentFormSection');

    const showForm1 = (formToShow, formToHide) => {
        formToShow.style.display = 'block';
        formToHide.style.display = 'none';
    };

    studentForm.addEventListener('submit', event => {
        event.preventDefault();
        const action = event.submitter.value;

        if (action === 'detailsStudent') {
            showForm1(detailsStudentForm, studentForm);
        } else if (action === 'addStudent') {

        } else if (action === 'updateStudent') {

        } else if (action === 'deleteStudent') {

        }
    });

    const showForm2 = (formToShow, formToHide) => {
        formToShow.style.display = 'block';
        formToHide.style.display = 'none';
    };

    detailsStudentForm.addEventListener('submit', event => {
        event.preventDefault();
        const action = event.submitter.value;

        if (action === 'rollNoStudent') {
            showForm2(detailsStudentFormRollNo, detailsStudentForm);
        } else if (action === 'sectionStudent') {
            showForm2(detailsStudentFormSection, detailsStudentForm);
        }
    });
    
});

document.addEventListener('DOMContentLoaded', () => {
    const managesubjectsForm = document.getElementById('managesubjectsForm');
    const showsubjectsForm = document.getElementById('showsubjectsForm');
    const showsubjectsReport = document.querySelector('.showsubjects-report');
    const subjectTableBody = document.getElementById('show-subjects-tableBody');
    const homeButtonShow = document.querySelector('.showsubjects-report .subjectBtn');

    const addsubjectsForm1 = document.getElementById('addsubjectsForm1');
    const addsubjectsForm2 = document.getElementById('addsubjectsForm2');
    const addsubjectsReport = document.querySelector('.addsubjects-report');
    const homeButtonAdd = document.querySelector('.addsubjects-report .subjectBtn');
    const cancelButton = document.querySelector('#addsubjectsForm2 button[type="reset"]');

    const removesubjectsForm1 = document.getElementById('removesubjectsForm1');
    const removesubjectsForm2 = document.getElementById('removesubjectsForm2');
    const removesubjectsReport = document.querySelector('.removesubjects-report');
    const homeButtonRemove = document.querySelector('.removesubjects-report .subjectBtn');
    const cancelButtonRemove = document.querySelector('#removesubjectsForm2 button[type="reset"]');

    let selectedBatchShow = '';
    let selectedSemesterShow = '';
    let selectedCode = '';
    let selectedSubject = '';
    let selectedBatchAdd = '';
    let selectedSemesterAdd = '';
    let selectedBatchRemove = '';
    let selectedSemesterRemove = '';

    document.querySelectorAll('.op').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const action = event.target.value;

            if (action === 'showsubjects') {
                managesubjectsForm.style.display = 'none';
                showsubjectsForm.style.display = 'block';
            } else if (action === 'addsubjects') {
                managesubjectsForm.style.display = 'none';
                addsubjectsForm1.style.display = 'block';
            } else if (action === 'removesubjects') {
                managesubjectsForm.style.display = 'none';
                removesubjectsForm1.style.display = 'block';
            }
        });
    });

    showsubjectsForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedBatchShow = formData.get('batch');
        selectedSemesterShow = formData.get('semester');

        try {
            const response = await fetch('../json/showsubjects.json');
            const data = await response.json();

            if (data[selectedBatchShow] && data[selectedBatchShow][selectedSemesterShow]) {
                const subjects = data[selectedBatchShow][selectedSemesterShow];
                subjectTableBody.innerHTML = '';

                subjects.forEach(subject => {
                    const row = document.createElement('tr');
                    const codeCell = document.createElement('td');
                    codeCell.textContent = subject.code;
                    row.appendChild(codeCell);

                    const nameCell = document.createElement('td');
                    nameCell.textContent = subject.name;
                    row.appendChild(nameCell);

                    subjectTableBody.appendChild(row);
                });

                showsubjectsReport.style.display = 'block';
                showsubjectsForm.style.display = 'none';

                const showsubjectsReportBatch = document.getElementById('showsubjects-reportBatch');
                const showsubjectsReportSemester = document.getElementById('showsubjects-reportSemester');
                showsubjectsReportBatch.textContent = selectedBatchShow;
                showsubjectsReportSemester.textContent = selectedSemesterShow;
            } else {
                showErrorToast('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again later.');
        }
    });

    addsubjectsForm1.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedBatchAdd = formData.get('batch');
        selectedSemesterAdd = formData.get('semester');

        if (!selectedBatchAdd || !selectedSemesterAdd) {
            showWarningToast('Please select both batch and semester.');
            return;
        }

        addsubjectsForm1.style.display = 'none';
        addsubjectsForm2.style.display = 'block';
    });

    addsubjectsForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedCode = formData.get('subject-code');
        selectedSubject = formData.get('subject');

        if (!selectedCode || !selectedSubject) {
            showWarningToast('Please enter both subject code and subject name.');
            return;
        }

        const reportBatchSpan = document.getElementById('addsubjects-reportBatch');
        const reportSemesterSpan = document.getElementById('addsubjects-reportSemester');
        const reportCodeSpan = document.getElementById('addsubjects-reportCode');
        const reportSubjectSpan = document.getElementById('addsubjects-reportSubject');

        reportBatchSpan.textContent = selectedBatchAdd;
        reportSemesterSpan.textContent = selectedSemesterAdd;
        reportCodeSpan.textContent = selectedCode;
        reportSubjectSpan.textContent = selectedSubject;

        addsubjectsForm2.style.display = 'none';
        addsubjectsReport.style.display = 'block';

        showSuccessToast('Subject added successfully!');
    });

    removesubjectsForm1.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedBatchRemove = formData.get('batch');
        selectedSemesterRemove = formData.get('semester');

        if (!selectedBatchRemove || !selectedSemesterRemove) {
            showWarningToast('Please select both batch and semester.');
            return;
        }

        try {
            const response = await fetch('../json/subjects.json');
            const data = await response.json();

            if (data[selectedBatchRemove] && data[selectedBatchRemove][selectedSemesterRemove]) {
                const subjects = data[selectedBatchRemove][selectedSemesterRemove];
                const subjectSelect = removesubjectsForm2.querySelector('#removesubjects-subject');

                if (subjectSelect) {
                    subjectSelect.innerHTML = '';

                    subjects.forEach(subject => {
                        const option = document.createElement('option');
                        option.value = subject;
                        option.textContent = subject;
                        subjectSelect.appendChild(option);
                    });

                    removesubjectsForm1.style.display = 'none';
                    removesubjectsForm2.style.display = 'block';
                } else {
                    console.error('Error: Subject select element not found.');
                    showErrorToast('Error fetching subjects. Please try again.');
                }
            } else {
                showErrorToast('No subjects found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again.');
        }
    });

    removesubjectsForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedSubject = formData.get('subject');

        if (!selectedSubject) {
            showWarningToast('Please select a subject.');
            return;
        }

        const reportBatchSpan = document.getElementById('removesubjects-reportBatch');
        const reportSemesterSpan = document.getElementById('removesubjects-reportSemester');
        const reportSubjectSpan = document.getElementById('removesubjects-reportSubject');

        reportBatchSpan.textContent = selectedBatchRemove;
        reportSemesterSpan.textContent = selectedSemesterRemove;
        reportSubjectSpan.textContent = selectedSubject;

        removesubjectsForm2.style.display = 'none';
        removesubjectsReport.style.display = 'block';

        showSuccessToast('Subject removed successfully!');
    });

    homeButtonShow.addEventListener('click', () => {
        location.reload();
    });

    homeButtonAdd.addEventListener('click', () => {
        location.reload();
    });

    homeButtonRemove.addEventListener('click', () => {
        location.reload();
    });

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        managesubjectsForm.style.display = 'block';
        addsubjectsForm1.style.display = 'none';
        addsubjectsForm2.style.display = 'none';
        addsubjectsForm1.reset();
        addsubjectsForm2.reset();
    });

    cancelButtonRemove.addEventListener('click', (event) => {
        event.preventDefault();
        managesubjectsForm.style.display = 'block';
        removesubjectsForm1.style.display = 'none';
        removesubjectsForm2.style.display = 'none';
        removesubjectsForm1.reset();
        removesubjectsForm2.reset();
    });
});
