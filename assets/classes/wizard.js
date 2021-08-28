class Wizard extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 12;
    this.maxhp = this.hp;
    this.dmg = 2;
    this.mana = 100;
    this.actualMana = this.mana;
    this.cost = 25;
    this.specialdmg = 7;
    this.needTarget = true;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Fire Ball" : for ${this.cost} mana, ${this.name} uses his arcane powers to invoke a ball of flame and throw it to his ennemy, dealing ${this.specialdmg} damages!`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
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
  /**
   * Computer's thinking's method
   * @param  {object} computer : computer currently playing
   * @param  {object} target : computer's target
   * @return {int} 0 or 1 => 0 for normal attack | 1 for special attack
   */
  artificialIntelligence(computer, target) {
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
