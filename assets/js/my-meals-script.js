//initialize query selectors
//navbar and links
const navbar = $('#navbar');
const homeLink = $('#home');
const recipesLink = $('#recipes');
const mealsLink = $('#meals');
const groceryLink = $('#groceries');

//recipes container
const recipeContainer = $('recipe-card');

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

const pantryArr = JSON.parse(localStorage.getItem('pantryItems'));

//build recipe cards from userSelectedRecipes
jQuery.each(pantryArr, function (index, value) {
    //get recipe data by ID (only data from userSelectedRecipes)
    jQuery.each(userSelectedRecipes, function (index, value) {
        if (pantryArr[index].id === Number.parseInt(userSelectedRecipes[0])) {
            //build DOM elements
            //image at top of recipe   
            const img = pantryArr[index].img
            recipeImg = $('<img src =' + img + '>')
                .addClass('card-img-top')
                .attr('id', 'recipe-image')

            //title of recipe
            const titleText = pantryArr[index].title
            recipeTitle = $('<h3></h3>')
                .addClass('card-title')
                .attr('id', 'recipe-title')
                .text(titleText)
            //ingredients list
            ingredientsList = $('<ul></ul>')
                .addClass('list-group')
                .attr('id', 'ingredients-list')

            jQuery.each(pantryArr[index].usedIngredients, function (index, value) {
                const li = $('<li></li')
                    .addClass('list-group-item')
                    .text(usedIngredients[index].originalString)
                ingredientsList.append(li)
            })

            //TODO recipeDirections
            recipeDirections = $('<p></p>')
                .addClass('card-text')

            //deleteBtn
            deleteBtn = $('<button></button>')
                .addClass('btn', 'btn-danger')
                .text('X')

            //recipeBody containing title, ingredients, directions and deleteBtn
            recipeBody = $('<div></div>')
                .addClass('card-body')
                .attr('id', 'recipe-body')
                .append(recipeTitle, ingredientsList, recipeDirections, deleteBtn)

            //card containing recipe
            recipeCard = $('<div></div>')
                .addClass('card')
                .attr('id', 'recipe-card')
                .append(recipeImg, recipeBody)

            //append to recipeContainer
            recipeContainer.append(recipeCard);
        }
    })
})

