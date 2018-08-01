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
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients)
            state.recipe.parseIngredients();

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
