//import { isArray } from 'core-js/core/array'; // don't know where this came from but it messes up the build
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    //guard clause to check if data array is empty( fetch successful but no results) or there is no data found
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // model.state object
    console.log(data);
    this._data = data; // set to data recieved
    const markup = this._generateMarkup();
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup); //fill container with recipe data
  }

  _clear() {
    this._parentElement.innerHTML = ''; //clear out HTML container
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
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
  <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
  <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
