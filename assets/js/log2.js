

function toggleit(){
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.getElementById("eye-icon");
    
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
    else{
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

function toggleit2(){
    const passwordInput = document.getElementById('password-input2');
    const eyeIcon = document.getElementById("eye-icon2");
    
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
    else{
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}
let nameTag = false;

function validateName(){
    const name = document.getElementById('name-input');
    const correctTxt = name.value;
    const nLabel = document.getElementById('errorTXt');
    const validnFLenght = /.{3,}/;
    const notJustNUmbers = /^.*[a-zA-Z].*$/;
    const validSpace = /^\S+$/;

    if(!validSpace.test(correctTxt)){
        nLabel.textContent = "No white spaces!"
        
    }else if (!validnFLenght.test(correctTxt)){
        nLabel.textContent = "Name must exceed 3 characters!"
        
    }else if(!notJustNUmbers.test(correctTxt)){
        nLabel.textContent = "Name cannot be just numbers!"
        
    }else{
        nLabel.textContent = "Name"
        nameTag = true;
    }
}
setInterval(validateName, 100);
let lastName = false;

function validateLastName(){
    const name = document.getElementById('lName-input');
    const correctTxt = name.value;
    const nLabel = document.getElementById('errorTXt2');
    const validnFLenght = /.{3,}/;
    const notJustNUmbers = /^.*[a-zA-Z].*$/;
    const validSpace = /^\S+$/;

    if(!validSpace.test(correctTxt)){
        nLabel.textContent = "No white spaces!"
        
    }else if (!validnFLenght.test(correctTxt)){
        nLabel.textContent = "Name must exceed 3 characters!"
        


    }else if(!notJustNUmbers.test(correctTxt)){
        nLabel.textContent = "Name cannot be just numbers!"
        
    }else{
        nLabel.textContent = "Last name"
        lastName = true;
    }

}
setInterval(validateLastName, 100);

let emailTag = false

function validateEmail(){
    const emailInput = document.getElementById('Email-input');
    const correctEmail = emailInput.value;
    const nLabel = document.getElementById('EmailLabel');
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(?:\.com)$/;

    if(!validEmail.test(correctEmail)){
        nLabel.textContent = "Name@gmail.com"
        nLabel.style.color = '#eaaa00'
        // icon.classList.remove('fa-x');
        // icon.classList.add('fa-check');
    }else{
        nLabel.style.color = '#eaaa10'
        nLabel.textContent = "Email address"
        emailTag = true
    }

}
setInterval(validateEmail, 100);

let passwordTag = false;

function validatePassword(){
    const passwordField = document.getElementById('password-input');
    const password = passwordField.value;
    const icon = document.getElementById('dot1');
    const icon2 = document.getElementById('dot2');
    const icon3 = document.getElementById('dot3');
    const icon4 = document.getElementById('dot4');
    const txt = document.getElementById('carac')
    const txt2 = document.getElementById('carac2')
    const txt3 = document.getElementById('carac3')
    const txt4 = document.getElementById('carac4')
    
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    if(lengthRegex.test(password)){
        icon.style.color = "#eaaa00"
        txt.style.textDecoration = 'line-through'
        icon.classList.remove('fa-x');
        icon.classList.add('fa-check');
    }else{
        icon.style.color = "#54565a"
        txt.style.textDecoration = 'none'
        icon.classList.add('fa-x');
        icon.classList.remove('fa-check');
    }
    if(uppercaseRegex.test(password)){
        icon2.style.color = "#eaaa00"
        txt2.style.textDecoration = 'line-through'
        icon2.classList.remove('fa-x');
        icon2.classList.add('fa-check');
    }else{
        icon2.style.color = "#54565a"
        txt2.style.textDecoration = 'none'
        icon2.classList.add('fa-x');
        icon2.classList.remove('fa-check');
    }

    if(lowercaseRegex.test(password)){
        icon3.style.color = "#eaaa00"
        txt3.style.textDecoration = 'line-through'
        icon3.classList.remove('fa-x');
        icon3.classList.add('fa-check');
    }else{
        icon3.style.color = "#54565a"
        txt3.style.textDecoration = 'none'
        icon3.classList.add('fa-x');
        icon3.classList.remove('fa-check');
    }
    if(numberRegex.test(password)){
        icon4.style.color = "#eaaa00"
        txt4.style.textDecoration = 'line-through'
        icon4.classList.remove('fa-x');
        icon4.classList.add('fa-check');
    }else{
        icon4.style.color = "#54565a"
        txt4.style.textDecoration = 'none'
        icon4.classList.add('fa-x');
        icon4.classList.remove('fa-check');
        
    }

    if(
         lengthRegex.test(password) &&  
         uppercaseRegex.test(password)  &&
         lowercaseRegex.test(password)  &&
         numberRegex.test(password)
    ){
        passwordTag = true;
    }else{
        passwordTag = false;
    }
    
}


setInterval(validatePassword, 100);

function showbtn(){
    const disAppearingBox = document.getElementById('disBox')
    const appearingBtn = document.getElementById('appBox')
    
    if(nameTag  && lastName && emailTag  && passwordTag){
        appearingBtn.classList.add('btnVisibility');
        disAppearingBox.classList.add('dispeardo')
    }else{
        appearingBtn.classList.remove('btnVisibility');
        disAppearingBox.classList.remove('dispeardo')
    }
}

setInterval(showbtn, 100);
// console.log(disAppearingBox)
// function validatePassword(){
//     const passwordField = document.getElementById('password-input');
//     const password = passwordField.value;
//     const icon = document.getElementById('dot1');


//     const lengthRegex = /.{8,}/;
//     if(lengthRegex.test(password)){
//         icon.style.color = "#eaaa00"
//         icon.classList.remove('fa-dot-circle');
//         icon.classList.add('fa-eye-slash');
//     }else{
//         icon.style.color = "#54565a"
//         icon.classList.add('fa-dot-circle');
//         icon.classList.remove('fa-eye-slash');
//     }
// }