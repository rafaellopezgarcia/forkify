import axios from 'axios'
import {key, proxy} from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);
        } catch (error) {
            console.log(error);
            alert('Something went wrong:(');
        }
    }

    calcTime() {
        // Assuming we need 15 min for each 3 ingredients
        const numIngredients = this.ingredients.length
        const periods = Math.ceil(numIngredients/3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units 
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unitsLong, i) => {
                ingredient = ingresient.replace(unit, unitsShort[i]);
            })

            // 2)  Remove parenthesis

            // 3) Parse ingredients into count, unit and ingredient
        });
        this.ingredients = newIngredients;
    }
}