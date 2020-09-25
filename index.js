'use strict'
const io = require('console-read-write');
const coffeeMachineCapacity = {
    coffeeBeans: 10,
    milk: 10,
    water: 10
}

function userInput(selectedOption) {

    optionProcessMaping[selectedOption](selectedOption);

}
const optionProcessMaping = {
    '1': processInput,
    '2': processInput,
    '3': processInput,
    '4': processInput,
    '5': processInput,
    '6':fillIngredients,
    '7':fillIngredients,
    '8':fillIngredients,
    '9':displayQuantities,
    '10':function(){io.write('Thank You!!');
    process.exit();}

}
const recepies = {
    Cappuccino: {
        coffeeBeans: 2,
        milk: 2,
        water: 1
    },
    Latte: {
        coffeeBeans: 2,
        milk: 3,
        water: 1
    },
    Espresso: {
        coffeeBeans: 3,
        milk: 0,
        water: 1
    },
    Milk: {
        coffeeBeans: 0,
        milk: 3,
        water: 0
    },
    Water: {
        coffeeBeans: 0,
        milk: 0,
        water: 3
    }

};
const optionItemMapping = {
    '1': 'Cappuccino',
    '2': 'Latte',
    '3': 'Espresso',
    '4': 'Milk',
    '5': 'Water',
    '6': 'coffeeBeans',
    '7': 'milk',
    '8': 'water'
};
const validOptionList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function isValidOption(option) {
    return validOptionList.includes(option);
}

function isValidQuantity(quantity) {
    return quantity <= 10;
}

function isingredientsAvailable(itemName) {
    const recepie = recepies[itemName];
    if (coffeeMachineCapacity.coffeeBeans >= recepie.coffeeBeans && coffeeMachineCapacity.milk >= recepie.milk && coffeeMachineCapacity.water >= recepie.water) {
        return true;
    }
    return false;
}

function calculateShortage(itemName) {
    const recepie = recepies[itemName];
    const shortage = {
        CoffeeBeans: coffeeMachineCapacity.coffeeBeans < recepie.coffeeBeans ? Math.abs(coffeeMachineCapacity.coffeeBeans - recepie.coffeeBeans) : 0,
        Milk: coffeeMachineCapacity.milk < recepie.milk ? Math.abs(coffeeMachineCapacity.milk - recepie.milk) : 0,
        Water: coffeeMachineCapacity.water < recepie.water ? Math.abs(coffeeMachineCapacity.water - recepie.water) : 0
    };
    for (const [key, value] of Object.entries(shortage)) {
        if (value > 0) {
            io.write(`${key} not available/ is less than required, ${value} more units of ${key} are required to serve your item`);
        }
    }
}

function checkIngredientsAndServeItem(selectedOption) {
    const itemName = optionItemMapping[selectedOption];
    const canServe = isingredientsAvailable(itemName);
    if (!canServe) {
        calculateShortage(itemName);
    } else {
        coffeeMachineCapacity.milk -= recepies[itemName].milk;
        coffeeMachineCapacity.coffeeBeans -= recepies[itemName].coffeeBeans;
        coffeeMachineCapacity.water -= recepies[itemName].water;
        io.write(`${itemName} has been served successfully`);
    }

}
async function fillIngredients(selectedOption) {
    const ingredient = optionItemMapping[selectedOption];
    let quantity = (`${await io.ask('Enter the quantity:')}`);
    while (!isValidQuantity(coffeeMachineCapacity[ingredient] + parseInt(quantity))) {
        quantity = (`${await io.ask(`The maximum capacity of the machine is 10 units and available units are ${coffeeMachineCapacity[ingredient]}, Enter valid quantity:`)}`);
    }

    coffeeMachineCapacity[ingredient] += parseInt(quantity)
    io.write(`${quantity} units of ${ingredient} filled successfully`);
}

function displayQuantities(){
    io.write(`Current ingredient quantity
            Coffee Beans :${coffeeMachineCapacity.coffeeBeans}
            Milk:${coffeeMachineCapacity.milk}
            Water:${coffeeMachineCapacity.water}`)
}

async function processInput(selectedOption) {

    switch (selectedOption) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            checkIngredientsAndServeItem(selectedOption);
            break;
        case '6':
        case '7':
        case '8':
            await fillIngredients(selectedOption);
            break;
        case '9':

            break;
        case '10':
            
            break;
        default:
            io.write('Opps! Something went wrong');
            break;
    }
}

async function coffeeMachine() {
    // Simple readline scenario
    io.write(`Please select a choice from the following options:
    1. Serve Cappuccino
    2. Serve Latte
    3. Serve Espresso
    4. Serve Milk
    5. Serve Water
    6. Fill coffee beans
    7. Fill Milk
    8. Fill Water
    9. Display current ingredient quantity
    10. Turn off`);
    let selectedOption = (`${await io.ask('Enter the choice:')}`);
    while (!isValidOption(selectedOption)) {
        selectedOption = (`${await io.ask('Enter valid choice:')}`);
    }
    await userInput(selectedOption);
    await coffeeMachine();
}
if (process.argv[2] && process.argv[2] === 'coffeeMachine') {
    coffeeMachine();
}
module.exports = {
    processInput,
    coffeeMachineCapacity,
    fillIngredients,
    optionItemMapping
};