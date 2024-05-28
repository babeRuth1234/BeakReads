$("#add__user").submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    let successMessage = 'You have been registered successfully!';
    let errorMessage = 'Registration failed. Please check your details and try again.';

    // Perform your form validation and submission logic here

    let isSuccess = /* Your condition for success */ true;

    if (isSuccess) {
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: successMessage,
            customClass: {
                title: 'regSuxtex',
                content: 'regCont',
                confirmButton: 'regSubtn',
            },
            style: {
                confirmButtonColor: 'var(--hover)',
                confirmButtonBackground: 'var(--tcolor)',
            },
        }).then(() => {
            // Manually trigger the form submission after the SweetAlert
            document.getElementById("add__user").submit();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: errorMessage,
            customClass: {
                title: 'regSuxtex',
                content: 'regCont',
                confirmButton: 'regSubtn',
            },
            style: {
                confirmButtonColor: 'var(--hover)',
                confirmButtonBackground: 'var(--tcolor)',
            },
        });
    }
    return true; // Allow the form to proceed with its default action
});
