class Paladin extends Characters {
  constructor(
    name,
    hp = 16,
    dmg = 3,
    mana = 160,
    cost = 40,
    maxhp = 16,
    specialdmg = 4,
    needTarget = true
  ) {
    super(name, hp, dmg, mana, cost, maxhp, specialdmg, needTarget);
  }
  description() {
    return `${this.name}'s special ability is "Healing Lighting" : for ${this.cost} mana, ${this.name} uses holy light to inflicts ${this.specialdmg} damages to his target and healing himself for 5 life points in the process.`;
  }
  special(target) {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      let recovered;
      if (this.state !== "dead") {
        if (target.protection) {
          if (!target instanceof Assassin) {
            target.hp = target.hp - (this.specialdmg - target.protectionAmount);
          }
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        if (this.hp + 5 > this.maxhp) {
          console.log(
            `${this.name} restores ${this.maxhp - this.hp} of his life points!`
          );
          this.hp = this.maxhp;
        } else {
          console.log(`${this.name} restores 5 of his life points!`);
          this.hp = this.hp + 5;
        }
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
}
