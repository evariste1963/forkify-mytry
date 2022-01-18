import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {}, //update STATE with recipe object -- from below
  search: {
    query: '',
    results: [],
    page: 1, // to be made dynamic in next lesson 298
    resultsPerPage: RES_PER_PAGE,
  },
};
//change STATE object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`); // call fetch from helper.js

    //let recipe = data.data.recipe
    const { recipe } = data.data; // create recipe with fetched recipe data --  destructured (was recipe = data.data.recipe)

    state.recipe = {
      // update STATE.recipe object above with fetched data
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  //query comes from controller
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
