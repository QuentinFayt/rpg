class Turn {
  constructor(characters) {
    this.characters = characters;
    this.whoseTurn();
  }

  whoseTurn() {
    let characterTurn = this.shuffle(
      this.characters.filter((alive) => alive.state === "alive")
    );

    while (characterTurn.length > 0) {
      if (characterTurn[0].state !== "dead") {
        if (characterTurn[0].user === true) {
          this.userTurn(characterTurn[0]);
        } else {
          console.log(`It's ${characterTurn[0].name}'s turn!`);
          let target = this.computerTarget(characterTurn[0]);
          this.computerAction(characterTurn[0], target[0]);
        }
      }
      characterTurn = characterTurn.slice(1, characterTurn.length);
    }
  }

  shuffle(array) {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  showAlivedChar() {
    let survivors = this.characters.filter((alive) => alive.state === "alive");

    survivors.forEach((character) =>
      console.log(
        `${character.name} is still alive with ${character.hp} hp and ${character.actualMana} mana!`
      )
    );
  }

  computerAction(computerTurn, computerTarget) {
    let computerDecision = this.computerAI(computerTurn, computerTarget);

    if (computerDecision === 0) {
      this.talkToUser(computerTurn, computerTarget, 1);
      computerTurn.dealDamage(computerTarget);
    } else {
      if (computerTurn.needTarget) {
        this.talkToUser(computerTurn, computerTarget, 2);
        computerTurn.special(computerTarget);
      } else {
        computerTurn.special();
      }
    }
  }

  computerTarget(me) {
    let target = this.characters
      .filter((alive) => alive.state === "alive")
      .filter((targetable) => targetable.name !== me.name);
    let isItKillable = target.filter((current) => current.hp - me.dmg <= 0);
    let isItKillableWithSpecial = target.filter(
      (current) => current.hp - me.specialdmg <= 0
    );
    if (isItKillableWithSpecial.length > 0 && me.actualMana - me.cost >= 0) {
      return (target = this.shuffle(isItKillableWithSpecial));
    } else if (isItKillable.length > 0) {
      return (target = this.shuffle(isItKillable));
    } else {
      return (target = this.shuffle(target));
    }
  }

  computerAI(computer, target) {
    if (computer.actualMana - computer.cost >= 0) {
      if (computer instanceof Paladin) {
        return computer.paladinAI(computer, target);
      } else if (computer instanceof Monk) {
        return computer.monkAI(computer);
      } else if (computer instanceof Fighter) {
        return computer.fighterAI(computer, target);
      } else if (computer instanceof Berserker) {
        return computer.berserkerAI(computer, target);
      } else if (computer instanceof Assassin) {
        return computer.assassinAI(computer, target);
      } else if (computer instanceof Wizard) {
        return computer.wizardrAI(computer, target);
      }
    } else {
      return 0;
    }
  }

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

  userTurn(player) {
    let userInput;
    let target = [];
    this.talkToUser(player, target, userInput);
    do {
      userInput = Math.trunc(Number(prompt("Choose a number")));
    } while (isNaN(userInput) || userInput < 1 || userInput > 3);
    if (userInput === 3) {
      this.showAlivedChar();
      do {
        userInput = Math.trunc(Number(prompt("Choose a number")));
      } while (isNaN(userInput) || userInput < 1 || userInput > 2);
    }
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
      }
      this.talkToUser(player, target[0], 2);
      player.special(target[0]);
    } else {
      player.special();
    }
  }

  talkToUser(player, target, input) {
    if (input === undefined) {
      console.log(`It's your turn! You currently have ${player.hp} life points, and ${player.mana} mana.

What do you wanna do?
1) Attack
2) Use your special ability
3) Get more info`);
    } else if (input === 3) {
      console.log(`It's your turn! What do you wanna do?
1) Attack
2) Use your special ability`);
    } else if (input === 1) {
      let actualhp = target.hp - player.dmg;
      if (target.protection && !(target instanceof Assassin)) {
        actualhp = actualhp + target.protectionAmount;
      }
      if (actualhp < 0) {
        actualhp = 0;
      }
      if (target.protection && target instanceof Assassin) {
        if (player.user) {
          console.log(`You tried to attack Sylvanas, but she wasn't there!`);
        } else {
          console.log(
            `${player.name} tried to attack Sylvanas, but she wasn't there!`
          );
        }
      } else if (player.user) {
        console.log(
          "You attacked",
          target.name,
          "and inflict",
          player.dmg,
          "damages!"
        );
        if (target.protection && !(target instanceof Assassin)) {
          console.log(`But ${target.protectionAmount} is blocked!`);
        }
        console.log(target.name, "has", actualhp, "life point left!");
      } else {
        console.log(
          player.name,
          "attacks",
          target.name,
          "dealing",
          player.dmg,
          "damages!"
        );
        if (target.protection && !(target instanceof Assassin)) {
          console.log(`But ${target.protectionAmount} is blocked!`);
        }
        console.log(target.name, "has", actualhp, "life point left!");
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
                `You tried to use your special ability on Sylvanas, but she wasn't there!`
              );
            } else {
              console.log(
                `${player.name} tried to use his/her special ability on Sylvanas, but she wasn't there!`
              );
            }
          } else if (player.user) {
            console.log(
              "You target",
              target.name,
              "with your special ability and inflict",
              player.specialdmg,
              "damages!"
            );
            if (target.protection && !(target instanceof Assassin)) {
              console.log(`But ${target.protectionAmount} is blocked!`);
            }
            console.log(target.name, "has", actualhp, "life point left!");
          } else {
            console.log(
              player.name,
              "targets",
              target.name,
              "with his/her special ability and deals",
              player.specialdmg,
              "damages!"
            );
            if (target.protection && !(target instanceof Assassin)) {
              console.log(`But ${target.protectionAmount} is blocked!`);
            }
            console.log(target.name, "has", actualhp, "life point left!");
          }
        }
      } else {
        console.log(
          "You tried to use your special ability... But you lack of mana!"
        );
      }
    }
  }
}
