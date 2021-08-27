class Rogue extends Characters {
  constructor(
    name,
    hp = 10,
    dmg = 6,
    mana = 80,
    cost = 20,
    maxhp = 10,
    specialdmg = 3,
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
    this.wasUsed = false;
  }
  /**
   * Displaying to user hero's special ability's method
   */
  description() {
    return `${this.name}'s special ability is "Double Hit" : for ${this.cost} mana, ${this.name} strikes her enemy for half her damages, but places herself in a better position, making her able to hit someone again in the same turn for the rest of the damages.`;
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
            target.hp = target.hp - (this.specialdmg - target.protectionAmount);
          } else {
            target.hp = target.hp - this.specialdmg;
          }
          this.wasUsed = true;
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
