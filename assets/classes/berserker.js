import { Character } from "../character";

export class Berserker extends Character {
  constructor(
    name,
    hp = 9,
    dmg = 4,
    mana = 0,
    cost = 0,
    maxhp = 9,
    specialdmg = 0,
    needTarget = false,
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
          `You hurt yourself, loosing %c1 hp%c...
You get enraged! Your damages increase for %c1%c!`,
          `color:#32cd32`,
          `clear`,
          `color:#ef1523`,
          `clear`
        );
      } else {
        console.log(
          `%c${this.name} %churts himself, loosing %c1 hp%c...
%c${this.name} %cenrages himself! %c${this.name}%c's damages increase for %c1%c!`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#32cd32`,
          `clear`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#ef1523`,
          `clear`
        );
      }
      this.hp = this.hp - 1;
      this.dmg = this.dmg + 1;
      this.rage = true;
    } else {
      console.log(
        `Your battle spirit restrain your arm... "%cYou can't die by your own hand!%c"`,
        `font-style:italic`,
        `clear`
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
            `Enraged, you leech %c${lifeleeched} life %cfrom your victim! You now have %c${this.hp} life %cleft!`,
            `color:#32cd32`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        } else {
          console.log(
            `Enraged, %c${this.name} %cleechs %c${lifeleeched} life %cfrom his victim! %c${this.name} %cnow has %c${this.hp} life %cleft!`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        }
      }
    }
  }
}
