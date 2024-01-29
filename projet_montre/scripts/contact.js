// JS FOR THE CONTACT FORM

// GET DATA

let firstNameInput = document.querySelector('#firstName');
let lastNameInput = document.querySelector('#lastName');
let phoneInput = document.querySelector('#number')
let emailInput = document.querySelector('#email');
let messageInput = document.querySelector('#message');
let success = document.querySelector('#success');
let err = document.querySelectorAll('.err');

function validateForm(){

    clearMessage();

    // VARIABLE TO DISPLAY AND CHECK IF FORM IS COMPLETE AND CORRECT FORMAT
    let errFlag = false;

    //CHECK INPUT FIRST NAME NOT EMPTY
    if (firstNameInput.value.length < 1){
        err[0].innerText = "First name cannot be blank";
        firstNameInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT FIRST NAME ONLY STRING AND SPACE
    if (!checkName(firstNameInput.value)){
        err[0].innerText = "First name is invalid format !";
        firstNameInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT LAST NAME NOT EMPTY
    if (lastNameInput.value.length < 1) {
        err[1].innerText = "Last name cannot be blank";
        lastNameInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT LAST NAME ONLY STRING AND SPACE
    if (!checkName(lastNameInput.value)) {
        err[1].innerText = "Last name is invalid format !";
        lastNameInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT PHONE FORMAT IS VALID
    if (!checkPhone(phoneInput.value)) {
        err[2].innerText = "Invalid phone number.";
        phoneInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT PHONE IS NOT EMPTY
    if (phoneInput.value.length < 1) {
        err[2].innerText = "Phone number is empty.";
        phoneInput.classList.add("err-border");
        errFlag = true;
    }

    // CHECK INPUT MAIL IS CORRECT PATTERN
    if (!checkEmail(emailInput.value)) {
        err[3].innerText = "Invalid email address.";
        emailInput.classList.add("err-border");
        errFlag = true;
    }
    
    // CHECK INPUT EMAIL IS NOT EMPTY
    if (emailInput.value.length < 1) {
        err[3].innerText = "Email is empty.";
        emailInput.classList.add("err-border");
        errFlag = true;
    }
    
    // CHECK MESSAGE NOT EMPTY
    if (messageInput.value.length < 1) {
        err[4].innerText = "Please enter a message.";
        messageInput.classList.add("err-border");
        errFlag = true;
    }

    // MESSAGE SUCCESSFULLY SENT IF ERR VARIABLE IS FALSE
    // IF ERR VARIABLE IS TRUE, THE FORM IS NOT CORRECT
    // if (errFlag == false)
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
    lastNameInput.classList.remove("err-border");
    phoneInput.classList.remove("err-border");
    emailInput.classList.remove("err-border");
    messageInput.classList.remove("err-border");
}


// REGEX : STARTING A PATTERN IS WITH AN OPENING AND CLOSING SLASH
// ^ : MEANS THE BEGINNING OF THE STRING
// +? : MEANS MIGHT CONTAIN A + AT THE BEGINNING OF THE STRING
// $ : END OF THE STRING

// RegEx pattern for phone : 
// CHECK IF THERE IS A + (DIFFERENT COUNTRY)
// d : CHECK IF IT IS ONLY NUMBER
function checkPhone(phone) {
    let phonePattern = /^\+?\d{8,12}$/;
    return (phonePattern.test(phone));
}

// RegEx pattern for email :
// [a-zA-Z0-9]{1,15} : CHECK IF THE PART BEFORE @ IS A STRING OF NUMBER OR LETTERS OF MAXIMUM 15 CHARACTERS, UPPER OR LOWER CASE
// [a-zA-Z0-9]{1,8} : CHECK IF AFTER THE @ THERE IS ONLY STRING AND ONE TO EIGHT CHARACTERS
// [a-zA-Z]{2,3} : CHECK IF IT IS A COUNTRY CODE OR A .NET .COM
function checkEmail(email) {
    let emailPattern = /^[a-zA-Z0-9]{1,15}@[a-zA-Z0-9]{1,8}\.[a-zA-Z]{2,3}$/;
    return (emailPattern.test(email));

}


// RegEx pattern for name :
// [A-Za-z\s] : CHECK FOR ALPHABET LOWER OR UPPER CASE AND SPACES
function checkName(name){
    let namePattern = /^[A-Za-z\s]*$/;
    return (namePattern.test(name));
}


// JS TO CHANGE THE MAP

let mapping = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d353516.71488906606!2d5.780884568025547!3d46.193556776450684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b2eaaa9dd11%3A0x3d8d2ce295887967!2sRolex%20SA!5e0!3m2!1sen!2sfr!4v1686528733395!5m2!1sen!2sfr",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19823.695530285295!2d2.302670725462148!3d48.85231834347807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d765f781e3%3A0xaf3056b06035f194!2sBoutique%20Rolex%20Lassaussois%20-%20D%C3%A9taillant%20Officiel!5e0!3m2!1sen!2sfr!4v1686529275318!5m2!1sen!2sfr",
];



function displayMap (mapPosition) {

    // GET THE ELEMENT CONTAINING WHERE THE ADRESS SHOULD BE
    let mapDisplay = document.getElementById('address');
    // CHANGE THE <iframe src=" mapping[map] "> TO WHAT IS CONTAIN IN MAPPING
    mapDisplay.src = mapping[mapPosition];
}

// GET THE EVENT ON THE DIV, IF CLICKED ON ONE, IT DISPLAY WHAT IS ASKED
document.getElementById("switzerland").addEventListener("click", function(){displayMap(0);});
document.getElementById("france").addEventListener("click", function(){displayMap(1);});

// PUT A MAP BY DEFAULT
displayMap(0);
