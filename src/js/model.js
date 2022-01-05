export const state = {
  recipe: {}, //update STATE with recipe
};
//change STATE object
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}` //fetch recipe based on id
      //`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37`
    );
    const data = await res.json(); //format result using JSON function

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); //throw error message if no result found

    //let recipe = data.data.recipe
    const { recipe } = data.data; // create recipe with recipe data --  destructured 
    
    state.recipe = {
      // update STATE.recipe object above with current data
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
