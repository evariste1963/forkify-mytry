// import icons from '../img/icons.svg' // for parcel v1
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
console.log(Fraction);

//all views aill be classes so that they can be emalgamated into the Parent view class
class RecipeView {
  #parentElement = document.querySelector('.recipe'); //private property -- all views will have this PARENTELEMENT property so that it is easier to render spinner, success/error messages etc
  #data;
  render(data) {
    // model.state object
    console.log(data);
    this.#data = data; // set to data recieved
    const markup = this.#generateMarkup();
    this.#clear(); //clear out HTML container
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); //fill container with recipe data
  }

  #clear() {
    this.#parentElement.innerHTML = ''; //clear out HTML container
  }

  //render spinner --- Parent element is the HTML class element that is the parent (main container) within which the markup sits/fills-out -- this is a public method for use everywhere
  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
    `;
    this.#clear(); //clear out HTML container
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // load recipe when HASH changes or on load of new page
  //handler passed in from controller on start up (subscriber/publisher)
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.#data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.#data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">4</span>${
        this.#data.servings
      }
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')} 
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.#data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.#data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
  }

  #generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
      

      <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
       `;
  }
}

export default new RecipeView(); // only export this default object rather than whole class
