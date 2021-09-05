"use strict";
class Fighter extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 20;
    this.maxhp = this.hp;
    this.dmg = 3;
    this.mana = 80;
    this.actualMana = this.mana;
    this.cost = 20;
    this.specialdmg = 5;
    this.needTarget = true;
    this.protectionAmount = 2;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Dark Vision" : for ${this.cost} mana, ${this.name}'s defensive move exploits his target open guard to inflicts ${this.specialdmg} damages to his target and ends up in a defensive stands, protecting himself for ${this.protectionAmount} damage for each attacks he recieves until next turn.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special() {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;

      this.protection = true;
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
  }
  /**
   * Computer's thinking's method
   * @param  {object} computer : computer currently playing
   * @param  {object} target : computer's target
   * @return {int} 0 or 1 => 0 for normal attack | 1 for special attack
   */
  artificialIntelligence(computer, target) {
    if (computer.hp < 9) {
      return 1;
    } else if (target.hp - computer.specialdmg <= 0) {
      if (target.hp - computer.dmg <= 0) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
