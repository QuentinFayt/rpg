class Fighter extends Characters {
  constructor(
    name,
    hp = 12,
    dmg = 4,
    mana = 40,
    cost = 20,
    maxhp = 12,
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
  description() {
    return `${this.name}'s special ability is "Dark Vision" : for ${this.cost} mana, ${this.name}'s defensive move exploits his target open guard to inflicts ${this.specialdmg} damages to his target and ends up in a defensive stands, protecting himself for ${this.protectionAmount} damage for each attacks he recieves until next turn.`;
  }
  special(target) {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      let recovered;
      if (this.state !== "dead") {
        if (target.protection) {
          if (!(target instanceof Assassin)) {
            target.hp =
              target.hp - (this.dmg.specialdmg - target.protectionAmount);
          }
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        this.protection = true;
        console.log(`${this.name} now has ${this.actualMana} mana left.`);
      }
      if (target.hp <= 0) {
        console.log(`${this.name} killed ${target.name}!`);
        target.state = "dead";
        if (this.actualMana !== this.mana) {
          if (this.actualMana + 20 > this.mana) {
            recovered = this.mana - this.actualMana;
            console.log(`${this.name} recovers ${recovered} mana point!`);
            this.actualMana = this.mana;
          } else {
            console.log(`${this.name} recovers 20 mana point!`);
            this.actualMana = this.actualMana + 20;
          }
          console.log(`${this.name} now has ${this.actualMana} mana left!`);
        }
      }
    }
  }
  fighterAI(computer, target) {
    if (computer.hp < 7) {
      return 1;
    } else if (target.hp - computer.specialdmg <= 0) {
      return 1;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
