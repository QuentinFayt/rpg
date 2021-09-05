"use strict";
class Paladin extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 18;
    this.maxhp = 18;
    this.dmg = 3;
    this.mana = 120;
    this.actualMana = this.mana;
    this.cost = 40;
    this.specialdmg = 4;
    this.needTarget = true;
    this.healingRecovery = 3;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Healing Lighting" : for ${this.cost} mana, ${this.name} uses holy light to inflicts ${this.specialdmg} damages to his target and healing himself for ${this.healingRecovery} life points in the process.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special() {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;

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

      super.heal(this.healingRecovery);
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
      if (target.hp - computer.dmg <= 0 && computer.hp > computer.maxhp - 5) {
        return 0;
      } else {
        return 1;
      }
    } else {
      if (computer.hp <= computer.maxhp - 5) {
        return 1;
      } else if (computer.hp < computer.maxhp) {
        return Math.floor(Math.random() * 2);
      } else {
        return 0;
      }
    }
  }
}
