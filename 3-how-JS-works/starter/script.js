/**********************************
* How is the code executed
* JavaScript runs on a browser.
* The host where JavaScript is running has an engine executing 
* our code.
* 1.- Code is evaluated by a parser. 
* 2.- If it is correct, the code is converted to machine code.
* 3.- Finally, the code is executed.
* All JavaScript code needs to run in an environment called
* execution context.
* 1.- The global execution context is for all the code that is 
* not inside a function. This is associated with the global 
* object, which in the browser is called the window object.
* 2.- The code that's inside function gets its own execution
* context. When the function returns, the execution context 
* is removed.
* Execution context object
*/

/* Scoping answers the question where can a variable or a 
   function can be accessed. Each new function creates a 
   scope
   
   Lexical scoping: a funciton that is lexically within another
   function gets access to the scope of the outer function and
   to the variables and functions that the parent function 
   defines.
*/





///////////////////////////////////////
// Lecture: Hoisting
// It only works with function declarations:

// For function declarations:
calculateAge(1990);

function calculateAge(year){
    console.log(2016 - year)
}


// For function expressions:
/* This won't work
retirement(1990);
var retirement = function(year){
    console.log( 65 - (2016 - year) );
}*/


//Variables
// With variables hoisting results in undefined
// datatypes.
console.log(age);
var age = 23;

function foo(){
    var age = 65;
    console.log(age);
}
foo();
console.log(age);



















///////////////////////////////////////
// Lecture: Scoping


// First scoping example


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}




// Example to show the differece between execution stack and scope chain
/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
    
    function third() {
    var d = 'John';
    console.log(a + b + d);
}
}
*/





///////////////////////////////////////
// Lecture: The this keyword

// In this case the 'this' keyword is the window object.

calculateAge(1990);
function calculateAge(year){
    console.log(2016 - year);
    console.log(this);
}


// In this case the 'this' keyword is the john object.
// The 'this' keyword of the inner window: the rule says
// that when a regular function happen 'this' is associated
// to the window object.
var john = {
    name: 'John',
    yearOfBirth: 1990,
    
    calculateAge: function(){
        console.log(this);
        console.log(2016 - this.yearOfBirth);
        function innerfunction(){
            console.log(this);
        }
        innerfunction();
    }
}

john.calculateAge();













