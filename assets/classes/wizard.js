class Wizard extends Characters {
  constructor(
    name,
    hp = 9,
    dmg = 2,
    mana = 200,
    cost = 25,
    maxhp = 10,
    specialdmg = 7,
    needTarget = true,
    protection = false,
    protectionAmount = 0
  ) {
    super(
      name,
      hp,
      dmg,
      mana,
      cost,
      maxhp,
      specialdmg,
      needTarget,
      protection,
      protectionAmount
    );
  }
  description() {
    return `${this.name}'s special ability is "Fire Ball" : for ${this.cost} mana, ${this.name} uses his arcane powers to invoke a ball of flame and throw it to his ennemy, dealing ${this.specialdmg} damages!`;
  }
  special(target) {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      if (this.state !== "dead") {
        if (target.protection) {
          if (!(target instanceof Assassin)) {
            target.hp = target.hp - (this.specialdmg - target.protectionAmount);
          }
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        if (this.user) {
          console.log(
            `You now have %c${this.actualMana} %cmana left.`,
            `color:#1e90ff`,
            `clear`
          );
        } else {
          console.log(
            `%c${this.name} %cnow has %c${this.actualMana} %cmana left.`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#1e90ff`,
            `clear`
          );
        }
      }
      if (target.hp <= 0) {
        super.kill(target);
      }
    }
  }
  wizardrAI(computer, target) {
    if (target.hp - computer.specialdmg <= 0) {
      if (target.hp - computer.dmg <= 0) {
        return 0;
      } else {
        return 1;
      }
    } else if (computer.actualMana >= computer.cost * 3) {
      return 1;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
