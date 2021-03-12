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

//initialize steps to localStorage
let stepsArr = [];

//grab pantryArr
const pantryArr = JSON.parse(localStorage.getItem('pantryItems'));

//API
const apiKey = "3bf0573f77794a1fbc310965fd52f563";

//get analyed directions for each userSelectedRecipe
jQuery.each(userSelectedRecipes, function (index) {
    let id = userSelectedRecipes[index];
    // console.log(id);
    fetch('https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=' + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    stepsArr.push(data);
                    // console.log(data);
                    localStorage.setItem("stepsArr", JSON.stringify(stepsArr));
                })
            } else {
                // This is for testing purposes
                alert("There was an error with API, please try again.");
            }
        });

})

jQuery.each(userSelectedRecipes, function (i) {
        jQuery.each(pantryArr.results, function (index) {
            let selectedId = userSelectedRecipes[i].toString();
            // console.log(selectedId)
            let pantryId = pantryArr.results[index].id;
            // console.log(pantryId);
            if (pantryId === selectedId) {
            //title of recipe
            const titleText = pantryArr.results[index].title
            recipeTitle = $('<h3></h3>')
                .addClass('card-title')
                .attr('id', 'recipe-title')
                .text(titleText)

            //image at top of recipe   
            const img = pantryArr.results[index].image
            recipeImg = $('<img src =' + img + '>')
                .addClass('card-img-top')
                .attr('id', 'recipe-image')

            //ingredients list
            ingredientsList = $('<ul></ul>')
                .addClass('list-group')
                .attr('id', 'ingredients-list');

            const ingredients = pantryArr.results[index].usedIngredients;

            jQuery.each(ingredients, function (n) {
                const liText = ingredients[n].original;
                const li = $('<li></li>')
                    .addClass('list-group-item')
                    .text(liText)
                ingredientsList.append(li)
            });

            //deleteBtn
            deleteBtn = $('<button></button>')
                .addClass('btn btn-danger')
                .text('X');

            //recipeBody containing title, ingredients, directions and deleteBtn
            recipeBody = $('<div></div>')
                .addClass('card-body')
                .attr('id', 'recipe-body')
                .append(recipeTitle, ingredientsList, deleteBtn);

            // Grab the steps from localStorage
            stepsArr = JSON.parse(localStorage.getItem("stepsArr"));
            
            jQuery.each(stepsArr, function (j) {
                const steps = stepsArr[j].steps;
                console.log(steps);
                jQuery.each(steps, function (i) {
                    recipeDirections = $('<p></p>')
                        .addClass('card-text')
                        .text(steps[i].number + ': ' + steps[i].step);
                    recipeBody.append(recipeDirections);
                });
            });


            //card containing recipe
            recipeCard = $('<div></div>')
                .addClass('card')
                .attr('id', 'recipe-card')
                .attr('data-id', userSelectedRecipes[i])
                .append(recipeImg, recipeBody)

            //append to recipeContainer
            recipeContainer.append(recipeCard);
        };
        })
})

//recipe directions
// jQuery.each(stepsArr, function (index) {
//     const steps = stepsArr[index].steps;
//     console.log("test");
//     jQuery.each(steps, function (i) {
//         recipeDirections = $('<p></p>')
//             .addClass('card-text')
//             .text(steps[i].number + ': ' + steps[i].step)
//         console.log(recipeContainer);
//     });
// })

// Removing the recipe off localstorage and DOM
recipeContainer.on("click", ".btn-danger", function(event) {
    let test = $(event.target);
    let id = test.parent().parent().attr('data-id');
    // console.log(test.parent().parent());
    test.parent().parent().remove();
    let arr = userSelectedRecipes;
    arr.splice(arr.indexOf(id), arr.indexOf(id)+1);
    localStorage.setItem("userSelectedRecipes", JSON.stringify(arr));
})