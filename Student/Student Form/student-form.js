const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

document.addEventListener('DOMContentLoaded', () => {

  const cancelButton = document.querySelectorAll('.btn-cancel');

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../../Admin/admin.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cancelButton = document.querySelector('.btn-cancel');
  const themeToggler = document.querySelector('.theme-toggler');

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '../../Admin/admin.html';
  });

  themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
  });
});



// document.addEventListener('DOMContentLoaded', function() {
//   // Handle form submission
//   document.getElementById('submitBtn').addEventListener('click', function(event) {
//       event.preventDefault();

//       const jsonData = {
//           collegeId: document.getElementById('clgID').value,
//           educationalDetails: {
//               collegeId: document.getElementById('clgID').value,
//               firstName: document.getElementById('first-name').value,
//               lastName: document.getElementById('last-name').value,
//               batch: document.getElementById('batch').value,
//               department: document.getElementById('dept').value,
//               rollNo: document.getElementById('roll').value,
//               regNo: document.getElementById('reg').value,
//               regular: document.getElementById('regular').value,
//               sem: document.getElementById('sem').value,
//               section: document.getElementById('sec').value
//           },
//           personalInformation: {
//               collegeId: document.getElementById('clgID').value,
//               mobileNo: document.getElementById('p-phone').value,
//               email: document.getElementById('p-email').value,
//               bloodGroup: document.getElementById('blood-group').value,
//               dob: document.getElementById('dob').value
//           },
//           currentContact: {
//               collegeId: document.getElementById('clgID').value,
//               mobileNo: document.getElementById('co-phone').value,
//               email: document.getElementById('co-email').value
//           },
//           currentCoOrdinate: {
//               collegeId: document.getElementById('clgID').value,
//               presentAddress: document.getElementById('co-add').value,
//               presentCity: document.getElementById('co-city').value,
//               presentState: document.getElementById('co-state').value,
//               presentPin: document.getElementById('co-pin').value
//           },
//           addressInformation: {
//               collegeId: document.getElementById('clgID').value,
//               presentAddress: document.getElementById('present-add').value,
//               presentCity: document.getElementById('present-city').value,
//               presentState: document.getElementById('present-state').value,
//               presentPin: document.getElementById('present-pin').value,
//               permanentAddress: document.getElementById('permanent-add').value,
//               permanentCity: document.getElementById('permanent-city').value,
//               permanentState: document.getElementById('permanent-state').value,
//               permanentPin: document.getElementById('permanent-pin').value
//           },
//           guardianDetails: {
//               collegeId: document.getElementById('clgID').value,
//               firstName: document.getElementById('g-first-name').value,
//               lastName: document.getElementById('g-last-name').value,
//               mobileNo: document.getElementById('g-phone').value,
//               email: document.getElementById('g-email').value,
//               presentAddress: document.getElementById('g-add').value,
//               presentCity: document.getElementById('g-city').value,
//               presentState: document.getElementById('g-state').value,
//               presentPin: document.getElementById('g-pin').value
//           },
//           marks: {
//               collegeId: document.getElementById('clgID').value,
//               matricPercentage: document.getElementById('marks-10').value,
//               hsPercentage: document.getElementById('marks-12').value,
//               diplomaPercentage: document.getElementById('marks-diploma').value,
//               englishTotal: document.getElementById('full-marks-eng').value, // Assuming fixed value
//               englishObtained: document.getElementById('marks-eng').value,
//               physicsTotal:  document.getElementById('full-marks-phy').value, // Assuming fixed value
//               physicsObtained: document.getElementById('marks-phy').value,
//               chemistryTotal:  document.getElementById('full-marks-chem').value, // Assuming fixed value
//               chemistryObtained: document.getElementById('marks-chem').value,
//               mathTotal:  document.getElementById('full-marks-math').value, // Assuming fixed value
//               mathObtained: document.getElementById('marks-math').value
//           },
//           semesterMarks: {
//               collegeId: document.getElementById('clgID').value,
//               sem1: document.getElementById('sem-1').value,
//               sem2: document.getElementById('sem-2').value,
//               sem3: document.getElementById('sem-3').value,
//               sem4: document.getElementById('sem-4').value,
//               sem5: document.getElementById('sem-5').value,
//               sem6: document.getElementById('sem-6').value,
//               sem7: document.getElementById('sem-7').value,
//               sem8: document.getElementById('sem-8').value
//           }
//       };

