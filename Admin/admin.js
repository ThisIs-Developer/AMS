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

const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeToggler(savedTheme);
}

themeToggler.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme-variables') ? 'light-theme-variables' : 'dark-theme-variables';
    body.classList.toggle('dark-theme-variables');
    body.classList.toggle('light-theme-variables');

    localStorage.setItem('theme', currentTheme);
    updateThemeToggler(currentTheme);
});

function updateThemeToggler(theme) {
    const activeSpan = theme === 'dark-theme-variables' ? themeToggler.querySelector('span:nth-child(2)') : themeToggler.querySelector('span:nth-child(1)');
    const inactiveSpan = theme === 'dark-theme-variables' ? themeToggler.querySelector('span:nth-child(1)') : themeToggler.querySelector('span:nth-child(2)');
    
    activeSpan.classList.add('active');
    inactiveSpan.classList.remove('active');
}

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

document.getElementById('rollNumber').addEventListener('input', function() {
    var rollNumberInput = this.value;
    var warningMessage = document.getElementById('warningMessage');

    if (/[a-zA-Z]/.test(rollNumberInput) || /[^a-zA-Z0-9]/.test(rollNumberInput)) {
        warningMessage.style.display = 'inline';
    } else {
        warningMessage.style.display = 'none';
    }
});

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
    const assignForm1 = document.getElementById('assignForm1');
    const assignForm2 = document.getElementById('assignForm2');
    const subjectSelect = document.getElementById('subject');
    const reportBatch = document.getElementById('reportBatch');
    const reportSemester = document.getElementById('reportSemester');
    const reportSection = document.getElementById('reportSection');
    const reportSubject = document.getElementById('reportSubject');
    const reportTeacher = document.getElementById('reportTeacher');
    const reportDiv = document.querySelector('.report');
    const homeButton = document.querySelector('.report .stdBtn');

    let selectedBatch = '';
    let selectedSemester = '';

    fetch('../json/teachers.json')
        .then(response => response.json())
        .then(data => {
            const teacherSelect = document.getElementById('teacher');
            data.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                teacherSelect.appendChild(option);
            });
        });

    assignForm1.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedBatch = formData.get('batch');
        selectedSemester = formData.get('semester');

        if (!selectedBatch || !selectedSemester) {
            showWarningToast('Please select both batch and semester.');
            return;
        }

        try {
            const response = await fetch('../json/subjects.json');
            const data = await response.json();

            if (data.hasOwnProperty(selectedBatch) && data[selectedBatch].hasOwnProperty(selectedSemester)) {
                const subjects = data[selectedBatch][selectedSemester];
                subjectSelect.innerHTML = '';

                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    subjectSelect.appendChild(option);
                });

                assignForm1.style.display = 'none';
                assignForm2.style.display = 'block';
            } else {
                showErrorToast('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again later.');
        }
    });

    assignForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const section = formData.get('section');
        const subject = formData.get('subject');
        const teacherId = formData.get('teacher');

        if (!section || !subject || !teacherId) {
            showWarningToast('Please select section, subject, and teacher.');
            return;
        }

        try {
            const teacherSelect = document.getElementById('teacher');
            const selectedTeacher = teacherSelect.querySelector(`option[value="${teacherId}"]`).textContent;

            reportBatch.textContent = selectedBatch;
            reportSemester.textContent = selectedSemester;
            reportSection.textContent = section;
            reportSubject.textContent = subject;
            reportTeacher.textContent = selectedTeacher;

            showSuccessToast('Successfully assigned teacher.');
        } catch (error) {
            console.error('Error assigning teacher:', error);
            showErrorToast('Error assigning teacher. Please try again.');
        }

        reportDiv.style.display = 'block';
        assignForm2.style.display = 'none';
    });

    homeButton.addEventListener('click', () => {
        location.reload();
    });

    const cancelButton = document.querySelector('#assignForm2 button[type="reset"]');
    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        assignForm1.style.display = 'block';
        assignForm2.style.display = 'none';
        assignForm1.reset();
        assignForm2.reset();

        reportDiv.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const substituteForm1 = document.getElementById('substituteForm1');
    const substituteForm2 = document.getElementById('substituteForm2');
    const substituteSelectTeacher = document.getElementById('substitute-teacher');
    const substituteSelectSubject = document.getElementById('substitute-subject');
    const substituteReportBatch = document.getElementById('substitute-reportBatch');
    const substituteReportSemester = document.getElementById('substitute-reportSemester');
    const substituteReportSection = document.getElementById('substitute-reportSection');
    const substituteReportSubject = document.getElementById('substitute-reportSubject');
    const substituteReportTeacher = document.getElementById('substitute-reportTeacher');
    const substituteReportDiv = document.querySelector('.substitute-report');
    const substituteHomeButton = document.querySelector('.substitute-report .substituteBtn');

    let selectedSubstituteBatch = '';
    let selectedSubstituteSemester = '';

    fetch('../json/teachers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(teacher => {
                const option = document.createElement('option');
                option.value = teacher.id;
                option.textContent = teacher.name;
                substituteSelectTeacher.appendChild(option);
            });
        });

    substituteForm1.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        selectedSubstituteBatch = formData.get('batch');
        selectedSubstituteSemester = formData.get('semester');

        if (!selectedSubstituteBatch || !selectedSubstituteSemester) {
            showWarningToast('Please select both batch and semester.');
            return;
        }

        try {
            const response = await fetch('../json/subjects.json');
            const data = await response.json();

            if (data.hasOwnProperty(selectedSubstituteBatch) && data[selectedSubstituteBatch].hasOwnProperty(selectedSubstituteSemester)) {
                const subjects = data[selectedSubstituteBatch][selectedSubstituteSemester];
                substituteSelectSubject.innerHTML = '';

                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject;
                    option.textContent = subject;
                    substituteSelectSubject.appendChild(option);
                });

                substituteForm1.style.display = 'none';
                substituteForm2.style.display = 'block';
            } else {
                showErrorToast('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            showErrorToast('Error fetching subjects. Please try again later.');
        }
    });

    substituteForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const section = formData.get('section');
        const subject = formData.get('subject');
        const teacherId = formData.get('teacher');

        if (!section || !subject || !teacherId) {
            showWarningToast('Please select section, subject, and teacher.');
            return;
        }

        try {
            const teacherSelect = document.getElementById('substitute-teacher');
            const selectedTeacher = teacherSelect.querySelector(`option[value="${teacherId}"]`).textContent;

            substituteReportBatch.textContent = selectedSubstituteBatch;
            substituteReportSemester.textContent = selectedSubstituteSemester;
            substituteReportSection.textContent = section;
            substituteReportSubject.textContent = subject;
            substituteReportTeacher.textContent = selectedTeacher;

            showSuccessToast('Successfully assigned substitute teacher.');
        } catch (error) {
            console.error('Error assigning substitute teacher:', error);
            showErrorToast('Error assigning substitute teacher. Please try again.');
        }

        substituteReportDiv.style.display = 'block';
        substituteForm2.style.display = 'none';
    });

    substituteHomeButton.addEventListener('click', () => {
        location.reload();
    });

    const substituteCancelButton = document.querySelector('#substituteForm2 button[type="reset"]');
    substituteCancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        substituteForm1.style.display = 'block';
        substituteForm2.style.display = 'none';
        substituteForm1.reset();
        substituteForm2.reset();

        substituteReportDiv.style.display = 'none';
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
    const classForm = document.getElementById('classForm');
    const classReport = document.querySelector('.class-report');
    const tableBody = document.getElementById('tableBody');
    const classBatchSpan = document.getElementById('classBatch-report');
    const classSemesterSpan = document.getElementById('classSemes-reportter');
    const classSectionSpan = document.getElementById('classSecti-reporton');

    classReport.style.display = 'none';

    classForm.addEventListener('submit', async (event) => {
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

                classReport.style.display = 'block';
                classForm.style.display = 'none';
            } else {
                showErrorToast('Class details not found for the selected batch, semester, or section.');
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
            showErrorToast('Error fetching class details. Please try again later.');
        }
    });

    const homeButton = document.querySelector('.class-report .stdBtn');
    homeButton.addEventListener('click', () => {
        location.reload();
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

document.addEventListener('DOMContentLoaded', () => {
    const manageBatchForm = document.getElementById('managebatchForm');
    const addBatchForm = document.getElementById('addBatchForm');
    const removeBatchForm = document.getElementById('removeBatchForm');
    const addBatchReport = document.querySelector('.batch-report-add');
    const removeBatchReport = document.querySelector('.batch-report-remove');

    const hideAllFormsAndReports = () => {
        const formsAndReports = [manageBatchForm, addBatchForm, removeBatchForm, addBatchReport, removeBatchReport];
        formsAndReports.forEach(element => {
            element.style.display = 'none';
        });
    };

    const showFormAndHideOthers = (formToShow) => {
        hideAllFormsAndReports();
        formToShow.style.display = 'block';
    };

    document.querySelector('.op[value="addBatch"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(addBatchForm);
    });

    document.querySelector('.op[value="removeBatch"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(removeBatchForm);

        fetch('../json/batch.json')
            .then(response => response.json())
            .then(data => {
                const batchSelect = document.getElementById('batchSelect');
                batchSelect.innerHTML = '<option value="">Search</option>';
                data.forEach(batch => {
                    const option = document.createElement('option');
                    option.value = batch.name; // Using batch name as value
                    option.textContent = batch.name;
                    batchSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching batch data:', error));
    });

    addBatchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const batchName = formData.get('batchName');

        const isSuccess = true;

        if (isSuccess) {
            showSuccessToast('Successful Add Batch!');
            document.getElementById('batch-report-add-batch').textContent = batchName;

            showFormAndHideOthers(addBatchReport);
        } else {
            showErrorToast('Failed to Add Batch!');
        }
    });

    removeBatchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const batchSelect = formData.get('teacherSelect');

        const isSuccess = true;

        if (isSuccess) {
            showSuccessToast('Successful Remove Batch!');
            document.getElementById('batch-report-add-remove').textContent = batchSelect;

            showFormAndHideOthers(removeBatchReport);
        } else {
            showErrorToast('Failed to Remove Batch!');
        }
    });

    document.querySelector('.batch-report-add button').addEventListener('click', () => {
        location.reload();
    });

    document.querySelector('.batch-report-remove button').addEventListener('click', () => {
        location.reload();
    });

    document.querySelector('#addBatchForm button[type="reset"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(manageBatchForm);
        addBatchForm.reset();
    });

    document.querySelector('#removeBatchForm button[type="reset"]').addEventListener('click', (event) => {
        event.preventDefault();
        showFormAndHideOthers(manageBatchForm);
        removeBatchForm.reset();
    });
});