//initialize query selectors
//navbar and links
const navbar = $('#navbar');
const homeLink = $('#home');
const recipesLink = $('#recipes');
const mealsLink = $('#meals')
const groceryLink = $('#groceries')

//list container
const listContainer = $('#list-container');

//buttons
const clearBtn = $('#clear-btn');
const getIngredientsBtn = $('#get-ingredients');

//dynamically created
let checklistItem;
let checkBox;
let checklistItemText;

//initialize localStorage for pantryItems
const pantryArr = JSON.parse(localStorage.getItem('pantryItems')) || [];

// grab the user selected recipes
const userSelectedRecipes = JSON.parse(localStorage.getItem('userSelectedRecipes'));

//initialize localStorage for li
const listItems = JSON.parse(localStorage.getItem('li')) || [];
// if (listItems !== null) {
//     localStorage.setItem('li', JSON.stringify([]));
//     listItems = JSON.parse(localStorage.getItem('li'));
// }
//initialize localStorage for checkBoxes (to persist checkbox state)
const checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};

// Gets nutrition facts from calorieninja api
function getNutrition(name) {
    fetch("https://calorieninjas.p.rapidapi.com/v1/nutrition?query=" + name, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "9bf9b8d515msh93a0be33b2998b7p184d01jsnb9d8e7719650",
                "x-rapidapi-host": "calorieninjas.p.rapidapi.com"
            }
        })
        .then(response => {
            if (response.ok) response.json()
                .then(function (data) {
                    console.log(name + " calories: " + data.items[0].calories);
                    listItems.push(name + " calories: " + data.items[0].calories);
                    localStorage.setItem("li", JSON.stringify(listItems));
                    // return data.items[0].calories;
                });
        })
        .catch(err => {
            console.error(err);
        });
}


//build checklistItems for each missedIngredient
jQuery.each(pantryArr, function (index, value) {
    // this only allows missing ingredients which are from recipes which the user selected are added
    jQuery.each(userSelectedRecipes, function (i, v) {
        if (pantryArr[index].id === Number.parseInt(userSelectedRecipes[i])) {
            //pull missedIngredients from pantryItems (spoonacular api data)
            const missedIngredients = pantryArr[index].missedIngredients;
            jQuery.each(missedIngredients, function (ind, value) {
                let li = missedIngredients[ind].name;
                getNutrition(li);
            })

            // //create DOM elements & append to listContainer
            // checkBox = $("<input/>")
            //     .attr('type', 'checkbox', 'id', 'flexCheckDefault')
            //     .addClass('form-check-input')
            //     .css('padding-right', '10px');

            // jQuery.each(listItems, function (index, value) {
            //     checklistItemText = $("<label></label>")
            //         .addClass('form-check-label')
            //         .text(listItems[index])
            // })


            // // checkBox.on('change', function () {
            // //     checkBox.each(function () {
            // //         checkboxValues[this] = this.checked;
            // //         console.log(this.checked)
            // //     })
            // //     localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
            // // })

            // checklistItem = $("<div><div/>").append(checkBox, checklistItemText);
            // listContainer.append(checklistItem);
        }
    })
})


//clearBtn removes all checklistItems
clearBtn.click(function () {
    //need to check if recipes and mymeals can be rebuilt from userItem
    //so far, emptying both listItems and pantryItems is the
    //only way I've found to persist the cleared list
    listContainer.empty();
    localStorage.removeItem('li');
    localStorage.removeItem('pantryItems')
    listItems = [];
    pantryItems = [];
    localStorage.setItem("li", JSON.stringify(listItems));
    localStorage.setItem("pantryItems", JSON.stringify(pantryArr));
})

//getIngredientsBtn populates the list of missing ingredients
getIngredientsBtn.click(function () {
    //create DOM elements & append to listContainer
    checkBox = $("<input/>")
        .attr('type', 'checkbox', 'id', 'flexCheckDefault')
        .addClass('form-check-input')
        .css('padding-right', '10px');

    jQuery.each(listItems, function (index, value) {
        checklistItemText = $("<label></label>")
            .addClass('form-check-label')
            .text(listItems[index])
    })


    // checkBox.on('change', function () {
    //     checkBox.each(function () {
    //         checkboxValues[this] = this.checked;
    //         console.log(this.checked)
    //     })
    //     localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
    // })

    checklistItem = $("<div><div/>").append(checkBox, checklistItemText);
    listContainer.append(checklistItem);
});

//TODO: when item is checked, persist checked state in localStorage
checkBox.on('change', function () {
    checkBox.each(function () {
        checkboxValues[this] = this.checked;
        console.log(this.checked)
    })
    localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
})