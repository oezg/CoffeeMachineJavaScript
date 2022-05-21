// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

function getState(machine) {
  return `The coffee machine has:
${machine.water} ml of water
${machine.milk} ml of milk
${machine.beans} g of coffee beans
${machine.cups} disposable cups
$${machine.money} of money`;
}

function coffeeMachine() {
  let coffeeMachine = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550,
    cantMake(product) {
      if (this.cups < 1) {
        return 'cups';
      } else if (product == 1) {
        if (this.water < 250) {
          return 'water';
        } else if (this.beans < 16) {
          return 'beans';
        }
      } else if (product == 2) {
        if (this.water < 350) {
          return 'water';
        } else if (this.milk < 75) {
          return 'milk';
        } else if (this.beans < 16) {
          return 'beans';
        }
      } else {
        if (this.water < 200) {
          return 'water';
        } else if (this.milk < 100) {
          return 'milk';
        } else if (this.beans < 12) {
          return 'beans';
        }
      }
    },
    make(product) {
      if (product == 1) {
        this.water -= 250;
        this.beans -= 16;
        this.money += 4;
      } else if (product == 2) {
        this.water -= 350;
        this.milk -= 75;
        this.beans -= 20;
        this.money += 7;
      } else {
        this.water -= 200;
        this.milk -= 100;
        this.beans -= 12;
        this.money += 6;
      }
      this.cups -= 1;
    },
    fillWater(amount) {
      this.water += amount
    },
    fillMilk(amount) {
      this.milk += amount
    },
    fillBeans(amount) {
      this.beans += amount
    },
    fillCups(amount) {
      this.cups += amount
    }
  }
  while (true) {
    console.log("Write action (buy, fill, take, remaining, exit):");
    const action = input();
    if (action == 'exit') {
      return;
    } else if (action == 'remaining') {
      console.log();
      console.log(getState(coffeeMachine));
      console.log();
    } else if (action == 'buy') {
      console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
      let product = input();
      if (product == 'back') {
        continue;
      }
      let missing = coffeeMachine.cantMake(product);
      if (missing) {
        console.log(`Sorry, not enough ${missing}!`);
      } else {
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine.make(product)
      }
    } else if (action == "fill") {
      console.log();
      console.log("Write how many ml of water you want to add:");
      coffeeMachine.fillWater(Number(input()));
      console.log("Write how many ml of milk you want to add:");
      coffeeMachine.fillMilk(Number(input()));
      console.log("Write how many grams of coffee beans you want to add:");
      coffeeMachine.fillBeans(Number(input()));
      console.log("Write how many disposable coffee cups you want to add:");
      coffeeMachine.fillCups(Number(input()));
      console.log();
    } else {
      console.log();
      console.log(`I gave you $${coffeeMachine.money}`);
      coffeeMachine.money = 0;
    }
  }
}

coffeeMachine();
