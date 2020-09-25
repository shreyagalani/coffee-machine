'use strict'
const io = require('console-read-write');
const coffeeMachine =require('../index');
const { TestScheduler } = require('jest');

const originalLog = io.write
afterEach(() => (io.write = originalLog))
afterAll(async done => {
    io.write = originalLog;
    done();
  });

let consoleOutput = []
const mockWrite = (output) => consoleOutput.push(output)
beforeEach(() => {
    io.write = mockWrite;
    consoleOutput = [];
    coffeeMachine.coffeeMachineCapacity.coffeeBeans=10;
    coffeeMachine.coffeeMachineCapacity.milk=10;
    coffeeMachine.coffeeMachineCapacity.water=10;
})
describe('Serve Cappuccino',()=>{
    test('it should serve Cappuccino when the choice entered is 1 and all required ingredients are available',async()=>{
        await coffeeMachine.processInput('1');
        expect(consoleOutput).toEqual(['Cappuccino has been served successfully'])
    })
    test('it should notify user if the ingredients are not available for Cappuccino',async()=>{
        coffeeMachine.coffeeMachineCapacity.coffeeBeans =1;
        await coffeeMachine.processInput('1');
        expect(consoleOutput).toEqual(['CoffeeBeans not available/ is less than required, 1 more units of CoffeeBeans are required to serve your item'])
    })
})
describe('Serve Latte',()=>{
    test('it should serve Latte when the choice entered is 2 and all required ingredients are available',async()=>{
        await coffeeMachine.processInput('2');
        expect(consoleOutput).toEqual(['Latte has been served successfully'])
    })
    test('it should notify user if the ingredients are not available for Latte',async()=>{
        coffeeMachine.coffeeMachineCapacity.milk =2;
        coffeeMachine.coffeeMachineCapacity.coffeeBeans=1;
        await coffeeMachine.processInput('2');
        expect(consoleOutput).toEqual(['CoffeeBeans not available/ is less than required, 1 more units of CoffeeBeans are required to serve your item','Milk not available/ is less than required, 1 more units of Milk are required to serve your item'])
    })
})
describe('Serve Espresso',()=>{
    test('it should serve Espresso when the choice entered is 1 and all required ingredients are available',async()=>{
        await coffeeMachine.processInput('3');
        expect(consoleOutput).toEqual(['Espresso has been served successfully'])
    })
    test('it should notify user if the ingredients are not available for Espresso',async()=>{
        coffeeMachine.coffeeMachineCapacity.coffeeBeans =1;
        await coffeeMachine.processInput('3');
        expect(consoleOutput).toEqual(['CoffeeBeans not available/ is less than required, 2 more units of CoffeeBeans are required to serve your item'])
    })
})
describe('Serve Milk',()=>{
    test('it should serve Milk when the choice entered is 1 and all required ingredients are available',async()=>{
        await coffeeMachine.processInput('4');
        expect(consoleOutput).toEqual(['Milk has been served successfully'])
    })
    test('it should notify user if the ingredients are not available for Milk',async()=>{
        coffeeMachine.coffeeMachineCapacity.milk =0;
        await coffeeMachine.processInput('4');
        expect(consoleOutput).toEqual(['Milk not available/ is less than required, 3 more units of Milk are required to serve your item'])
    })
})
describe('Serve Water',()=>{
    test('it should serve Water when the choice entered is 1 and all required ingredients are available',async()=>{
        await coffeeMachine.processInput('5');
        expect(consoleOutput).toEqual(['Water has been served successfully'])
    })
    test('it should notify user if the ingredients are not available for Water',async()=>{
        coffeeMachine.coffeeMachineCapacity.water =1;
        await coffeeMachine.processInput('5');
        expect(consoleOutput).toEqual(['Water not available/ is less than required, 2 more units of Water are required to serve your item'])
    })
})
describe('fill ingredients',()=>{
    test('it should fill the ingrident with specified quantity if maximum capacity of the machine has not been exhausted',async()=>{
        coffeeMachine.coffeeMachineCapacity.coffeeBeans=4;
        coffeeMachine.coffeeMachineCapacity.milk=5;
        coffeeMachine.coffeeMachineCapacity.water=6;
        await coffeeMachine.fillIngredients('6','4');
        await coffeeMachine.fillIngredients('7','3');
        await coffeeMachine.fillIngredients('8','2');
        expect(consoleOutput).toEqual(['4 units of coffeeBeans filled successfully','3 units of milk filled successfully','2 units of water filled successfully'])
    })
})
describe('display ingredients',()=>{
    test('it should display the available quantity of ingredients',async()=>{
        await coffeeMachine.processInput('9');
        expect(consoleOutput).toEqual([`Current ingredient quantity
            Coffee Beans :10
            Milk:10
            Water:10`])
        await coffeeMachine.processInput('1')
        consoleOutput=[];
        await coffeeMachine.processInput('9')
        expect(consoleOutput).toEqual([`Current ingredient quantity
            Coffee Beans :8
            Milk:8
            Water:9`])

    })
})