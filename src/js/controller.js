import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //get recipe identity from browser HASH -- remove #
    if (!id) return; // break out of function if there is no ID --ie load page first time
    recipeView.renderSpinner(); //invoke renderSpinner in recipeView to show that something is happening during fetch

    //1.loading recipe
    await model.loadRecipe(id); //invoke loadRecipe function in model and pass in id

    //2. rendering recipe - create markup from recipe object
    recipeView.render(model.state.recipe); //invoke recipeView render method using STATE.RECIPE object from MODEL
  } catch (err) {
    alert(err);
  }
};

//immediately pass controlRecipe to recipeView on startup (subscriber/publisher)
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
