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
            alert('Please select both batch and semester.');
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
                alert('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            alert('Error fetching subjects. Please try again later.');
        }
    });

    assignForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const section = formData.get('section');
        const subject = formData.get('subject');
        const teacherId = formData.get('teacher');

        if (!section || !subject || !teacherId) {
            alert('Please select section, subject, and teacher.');
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

            alert('Successfully assigned teacher.');
        } catch (error) {
            console.error('Error assigning teacher:', error);
            alert('Error assigning teacher. Please try again.');
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
            alert('Please select both batch and semester.');
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
                alert('Subjects not found for the selected batch and semester.');
            }
        } catch (error) {
            console.error('Error fetching subjects:', error);
            alert('Error fetching subjects. Please try again later.');
        }
    });

    substituteForm2.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const section = formData.get('section');
        const subject = formData.get('subject');
        const teacherId = formData.get('teacher');

        if (!section || !subject || !teacherId) {
            alert('Please select section, subject, and teacher.');
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

            alert('Successfully assigned substitute teacher.');
        } catch (error) {
            console.error('Error assigning substitute teacher:', error);
            alert('Error assigning substitute teacher. Please try again.');
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
                alert('Successful Add Faculty!');
                document.getElementById('manage-report-add-name').textContent = facultyName;
                document.getElementById('manage-report-add-email').textContent = facultyEmail;
                showFormAndHideOthers(addFacultyReport);
            } else {
                alert('Failed to Add Faculty!');
            }
        }).catch(error => {
            console.error(error);
            alert('Failed to Add Faculty!');
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
                    throw new Error('Failed to delete faculty');
                }
            }).then(data => {
                console.log('Backend Response:', data);
                document.getElementById('manage-report-add-remove').textContent = facultyName;
            }).catch(error => {
                console.error('Error deleting faculty:', error);
                alert('Error deleting faculty. Please try again later.');
            });
        } else {
            console.error('Faculty Email not found for selected name:', facultyName);
        }
    
        showFormAndHideOthers(removeFacultyReport);
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
