// 1. Design a state object. This is an object that will store the data that will eventually make its way to your application

const stateObj = {
  items: [
    {title: 'pineapples', checked: false},
    {title: 'apples', checked: false}
  ]
};

// 2. State modification Functions. Write some code that will modify your state object. Don't hard-code in any event listeners or specific data, just create a generic function that takes in the state object and a piece of data as arguments, and modifies the state with that piece of data.

//Need to add item
function addItem(state, item) {
  return state.items.push({title: item, checked: false});
}

//check item off
function checkItem(state, item) {
  if(state.items.title === item) {
      return state.items.checked = false;
  } else {
      return state.items.check = true;
  }
}

console.log(checkItem(stateObj, 'pineapples'));

//delete item


// 3. State rendering functions. Write some code that renders your state into a DOM element. The function will take in the state object and the element you want to update, then it will format your user input, and push it onto the dom element.

// 4. Event listeners. This is where the magic happens. based on whatever user interaction you're expecting, call on your modification function with their input, then call on your rendering function with the elemnt you want to update.