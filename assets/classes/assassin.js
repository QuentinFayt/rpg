class Assassin extends Characters {
  constructor(
    name,
    hp = 6,
    dmg = 6,
    mana = 20,
    cost = 20,
    maxhp = 6,
    specialdmg = 7,
    needTarget = true,
    protection = false
  ) {
    super(name, hp, dmg, mana, cost, maxhp, specialdmg, needTarget, protection);
    this.wasUsed = false;
  }
  description() {
    return `${this.name}'s special ability is "Shadow hit" : for ${this.cost} mana, ${this.name} strikes viciously for ${this.specialdmg} damages and takes the opportunity from her target's screaming giving her a distraction to hide into the shadows, making her ennemis unable to find her next turn.`;
  }
  special(target) {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      let recovered;
      if (this.state !== "dead") {
        if (target.protection) {
          target.hp = target.hp - (this.specialdmg - target.protectionAmount);
        } else {
          target.hp = target.hp - this.specialdmg;
        }
        this.wasUsed = true;
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
