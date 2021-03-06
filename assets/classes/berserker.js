"use strict";
class Berserker extends Characters {
  constructor(name) {
    super();
    this.name = name;
    this.hp = 15;
    this.maxhp = this.hp;
    this.dmg = 4;
    this.mana = 0;
    this.actualMana = this.mana;
    this.cost = 0;
    this.specialdmg = 0;
    this.needTarget = false;
    this.rage = false;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Rage" : for ${this.cost} mana but 1 life point, ${this.name} hurts himself to awake his battle spirit, enraging himself and giving him +1 damage point until the end of the fight. If ${this.name} kills an opponent while being enraged, he leeches half of the damage done.`;
  }
  /**
   * Hero's special ability's method
   * @param  {object} target : user/computer's target
   */
  special() {
    if (this.hp !== 1) {
      if (this.user) {
        console.log(
          `You hurt yourself, loosing %c1%c hp...\nYou get enraged! Your damages increase for %c1%c!`,
          ...HP_COLOR,
          ...DMG_COLOR
        );
      } else {
        console.log(
          `%c${this.name}%c hurts himself, loosing %c1%c hp...\n%c${this.name}%c enrages himself! %c${this.name}%c's damages increase for %c1%c!`,
          ...HERO_COLOR,
          ...HP_COLOR,
          ...HERO_COLOR,
          ...HERO_COLOR,
          ...DMG_COLOR
        );
      }
      this.hp = this.hp - 1;
      this.dmg = this.dmg + 1;
      this.rage = true;
    } else {
      console.log(
        `Your battle spirit restrain your arm... "%cYou can't die by your own hand!%c"`,
        ...ITALIC
      );
    }
  }
  /**
   * Computer's thinking's method
   * @param  {object} computer : computer currently playing
   * @param  {object} target : computer's target
   * @return {int} 0 or 1 => 0 for normal attack | 1 for special attack
   */
  artificialIntelligence(computer, target) {
    if (target.hp - computer.dmg <= 0) {
      return 0;
    } else if (computer.hp > 5) {
      return Math.floor(Math.random() * 2);
    } else {
      return 0;
    }
  }

  /**
   * Leeching killed Target's life method
   * @param  {int} lifeleeched : target's life before the kill
   */
  rageleech(lifeleeched) {
    if (this.rage === true) {
      if (this.hp !== this.maxhp) {
        if (this.hp + lifeleeched > this.maxhp) {
          this.hp = this.maxhp;
        } else {
          this.hp = this.hp + lifeleeched;
        }
        if (this.user) {
          console.log(
            `Enraged, you leech %c${lifeleeched}%c life from your victim! You now have %c${this.hp}%c life left!`,
            ...HP_COLOR,
            ...HP_COLOR
          );
        } else {
          console.log(
            `Enraged, %c${this.name}%c leechs %c${lifeleeched}%c life from his victim! %c${this.name}%c now has %c${this.hp}%c life left!`,
            ...HERO_COLOR,
            ...HP_COLOR,
            ...HERO_COLOR,
            ...HP_COLOR
          );
        }
      }
    }
  }
}
