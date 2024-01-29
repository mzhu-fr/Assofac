let imgGallery = [
    "../img/slider0.png",
    "../img/slider1.png",
    "../img/slider2.png"
];

let introHeader = [
    "Azure Collection",
    "Verdant Collection",
    "Sunset Collection"
];

let introText = [
    "Immerse yourself in the tranquil serenity of the ocean with our azure-themed timepiece, featuring a deep blue dial reminiscent of calm waves, and a sleek stainless steel bracelet that captures the essence of maritime adventures.",
    "Dive into the lush beauty of nature with our verdant-themed watch, adorned with a vibrant green dial and a leaf-patterned strap, evoking the freshness of a tropical rainforest.",
    "Embrace the warmth and vibrancy of a breathtaking sunset with our sunset-themed watch, showcasing an enchanting orange dial that mirrors the hues of the horizon, complemented by a leather strap that exudes elegance and style."
];

let prevImg = imgGallery.length - 1;
let mainImg = 0;
let nextImg = 1;

let header = document.querySelector(".textIntro h2");
let paragraph = document.querySelector(".textIntro p");

let isTransitioning = false;
let slideInterval;

function loadGallery () {

    // SLIDER DESCRIPTION
    header.textContent = introHeader[mainImg];
    paragraph.textContent = introText[mainImg];


    // MIDDLE SLIDER
    let mainView = document.getElementById('slideShow');
    mainView.style.background = "url(" +  imgGallery[mainImg] + ")";
    mainView.style.backgroundPosition = "center";
    mainView.style.backgroundSize = "cover";

    // LEFT SLIDER
    let leftView = document.getElementById('slideLeft');
    leftView.style.background = "url(" +  imgGallery[prevImg] + ")";
    leftView.style.backgroundPosition = "center";
    leftView.style.backgroundSize = "cover";


    // RIGHT SLIDER
    let rightView = document.getElementById('slideRight');
    rightView.style.background = "url(" +  imgGallery[nextImg] + ")";
    rightView.style.backgroundPosition = "center";
    rightView.style.backgroundSize = "cover";

    slideInterval = setInterval(scrollRight, 5000);

    // LINK THE PRODUCT TO THE PRODUCT PAGE
    // let linkSlide = document.getElementById('linkSlide');
    // linkSlide.href = imgGallery[mainImg];
};


function scrollRight() {

    // CHECK IF CLICKED, IF YES, DO NOTHING
    if (isTransitioning) {
        return;
    }

    // SET STATEMENT TO TRUE
    isTransitioning = true;

    // CLICK ON RIGHT ARROW / SLIDER
    // CHANGE THE MAIN IMG BY THE NEXTIMG
    prevImg = mainImg;
    mainImg = nextImg;

    // CONDITION IN CASE WE ARE AT THE END OF OUR CAROUSEL OF IMG
    if (nextImg >= (imgGallery.length -1)) {
        nextImg = 0;
    } else {
        nextImg++;
    };

    // SET TRANSITIONING TO FALSE
    // SHOW THE NEXT SLIDER IN 0.5s
    setTimeout(function () {
        isTransitioning = false;
    }, 500);
    loadGallery();
    
};

function scrollLeft() {

    // CHECK IF CLICKED IF YES, DO NOTHING
    if (isTransitioning) {
        return;
    }
    // SET IT TO TRUE
    isTransitioning = true;

    // CLICK ON LEFT ARROW
    // CHANGE THE MAIN IMG BY THE PREVIMG
    nextImg = mainImg;
    mainImg = prevImg;

    // CONDITION IN CASE WE ARE AT THE BEGINNING OF OUR CAROUSEL OF IMG
    if (prevImg === 0) {
        prevImg = imgGallery.length - 1;
    }
    else {
        prevImg--;
    };

    // SET TRANSITIONING TO FALSE
    setTimeout(function () {
        isTransitioning = false;
    }, 500); 
    loadGallery();
};

document.getElementById("arrowRight").addEventListener("click", scrollRight);
document.getElementById("arrowLeft").addEventListener("click", scrollLeft);
document.getElementById("slideRight").addEventListener("click", scrollRight);
document.getElementById("slideLeft").addEventListener("click", scrollLeft);

// DISPLAY THE SLIDER 
loadGallery();



// MODAL PART / POP UP "ADDED TO CART"

// GET THE BUTTON CONTAINING THE TARGET
const openModalButtons = document.querySelectorAll('[data-modal-target]');
// GET THE CLOSE BUTTON
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// OVERLAY SET
const overlay = document.getElementById('overlayIndex');

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
