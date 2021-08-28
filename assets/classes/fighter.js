class Fighter extends Characters {
  constructor(
    name,
    hp = 20,
    dmg = 3,
    mana = 80,
    cost = 20,
    maxhp = 20,
    specialdmg = 5,
    needTarget = true,
    protection = false,
    protectionAmount = 2
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
    return `${this.name}'s special ability is "Dark Vision" : for ${this.cost} mana, ${this.name}'s defensive move exploits his target open guard to inflicts ${this.specialdmg} damages to his target and ends up in a defensive stands, protecting himself for ${this.protectionAmount} damage for each attacks he recieves until next turn.`;
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
        this.protection = true;
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
