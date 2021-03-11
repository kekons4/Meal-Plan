//initialize query selectors
//navbar and links
const navbar = document.querySelector('#navbar');
const homeLink = document.querySelector('#home');
const recipesLink = document.querySelector('#recipes');
const mealsLink = document.querySelector('#meals')
const groceryLink = document.querySelector('#groceries')

//recipe filters, and recipe container
const recipeFilters = $("#recipe-filters");
const recipesContainer = $("#recipes-container");
// save button 
const saveBtn = $("#save-btn");

//initialize localStorage for pantry items and nutrition items
const pantryArr = JSON.parse(localStorage.getItem('pantryItems'));
const nutritionItems = [];

// filtered ids
let nutritionArr = [];

// recipes the user selected by the user
let userSelected = [];

//card select counter
let cardCount = 0;

//This functionality automatically generates the fetched api data from spoonacular
// to create cards to display some of the data to the user
$(function () {
    // console.log(pantryArr);
    pantryArr.forEach(recipe => {
        // create card object
        let card = $("<div></div>");
        card.addClass("recipe-card");
        card.attr("data-id", recipe.id);
        // creates title for card
        let cardTitle = $("<p></p>");
        cardTitle.text(recipe.title);
        let cardImg = $("<img>");
        cardImg.attr("src", recipe.image);

        //append title and image to card
        card.append(cardTitle);
        card.append(cardImg);

        //append card to container
        recipesContainer.append(card);
        fetch("https://api.spoonacular.com/recipes/" + recipe.id + "/information?includeNutrition=true&apiKey=3bf0573f77794a1fbc310965fd52f563")
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        nutritionItems.push(data);
                    });
                }
            })
    });
});

// Resets the recipe container to show all recipes
function resetDom() {
    recipesContainer.empty();
    pantryArr.forEach(recipe => {
        // create card object
        let card = $("<div></div>");
        card.addClass("recipe-card");
        card.attr("data-id", recipe.id);
        // creates title for card
        let cardTitle = $("<p></p>");
        cardTitle.text(recipe.title);
        let cardImg = $("<img>");
        cardImg.attr("src", recipe.image);

        //append title and image to card
        card.append(cardTitle);
        card.append(cardImg);

        //append card to container
        recipesContainer.append(card);
    });
}

// display filtered list ot DOM
function displayFilteredRecipes() {
    // console.log(nutritionArr);
    // Empty the recipes container for recipes
    recipesContainer.empty();

    // go through the pantryArr again
    pantryArr.forEach(recipe => {
        // check to see if the pantryArr elements have the same id's as the ones in the filtered list
        nutritionArr.forEach(id => {
            if (id === recipe.id) {
                // create card object
                let card = $("<div></div>");
                card.addClass("recipe-card");
                card.attr("data-id", recipe.id);
                // creates title for card
                let cardTitle = $("<p></p>");
                cardTitle.text(recipe.title);
                let cardImg = $("<img>");
                cardImg.attr("src", recipe.image);

                //append title and image to card
                card.append(cardTitle);
                card.append(cardImg);

                //append card to container
                recipesContainer.append(card);
            }
        });
    });
}

// grab api data on nutrition of each recipes, filter out based on recipe id
// and store the recipes id based on vegan, vegetarian, glutenFree, or dairyFree
function filteredRecipes(recipeIds, filter) {
    // recipeIds.forEach(id => {
    for (let i = 0; i < nutritionItems.length; i++) {
        // if vegan push id
        if (filter === "vegan") {
            if (nutritionItems[i].vegan === true) {
                nutritionArr.push(nutritionItems[i].id);
            }
            // if vegetarian push id
        } else if (filter === "vegetarian") {
            if (nutritionItems[i].vegetarian === true) {
                nutritionArr.push(nutritionItems[i].id);
            }
            // if gluten free push id
        } else if (filter === "glutenFree") {
            if (nutritionItems[i].glutenFree === true) {
                nutritionArr.push(nutritionItems[i].id);
            }
            // if dairy free push id
        } else if (filter === "dairyFree") {
            if (nutritionItems[i].dairyFree === true) {
                nutritionArr.push(nutritionItems[i].id);
            }
        }
    }
    // });
    //constantly update the DOM with new recipes
    displayFilteredRecipes();
}

//upon clicking on one of the recipe cards, it will add its id to an array called userSelected
//this will be used later for displaying alot of other information
recipesContainer.on("click", ".recipe-card", function (event) {
    //Prevents the user from adding more than 5 recipes and by accidentally adding the same image value again
    if (cardCount < 6 && $(event.target).attr("data-id") != null) {
        let selectedCard = $(event.target);
        // console.log(selectedCard);
        // if the user selected cards id is not in the userSelected arrat then add it
        // and change its vorder to green color
        if (!userSelected.includes(selectedCard.attr("data-id"))) {
            cardCount++;
            userSelected.push(selectedCard.attr("data-id"));
            selectedCard.css("border-color", "green");
            selectedCard.css("border-width", "3px");
            //else remove the id from the userSelected array and change th border to red color
        } else {
            let index = userSelected.indexOf(selectedCard.attr("data-id"));
            userSelected.splice(index, index + 1);
            selectedCard.css("border-color", "red");
            selectedCard.css("border-width", "3px");
        }
    }
});

// store userSelected array into localStorage
saveBtn.on("click", function (event) {
    if (userSelected.length !== 0) {
        localStorage.setItem("userSelectedRecipes", JSON.stringify(userSelected));
        document.location = "./grocerylist.html";
    } else {
        // THIS MUST BE CHANGED TO SOMETHING ELSE
        alert("You have not selected any recipes!")
    }
});

// Handles recipe filter logic
recipeFilters.on("change", function (event) {
    let filter = $(this).find(':selected').attr('value');
    // if the filter is selected to Recipe Filter
    if (filter === "none") {
        resetDom();
        // else change the recipes container to display only filtered recipes
    } else {
        let recipeIds = [];
        pantryArr.forEach(recipe => {
            recipeIds.push(recipe.id);
        });
        nutritionArr = [];
        // send recipe ids and filter option
        filteredRecipes(recipeIds, filter);
    }
});