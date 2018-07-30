
//export default 'I am an exported string';
import axios from 'axios';
export default class Search{
    // Constructor method:
    constructor(query){
        this.query = query;
    }

    async getResults(){
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '460b2841538a88e336f45803593f1535';
        try{
            // The result value of the promise will be saved into res.
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        }catch(error){
            alert();
        }
    }

}

 

