"use strict";
class Rogue extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 15;
    this.maxhp = this.hp;
    this.dmg = 5;
    this.mana = 60;
    this.actualMana = this.mana;
    this.cost = 20;
    this.specialdmg = 3;
    this.needTarget = true;
    this.wasUsed = false;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Double Hit" : for ${this.cost} mana, ${this.name} strikes her enemy for ${this.specialdmg} damages, but places herself in a better position, making her able to hit someone again in the same turn for ${this.specialdmg} damages.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special(target) {
    if (this.wasUsed !== true) {
      if (this.actualMana >= this.cost) {
        this.actualMana = this.actualMana - this.cost;
        if (this.state !== "dead") {
          if (target.protection) {
            if (!(target instanceof Assassin)) {
              target.hp =
                target.hp - (this.specialdmg - target.protectionAmount);
            }
          } else {
            target.hp = target.hp - this.specialdmg;
          }
          this.wasUsed = true;
          if (this.user) {
            console.log(
              `You now have %c${this.actualMana}%c mana left.`,
              MANA_COLOR
            );
          } else {
            console.log(
              `%c${this.name}%c now has %c${this.actualMana}%c mana left.`,
              HERO_COLOR,
              MANA_COLOR
            );
          }
        }
        if (target.hp <= 0) {
          super.kill(target);
        }
      }
    } else {
      if (this.state !== "dead") {
        if (target.protection) {
          target.hp = target.hp - (this.specialdmg - target.protectionAmount);
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        this.wasUsed = false;
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
    if (computer.wasUsed === true) {
      return 1;
    }
    if (target.hp - computer.specialdmg <= 0) {
      return 1;
    } else if (target.hp - computer.dmg <= 0) {
      return 0;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
