// DISPLAY THE WATCH

// VARIABLE CONTAINING IMAGES FOR THE DISPLAY OF 6 IMAGES
let displayIMG = [
    "../img/dbz_M.png",
    "../img/freezer_montre.png",
    "../img/sangoku.png",
    "../img/dbz_watch.png",
    "../img/tortuegeniale_montre.png",
    "../img/shenlong_watch.png"
];

// FUNCTION THAT PUT THE WATCH DISPLAY
// (watch) is an INTEGER, position in my variable displayIMG
function displayDBZ(watch) {
    // GET THE ELEMENT IMG TO REPLACE THE SRC
    let selectDiv = document.getElementById('displayDBZ');
    // <img src=" displayIMG[watch]"> REPLACE BY THE POSITION IN MY VARIABLE"
    selectDiv.src = displayIMG[watch];
}

// GET THE ELEMENT CLICKED ON TO DISPLAY THE CORRESPONDING WATCH
document.getElementById('boo').addEventListener("click", function() {displayDBZ(0);});
document.getElementById('freezer').addEventListener("click", function() {displayDBZ(1);});
document.getElementById('sangoku').addEventListener("click", function() {displayDBZ(2);});
document.getElementById('sangokuKid').addEventListener("click", function() {displayDBZ(3);});
document.getElementById('tortuegeniale').addEventListener("click", function() {displayDBZ(4);});
document.getElementById('shenlong').addEventListener("click", function() {displayDBZ(5);});

// DISPLAY A WATCH BY DEFAULT
displayDBZ(4);

// MODAL PART / POP UP "ADDED TO CART"

// GET THE BUTTON CONTAINING THE TARGET
const openModalButtons = document.querySelectorAll('[data-modal-target]');
// GET THE CLOSE BUTTON
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// OVERLAY SET
const overlay = document.getElementById('overlayDBZ');

// WHEN YOU CLICK ON BUTTON (IN CASE YOU HAVE MORE THAN ONE)
openModalButtons.forEach(button => {
    // CHECK WHEN YOU CLICK ON THE CURRENT BUTTON
    button.addEventListener("click", () =>{
        // SET A CONST TO THE BUTTON AND WHAT IT SELECT
        const modal = document.querySelector(button.dataset.modalTarget);
        openPopup(modal);
    })
})

// SAME THING BUT CLOSED
closeModalButtons.forEach(button => {
    button.addEventListener("click", () =>{
        modal = button.closest('.popup');
        closePopup(modal);
    })
})

// CHECK ON THE OVERLAY IF I CLICK ON IT AND CLOSE IT
overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll('.popup.active');
    modals.forEach(modals =>{
        closePopup(modals);
    })
})

// OPEN THE POP UP WINDOW AND SHOW IT
function openPopup(modal) {
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
}

// CLOSE THE POP UP WINDOW
function closePopup(modal) {
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
