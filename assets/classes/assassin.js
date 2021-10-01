"use strict";
class Assassin extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 12;
    this.maxhp = this.hp;
    this.dmg = 6;
    this.mana = 20;
    this.actualMana = this.mana;
    this.cost = 20;
    this.specialdmg = 7;
    this.needTarget = true;
    this.wasUsed = false;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Shadow hit" : for ${this.cost} mana, ${this.name} strikes viciously for ${this.specialdmg} damages and takes the opportunity from her target's screaming giving her a distraction to hide into the shadows, making her ennemis unable to find her next turn.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special() {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      if (this.state !== "dead") {
        if (target.protection) {
          target.hp = target.hp - (this.specialdmg - target.protectionAmount);
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        this.wasUsed = true;
        if (this.user) {
          console.log(
            `You now have %c${this.actualMana}%c mana left.`,
            ...MANA_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c now has %c${this.actualMana}%c mana left.`,
            ...HERO_COLOR,
            ...MANA_COLOR
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
    if (computer.hp <= 5) {
      return 1;
    } else if (target.hp - computer.specialdmg <= 0) {
      return 1;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
