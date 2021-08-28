class Monk extends Characters {
  constructor(
    name,
    hp = 13,
    dmg = 3,
    mana = 160,
    cost = 40,
    maxhp = 13,
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
            } %cof your life points! You go back up to %c${
              this.maxhp
            }  %clife!`,
            `color:#32cd32`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        } else {
          console.log(
            `%c${this.name} %cuses Heal and restores %c${
              this.maxhp - this.hp
            } %cof his life points! %c${this.name} %cgoes back up to %c${
              this.maxhp
            } %clife!`,
            `color:#e9this.healingRecovery451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`,
            `color:#e9this.healingRecovery451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        }
        this.hp = this.maxhp;
      } else {
        this.hp = this.hp + this.healingRecovery;
        if (this.user) {
          console.log(
            `You use Heal and restore %c${this.healingRecovery}%c of your life points! You go back up to %c${this.hp} %clife!`,
            `color:#32cd32`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        } else {
          console.log(
            `%c${this.name} %cuses Heal and restores %c${this.healingRecovery}%c of his life points! %c${this.name} %cgoes back up to %c${this.hp} %clife!`,
            `color:#e9this.healingRecovery451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`,
            `color:#e9this.healingRecovery451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        }
      }
      if (this.user) {
        console.log(
          `You now have %c${this.actualMana} mana %cleft.`,
          `color:#1e90ff`,
          `clear`
        );
      } else {
        console.log(
          `%c${this.name} %cnow has %c${this.actualMana} mana %cleft.`,
          `color:#e9this.healingRecovery451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `clear`
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
