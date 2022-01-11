import { API_URL } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {}, //update STATE with recipe object -- from below
};
//change STATE object
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`); // call fetch from helper.js

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
    // temporary error handling
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};
