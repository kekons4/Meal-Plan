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
const listBtn = $('.go-to-grocery-list');
const clearBtn = $('.recipe-clear');

//dynamically created
let recipeCard;
let recipeImg;
let ingredientsList;
let recipeBody;
let recipeTitle;
let directionsContainer;
let recipeDirections;
let deleteBtn;

// grab the user selected recipes
const userSelectedRecipes = JSON.parse(localStorage.getItem('userSelectedRecipes'));

//grab pantryArr
const pantryArr = JSON.parse(localStorage.getItem('pantryItems'));

//API
const apiKey = "3bf0573f77794a1fbc310965fd52f563";

//get analyed directions for each userSelectedRecipe
jQuery.each(userSelectedRecipes, function (i) {
    let id = userSelectedRecipes[i];
    //arr to push steps into
    let stepsArr = []

    fetch('https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=' + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    steps = data[0].steps
                    stepsArr.push(steps)


                    //build dom elements for each id
                    jQuery.each(pantryArr, function (index) {
                        let selectedId = userSelectedRecipes[i].toString();
                        let pantryId = pantryArr[index].id.toString();
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
                                .addClass('btn btn-danger')
                                .text('Remove Recipe')


                            //recipeBody containing title, ingredients, directions and deleteBtn
                            recipeBody = $('<div></div>')
                                .addClass('card-body')
                                .attr('id', 'recipe-body')
                                .append(recipeTitle, ingredientsList, deleteBtn)

                            jQuery.each(stepsArr, function (j) {
                                directionsContainer = $('<div></div>')
                                    .attr('id', 'directions-container')

                                recipeBody.append(directionsContainer);
                                jQuery.each(steps, function (i) {
                                    recipeDirections = $('<p></p>')
                                        .addClass('card-text')
                                        .text(steps[i].number + ': ' + steps[i].step);
                                    directionsContainer.append(recipeDirections)
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
                });
            } else {
                // This is for testing purposes
                alert("There was an error with API, please try again.");
            }
        });

})

// Removing the recipe off localstorage and DOM
recipeContainer.on("click", ".btn-danger", function (event) {
    let test = $(event.target);
    let id = test.parent().parent().attr('data-id');
    // console.log(test.parent().parent());
    test.parent().parent().remove();
    let arr = userSelectedRecipes;
    arr.splice(arr.indexOf(id), arr.indexOf(id) + 1);
    localStorage.setItem("userSelectedRecipes", JSON.stringify(arr));
})

clearBtn.click(function () {
    recipeContainer.empty();
    localStorage.removeItem('userSelectedRecipes')
    userSelectedRecipes = [];
    localStorage.setItem('userSelectedRecipes', json.stringify(userSelectedRecipes))
    location.reload()
})