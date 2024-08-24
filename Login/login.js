const loadingOverlay = document.querySelector('.loading-overlay');
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jsonData = JSON.stringify({
        userId: formData.get('id'),
        password: formData.get('psw')
    });

    loadingOverlay.style.display = 'flex';

    fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => {
            if (response.status === 403) {
                throw new Error('User ID and password do not match.');
            }
            return response.json();
        })
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
            }
            if (data.userId) {
                localStorage.setItem('userId', data.userId);
            }
            if (data.role) {
                localStorage.setItem('role', data.role);
                // if (data.role === 'STUDENT') {

                //     window.location.href = '../Student/student.html';
                // } 
                if (data.role === 'STUDENT') {
                    const userId = localStorage.getItem('userId');
                    if (userId) {
                        console.log("hello");
                        const apiUrl = `http://localhost:8080/student/profile/collegeId?collegeId=${userId}`; // Added http:// to the URL
                        fetch(apiUrl, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${data.access_token}`
                            }
                        })
                            .then(response => response.json())
                            .then(profileData => {
                                console.log('Profile Data:', profileData);
                                const jsonString = encodeURIComponent(JSON.stringify(profileData));
                                window.location.href = `../Student/student.html?data=${jsonString}`;
                            })


                            .catch(error => {
                                console.error('Error:', error);
                                // Handle errors
                            });
                    }
                }

                else if (data.role === 'TEACHER') {
                    window.location.href = '../Teacher/teacher.html';
                } else if (data.role === 'ADMIN') {
                    window.location.href = '../Admin/admin.html';
                }
            }
        })
        .catch((error) => {

            loadingOverlay.style.display = 'none';
            if (error.message === 'User ID and password do not match.') {
                showErrorToast(error.message);
            }
        });
});

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
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};

function togglePasswordVisibility(inputName) {
    const inputField = document.querySelector(`input[name=${inputName}]`);
    const eyeIcon = inputField.nextElementSibling.querySelector('i');

    if (inputField.type === 'password') {
        inputField.type = 'text';
        eyeIcon.textContent = 'visibility_off';
    } else {
        inputField.type = 'password';
        eyeIcon.textContent = 'visibility';
    }
}