document.getElementById('Personal').addEventListener('click', showOnlyPersonalDetails);
document.getElementById('Guardian').addEventListener('click', showOnlyGuardianDetails);
document.getElementById('Semester_Results').addEventListener('click', showOnlySemesterResults);

document.getElementById('attendence').addEventListener('click',showOnlyAttendence);
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
    document.getElementById('Personal').style.backgroundColor = '#45d6a6';
    document.getElementById('Guardian').style.backgroundColor = ''; // Reset other buttons
    document.getElementById('Semester_Results').style.backgroundColor = ''; // Reset other buttons
}

function showOnlyGuardianDetails() {
    hideAllDashboardContent();
    document.getElementById('guardian-det').style.display = 'flex';


  // Change background color of active button
  document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)'; // Reset other buttons
  document.getElementById('Guardian').style.backgroundColor = '#45d6a6';
  document.getElementById('Semester_Results').style.backgroundColor = ''; // Reset other buttons
    
}

function showOnlySemesterResults() {
    hideAllDashboardContent();
    document.getElementById('sem-result').style.display = 'flex';



    // Change background color of active button
    document.getElementById('Personal').style.backgroundColor = 'var(--color-primary)'; // Reset other buttons
    document.getElementById('Guardian').style.backgroundColor = ''; // Reset other buttons
    document.getElementById('Semester_Results').style.backgroundColor = '#45d6a6';
}






//-------------------- dark mode-------------------

const themeToggler=document.querySelector('#mode');
themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables');
})