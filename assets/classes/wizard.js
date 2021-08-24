class Wizard extends Characters {
  constructor(
    name,
    hp = 10,
    dmg = 2,
    mana = 200,
    cost = 25,
    maxhp = 10,
    specialdmg = 7,
    needTarget = true
  ) {
    super(name, hp, dmg, mana, cost, maxhp, specialdmg, needTarget);
  }
  description() {
    return `${this.name}'s special ability is "Fire Ball" : for ${this.cost} mana, ${this.name} uses his arcane powers to invoke a ball of flame and throw it to his ennemy, dealing ${this.specialdmg} damages!`;
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
