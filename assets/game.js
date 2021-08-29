class Game {
  constructor() {
    console.clear();
    this.turnleft = 10;
    this.numberOfFighters = 5;
    this.state = "ongoing";
    this.newTurn();
  }
  /**
   * Game loading method
   */
  newTurn() {
    this.characters = this.createChar();
    const listOfFighters = this.randomizePullOfCharacters(this.characters);
    this.displayListOfFighters(listOfFighters);
    let countTurn = 1;
    do {
      if (
        listOfFighters.filter((alive) => alive.state !== "dead").length === 1 ||
        this.turnleft === 0
      ) {
        this.state = "over";
        console.log("%cThe fight is over!", `font-size:15px ; font-style:bold`);
      } else {
        console.log(
          `%cRound ${countTurn}`,
          `font-size:20px ; font-style:bold ; text-decoration:underline ; color:#77f0ff`
        );
        this.turnleft--;
        new Turn(listOfFighters);
        this.resetProtectiveState(listOfFighters);
        countTurn++;
      }
    } while (this.state === "ongoing");
    this.whoWon(listOfFighters);
  }
  /**
   * Hero class loading method
   * @return {array} list of all playable characters
   */
  createChar() {
    return [
      new Fighter("Varian"),
      new Paladin("Arthas"),
      new Monk("Shen"),
      new Berserker("Garrosh"),
      new Assassin("Sylvanas"),
      new Wizard("Medivh"),
      new Rogue("Valeera"),
    ];
  }
  /**
   * User's character selection method
   * @param {array} charactersList : list of all playable characters
   * @return {object} user's selection
   */
  selectYourChampion(charactersList) {
    console.log(
      `%cWhat do you wanna play?`,
      `font-size:15px ; font-style:bold ; color:#77f0ff`
    );
    charactersList.forEach((character, index) =>
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
    let numberOfCharacters = charactersList.length;
    do {
      userInput = Math.trunc(Number(prompt("Choose a number")));
    } while (
      isNaN(userInput) ||
      userInput < numberOfCharacters - numberOfCharacters + 1 ||
      userInput > numberOfCharacters
    );
    userInput = userInput - 1;
    charactersList[userInput].user = true;
    charactersList[userInput].selected = true;
    console.clear();

    console.log(
      `You chose %c${charactersList[userInput].name}%c!
You have:
-%c${charactersList[userInput].hp} %clife points
-%c${charactersList[userInput].mana} %cmana
-You can deal %c${charactersList[userInput].dmg} %cdamage per turn
-${charactersList[userInput].description()}`,
      `color:#e97451; font-style: italic`,
      `clear`,
      `color:#32cd32`,
      `clear`,
      `color:#1e90ff`,
      `clear`,
      `color:#ef1523`,
      `clear`
    );
    return charactersList[userInput];
  }
  /**
   * Resetting all temporary protective state before next turn method
   * @param {array} charactersList : list of in current game characters
   */
  resetProtectiveState(charactersList) {
    charactersList.forEach((player) => (player.protection = false));
    let assassin = charactersList.filter(
      (character) => character instanceof Assassin
    );
    if (assassin.length >= 1) {
      if (assassin[0].wasUsed === true) {
        assassin[0].protection = true;
        assassin[0].wasUsed = false;
      }
    }
  }
  /**
   * randomization of heroes list w/o user selection method
   * @param {array} charactersList : list of all playable characterss
   * @return {array} list of heroes for the game with user at 0 index
   */
  randomizePullOfCharacters(charactersList) {
    let user = this.selectYourChampion(charactersList);
    let listOfFighters = [];

    for (let i = 0; i < this.numberOfFighters - 1; i++) {
      let notSelected = charactersList.filter(
        (character) => character.selected !== true
      );
      listOfFighters[i] = shuffle(notSelected)[0];
      notSelected[0].selected = true;
    }
    listOfFighters.push(user);
    return listOfFighters.reverse();
  }
  /**
   * displaying list of playable character for user selection method
   * @param  {array} listofChar : list of all playable characters
   */
  displayListOfFighters(listofChar) {
    console.log(
      `%cThe fighters stepped in the arena!!!`,
      `font-size:20px ; font-style:bold ; color:#77f0ff`
    );
    listofChar.forEach((character) =>
      console.log(
        `%c${character.name} %centers the arena!`,
        `color:#e97451; font-style: italic`,
        `clear`
      )
    );
  }
  /**
   * checking and displaying who won method
   * @param {array} listOfFighters : list of all current game characters
   */
  whoWon(listOfFighters) {
    let competitors = listOfFighters.filter((alive) => alive.state === "alive");
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
