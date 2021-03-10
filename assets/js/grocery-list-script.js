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

let index = 0;

// initialize localStorage for userSelectedRecipes
const recipeArr = JSON.parse(localStorage.getItem('userSelectedRecipes'))  || [];

//initialize localStorage for checklistItems
const itemArr = JSON.parse(localStorage.getItem('checklistItem')) || [];

//build checklistItems and append to listContainer on load
$(function () {
    itemArr.each(function (index) {
        listContainer.append(
            checklistItem.append(
                checkBox = $("<input/>")
                    .attr('id', 'flexCheckDefault')
                    .addClass('form-check-input'),

                checkListItemText = $("<label/>")
                    .addClass('form-check-label')
                    .innerHTML(itemArr[index])
            )
        )
    });
})

//clearBtn removes all checklistItems
clearBtn.click(function () {
    listContainer.innerHTML = '';
    localStorage.removeItem('checklistItem');
    itemArr.each(function () {
        itemArr.pop();
    });
})