document.addEventListener('DOMContentLoaded', () => {
    const studentDetailsUrl = 'student section.json';

    fetch(studentDetailsUrl)
        .then(response => response.json())
        .then(data => {
            const students = data.students;

            const tableBody = document.querySelector('#data-table tbody');

            students.forEach(student => {
                const row = document.createElement('tr');

                const collegeIdCell = document.createElement('td');
                collegeIdCell.textContent = student.student.id;
                row.appendChild(collegeIdCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = student.student.name;
                row.appendChild(nameCell);

                const rollNoCell = document.createElement('td');
                rollNoCell.textContent = student.student.rollNo;
                row.appendChild(rollNoCell);

                const registrationNoCell = document.createElement('td');
                registrationNoCell.textContent = student.student['registration no'];
                row.appendChild(registrationNoCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = student['personal details'].contact.Email;
                row.appendChild(emailCell);

                const phoneNoCell = document.createElement('td');
                phoneNoCell.textContent = student['personal details'].contact['Mobile No'];
                row.appendChild(phoneNoCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching student details:', error));
});



document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});