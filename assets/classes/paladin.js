class Paladin extends Characters {
  constructor(
    name,
    hp = 16,
    dmg = 3,
    mana = 160,
    cost = 40,
    maxhp = 16,
    specialdmg = 4,
    needTarget = true,
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
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Healing Lighting" : for ${this.cost} mana, ${this.name} uses holy light to inflicts ${this.specialdmg} damages to his target and healing himself for 5 life points in the process.`;
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
        if (this.hp + 5 > this.maxhp) {
          if (this.hp !== this.maxhp) {
            if (this.user) {
              console.log(
                `You restore %c${
                  this.maxhp - this.hp
                } %cof your life! You get back up to %c${this.maxhp} %clife!`,
                `color:#32cd32`,
                `clear`,
                `color:#32cd32`,
                `clear`
              );
            } else {
              console.log(
                `%c${this.name} %crestores %c${
                  this.maxhp - this.hp
                } %cof his life! %c${this.name} %cgets back up to %c${
                  this.maxhp
                } %clife!`,
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
            this.hp = this.maxhp;
          }
        } else {
          this.hp = this.hp + 5;
          if (this.user) {
            console.log(
              `You restore %c5%c of your life! You get back up to %c${this.hp} %clife!`,
              `color:#32cd32`,
              `clear`,
              `color:#32cd32`,
              `clear`
            );
          } else {
            console.log(
              `%c${this.name} %crestores %c5%c of his life! %c${this.name} %cgets back up to %c${this.hp} %clife!`,
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
