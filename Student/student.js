document.getElementById('Personal').addEventListener('click', showOnlyPersonalDetails);
document.getElementById('Guardian').addEventListener('click', showOnlyGuardianDetails);
document.getElementById('Semester_Results').addEventListener('click', showOnlySemesterResults);

document.getElementById('attendence-menu').addEventListener('click',showOnlyAttendence);
document.getElementById('dashboard-menu').addEventListener('click',showDashboard);
// const dashboard=document.querySelector('.dashboard');

document.getElementById('sem-form-submit').addEventListener('click',showTable);

function showTable(){



    document.querySelector('.sem-submit').style.display ='none';
    document.querySelector('.dashboard').style.display ='none';



    document.querySelector('#table-container').style.display ='flex';
}

function showOnlyAttendence(){
    document.querySelector('.sem-submit').style.display ='flex';
    document.querySelector('.dashboard').style.display ='none';
}

function showDashboard(){
    document.querySelector('.sem-submit').style.display ='none';
    document.querySelector('.dashboard').style.display ='flex';
}




function resetButtonColors() {
    const buttons = document.querySelectorAll('.dashboard-btn');
    buttons.forEach(button => {
        if (button.id !== 'Personal' && button.id !== 'Guardian' && button.id !== 'Semester_Results') {
            button.style.backgroundColor = 'initial'; // Reset color to initial state
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

    // Change background color of active button
    document.getElementById('Personal').style.backgroundColor = '#28a745';
    document.getElementById('Guardian').style.backgroundColor = ''; // Reset other buttons
    document.getElementById('Semester_Results').style.backgroundColor = ''; // Reset other buttons
}

function showOnlyGuardianDetails() {
    hideAllDashboardContent();
    document.getElementById('guardian-det').style.display = 'flex';


  // Change background color of active button
  document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)'; // Reset other buttons
  document.getElementById('Guardian').style.backgroundColor = '#28a745';
  document.getElementById('Semester_Results').style.backgroundColor = ''; // Reset other buttons
    
}

function showOnlySemesterResults() {
    hideAllDashboardContent();
    document.getElementById('sem-result').style.display = 'flex';



    // Change background color of active button
    document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)'; // Reset other buttons
    document.getElementById('Guardian').style.backgroundColor = ''; // Reset other buttons
    document.getElementById('Semester_Results').style.backgroundColor = '#28a745';
}






//-------------------- dark mode-------------------

const themeToggler=document.querySelector('#mode');
themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');
})

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