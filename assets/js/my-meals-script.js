//initialize query selectors
//navbar and links
const navbar = $('#navbar');
const homeLink = $('#home');
const recipesLink = $('#recipes');
const mealsLink = $('#meals');
const groceryLink = $('#groceries');

//recipes container
const recipeContainer = $('.recipe-card');

//buttons
const listBtn = $('#go-to-grocery-list');
const clearBtn = $('#recipe-clear');

//dynamically created
let recipeCard;
let recipeImg;
let ingredientsList;
let recipeBody;
let recipeTitle;
let recipeDirections;
let deleteBtn;

// grab the user selected recipes
const userSelectedRecipes = JSON.parse(localStorage.getItem('userSelectedRecipes'));

//grab pantryArr
const pantryArr = JSON.parse(localStorage.getItem('pantryItems'));

//API
const apiKey = "3bf0573f77794a1fbc310965fd52f563";

//get analyed directions for each userSelectedRecipe
jQuery.each(userSelectedRecipes, function (index) {
    let id = userSelectedRecipes[index];

    fetch('https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=' + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    localStorage.setItem("stepsArr", JSON.stringify(data));
                })
            } else {
                // This is for testing purposes
                alert("There was an error with API, please try again.");
            }
        });

})

//initialize steps to localStorage
const stepsArr = JSON.parse(localStorage.getItem('stepsArr')) || [];

jQuery.each(userSelectedRecipes, function (i) {
        jQuery.each(pantryArr, function (index) {
            let selectedId = userSelectedRecipes[i].toString();
            console.log(selectedId)
            let pantryId = pantryArr[index].id.toString();
            console.log(pantryId);
            if (pantryId === selectedId) {
            //title of recipe
            const titleText = pantryArr[index].title
            recipeTitle = $('<h3></h3>')
                .addClass('card-title')
                .attr('id', 'recipe-title')
                .text(titleText)

            //image at top of recipe   
            const img = pantryArr[index].image
            recipeImg = $('<img src =' + img + '>')
                .addClass('card-img-top')
                .attr('id', 'recipe-image')

            //ingredients list
            ingredientsList = $('<ul></ul>')
                .addClass('list-group')
                .attr('id', 'ingredients-list')

            const ingredients = pantryArr[index].usedIngredients

            jQuery.each(ingredients, function (n) {
                const liText = ingredients[n].original;
                const li = $('<li></li>')
                    .addClass('list-group-item')
                    .text(liText)
                ingredientsList.append(li)
            })

            //deleteBtn
            deleteBtn = $('<button></button>')
                .addClass('btn', 'btn-danger')
                .text('X')

            //recipeBody containing title, ingredients, directions and deleteBtn
            recipeBody = $('<div></div>')
                .addClass('card-body')
                .attr('id', 'recipe-body')
                .append(recipeTitle, ingredientsList, deleteBtn)

            //card containing recipe
            recipeCard = $('<div></div>')
                .addClass('card')
                .attr('id', 'recipe-card')
                .append(recipeImg, recipeBody)

            //append to recipeContainer
            recipeContainer.append(recipeCard);
        };
        })
})

//recipe directions
jQuery.each(stepsArr, function (index) {
    const steps = stepsArr[index].steps;

    jQuery.each(steps, function (i) {
        recipeDirections = $('<p></p>')
            .addClass('card-text')
            .text(steps[i].number + ': ' + steps[i].step)

        $('#recipe-body').append(recipeDirections);
    });
})
