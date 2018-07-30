/*
   In JavaScript we have two types of 
   1.- Primitives: Numbers, strings, booleans, undefined, null
   2.- Objects: Arrays, functions, objects, dates
   
   OOD: It makes heavy use of objects, properties and methods. 
   They interact with one another through methods and properties.
   
   In JavaScript a blueprint for creating an object is called 
   constructor or prototype.
   
   Inheritance: It is when one object gets access to the proper-
   ties and methods of other objects, e.g. athlete can inherit
   from person. This allows us to write less code.
   
   Prototype chain: when we try to use a certain method inside 
   an object, first it looks into the object itself, if it does
   not find it, it looks into the object's prototype, and so on.
   If the method is never find, 'undefined' is return.
   
   1.- Every JavaScript object has a prototype property, which 
   makes inheritance possible.
   2.- The prototype property of an object is where we put pro-
   perties and methods which we want other objects to inherit.
   3.- The constructor's prototype property is NOT the prototype
   of the constructor itself, it's the prototype of all instan-
   ces that are created through it.
*/


var john = {
    name: 'John',
    yearBirth: 1990,
    job: 'teacher'
};

// Function constructor:
var Person = function(name, yearBirth, job){
    this.name = name;
    this.yearBirth = yearBirth;
    this.job = job;
}

/* Instantiation:
   1.- the new operator creates a brand new empty object.
   2.- the function Person is called and creates a new
   execution context. The this variable of the function
   points to the empty object that was created in the be-
   ginning by the new operator.
   3.- the empty object assigns the properties to the ob-
   ject passed as a parameter.
*/

/* Methods that are in the prototype property of the func-
   tion constructor can be called by objects.
*/

// This funciton will be inherit:
Person.prototype.calculateAge = function(){
        console.log(2018 - this.yearBirth);
    }

var john2 = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1989, 'designer');
var Mark = new Person('Mark', 1955, 'retired');

john2.calculateAge();
jane.calculateAge();
Mark.calculateAge();


/* Object create */
var personProto = {
    calculateAge: function(){
        console.log(2016-this.yearBirth);
    }
};

var john3 = Object.create(personProto);
john3.name = 'John';
john3.yearBirth = 1990;
john3.job = 'teacher';

var jane = Object.create(personProto, 
{
    name: {value: 'Jane'},
    yearBirth: {value: 1989},
    job: {value: 'designer'}    
});


/* Primitives vs objects 
Variables are just a reference to an object.
*/
var a = 23;
var b = a;
a =46;
console.log(a)
console.log(b);

var obj1 = {
    name: 'john',
    age: 26
};

var obj2 = obj1;

obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

var age = 27;
var obj = {
    name: 'jonas', 
    city: 'Lisbon'
};

function change(a, b){
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);

/* Passing funcitons as arguments
   Functions are also objects
   A function is an instance of an object type.
   We can store functions in a variable.
   We can pass a funciton as an argument to another function.
   We can return a function to a function.
*/

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el){
    return 2016 - el;
}

function isFullAge(el){
    var age = calculateAge(el);
    return age >18
}

function maxHeartRate(el){
    if (el >= 18 && el <= 81)
        return Math.round(206.9 - (0.67 * el));
    else 
        return -1;
}

var ages = arrayCalc(years, calculateAge);
var adults = arrayCalc(years, isFullAge);
var maxHeartRates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(adults);
console.log(maxHeartRates);


/* First Class Function: Functions returning functions */
function interviewQuestion(job){
    switch (job){
        case 'designer':
            return function(name){
                console.log(name + ' can you please explain what UX is?');
            }
            break;
        case 'teacher':
            return function(name){
                console.log(name + ', What subject do you teach?');
            }
            break;
        default:
            return function(name){
                console.log(name, ', What do you do?');
            }
    }
}

var teacherQuestions = interviewQuestion('teacher');
var designerQuestions = interviewQuestion('designer');
teacherQuestions('John');
designerQuestions('John');
interviewQuestion('teacher')('Mark');


/* Immediately Invoked Function Expressions. IIFE */
function game(){
    var score = Math.random()*10;
    console.log(score >= 5);
}

game();

(function game(){
    var score = Math.random()*10;
    console.log(score >= 5);
})();


