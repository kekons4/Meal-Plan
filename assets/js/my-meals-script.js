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

// fetches api data on instructions
const getInstruction = async(id) => {
    const request = await fetch('https://api.spoonacular.com/recipes/' + id + '/analyzedInstructions?apiKey=' + apiKey);
    const data = await request.json();
    return data;
}

function displayInstructions() {
    // Grab the steps from localStorage
    stepsArr = JSON.parse(localStorage.getItem("stepsArr"));
    // console.log(stepsArr);
    //append instructions to each recipe
    for(let k = 0; k < stepsArr.length; k++){
        // console.log(stepsArr, k);
        for(let z = 0; z < stepsArr[k].length; z++){
            // console.log(stepsArr[k][z]);
            for(let q = 0; q < stepsArr[k][z].steps.length; q++) {
                recipeDirections = $("<p class='card-text'></p>");
                recipeDirections.text(q+1 + ". " + stepsArr[k][z].steps[q].step);
                recipeBody.append(recipeDirections);
            }
        }
    }
    localStorage.setItem("stepsArr", JSON.stringify([]));
}

//get analyed directions for each userSelectedRecipe
jQuery.each(userSelectedRecipes, function (index) {
    let id = userSelectedRecipes[index];
    // console.log(id);
    getInstruction(id).then(data => {
        stepsArr.push(data);
        // console.log(data);
        localStorage.setItem("stepsArr", JSON.stringify(stepsArr));
        // displayRecipes();
        recipeCard = $("<div class='card' id='recipe-card'></div>");
        recipeCard.attr('data-id', userSelectedRecipes[index]);

            //title of recipe
        const titleText = pantryArr.results[index].title
        recipeTitle = $("<h3 class='card-title' id='recipe-title'></h3>");
        recipeTitle.text(titleText);

        //image at top of recipe   
        const img = pantryArr.results[index].image
        recipeImg = $('<img src =' + img + '>')
            .addClass('card-img-top')
            .attr('id', 'recipe-image');

        //ingredients list
        ingredientsList = $("<ul class='list-group' id='ingredients-list'>Ingredients</ul>");

        const ingredients = pantryArr.results[index].usedIngredients;
        // appends used ingredients to list
        ingredients.forEach(ingredient => {
            const liText = ingredient.original;
            console.log(liText);
            let li = $("<li class='list-group-item'></li>");
            li.text(liText);
            ingredientsList.append(li)
        });

        // missed ingredients grabbed and appended to list
        const missedIngredients = pantryArr.results[index].missedIngredients;
        missedIngredients.forEach(ingredient => {
            const liText = ingredient.original;
            // console.log(liText);
            let li = $("<li class='list-group-item'></li>");
            li.text(liText);
            ingredientsList.append(li)
        });


        //deleteBtn
        deleteBtn = $("<button class='btn btn-danger'></button>");
        deleteBtn.text('X');

        //recipeBody containing title, ingredients, directions and deleteBtn
        recipeBody = $("<div class='card-body' id='recipe-body'></div>");
        recipeBody.append(ingredientsList);
        recipeBody.append("<div>Instructions</div>");

        displayInstructions();

        // Grab the steps from localStorage
        stepsArr = JSON.parse(localStorage.getItem("stepsArr"));
        // console.log(stepsArr);
        //append instructions to each recipe
        for(let k = 0; k < stepsArr.length; k++){
            // console.log(stepsArr, k);
            for(let z = 0; z < stepsArr[k].length; z++){
                // console.log(stepsArr[k][z]);
                for(let q = 0; q < stepsArr[k][z].steps.length; q++) {
                    recipeDirections = $("<p class='card-text'></p>");
                    recipeDirections.text(q+1 + ". " + stepsArr[k][z].steps[q].step);
                    recipeBody.append(recipeDirections);
                }
            }
        }

        recipeCard.append(recipeTitle, recipeImg, recipeBody, deleteBtn);
        recipeContainer.append(recipeCard);
    });
})

// Removing the recipe off localstorage and DOM
recipeContainer.on("click", ".btn-danger", function(event) {
    let test = $(event.target);
    let id = test.parent().attr('data-id');
    console.log(test.parent());
    test.parent().remove();
    let arr = userSelectedRecipes;
    arr.splice(arr.indexOf(id), arr.indexOf(id)+1);
    localStorage.setItem("userSelectedRecipes", JSON.stringify(arr));
})