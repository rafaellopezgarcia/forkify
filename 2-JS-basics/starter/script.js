
/*////////////////////////
* Variables and data types
*/////////////////////////
console.log('Hello world2');
var firstName = 'John';
console.log(firstName);

var lastName = 'Smith';
var age = 28;
var fullAge = true;

console.log(fullAge);

var job;
console.log(job);//This will print undefined to the console.

/* 
* Reassigning a value to job.
*/
job = 'teacher';
console.log(job);

/*////////////////////
* Type coercion
*////////////////////
console.log(firstName + ' ' + age);
var job2, isMarried;
job2 = 'teacher';
isMarried = false;

console.log(firstName + ' is ' + age + ' years old' + ' Is he married? ' + isMarried);

/*///////////////////
* Variable mutation
*///////////////////
age = 'twenty-eight';

var lastName2;
//lastName2= prompt('What is its last name?');
console.log(firstName + ' ' + lastName2);


/**********************
* Basic operators
*/

var JohnsAge = 28;
var year = 2018;
var yearJohn = year - JohnsAge;
var twiceAge = JohnsAge * 2;

console.log(yearJohn);
console.log(twiceAge);

// Logical operators
var twiceHigher = twiceAge > JohnsAge;

console.log ('Is twice higher than single? ' + twiceHigher);

// Typeof operator
console.log(typeof twiceHigher);
console.log(typeof JohnsAge);

/************************
* Operator precedence
* - operator has a precedance of 16, less than is 
*/
var now = 2018;
var MarksYear = 1980;
var fullAge = 18;

// - applied first, then >= and then =
var isFullAge = now - MarksYear >= fullAge;
console.log(isFullAge);

var MarksAge = now - MarksYear;
var FranksAge = 53;
var average = (MarksAge + FranksAge) / 2;
console.log(average);

// Multiple assignments
// Assignment operator works from right to left:
var x, y;
x = y = (3+5)*4-6; //8*4-6 -> 32-6 -> 26
console.log(x + ' ' + y);

// More operators
x *= 2; // x = x * 2;
x += 10; // x = x + 10;
x++; // x = x + 1;


/**********************
* If and Else statements 
*/
var fName = 'Toni';
var civilStatus = 'single';

if (civilStatus === 'single'){
    console.log(fName + ' is single');
    console.log('Lets just forget about it');
}else{
    console.log(fName + ' is not single');
}

for (var i = 0; i < 10; i++){
    if (i < 5){
        console.log(i);
    }    
}


/***********************
* The ternary operator
*/

var fName2 = 'Bruce';
var age = 16;
age > 18 ? console.log(fName2 + ' drinks beer.') : console.log(fName2 + ' does not drink beer.');


/**********************
* Switch statement
*/


var job = 'Wh';

switch (job){
    case 'teacher':
        console.log("He is a teacher.");
        break;
    case 'Driver':
        console.log('He drives an Uber.');
        break;
    default:
        console.log('I dont really know what he does');
}


/*************************
* Truthy and Falsy values
*/
// falsy values: undefined, null, 0, '', NaN
// truthy values: all the values that are not falsy

var height = 23;

if (height || height === 0){
    console.log('Variable is defined');
} else{
    console.log('The variable has not been defined');
}

/*************************
* Equality operators
*/
// Operator == does type coercion: 23 == '23' holds.

if (height === '23'){
    console.log('The operator == does type coercion');
}

/**************************
* Functions
*/

function calculateAge(birthYear){
    var now = 2018;
    var age = now - birthYear;
    return age;
}


var age = calculateAge(2010);
var age2 = calculateAge(1990);
var age3 = calculateAge(2000);
console.log('His age is ' + age + ' years old.');
console.log('His age is ' + age2 + ' years old.');
console.log('His age is ' + age3 + ' years old.');

function yearsUntilRetirement(birthYear, firstName){
    var age = calculateAge(birthYear);
    var retirement = 65 - age;
    console.log(firstName + ' has ' + retirement + ' until retirement');
}

yearsUntilRetirement(1990, 'John');

/************************************************
* Function statements and expressions
*/
// Expressions are a piece of code which always produce a value
// Statements just produce actions but do not provide an immediate result.

// Function declaration
//function whatDoYouDo(job, name){}
// Function expression
var whatDoYouDo = function(job, name){
    switch (job){
        case 'teacher':
            return name + ' teaches kids how to code';
        case 'designer':
            return name + ' makes SolidWorks models';
        default:
            return name + ' receives money for what he does'
    }    
}


console.log(whatDoYouDo('teacher', 'John'));
console.log(whatDoYouDo('designer', 'Mark'));

/****************************************
* Arrays 
*/
// They are collections of variables. They can grow over time.
var names = ['John', 'Mark', 'Jane', 'Monica'];
var years = new Array('1990', '1996', '1999', '2005');

console.log(names[0]);
console.log(names.length);
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names.length);

for (i = 0; i < names.length; i++){
    console.log(names[i]);
}

var JohnData = ['John', 'Smith', 1990, 'teacher', false];
JohnData.push('Blue');
JohnData.unshift('Mr');
var last =JohnData.pop();
JohnData.shift();

for(i = 0; i < JohnData.length; i++){
    console.log([JohnData[i]]);
}

console.log(last);
// Returns -1 if the element is not in the array.
console.log(JohnData.indexOf(1990));


/********************************************
* Objects and properties
*/
// With values we define key value pairs, in which each value has a name.
// In arrays the order matters a lot, while in object it does not matter.

var JohnObj = {
    name: 'John',
    lastname: 'Smith',
    occupation: 'Designer',
    nationality: 'American',
    family: ['Jane', 'Mark', 'Bob', 'Emely']
};

console.log(JohnObj.lastname);
var occ = 'occupation';
console.log(JohnObj['lastname']);
console.log(JohnObj[occ]);

/**************************************
* Objects and methods
*/

var JohnObj2 = {
    name: 'John',
    lastname: 'Smith',
    birthYear: 1990,
    occupation: 'Designer',
    nationality: 'American',
    family: ['Jane', 'Mark', 'Bob', 'Emely'],
    calcAge: function(){
        this.age =  2018 - this.birthYear;    
    }
};

JohnObj2.calcAge();
console.log(JohnObj2);

































































































