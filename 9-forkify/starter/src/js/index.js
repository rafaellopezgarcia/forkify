// Global app controller
/*import x from './test'
const y = 23;
console.log(`I imported ${x} from another module called test.js!
 Variable y is ${y}`);

import stdr from './models/Search'
import { add as a, multiply as m, ID} from './views/searchView'
import * as searchView from './views/searchView'

console.log(`Using imported functions! ${a(ID,2)} and 
${m(3,3)}. ${stdr}`);

console.log(`Using imported functions! ${searchView.add(3,2)} and 
${searchView.multiply(3,3)}. ${stdr}`);

//----------------
import axios from 'axios';
async function getResults(query){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '460b2841538a88e336f45803593f1535';
    try{
        // The result value of the promise will be saved into res.
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes =res.data.recipes;
        console.log(recipes);
    }catch(error){
        alert();
    }
}

getResults('pizza');
console.log('hi');

//460b2841538a88e336f45803593f1535 
*/


import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
/* Global state of the app
   - Search object
   - Current recipe object
   - Shopping list object
   - Liked recipes
*/
const state = {

};

/* Search controller */

const controlSearch = async() => {
    // 1.- Get query from the view
    const query = searchView.getInput();
    console.log(query);

    if (query){
        // 2 .- New search object and add to state
        state.search = new Search(query);

        // 3.- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // 4.- Search for recipes

            // This will return a promise:
            await state.search.getResults();

            // 5.- Render results on UI
            clearLoader();
            console.log(state.search.result);
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
    
    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();// Page won't reload.
    controlSearch();
});

elements.searchResPages.addEventListener('click', e =>{
    /* The closest method returns the closest ancestor of the current
       element (or the current element itself) which matches the 
       selectors given in parameter.
    */
   const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/* Recipe controller */
const r = new Recipe(47025);
r.getRecipe();
console.log(r);

const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id){
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);
        try{
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
        }catch(err){
            alert('Error processing recipe!');
        }
    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
