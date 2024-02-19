let firstNameInput = document.querySelector('#firstName');
let emailInput = document.querySelector('#email');
let messageInput = document.querySelector('#message');
let success = document.querySelector('#success');
let err = document.querySelectorAll('.err');


function validateForm(){

    clearMessage();
    let errFlag = false;
    if (firstNameInput.value.length < 1){
        err[0].innerText = "First name cannot be blank";
        firstNameInput.classList.add("err-border");
        errFlag = true;
    }
    if (!checkName(firstNameInput.value)){
        err[0].innerText = "First name is invalid format !";
        firstNameInput.classList.add("err-border");
        errFlag = true;
    }
    if (!checkEmail(emailInput.value)) {
        err[1].innerText = "Invalid email address.";
        emailInput.classList.add("err-border");
        errFlag = true;
    }
    if (emailInput.value.length < 1) {
        err[1].innerText = "Email is empty.";
        emailInput.classList.add("err-border");
        errFlag = true;
    }
    if (messageInput.value.length < 1) {
        err[2].innerText = "Please enter a message.";
        messageInput.classList.add("err-border");
        errFlag = true;
    }
    if (!errFlag) {
        success.innerText = "Message sent !";
    }
}

function clearMessage() {

    //DELETE THE CONTENT OF ERROR MESSAGES
    for(let i = 0; i < err.length; i++) {
        err[i].innerText = "";
    }

    // MAKE IT EMPTY
    success.innerText = "";

    //DELETE THE CONTENT OF THE ERROR MESSAGES
    firstNameInput.classList.remove("err-border");
    emailInput.classList.remove("err-border");
    messageInput.classList.remove("err-border");
}



function checkPhone(phone) {
    let phonePattern = /^\+?\d{8,12}$/;
    return (phonePattern.test(phone));
}

function checkEmail(email) {
    let emailPattern = /^[a-zA-Z0-9]{1,15}@[a-zA-Z0-9]{1,8}\.[a-zA-Z]{2,3}$/;
    return (emailPattern.test(email));

}

function checkName(name){
    let namePattern = /^[A-Za-z\s]*$/;
    return (namePattern.test(name));
}

window.onload = () => {
    firstNameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}