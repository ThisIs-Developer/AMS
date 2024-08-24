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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.forgot-form');
    const emailInput = document.querySelector('input[name="id"]');
    const resetPassForm = document.querySelector('.reset-pass');
    const checkMailSection = document.querySelector('.check-mail');
    const loadingOverlay = document.querySelector('.loading-overlay');

    const forgotmail = document.querySelector('.forgot-mail');
    const forgotform = document.querySelector('.forgot-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();

        loadingOverlay.style.display = 'flex';

        fetch('http://localhost:8080/api/v1/auth/sendOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to: email })
        })
        .then(response => {
            loadingOverlay.style.display = 'none';

            if (response.ok) {
                forgotmail.style.display = 'none';
                forgotform.style.display = 'none';
                checkMailSection.style.display = 'block';
                resetPassForm.style.display = 'block';
            } else if (response.status === 404) {
                window.location.href = '../Register/register.html';
            } else {
                throw new Error('Failed to send email');
            }
        })
        .catch(error => {
            loadingOverlay.style.display = 'none';
            showErrorToast('Failed to send email');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const resetPassForm = document.querySelector('.reset-pass');
    const checkMailSection = document.querySelector('.check-mail');
    const otpInput = document.querySelector('input[name="otp"]');
    const newPasswordInput = document.querySelector('input[name="psw"]');
    const confirmPasswordInput = document.querySelector('input[name="conf-psw"]');
    const passwordSuccess = document.querySelector('.password-success');
    const loadingOverlay = document.querySelector('.loading-overlay');
    const emailInput = document.querySelector('input[name="id"]');

    resetPassForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const otp = otpInput.value.trim();
        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const email = emailInput.value.trim();

        if (newPassword !== confirmPassword) {
            showErrorToast('Passwords do not match');
            return;
        }
        loadingOverlay.style.display = 'flex';
        
        console.log(email+otp+newPassword);
        fetch('http://localhost:8080/api/v1/auth/verifyOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mailId: email, otp:otp , newPassword: newPassword })
        })
        .then(response => {
            loadingOverlay.style.display = 'none';

            if (response.ok) {
                checkMailSection.style.display = 'none';
                resetPassForm.style.display = 'none';
                passwordSuccess.style.display = 'block';
            } else if (response.status === 404) {
                showErrorToast('OTP does not match');
            } else if (response.status === 406) {
                showErrorToast('Timeout: Please try with a new OTP');
            } else {
                throw new Error('Failed to reset password');
            }
        })
        .catch(error => {
            loadingOverlay.style.display = 'none';
            showErrorToast('Failed to reset password');
        });
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
        const messageWidth = message.length * 12;
        toast.options.style.maxWidth = `${messageWidth}px`;
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};
