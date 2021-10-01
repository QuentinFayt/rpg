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
   * checking which method to call
   * @param {object} target :  user/computer's target
   * @param {string} input : user/computer's action choice (1 => normal attack, 2 => special)
   */
  dealDamage(target, input) {
    switch (input) {
      case "1":
        this.recieveDamage(target, this.dmg);
        break;
      case "2":
        this.special(target);
        this.recieveDamage(target, this.specialdmg);
        break;
    }
  }

  /**
   * changing computer/user's target's life method depending on amount
   * @param {object} target :  user/computer's target
   * @param  {int} amount : amount of damages to deal to the target
   */
  recieveDamage(target, amount) {
    let lifeTemp = target.hp;
    if (target.protection) {
      if (!(target instanceof Assassin)) {
        target.hp -= amount - target.protectionAmount;
      }
    } else {
      target.hp -= amount;
    }
    if (target.hp <= 0) {
      this.kill(target, lifeTemp);
    }
  }
  /**
   * Displaying the kill and calling the right method after a kill is done
   * @param  {object} target : player/computer's target
   * @param  {int} lifeTemp : life before the kill for Berserker's special method
   */
  kill(target, lifeTemp) {
    console.log(`%c${this.name} killed ${target.name}!`, `color:#ff4646`);
    target.state = "dead";
    this.recoverMana();
    if (typeof this.rageleech === "function") {
      this.rageleech(lifeTemp);
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
  /**
   * Healing method
   * @param  {int} recovery : amount that the hero can regen
   */
  heal(recovery) {
    if (this.hp + recovery > this.maxhp) {
      if (this.hp !== this.maxhp) {
        if (this.user) {
          console.log(
            `You restore %c${
              this.maxhp - this.hp
            }%c of your life! You get back up to %c${this.maxhp}%c life!`,
            ...HP_COLOR,
            ...HP_COLOR
          );
        } else {
          console.log(
            `%c${this.name}%c restores %c${
              this.maxhp - this.hp
            }%c of his life! %c${this.name}%c gets back up to %c${
              this.maxhp
            }%c life!`,
            ...HERO_COLOR,
            ...HP_COLOR,
            ...HERO_COLOR,
            ...HP_COLOR
          );
        }
        this.hp = this.maxhp;
      }
    } else {
      this.hp = this.hp + recovery;
      if (this.user) {
        console.log(
          `You restore %c${recovery}%c of your life! You get back up to %c${this.hp}%c life!`,
          ...HP_COLOR,
          ...HP_COLOR
        );
      } else {
        console.log(
          `%c${this.name}%c restores %c${recovery}%c of his life! %c${this.name}%c gets back up to %c${this.hp}%c life!`,
          ...HERO_COLOR,
          ...HP_COLOR,
          ...HERO_COLOR,
          ...HP_COLOR
        );
      }
    }
  }
}
