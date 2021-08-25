class Game {
  constructor() {
    console.clear();
    this.turnleft = 10;
    this.state = "ongoing";
    this.characters = this.createChar();
    this.selectYourChampion();
    this.newTurn();
    this.whoWon();
  }

  newTurn() {
    let countTurn = 1;
    do {
      console.log(
        `%cRound ${countTurn}`,
        `font-size:20px ; font-style:bold ; text-decoration:underline ; color:#77f0ff`
      );
      new Turn(this.characters);
      this.characters.forEach((player) => (player.protection = false));
      if (this.characters[4].wasUsed === true) {
        this.characters[4].protection = true;
        this.characters[4].wasUsed = false;
      }
      this.turnleft--;

      if (
        this.characters.filter((alive) => alive.state !== "dead").length ===
          1 ||
        this.turnleft === 0
      ) {
        this.state = "over";
        console.log("%cThe fight is over!", `font-size:15px ; font-style:bold`);
      } else {
        countTurn++;
      }
    } while (this.state === "ongoing");
  }

  createChar() {
    console.log(
      `%cThe fighters stepped in the arena!!!`,
      `font-size:20px ; font-style:bold ; color:#77f0ff`
    );
    return [
      new Fighter("Varian"),
      new Paladin("Arthas"),
      new Monk("Shen"),
      new Berserker("Garrosh"),
      new Assassin("Sylvanas"),
      new Wizard("Medivh"),
    ];
  }

  selectYourChampion() {
    console.log(
      `%cWhat do you wanna play?`,
      `font-size:15px ; font-style:bold ; color:#77f0ff`
    );
    this.characters.forEach((character, index) =>
      console.log(
        `${index + 1}) %c${character.name} %cthe %c${
          character.constructor.name
        } 
%chp: %c${character.hp} 
%cdmg per turn: %c${character.dmg}
%cmax mana: %c${character.mana}
%c${character.description()}`,
        `color:#e97451; font-style: italic`,
        `clear`,
        `color:#00b654`,
        `clear`,
        `color:#32cd32`,
        `clear`,
        `color:#ef1523`,
        `clear`,
        `color:#1e90ff`,
        `clear`
      )
    );
    let userInput;
    let numberOfCharacters = this.characters.length;
    do {
      userInput = Math.trunc(Number(prompt("Choose a number")));
    } while (
      isNaN(userInput) ||
      userInput < numberOfCharacters - numberOfCharacters + 1 ||
      userInput > numberOfCharacters
    );
    userInput = userInput - 1;
    this.characters[userInput].user = true;

    console.log(
      `You chose ${this.characters[userInput].name}!\n
You have:\n
-${this.characters[userInput].hp} life points
-${this.characters[userInput].mana} mana
-You can deal ${this.characters[userInput].dmg} damage per turn
-${this.characters[userInput].description()}`
    );
  }

  whoWon() {
    let competitors = this.characters.filter(
      (alive) => alive.state === "alive"
    );
    let winner = competitors[0];

    for (let i = 1; i < competitors.length; i++) {
      if (winner.hp < competitors[i].hp) {
        winner = competitors[i];
      }
    }
    if (winner.user === true) {
      console.log(
        `%cCongratulation, you won!`,
        `font-size:15px ; font-style:bold`
      );
    } else {
      console.log(`%c${winner.name} won!`, `font-size:15px ; font-style:bold`);
    }
  }
}
