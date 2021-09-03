"use strict";
//Joueur//
class Characters {
  constructor() {
    this.state = "alive";
    this.user = false;
    this.selected = false;
    this.protection = false;
  }
  /**
   * Dealing normal damage method
   * @param  target object :  user/computer's target
   */
  dealDamage(target) {
    if (this.state !== "dead") {
      let lifetmp = target.hp;
      if (target.protection) {
        if (!(target instanceof Assassin)) {
          target.hp = target.hp - (this.dmg - target.protectionAmount);
        }
      } else {
        target.hp = target.hp - this.dmg;
      }
      if (target.hp <= 0) {
        this.kill(target, lifetmp);
      }
    }
  }
  /**
   * Displaying the kill and calling the right method after a kill is done
   * @param  {object} target : player/computer's target
   * @param  {int} lifetmp : life before the kill for Berserker's special method
   */
  kill(target, lifetmp) {
    console.log(`%c${this.name} killed ${target.name}!`, `color:#ff4646`);
    target.state = "dead";
    this.recoverMana();
    if (typeof this.rageleech === "function") {
      this.rageleech(lifetmp);
    }
  }
  /**
   * Common to all character mana recovery method if a kill is done
   */
  recoverMana() {
    if (this.actualMana !== this.mana) {
      if (this.actualMana + 20 > this.mana) {
        if (this.player) {
          console.log(
            `You recover %c${
              this.mana - this.actualMana
            }%c mana! You now have %c${this.mana}%c mana left!`,
            ...MANA_COLOR,
            ...MANA_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c recovers %c${
              this.mana - this.actualMana
            }%c mana! %c${this.name}%c now has %c${this.mana}%c mana left!`,
            ...HERO_COLOR,
            ...MANA_COLOR,
            ...HERO_COLOR,
            ...MANA_COLOR
          );
        }
        this.actualMana = this.mana;
      } else {
        this.actualMana = this.actualMana + 20;
        if (this.player) {
          console.log(
            `You recover %c20%c mana! You now have %c${this.actualMana}%c mana left!`,
            ...MANA_COLOR,
            ...MANA_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c recovers %c20%c mana! %c${this.name}%c now has %c${this.actualMana}%c mana left!`,
            ...HERO_COLOR,
            ...MANA_COLOR,
            ...HERO_COLOR,
            ...MANA_COLOR
          );
        }
      }
    }
  }
}
