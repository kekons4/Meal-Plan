//initialize query selectors
//navbar and links
const navbar = document.querySelector('#navbar');
const homeLink = document.querySelector('#home');
const recipesLink = document.querySelector('#recipes');
const mealsLink = document.querySelector('#meals')
const groceryLink = document.querySelector('#groceries')
//input and button to add pantry items
const userInput = document.querySelector('#user-input');
const addBtn = document.querySelector('#add-btn');
//user pantry
const pantryContainer = document.querySelector('#pantry-container');

//dynamically created
let userItem;
let pantryItem;

//buttons
const clearBtn = document.querySelector('clear-btn');
const getRecipes = document.querySelector('get-recipes');

//nav links - add locations when available
homeLink.addEventListener('click', function() {
    location.pathname = '/Meal-Plan/index.html'
});
recipesLink.addEventListener('click', function() {
    location.pathname = '#'
});
mealsLink.addEventListener('click', function() {
    location.pathname = '#'
});
groceryLink.addEventListener('click', function() {
    location.pathname = '#'
});

//initialize localStorage for userItems
const itemArr = JSON.parse(localStorage.getItem('userItem')) || [];

//generate userItem, push to itemArr, set to local Storage. generate pantryItem div w/ userItem and deleteBtn.
addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    userItem = userInput.value;
    itemArr.push(userItem);
    localStorage.setItem('userItem', JSON.stringify(itemArr));
    //creates div for each userItem and adds it to pantryContainer
    itemArr.forEach(item => {
        //add pantryItem to pantryContainer
        pantryItem = document.createElement('div');
        pantryContainer.appendChild(pantryItem);
        //create and style deleteBtn
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn btn-danger');
        deleteBtn.textContent = "X";

        pantryItem.appendChild(itemArr[item].value);
        pantryItem.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', function() {
            pantryItem.remove();
        })
    })
});

//clearBtn removes all pantryItems
clearBtn.addEventListener('click', function() {
    pantryContainer.innerHTML = '';
});

//getRecipes takes user to recipe page (fill in path when available)
getRecipes.addEventListener('click', function() {
    location.pathname = '#';
});