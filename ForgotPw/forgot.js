document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.forgot-form');
    const emailInput = document.querySelector('input[name="id"]');
    const otpInput = document.querySelector('input[name="otp"]');
    const forgotMailSection = document.querySelector('.forgot-mail');
    const checkMailSection = document.querySelector('.check-mail');
    const warningMessage = document.getElementById('warningMessage-pass');
    const verifyOTPButton = document.querySelector('.check-mail button');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const submittedEmail = emailInput.value.trim();

        forgotMailSection.style.display = 'none';
        form.style.display = 'none';

        checkMailSection.style.display = 'block';
        checkMailSection.querySelector('span').textContent = submittedEmail;
    });

    verifyOTPButton.addEventListener('click', function (event) {
        event.preventDefault();

        const submittedOTP = otpInput.value.trim();

        if (submittedOTP !== '1234') {
            warningMessage.style.display = 'block';
            setTimeout(function() {
                warningMessage.style.display = 'none';
            }, 3000);
            return;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const resetForm = document.querySelector('.reset-pass');
    const newPasswordInput = document.querySelector('input[name="psw"]');
    const confirmPasswordInput = document.querySelector('input[name="conf-psw"]');
    const resetTxtSection = document.querySelector('.rest-txt');
    const checkMailSection = document.querySelector('.check-mail');
    const warningMessage = document.getElementById('warningMessage-pass');

    resetForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const newPassword = newPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (newPassword !== confirmPassword) {
            warningMessage.style.display = 'block';
            setTimeout(function () {
                warningMessage.style.display = 'none';
            }, 3000);
            return;
        }
        resetTxtSection.style.display = 'none';
        resetForm.style.display = 'none';
        checkMailSection.style.display = 'block';
    });
});

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