//       console.log(JSON.stringify(jsonData, null, 2));
//   });
// });




// const accessToken = localStorage.getItem('access_token');

//         // Backend API URL
//         const apiUrl = 'localhost:8080/student/admin';

//         // Send POST request with JSON data and access token
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`
//             },
//             body: JSON.stringify(jsonData, null, 2)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Response:', data);
//             // Handle response data as needed
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Handle errors
//         });









// document.addEventListener('DOMContentLoaded', function() {
//   // Handle form submission
//   document.getElementById('submitBtn').addEventListener('click', function(event) {
//       event.preventDefault();

//       const jsonData = {
//           collegeId: document.getElementById('clgID').value,
//           educationalDetails: {
//               firstName: document.getElementById('first-name').value,
//               lastName: document.getElementById('last-name').value,
//               batch: document.getElementById('batch').value,
//               department: document.getElementById('dept').value,
//               rollNo: document.getElementById('roll').value,
//               regNo: document.getElementById('reg').value,
//               regular: document.getElementById('regular').value,
//               sem: document.getElementById('sem').value,
//               section: document.getElementById('sec').value
//           },
//           personalInformation: {
//               mobileNo: document.getElementById('p-phone').value,
//               email: document.getElementById('p-email').value,
//               bloodGroup: document.getElementById('blood-group').value,
//               dob: document.getElementById('dob').value
//           },
//           currentContact: {
//               mobileNo: document.getElementById('co-phone').value,
//               email: document.getElementById('co-email').value
//           },
//           currentCoOrdinate: {
//               presentAddress: document.getElementById('co-add').value,
//               presentCity: document.getElementById('co-city').value,
//               presentState: document.getElementById('co-state').value,
//               presentPin: document.getElementById('co-pin').value
//           },
//           addressInformation: {
//               presentAddress: document.getElementById('present-add').value,
//               presentCity: document.getElementById('present-city').value,
//               presentState: document.getElementById('present-state').value,
//               presentPin: document.getElementById('present-pin').value,
//               permanentAddress: document.getElementById('permanent-add').value,
//               permanentCity: document.getElementById('permanent-city').value,
//               permanentState: document.getElementById('permanent-state').value,
//               permanentPin: document.getElementById('permanent-pin').value
//           },
//           guardianDetails: {
//               firstName: document.getElementById('g-first-name').value,
//               lastName: document.getElementById('g-last-name').value,
//               mobileNo: document.getElementById('g-phone').value,
//               email: document.getElementById('g-email').value,
//               presentAddress: document.getElementById('g-add').value,
//               presentCity: document.getElementById('g-city').value,
//               presentState: document.getElementById('g-state').value,
//               presentPin: document.getElementById('g-pin').value
//           },
//           marks: {
//               matricPercentage: document.getElementById('marks-10').value,
//               hsPercentage: document.getElementById('marks-12').value,
//               diplomaPercentage: document.getElementById('marks-diploma').value,
//               englishTotal: '100', // Assuming fixed value
//               englishObtained: document.getElementById('marks-eng').value,
//               physicsTotal: '100', // Assuming fixed value
//               physicsObtained: document.getElementById('marks-phy').value,
//               chemistryTotal: '100', // Assuming fixed value
//               chemistryObtained: document.getElementById('marks-chem').value,
//               mathTotal: '100', // Assuming fixed value
//               mathObtained: document.getElementById('marks-math').value
//           },
//           semesterMarks: {
//               sem1: document.getElementById('sem-1').value,
//               sem2: document.getElementById('sem-2').value,
//               sem3: document.getElementById('sem-3').value,
//               sem4: document.getElementById('sem-4').value,
//               sem5: document.getElementById('sem-5').value,
//               sem6: document.getElementById('sem-6').value,
//               sem7: document.getElementById('sem-7').value,
//               sem8: document.getElementById('sem-8').value
//           }
//       };

//       console.log(JSON.stringify(jsonData, null, 2));

//       const accessToken = localStorage.getItem('access_token');

//       // Backend API URL
//       const apiUrl = 'http://localhost:8080/student/admin';

//       // Send POST request with JSON data and access token
//       fetch(apiUrl, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`
//           },
//           body: JSON.stringify(jsonData, null, 2)
//       })
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           console.log('Response:', data);
//           // Handle response data as needed
//       })
//       .catch(error => {
//           console.error('Error:', error);
//           // Handle errors
//       });
//   });
// });













