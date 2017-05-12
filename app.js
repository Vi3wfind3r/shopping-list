// 1. Design a state object. This is an object that will store the data that will eventually make its way to your application

const stateObj = {
  items: []
};

// 2. State modification Functions. Write some code that will modify your state object. Don't hard-code in any event listeners or specific data, just create a generic function that takes in the state object and a piece of data as arguments, and modifies the state with that piece of data.

//Need to add item
function addItem(state, item) {
  state.items.push({title: item, checked: false});
}

//check item off

function checkItem(state,item){
  state.items.forEach(obj => {
    if (obj.title === item && obj.checked === true){
      obj.checked = false;
    }
    else if(obj.title === item && obj.checked === false){
      obj.checked = true;
    }
  });
}

//delete item

function deleteItem (state, item){
  state.items.forEach(obj => {
    if (obj.title == item){
      let i = state.items.indexOf(obj);
      state.items.splice(i, 1);
    }
  });
}


// 3. State rendering functions. Write some code that renders your state into a DOM element. The function will take in the state object and the element you want to update, then it will format your user input, and push it onto the dom element.

function render (state, element){
  let itemsHtml = ``;
  state.items.forEach(obj => {
    let css = '';
    if (obj.checked === true){
      css = 'shopping-item shopping-item__checked';
    }
    else if (obj.checked === false){
      css = 'shopping-item';
    }
    itemsHtml += `
      <li>
        <span class="${css}">${obj.title}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
    `
  });
//   console.log(itemsHtml);
  element.html(itemsHtml);
}


// 4. Event listeners. This is where the magic happens. based on whatever user interaction you're expecting, call on your modification function with their input, then call on your rendering function with the elemnt you want to update.

$("#js-shopping-list-form").submit(function(event) {
  event.preventDefault();
  addItem(stateObj, $('#shopping-list-entry').val());
  render(stateObj, $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
  let itemName = $(this).parent().siblings().text(); 
  checkItem(stateObj, itemName);
  render(stateObj, $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
  let itemName = $(this).parent().siblings().text();
  deleteItem(stateObj, itemName);
  render(stateObj, $('.shopping-list'));
});


