document.addEventListener('DOMContentLoaded', function() {
  loadList();
});

//Load the list from localStorage
function loadList() {
  const items = JSON.parse(localStorage.getItem("myFridgeList")) || [];
  items.forEach(item => createListItem(item));
}

//create a list item with a delete button
function createListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u00D7";
  deleteBtn.className = "deleteBtn";
  deleteBtn.onclick = function() {
    const div = this.parentElement;
    div.remove();
    saveList();
  };
  li.appendChild(deleteBtn);
  document.getElementById("shopping-list").appendChild(li);
}

//add new list item from user input
function newElement() {
  const inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
    return;
  }
  createListItem(inputValue);
  saveList();
  // Clear input field
  document.getElementById("myInput").value = ""; 
}

// Save the current list state to localStorage
function saveList() {
  const listItems = Array.from(document.querySelectorAll('#shopping-list li'));
  const itemsData = listItems.map(li => li.firstChild.textContent);
  localStorage.setItem("myFridgeList", JSON.stringify(itemsData));
}

// Event listener for checking items
document.querySelector('ul').addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


