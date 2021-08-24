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
    let countTurn = 2;
    do {
      this.characters.forEach((player) => (player.protection = false));
      if (this.characters[4].wasUsed === true) {
        this.characters[4].protection = true;
        this.characters[4].wasUsed = false;
      }
      new Turn(this.characters);
      this.turnleft--;

      if (
        this.characters.filter((alive) => alive.state !== "dead").length === 1
      ) {
        this.state = "over";
        console.log("The fight is over!");
      } else if (this.turnleft === 0) {
        this.state = "over";
        console.log("The fight is over!");
      } else {
        console.log("Round", countTurn);
        countTurn++;
      }
    } while (this.state === "ongoing");
  }

  createChar() {
    console.log("The fighters stepped in the arena!!!");
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
    console.log("What do you wanna play?");
    this.characters.forEach((character, index) =>
      console.log(
        `${index}) ${character.name} the ${character.constructor.name} 
hp: ${character.hp} 
dmg per turn: ${character.dmg}
max mana: ${character.mana}
${character.description()}`
      )
    );
    let userInput;
    let numberOfCharacters = this.characters.length;
    do {
      userInput = Math.trunc(Number(prompt("Choose a number")));
    } while (
      isNaN(userInput) ||
      userInput < numberOfCharacters - numberOfCharacters ||
      userInput > numberOfCharacters
    );

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
      console.log("Congratulation, you won!");
    } else {
      console.log(winner.name, "won!");
    }
  }
}
