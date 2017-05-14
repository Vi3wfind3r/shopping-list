/////////////STATE OBJECTS////////////////

const stateObj = {
  items: []
};



/////////////STATE MODS////////////////

//ADD ITEM STATE MOD
function addItem(state, item){
  let hasDuplicates = false;
  state.items.forEach(obj => {
    if (obj.title === item){
      hasDuplicates = true;
    }
  });
  try{
    if(hasDuplicates){
      throw new Error(`${item} is already on your list!`);
    }
    else{
      state.items.push({title: item, checked: false, hidden:false});
    }
  }
  catch(e){
    alert(e.message);
  }
}

//CHECK ITEM STATE MOD
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

//DELETE ITEM STATE MOD
function deleteItem (state, item){
  state.items.forEach(obj => {
    if (obj.title == item){
      let i = state.items.indexOf(obj);
      state.items.splice(i, 1);
    }
  });
}

//EDIT ITEM STATE MOD
function editItem(state, prevItem, newItem){
  let hasDuplicates = false;
  state.items.forEach(obj => {
    if (obj.title === newItem){
      hasDuplicates = true;
    }
  });
  try{
      if(hasDuplicates){
        throw new Error(`${newItem} is already on your list!`);
      }
      else{
        state.items.forEach(obj => {
          if (obj.title === prevItem){
            obj.title = newItem;
          }
        });
      }
  }
  catch(e){
    alert(e.message);
  }

}

//HIDE ITEM STATE MOD
function hideItem(state, item){
  state.items.forEach(obj => {
    if (obj.title == item){
      obj.hidden = true
    }
  });
}

//SHOW ITEMS STATE MOD
function showItems(state){
  state.items.forEach(obj => {
    if (obj.hidden === true){
      obj.hidden = false;
    }
  });
}

/////////////RENDERING////////////////
function render (state, list, hiddenBanner){

  //MAIN RENDER

  let itemsHtml = ``;
  state.items.forEach(obj => {
    let css = '';
    let showHidden = '';
    let hideItem = ''
    if (obj.checked === true){
      css = 'shopping-item shopping-item__checked';
      showHidden = 'hide';
    }
    else if (obj.checked === false){
      css = 'shopping-item';
      showHidden = 'hide hidden';
    }
    if(obj.hidden === true){
      hideItem = 'hidden'
    }
    itemsHtml += `
      <li class= "${hideItem}">
        <a href="" class="${showHidden}">hide</a>
        <span class="${css} js-title">${obj.title}</span>
        <form class="hidden js-editItem">
          <input type="text" name="Edit Name" class="js-input-edit-item" placeholder="New item name here">
          <button class="shopping-item-edit">
            <span class="button-label">edit</span>
          </button>
        </form>
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
  list.html(itemsHtml);

  //HIDDEN ITEM BANNER RENDER
  let hiddenCount = 0;
  let grammar = 'items'
  state.items.forEach(obj => {
    if (obj.hidden === true){
      hiddenCount++
    }
  });
  if (hiddenCount > 1){
    hiddenBanner.removeClass('hidden');
    hiddenBanner.html(`<span class="hiddenCount">You have ${hiddenCount} hidden ${grammar}</span> <a href="" class="show">show</a>`);
  }
  else if(hiddenCount === 1){
    grammar = 'item';
    hiddenBanner.removeClass('hidden');
    hiddenBanner.html(`<span class="hiddenCount">You have ${hiddenCount} hidden ${grammar}</span> <a href="" class="show">show</a>`);
  }
  else if(hiddenCount === 0){
    hiddenBanner.addClass('hidden');
  }

}

/////////////LISTENERS////////////////

//ADD ITEM LISTENER
$("#js-shopping-list-form").submit(function(event) {
  event.preventDefault();
  addItem(stateObj, $('#shopping-list-entry').val());
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
  $('#shopping-list-entry').val("");
});


//CHECK ITEM LISTENER
$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
  let itemName = $(this).closest('li').find('.js-title').text(); 
  checkItem(stateObj, itemName);
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
});

//DELETE ITEM LISTENER
$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
  let itemName = $(this).closest('li').find('.js-title').text();
  deleteItem(stateObj, itemName);
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
});

// SHOW & FOCUS THE EDIT FIELD
$('.shopping-list').on('click', '.shopping-item', function(event){
  $(this).addClass('hidden');
  $(this).siblings().removeClass('hidden');
  $(this).siblings().find('.js-input-edit-item').focus();
})

// SUBMIT THE EDIT
$('.shopping-list').on('submit', '.js-editItem', function(event){
  event.preventDefault();
  let prevItem = $(this).prev().text();
  let newItem = $(this).find('input').val()
  // console.log($(this).find('input').val());
  editItem(stateObj, prevItem, newItem);
  // console.log(stateObj);
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
});

//HIDE LISTENER
$('.shopping-list').on('click', '.hide', function(event){
  event.preventDefault();
  let itemName = $(this).closest('li').find('.js-title').text();
  hideItem(stateObj, itemName);
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
});

//SHOW LISTENER
$('.hiddenItems').on('click', '.show', function(event){
  event.preventDefault();
  showItems(stateObj);
  render(stateObj, $('.shopping-list'), $('.hiddenItems'));
});

//

