document.addEventListener('DOMContentLoaded', () => {
    
    class RecipeCard {
      constructor(sectionId, id, title, content) {
        this.sectionId = sectionId;
        this.recipeId = id;
        this.recipeTitle = title;
        this.recipeContent = content;
      }
    }
  
    //recipe sets for each section
    const sectionRecipeCardSets = {
      'main-course': new Set(),
      'dessert': new Set(),
      'drink': new Set()
    };
  
    //add new recipe card
    function addNewRecipe(sectionId, title, content) {
      const id = Date.now();
      const newRecipeCard = new RecipeCard(sectionId, id, title, content);
      sectionRecipeCardSets[sectionId].add(newRecipeCard);
      return newRecipeCard;
    }
  
    //create recipe element in DOM
    function createRecipeElement(recipeCard) {
      const section = document.createElement('section');
      section.classList.add('recipe');
  
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.classList.add('recipe-name');
      titleInput.value = recipeCard.recipeTitle;
      titleInput.placeholder = 'Enter Recipe Title';
      titleInput.addEventListener('change', () => {
        recipeCard.recipeTitle = titleInput.value;
        saveToLocalStorage(recipeCard.sectionId);
      });
  
      const contentTextarea = document.createElement('textarea');
      contentTextarea.classList.add('recipe-content');
      contentTextarea.value = recipeCard.recipeContent;
      contentTextarea.placeholder = 'Enter Recipe Content';
      contentTextarea.addEventListener('change', () => {
        recipeCard.recipeContent = contentTextarea.value;
        saveToLocalStorage(recipeCard.sectionId);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-recipe');
      deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this recipe?')) {
          deleteRecipe(recipeCard);
        }
      });
  
      section.appendChild(titleInput);
      section.appendChild(contentTextarea);
      section.appendChild(deleteButton);
  
      recipeCard.element = section;
      return section;
    }
  
    //add the recipe element to the DOM
    function addRecipeToDOM(recipeCard, container) {
      const recipeElement = createRecipeElement(recipeCard);
      container.appendChild(recipeElement);
    }
  
    //delete a recipe card
    function deleteRecipe(recipeCard) {
      const sectionRecipes = sectionRecipeCardSets[recipeCard.sectionId];
      sectionRecipes.delete(recipeCard);
      recipeCard.element.remove();
      saveToLocalStorage(recipeCard.sectionId);
    }
  
    //save recipes to localStorage
    function saveToLocalStorage(sectionId) {
      const recipesData = Array.from(sectionRecipeCardSets[sectionId]).map(card => ({
        sectionId: card.sectionId,
        recipeId: card.recipeId,
        title: card.recipeTitle,
        content: card.recipeContent
      }));
      localStorage.setItem(`recipes-${sectionId}`, JSON.stringify(recipesData));
    }
  
    //retrieve recipes from localStorage
    function retrieveFromLocalStorage(sectionId, container) {
      const recipesData = JSON.parse(localStorage.getItem(`recipes-${sectionId}`)) || [];
      recipesData.forEach(data => {
        const recipeCard = new RecipeCard(data.sectionId, data.recipeId, data.title, data.content);
        sectionRecipeCardSets[sectionId].add(recipeCard);
        addRecipeToDOM(recipeCard, container);
      });
    }
  
    //initialize each section by attaching event listeners and retrieving from localStorage
    Object.keys(sectionRecipeCardSets).forEach(sectionId => {
      const container = document.getElementById(`section-content-${sectionId}`);
      const addRecipeButton = container.querySelector('.add-recipe');
      addRecipeButton.addEventListener('click', () => {
        const recipeCard = addNewRecipe(sectionId, '', '');
        addRecipeToDOM(recipeCard, container);
        saveToLocalStorage(sectionId);
      });
      retrieveFromLocalStorage(sectionId, container);
    });
  });
/**use gsap.js to enable the navigation bar can lead 
 * user to each section of rescipes */
gsap.registerPlugin(ScrollTrigger);
//detect if a link's href goes to the current page
function getSamePageAnchor (link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }
  return link.hash;
}

//scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if(elem) {
    if(e) e.preventDefault();
    gsap.to(window, {scrollTo: elem});
  }
}
//if a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
  a.addEventListener('click', e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});

//scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);