document.addEventListener('DOMContentLoaded', function () {
  // Handle form submission
  document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();

    const jsonData = {
      collegeId: document.getElementById('clgID').value,
      educationalDetails: {
        collegeId: document.getElementById('clgID').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        batch: document.getElementById('batch').value,
        department: document.getElementById('dept').value,
        rollNo: document.getElementById('roll').value,
        regNo: document.getElementById('reg').value,
        regular: document.getElementById('regular').value,
        sem: document.getElementById('sem').value,
        section: document.getElementById('sec').value
      },
      personalInformation: {
        collegeId: document.getElementById('clgID').value,
        mobileNo: document.getElementById('p-phone').value,
        email: document.getElementById('p-email').value,
        bloodGroup: document.getElementById('blood-group').value,
        dob: document.getElementById('dob').value
      },
      currentContact: {
        collegeId: document.getElementById('clgID').value,
        mobileNo: document.getElementById('co-phone').value,
        email: document.getElementById('co-email').value
      },
      currentCoOrdinate: {
        collegeId: document.getElementById('clgID').value,
        presentAddress: document.getElementById('co-add').value,
        presentCity: document.getElementById('co-city').value,
        presentState: document.getElementById('co-state').value,
        presentPin: document.getElementById('co-pin').value
      },
      addressInformation: {
        collegeId: document.getElementById('clgID').value,
        presentAddress: document.getElementById('present-add').value,
        presentCity: document.getElementById('present-city').value,
        presentState: document.getElementById('present-state').value,
        presentPin: document.getElementById('present-pin').value,
        permanentAddress: document.getElementById('permanent-add').value,
        permanentCity: document.getElementById('permanent-city').value,
        permanentState: document.getElementById('permanent-state').value,
        permanentPin: document.getElementById('permanent-pin').value
      },
      guardianDetails: {
        collegeId: document.getElementById('clgID').value,
        firstName: document.getElementById('g-first-name').value,
        lastName: document.getElementById('g-last-name').value,
        mobileNo: document.getElementById('g-phone').value,
        email: document.getElementById('g-email').value,
        presentAddress: document.getElementById('g-add').value,
        presentCity: document.getElementById('g-city').value,
        presentState: document.getElementById('g-state').value,
        presentPin: document.getElementById('g-pin').value
      },
      marks: {
        collegeId: document.getElementById('clgID').value,
        matricPercentage: document.getElementById('marks-10').value,
        hsPercentage: document.getElementById('marks-12').value,
        diplomaPercentage: document.getElementById('marks-diploma').value,
        englishTotal: document.getElementById('full-marks-eng').value, // Assuming fixed value
        englishObtained: document.getElementById('marks-eng').value,
        physicsTotal: document.getElementById('full-marks-phy').value, // Assuming fixed value
        physicsObtained: document.getElementById('marks-phy').value,
        chemistryTotal: document.getElementById('full-marks-chem').value, // Assuming fixed value
        chemistryObtained: document.getElementById('marks-chem').value,
        mathTotal: document.getElementById('full-marks-math').value, // Assuming fixed value
        mathObtained: document.getElementById('marks-math').value
      },
      semesterMarks: {
        collegeId: document.getElementById('clgID').value,
        sem1: document.getElementById('sem-1').value,
        sem2: document.getElementById('sem-2').value,
        sem3: document.getElementById('sem-3').value,
        sem4: document.getElementById('sem-4').value,
        sem5: document.getElementById('sem-5').value,
        sem6: document.getElementById('sem-6').value,
        sem7: document.getElementById('sem-7').value,
        sem8: document.getElementById('sem-8').value
      }
    };

    // console.log(JSON.stringify(jsonData, null, 2));

    const accessToken = localStorage.getItem('access_token');

    // Backend API URL
    const apiUrl = 'http://localhost:8080/student/admin';

    // Send POST request with JSON data and access token
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(jsonData, null, 2)
    })
      .then(response => {
        if (response.status === 409) {
          alert('CONFLICT - Already exists');
        } else if (response.status === 201) {
          alert('CREATED - Successfully added');
        } else if (response.status === 500) {
          alert('INTERNAL_SERVER_ERROR - Server error');
        } else {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log('Response:', data);
        // Handle response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });

  });
});
