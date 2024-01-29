// ALL THE JS JUST TO DISPLAY THE PRODUCTS AND FILTER IT 

// CONTAIN ALL THE IMAGES AND INFORMATIONS, WORK AS A DICTIONNARY ALMOST
let products = {
    data: [
        {
            productName : "Explorer GILT",
            code : "6610",
            category : "silver",
            price : "19500",
            image : "../img/Explorer-2.webp",
        },
        {
            productName : "Daytona APH Dial",
            code: "116520",
            category : "silver",
            price : "28500",
            image : "../img/Floater-8.webp",
        },
        {
            productName : "GMT Master Sultant Ruby Serti",
            code : "16713",
            category : "gold",
            price : "19500",
            image : "../img/Rolex-GMT-Master-Sultan-Ruby-Serti_-2.webp",
        },
        {
            productName : "Daytona Floater",
            code: "16520",
            category : "silver",
            price : "76000",
            image : "../img/Floater-14.webp",
        },
        {
            productName : "Daytona APH Dial",
            code : "116520",
            category : "classic",
            price : "29500",
            image : "../img/Daytona-2-3.webp",
        },
        {
            productName : "Day Date Baguette",
            code: "18048",
            category : "gold",
            price : "38000",
            image : "../img/Day-Date-Baguette-2.webp",
        },
        {
            productName : "Day Date PT",
            code : "18026",
            category : "silver",
            price : "34000",
            image : "../img/Day-Date-PT-1.webp",
        },
        {
            productName : "Explorer 8",
            code: "8",
            category : "classic",
            price : "26500",
            image : "../img/Explorer-8.jpg",
        },
        {
            productName : "Sub mariner MK2",
            code: "1680",
            category : "silver",
            price : "18500",
            image : "../img/Overall-shot-2.webp",
        },
        {
            productName : "GMT Master",
            code: "16758",
            category : "classic",
            price : "42700",
            image : "../img/Rolex-GMT-Master7.webp",
        },
        {
            productName : "Date Just Pyramid",
            code: "16018",
            category : "gold",
            price : "29100",
            image : "../img/DSC08985.webp",
        },
        {
            productName : "Day Date Ruby Baguette",
            code: "18038",
            category : "classic",
            price : "28000",
            image : "../img/Day-Date-Ruby-5.webp",
        },
    ],
};


// LOOP THROUGH THE ITEMS TO DISPLAY THE PRODUCTS
// itemsList = AN ELEMENT OF MY VAR
// products.data = ALL THE INFORMATIONS IN MY VARIABLE products
for (let itemsList of products.data){

    // TO DISPLAY AN IMAGE

    // Display item - DIV CONTAINING MULTIPLE IMG
    let displayItems = document.createElement("div");

    // PUT ITEM CATEGORY
    displayItems.classList.add("displayItems", itemsList.category, "hide");

    // IMG DIV DISPLAY - CONTAIN ONE IMG PRODUCT
    let displayImgContainer = document.createElement("div");
    displayImgContainer.classList.add("displayImgContainer");
    
    // IMG CONTAINING IMG SRC
    let putImgContainer = document.createElement("img");
    // SETTING IMG SRC=""
    putImgContainer.setAttribute("src", itemsList.image);

    // PUT THE <IMG SRC="..." IN THE DIV FOR ONE PRODUCT ONLY
    displayImgContainer.appendChild(putImgContainer);

    // PUT THE DIV CONTAINING ONE PRODUCT ONLY IN THE DIV CONTAINING MORE PRODUCTS
    displayItems.appendChild(displayImgContainer)

    // END TO DISPLAY AN IMAGE


    // TO DISPLAY TEXT


    // MAKE THE CONTAINER FOR THE TEXT
    let container = document.createElement("div");
    container.classList.add('container');

    // CREATE A H5 FOR PRODUCT PRICE
    let productPrice = document.createElement("h5")
    productPrice.innerText = itemsList.price + "$";

    // FOR PRODUCT NAME
    let productName = document.createElement("h4");
    productName.classList.add('productName');
    productName.innerText = itemsList.productName.toUpperCase();
    
    // ADD ALL THE DIV AND H5/H4 CREATED INTO THE CONTAINER
    container.appendChild(productName);
    container.appendChild(productPrice);
    
    // END DISPLAY TEXT

    // ADD THE TEXT TO THE DIV CONTAINING ONE IMAGE PRODUCT
    displayItems.appendChild(container);
    
    // ADD THE IMAGES TO THE DIV CONTAINING ALL THE PRODUCTS
    document.getElementById('productsDisplay').appendChild(displayItems);
}



// PRODUCT FILTERING
function filterProduct(value) {

    // GET THE BUTTON FILTER
    let buttons = document.querySelectorAll(".buttonContent");

    // LOOP THROUGH ALL THE BUTTON
    buttons.forEach(button => {

        // Check if value is equal innerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            // IF YES, DISPLAY THE PRODUCTS
            button.classList.add('actived')
        } else {
            // ELSE HIDE IT
            button.classList.remove('actived')
        }
    });

    // GET ALL THE PRODUCTS
    let products = document.querySelectorAll(".displayItems")

    // LOOP THROUGH ALL THE PRODUCTS CATEGORY
    products.forEach((element) => {

        // IF THE VALUE OF THE FILTER IS ALL
        if (value == "all") {

            // IF YES DISPLAY THE PRODUCTS
            element.classList.remove("hide");
        } else {

            // ELSE CHECK IF IT MATCH THE FILTER SELECTED
            if (element.classList.contains(value)) {

                // IF YES, DISPLAY THE ITEM
                element.classList.remove("hide");
            } else {
                
                // ELSE HIDE IT
                element.classList.add("hide");
            }
        }
    });
};


// SEARCH BAR BUTTON CLICK

// ON CLICK ON THE BUTTON "SEARCH"
document.getElementById('searchButton').addEventListener('click', () => {

    // GET THE CONTENT IN THE INPUT
    let searchInput = document.getElementById('searchInput').value;

    // CHECK THE PRODUCTS NAME
    let productsSearch = document.querySelectorAll('.productName');

    // TO DISPLAY THE PRODUCTS
    let cards = document.querySelectorAll('.displayItems');
    

    // LOOP THROUGH PRODUCTSSEARCH TO SHOW ONLY THE ONE MATCHING
    productsSearch.forEach((productSearch, index) => {

        // CHECK IF TEXT = SEARCH VALUE
        if (productSearch.innerText.includes(searchInput.toUpperCase())) {

            // IF TEXT WRITTEN IN SEARCH BAR MATCH AN ITEM, SHOW THE ITEM
            cards[index].classList.remove("hide");
        } else {

            // ELSE HIDE IT
            cards[index].classList.add("hide");
        }
    });
});

// DISPLAY ALL THE ITEMS ON LOADING THE PAGE FOR THE FIRST TIME
window.onload = () => {
    filterProduct("all");
}