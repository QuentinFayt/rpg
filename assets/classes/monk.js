"use strict";
class Monk extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 13;
    this.maxhp = this.hp;
    this.dmg = 3;
    this.mana = 160;
    this.actualMana = this.mana;
    this.cost = 40;
    this.specialdmg = 0;
    this.needTarget = false;
    this.healingRecovery = 9;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Heal" : for ${this.cost} mana, ${this.name} attempts to use his ki to heal himself from up to ${this.healingRecovery} life points.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special() {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      if (this.hp === this.maxhp) {
        console.log(`You tried to heal yourself...But fail!`);
      } else if (this.hp + this.healingRecovery > this.maxhp) {
        if (this.user) {
          console.log(
            `You use Heal and restore %c${
              this.maxhp - this.hp
            }%c of your life points! You go back up to %c${this.maxhp}%c life!`,
            ...HP_COLOR,
            ...HP_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c uses Heal and restores %c${
              this.maxhp - this.hp
            }%c of his life points! %c${this.name}%c goes back up to %c${
              this.maxhp
            }%c life!`,
            ...HERO_COLOR,
            ...HP_COLOR,
            ...HERO_COLOR,
            ...HP_COLOR
          );
        }
        this.hp = this.maxhp;
      } else {
        this.hp = this.hp + this.healingRecovery;
        if (this.user) {
          console.log(
            `You use Heal and restore %c${this.healingRecovery}%c of your life points! You go back up to %c${this.hp}%c life!`,
            ...HP_COLOR,
            ...HP_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c uses Heal and restores %c${this.healingRecovery}%c of his life points! %c${this.name}%c goes back up to %c${this.hp}%c life!`,
            ...HERO_COLOR,
            ...HP_COLOR,
            ...HERO_COLOR,
            ...HP_COLOR
          );
        }
      }
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
   * @return {int} 0 or 1 => 0 for normal attack | 1 for special attack
   */
  artificialIntelligence(computer) {
    if (computer.hp === computer.maxhp) {
      return 0;
    } else if (computer.hp <= computer.maxhp / 2) {
      return 1;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