(function game(goodLuck){
    var score = Math.random()*10;
    console.log(score >= 5-goodLuck);
})(3);


/* Closures 
   An inner function has always access to the variables 
   and parameters of its outer function, even after the
   outer function has returned.
*/
function retirement(retirementAge){
    var a = ' years left until retirement';
    return function(yearOfBirth){
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age)+a);
    }
}

function interviewQuestions2(job){
    var teacherMsg = ', What subject do you teach?';
    var designerMsg = ', Can you please explain what UX is?';
    var defaultMsg = ', What do you do?';
    
    return function(name){
        switch(job){
            case 'designer':
                console.log(name + designerMsg);
            break;
            case 'teacher':
                return console.log(name + teacherMsg);
            break;
            default:
                return console.log(name + defaultMsg);
        }
    }    
}

var retirementUS = retirement(66);
var retirementGER = retirement(65);
var retirementISL = retirement(67);
retirementUS(1990);
retirementGER(1990);
retirementISL(1990);
retirement(55)(1990);

interviewQuestions2('teacher')('Michael');


/* Bind, call and apply methods */
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style ==='formal'){
            console.log('Good ' + timeOfDay + ' ladies and gentlemen. I\'m ' + this.name);
        }
        else{
            console.log('Hey, what\'s up!, I\m ' + this.name);
        }
    }
};

john.presentation('formal', 'morning');

var emily={
    name: 'Emily',
    age: 33,
    job: 'designer'
};

john.presentation.call(emily, 'friendly', 'afternoon');
//john.presentation.apply(emily, ['friendly','afternoon']);

var johnfriendly = john.presentation.bind(john, 'friendly');
johnfriendly('night');
johnfriendly('afternoon');


function isFullAge2(limit, el){
    return el >limit
}

// Bind allows us to create a copy of a function with a preset argument.
var fullJapan = arrayCalc(ages, isFullAge2.bind(this, 20));
console.log(ages);
console.log(fullJapan);

/* CODING CHALLENGE
   
*/

//


// Function constructor:
var Person = function(name, yearBirth, job){
    this.name = name;
    this.yearBirth = yearBirth;
    this.job = job;
}

var Question = function(question, options, answer){
    this.question = question;
    this.options = options;
    this.answer = answer;  
}

Question.prototype.printQuestion = function(){
    console.log(this.question);
    for(var i = 0; i < this.options.length; i++)
        console.log(this.options[i]);
}

Question.prototype.isRightAnswer = function(selectedAnswer){
    return selectedAnswer == this.answer;
}


function selectRandomQuestion(){
    var currentScore = 0;
    var quizz = {
        q1: new Question('What is the best country in the world?', ['0.- USA','1.- Mexico','2.- Japan'], 1),
        q2: new Question('Who will win the World Cup?', ['0.- France','1.- England','2.- Croatia'], 2),
        q3: new Question('Which is the best smartphone in the world??', ['0.- Samsung Galaxy', '1.- Google Pixel','2.- Apple iPhone'], 2),
        q4: new Question('What\'s my name', ['0.- Mark','1.- John', '2.- Oliver'], 0),
    };
    selectedQuestionInd = Math.floor(Math.random()*4);
    var qas = [quizz.q1, quizz.q2, quizz.q3, quizz.q4];
    qas[selectedQuestionInd].printQuestion();
    
    return function(selectedAnswer){
        var isRight = qas[selectedQuestionInd].isRightAnswer(selectedAnswer);
        console.log('answer ' + qas[selectedQuestionInd].answer)
        console.log(isRight);
        if (isRight){
            currentScore++;
            console.log('Congratulations, you selected the right answer!');
            console.log('Your current score is ' + currentScore);
        }else{
            console.log('The option you selected is incorrect.');
            console.log('Your current score is ' + currentScore);
        }
        //selectedQuestionInd = Math.floor(Math.random()*4);
        //qas[selectedQuestionInd].printQuestion();
    }    
    
}

var selectedAnswer;
var selectedQuestion = selectRandomQuestion();
while(selectedAnswer !== 'exit'){
    var selectedAnswer = window.prompt('Input the right answer.', '');  
    selectedQuestion(selectedAnswer);
    selectRandomQuestion();
}
























































































































































