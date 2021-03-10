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

//dynamically created
let checklistItem;
let checkBox;
let checklistItemText;

//initialize localStorage for pantryItems
const pantryArr = JSON.parse(localStorage.getItem('pantryItems')) || [];

//initialize localStorage for li
const listItems = JSON.parse(localStorage.getItem('li')) || [];

//build checklistItems for each missedIngredient
jQuery.each(pantryArr, function (index, value) {
    //pull missedIngredients from pantryItems (spoonacular api data)
    const missedIngredients = pantryArr[index].missedIngredients;

    jQuery.each(missedIngredients, function(index, value) {
        let li = missedIngredients[index].name;
        listItems.push(li);
        localStorage.setItem("li", JSON.stringify(listItems));
    })

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

    checklistItem = $("<div><div/>").append(checkBox, checklistItemText);
    listContainer.append(checklistItem);
})

//TODO: when item is checked, persist checked state in localStorage

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