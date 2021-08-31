"use strict";

class Turn {
  constructor(characters) {
    this.characters = characters;
    this.whoseTurn();
  }
  /**
   * all of one turn actions loading method
   */
  whoseTurn() {
    let characterTurn = shuffle(
      this.characters.filter((alive) => alive.state === "alive")
    );
    while (characterTurn.length > 0) {
      if (characterTurn[0].state !== "dead") {
        if (characterTurn[0].user === true) {
          this.userTurn(characterTurn[0]);
        } else {
          if (
            characterTurn[0] instanceof Rogue &&
            characterTurn.wasUsed === true
          ) {
            console.log(
              `%c${player.name}'s special ability grants her another turn!`,
              `font-size:15px ; font-style:bold ; text-decoration:underline ; color:#e97451`
            );
          } else {
            console.log(
              `%cIt's ${characterTurn[0].name}'s turn!`,
              `font-size:15px ; font-style:bold ; text-decoration:underline ; color:#e97451`
            );
          }
          let target = this.computerTarget(characterTurn[0]);
          this.computerAction(characterTurn[0], target[0]);
        }
      }
      characterTurn = this.slicingPreviousCharacterOut(
        characterTurn[0],
        characterTurn
      );
    }
  }
  /**
   * Display all still alived characters method
   */
  showAlivedChar() {
    let survivors = this.characters.filter((alive) => alive.state === "alive");

    survivors.forEach((character) =>
      console.log(
        `%c${character.name} %cis still alive with %c${character.hp} hp %cand %c${character.actualMana} mana%c!`,
        `color:#e97451; font-style: italic`,
        `clear`,
        `color:#32cd32`,
        `clear`,
        `color:#1e90ff`,
        `clear`
      )
    );
  }
  /**
   * Loading all others method necessary for a computer to play method
   * @param  {object} computerTurn : computer currently playing
   * @param  {object} computerTarget : computer's target
   */
  computerAction(computerTurn, computerTarget) {
    let computerDecision = this.computerAI(computerTurn, computerTarget);

    if (computerDecision === 0) {
      this.talkToUser(computerTurn, computerTarget, 1);
      computerTurn.dealDamage(computerTarget);
    } else {
      if (computerTurn.needTarget) {
        if (computerTurn instanceof Rogue && computerTurn.wasUsed === true) {
          this.talkToUser(computerTurn, computerTarget, 1);
        } else {
          this.talkToUser(computerTurn, computerTarget, 2);
        }
        computerTurn.special(computerTarget);
      } else {
        computerTurn.special();
      }
    }
  }
  /**
   * Computer's target selecting method
   * @param  {object} computer : computer currently playing
   * @return {array} return array of randomized valuable targets
   */
  computerTarget(computer) {
    let target = this.characters
      .filter((alive) => alive.state === "alive")
      .filter((targetable) => targetable.name !== computer.name);
    let isItKillable = target.filter(
      (current) => current.hp - computer.dmg <= 0
    );
    let isItKillableWithSpecial = target.filter(
      (current) => current.hp - computer.specialdmg <= 0
    );
    if (
      isItKillableWithSpecial.length > 0 &&
      computer.actualMana - computer.cost >= 0
    ) {
      return (target = shuffle(isItKillableWithSpecial));
    } else if (isItKillable.length > 0) {
      return (target = shuffle(isItKillable));
    } else {
      return (target = shuffle(target));
    }
  }
  /**
   * Loading instanced class's method
   * @param  {object} computer : current computer playing
   * @param  {object} target : current computer's target
   * @return {int} either 1 or 0 depending on what the computer want to do
   */
  computerAI(computer, target) {
    if (computer.actualMana - computer.cost >= 0) {
      return computer.artificialIntelligence(computer, target);
    } else {
      return 0;
    }
  }
  /**
   * Player's target selecting's method
   * @param  {object} user : current selected user's hero class
   * @return {string} will always be a existing name from current fighter's list
   */
  userTarget(user) {
    let userInput;
    console.log("Who do you want to attack?");
    do {
      userInput = prompt("Write the name").toLowerCase();
      userInput = userInput.replace(/\b[a-z]/g, function (x) {
        return x.toUpperCase();
      });
    } while (
      userInput === user.name ||
      !this.characters
        .map((valuableTarget) => valuableTarget.name)
        .includes(userInput) ||
      this.characters.filter((notdead) => notdead.name === userInput)[0]
        .state === "dead"
    );
    return userInput;
  }
  /**
   * Every step of a player's turn method
   * @param  {object} player : current selected user's hero class
   */
  userTurn(player) {
    let userInput;
    let target = [];
    this.talkToUser(player, target, userInput);
    if (player instanceof Rogue && player.wasUsed === true) {
      do {
        userInput = Math.trunc(Number(prompt("Choose a number")));
      } while (isNaN(userInput) || userInput < 1 || userInput > 2);
      if (userInput === 1) {
        userInput = this.userTarget(player);
        target = this.characters.filter(
          (userTarget) => userTarget.name === userInput
        );
        this.talkToUser(player, target[0], 1);
        player.special(target[0]);
      }
      if (userInput === 2) {
        userInput = 3;
        this.showAlivedChar();
        this.talkToUser(player, target, userInput);
        userInput = this.userTarget(player);
        target = this.characters.filter(
          (userTarget) => userTarget.name === userInput
        );
        this.talkToUser(player, target[0], 1);
        player.special(target[0]);
      }
    } else {
      do {
        userInput = Math.trunc(Number(prompt("Choose a number")));
      } while (isNaN(userInput) || userInput < 1 || userInput > 3);
      if (userInput === 3) {
        this.showAlivedChar();
        this.talkToUser(player, target, userInput);
        do {
          userInput = Math.trunc(Number(prompt("Choose a number")));
        } while (isNaN(userInput) || userInput < 1 || userInput > 2);
      }
    }
    if (!(player instanceof Rogue) || player.wasUsed !== true) {
      if (userInput === 1) {
        userInput = this.userTarget(player);
        target = this.characters.filter(
          (userTarget) => userTarget.name === userInput
        );
        this.talkToUser(player, target[0], 1);
        player.dealDamage(target[0]);
      } else if (userInput === 2) {
        if (player.needTarget) {
          userInput = this.userTarget(player);
          target = this.characters.filter(
            (userTarget) => userTarget.name === userInput
          );
          this.talkToUser(player, target[0], 2);
          player.special(target[0]);
        } else {
          player.special();
        }
      }
    }
  }
  /**
   * Displaying every action to user, depending on the input method
   * @param  {object} player : user/computer selected class
   * @param  {object} target : user/computer's target
   * @param  {int} input : user/computer's choice, either undefined, 1 , 2 or 3
   */
  talkToUser(player, target, input) {
    if (input === undefined) {
      if (player instanceof Rogue && player.wasUsed === true) {
        console.log(
          `%cYour special ability grants you another turn!`,
          `font-size:15px ; font-style:bold ; text-decoration:underline ; color:#e97451`
        );
        console.log(
          `You currently have %c${player.hp} life points %cand %c${player.actualMana} mana.
        
%cWhat do you wanna do?
1) Attack for %c${player.specialdmg} %cdamages
2) Get more info`,
          `color:#32cd32`,
          `clear`,
          `color:#1e90ff`,
          `clear`,
          `color:#ef1523`,
          `clear`
        );
      } else {
        console.log(
          `%cIt's your turn!`,
          `font-size:15px ; font-style:bold ; text-decoration:underline ; color:#e97451`
        );
        console.log(
          `You currently have %c${player.hp} life points %cand %c${player.actualMana} mana.
        
%cWhat do you wanna do?
1) Attack for %c${player.dmg} %cdamages
2) Use your special ability
3) Get more info`,
          `color:#32cd32`,
          `clear`,
          `color:#1e90ff`,
          `clear`,
          `color:#ef1523`,
          `clear`
        );
      }
    } else if (input === 3) {
      if (player instanceof Rogue && player.wasUsed === true) {
        console.log(
          `
It's still your turn! You currently have %c${player.hp} life points %cand %c${player.actualMana} mana%c.`,
          `color:#32cd32`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      } else {
        console.log(
          `It's still your turn! Your currently have %c${player.hp} life points %cand %c${player.actualMana} mana.
%cWhat do you wanna do?
1) Attack for %c${player.dmg} %cdamages
2) Use your special ability`,
          `color:#32cd32`,
          `clear`,
          `color:#1e90ff`,
          `clear`,
          `color:#ef1523`,
          `clear`
        );
      }
    } else if (input === 1) {
      let actualhp = target.hp;
      if (player instanceof Rogue && player.wasUsed === true) {
        actualhp -= player.specialdmg;
      } else {
        actualhp -= player.dmg;
      }
      if (target.protection) {
        if (!(target instanceof Assassin)) {
          actualhp = actualhp + target.protectionAmount;
        } else {
          if (actualhp < 0) {
            actualhp = 0;
          }
          if (player.user) {
            console.log(
              `You tried to attack %c${target.name}%c, but she wasn't there!`,
              `color:#e97451; font-style: italic`,
              `clear`
            );
          } else {
            console.log(
              `%c${player.name} %ctried to attack %c${target.name}%c, but she wasn't there!`,
              `color:#e97451; font-style: italic`,
              `clear`,
              `color:#e97451; font-style: italic`,
              `clear`
            );
          }
        }
      } else if (player.user) {
        let actualdmg = player.dmg;
        if (player instanceof Rogue && player.wasUsed === true) {
          actualdmg = player.specialdmg;
        }
        console.log(
          `You attacked %c${target.name} %cand inflict %c${actualdmg} damages!`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#ef1523`
        );
      } else {
        if (player instanceof Rogue && player.wasUsed === true) {
          console.log(
            `%c${player.name} %cattacks %c${target.name}%c, dealing %c${player.specialdmg} damages!`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#ef1523`
          );
        } else {
          console.log(
            `%c${player.name} %cattacks %c${target.name}%c, dealing %c${player.dmg} damages!`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#ef1523`
          );
        }
      }
      if (!(target instanceof Assassin)) {
        if (target.protection) {
          console.log(
            `But %c${target.protectionAmount} %cis blocked!`,
            `color:#ffe135`,
            `clear`
          );
        }
        console.log(
          `%c${target.name} %chas %c${actualhp} %clife point left!`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#32cd32`,
          `clear`
        );
      }
    } else if (input === 2) {
      if (player.actualMana >= player.cost) {
        if (!(player instanceof Monk) && !(player instanceof Berserker)) {
          let actualhp = target.hp - player.specialdmg;
          if (target.protection && !(target instanceof Assassin)) {
            actualhp = actualhp + target.protectionAmount;
          }
          if (actualhp < 0) {
            actualhp = 0;
          }
          if (target.protection && target instanceof Assassin) {
            if (player.user) {
              console.log(
                `You tried to use your special ability on %c${target.name}%c, but she wasn't there!`,
                `color:#e97451; font-style: italic`,
                `clear`
              );
            } else {
              console.log(
                `%c${player.name} %ctried to use his/her special ability on %c${target.name}%c, but she wasn't there!`,
                `color:#e97451; font-style: italic`,
                `clear`,
                `color:#e97451; font-style: italic`,
                `clear`
              );
            }
          } else if (player.user) {
            console.log(
              `You target %c${target.name} %cwith your special ability and inflict %c${player.specialdmg} damages!`,
              `color:#e97451; font-style: italic`,
              `clear`,
              `color:#ef1523`
            );
          } else {
            console.log(
              `%c${player.name} %ctargets %c${target.name} %cwith his/her special ability and deals %c${player.specialdmg} damages!`,
              `color:#e97451; font-style: italic`,
              `clear`,
              `color:#e97451; font-style: italic`,
              `clear`,
              `color:#ef1523`
            );
          }
          if (!(target instanceof Assassin)) {
            if (target.protection) {
              console.log(
                `But %c${target.protectionAmount} %cis blocked!`,
                `color:#ffe135`,
                `clear`
              );
            }
            console.log(
              `%c${target.name} %chas %c${actualhp} %clife point left!`,
              `color:#e97451; font-style: italic`,
              `clear`,
              `color:#32cd32`,
              `clear`
            );
          }
        }
      } else {
        console.log(
          "You tried to use your special ability... But you lack of mana!"
        );
      }
    }
  }
  /**
   * Slicing current player out of array to make the next player able to play
   * @param  {object} currentPlayer : current player to slice out
   * @param  {array} alivedCharacters :  list of next players that still have to play this turn
   * @return {array} list of next players that still have to play this turn without current player
   */
  slicingPreviousCharacterOut(currentPlayer, alivedCharacters) {
    let testForRogue = this.characters.filter(
      (alive) => alive.state === "alive"
    ).length;
    if (
      currentPlayer instanceof Rogue &&
      currentPlayer.wasUsed === true &&
      testForRogue > 1 &&
      currentPlayer.state !== "dead"
    ) {
      alivedCharacters.push(currentPlayer);
      return alivedCharacters.slice(1, alivedCharacters.length);
    } else {
      return alivedCharacters.slice(1, alivedCharacters.length);
    }
  }
}
