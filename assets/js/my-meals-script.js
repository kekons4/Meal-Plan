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

//build recipe cards from userSelectedRecipes
jQuery.each(userSelectedRecipes, function(index, value) {
    //get recipe data by ID
    let id = userSelectedRecipes[index];
    //need api key for this, else returns error 401
    // fetch(`https://api.spoonacular.com/recipes/${id}/information?`)
    // .then(response => response.json())
    // .then(data => console.log(data));
    
    //build DOM elements
    recipeCard = $('<div></div>')
        .addClass('card')
        .attr('id', 'recipe-card')
        .append(recipeImg, ingredientsList, recipeBody)

    recipeImg = $('<img>')
        .addClass('card-img-top')
        .attr('id', 'recipe-image')

    ingredientsList = $('<ul></ul>')
        .addClass('list-group')
        .attr('id', 'ingredients-list')

    recipeBody = $('<div></div>')
        .addClass('card-body')
        .attr('id', 'recipe-body')
        .append(recipeTitle, recipeDirections, deleteBtn)

    recipeTitle = $('<h3></h3>')
        .addClass('card-title')
        .attr('id', 'recipe-title')

    recipeDirections = $('<p></p>')
        .addClass('card-text')
    
    deleteBtn = $('<button></button>')
        .addClass('btn', 'btn-danger')
        .html('X')
})

