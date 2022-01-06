import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //get recipe identity from browser HASH -- remove #
    if (!id) return; // break out of function if there is no ID --ie load page first time
    recipeView.renderSpinner();
    //1.loading recipe

    await model.loadRecipe(id); //invoke loadRecipe function in model and pass in id

    //2. rendering recipe - create markup from recipe object
    recipeView.render(model.state.recipe); //from recipeView render method
  } catch (err) {
    alert(err);
  }
};
// load recipe when HASH changes or on load of new page
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
