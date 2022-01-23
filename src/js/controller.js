import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//not JS but coming from parcel !!!
//stops page reloading when changing something in the code
// if (module.hot) {
//   module.hot.accept();
// }

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
    controlServings();
    
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load search results
    await model.loadSearchResults(query);
    //console.log(model.state.search.results);
    //3) render search results
    // resultsView.render(model.state.search.results); //renders ALL of search results array
    resultsView.render(model.getSearchResultsPage(1)); //renders search results based on num per page -- const in config.js

    //4) render inital pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1) render NEW page search results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //2) render New Page pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function () {
  //update the recipe servings (state
  model.updateServings(50);
  //update the recipe view)
  recipeView.render(model.state.recipe);
};
//immediately pass controlRecipe to recipeView on startup (subscriber/publisher)
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
