//BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value){
        this.id =id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round( (this.value / totalIncome) * 100 );
        }else{
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    
    var Income = function(id, description, value){
        this.id =id;
        this.description = description;
        this.value = value;
    };
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp : 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    
    return{
        addItem: function(type, des, val){
            var newItem, ID;
            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else{
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure            
            data.allItems[type].push(newItem);
                        
            // Return new element
            return newItem;
        },
        
        deleteItem: function(type, id){
            var ids, index;

            // Map returns a brand new array:
            ids = data.allItems[type].map(function(current){
                return current.id;                
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1){
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget: function(){
            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');        
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // Calculate the percentage of income that we spent
            if (data.totals.inc > 0){
                data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        
        calculatePercentages: function(){
            /* 
               a = 20;
               b = 10;
               c = 40;
               income = 100;
               a = 20 / income;
            */            
            
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);                
            });
        },
        
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });            
            return allPerc;
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                expenses: data.totals.exp,
                percentage: data.percentage
            }            
        },
    
        testing: function(){
            console.log(data);
        }
    };
    
    
})();


//UI CONTROLLER
var uiController = (function(){
     var DOMStrings = {
         inputType: '.add__type',
         inputDescription: '.add__description',
         inputValue: '.add__value',
         inputBtn: '.add__btn',
         incomeContainer: '.income__list',
         expensesContainer: '.expenses__list',
         budgetLabel: '.budget__value',
         incomeValue: '.budget__income--value', 
         expensesValue: '.budget__expenses--value',
         percentageLabel: '.budget__expenses--percentage',
         container: '.container',
         expensesPercLabel: '.item__percentage',
         dateLabel: '.budget__title--month'
     };
    
    var formatNumber = function(num, type){
            /* 
               +/- before the number
               Exactly two decimal points
               Comma separating the thousands
            */
            
            var numSplit, int, dec;
            
            num = Math.abs(num);
            num = num.toFixed(2);// It puts exactly only two decimal numbers.
            numSplit = num.split('.');
            int = numSplit[0];
            dec = numSplit[1];
            if (int.length > 3){
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3,3); // input 2310, output 2,310
                
            }
            
            dec = numSplit[1];            
            return (type == 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;  
     };
    
     var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
            callback(list[i], i);
        }                
    };  

    return{
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)// Converts string to a number.
            };
        },
        
        addListItem: function(obj, type){
            var html, newHtml, element;
            
            // Create HTML string with placeholder text
            if (type === 'inc'){
                html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMStrings.incomeContainer;
            }else{

                html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMStrings.expensesContainer;
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  
            
        },
        
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        clearFields: function(){
            var fields, fieldsArr;
            //(It returns a list)
            fields =document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);    
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(curr, idx, array){
                curr.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeValue).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMStrings.expensesValue).textContent = formatNumber(obj.expenses, 'exp');
            if (obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
            
        },
        
        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);   
                
            nodeListForEach(fields, function(current, index){ 
                // Do some stuff.
                if (percentages[index] > 0){
                    current.textContent = percentages[index] + '%'; 
                }else{
                    current.textContent = '---';
                }
            });
        },
        
        displayMonth: function(){
            var now, year, month, months;
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August']
            
            year = now.getFullYear(); 
            month = now.getMonth();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        changeType: function(){
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' + 
                DOMStrings.inputDescription + ',' + 
                DOMStrings.inputValue
            );       
            
            nodeListForEach(fields, function(curr){
               curr.classList.toggle('red-focus'); 
            });            
            
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },
        
        getDOMStrings: function(){
            return DOMStrings;
        }
    };
})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, uiCtrl){
    var setupEventListeners = function(){
        var DOM = uiCtrl.getDOMStrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);        
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changeType);
    };
    
    
    var updateBudget = function(){
        // 1.- Calculate the budget
        budgetCtrl.calculateBudget();
        // 2.- Return the budget
        var budget = budgetCtrl.getBudget();
        // 3.- Display the budget on the UI
        uiCtrl.displayBudget(budget);
        
        
    };
    
    var updatePercentages = function(){
        // 1.- Calculate the percentages
        budgetCtrl.calculatePercentages();
        // 2.- Read the percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        // 3.- Update the UI with the new percentages
        uiCtrl.displayPercentages(percentages);        
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        // 1.- Get the field input data
        input = uiCtrl.getInput();
        if (input.description !=="" && !isNaN(input.value) && input.value > 0){
            // 2.- Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3.- Add the item to the UI
            uiCtrl.addListItem(newItem, input.type);
            // 4.- Clear the fields
            uiCtrl.clearFields();        
            // 5.- Calculate and update budget
            updateBudget();
            // 6.- Calculate and update percentages
            updatePercentages();
        }        
        
    };
    
    var ctrlDeleteItem = function(event){
        var itemID, type, ID;
        itemID =event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID){
            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID  = parseInt(splitID[1]);
            
            // 1.- Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            // 2.- Delete the item from the UI
            uiCtrl.deleteListItem(itemID);
            // 3.- Update and show the new budget
            updateBudget();
            // 4.- Update percentages
            updatePercentages();
        }
    }
    
    return{
        init: function(){
            console.log('Application has started.');
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                expenses: 0,
                percentage: -1
            });
            uiCtrl.displayMonth();
            setupEventListeners();
         
        }
    };
})(budgetController, uiController);


controller.init();

/* Event delegation: Not setup the event handler on the original
   element but attach it to a parent element and catch the 
   event there.
   
   It is used
   1.- When we have an element with lot of child elements.
   2.- When we want an event handler attached to an element
       that is not yet in the DOM when our page is loaded.
   Event bubbling: when an event is fired on some DOM element,
   the sam exact event is fired on all the parent elements.
   The element that caused the event to hapen is the target
   element which is stored as a property in the event object.
   All the parent elements will know the target element of the
   event.
   
   

*/


/* Node.js
   Node is written in C++ because V8, the JavaScript engine is written in C++.
   ECMAScript is the standard Javascript is based on.
   A JavaScript engine is a program that converts JavaScript code into something 
   the computer processor can understand.
   V8 is JavaScript engine developed by google. V8 can run embedded C++ programs.
   This allows the adding of features to JavaScript.
   Node.js is a C++ program with V8 embedded that has added a lot of features that
   make it suitable to be a server technology.
   
   Servers and clients
   Node.js is a server technology.
   A server is a computer that is performing services. A client ask for those ser-
   vices. The client asks for a request to the server, and the server responds. 
   This request and response are in some standard format that both understand.
   The internet has a web server accepting requests for work or data and provide
   responses. The browser is the client. The format for requests and responses is
   HTTP. PHP, C# and RUBY are typical programming languages for the server. The
   purpose of node.js is to use JavaScript for the web server.
   
   What does JavaScript need to manage a server?
   - Better ways to organize its code into resusable pieces.
   - Ways to deal with files.
   - Ways to deal with databases.
   - The ability to communicate over the Internet.
   - The ability to accept requests and send responses.
   - A way to deal with work that takes a long time
   
   

*/







































