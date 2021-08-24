//Joueur//
class Characters {
  constructor(
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
  ) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.cost = cost;
    this.maxhp = maxhp;
    this.state = "alive";
    this.specialdmg = specialdmg;
    this.needTarget = needTarget;
    this.protection = protection;
    this.protectionAmount = protectionAmount;
    this.actualMana = this.mana;
    this.user = false;
  }
  dealDamage(target) {
    let recovered;
    if (this.state !== "dead") {
      if (target.protection) {
        if (!target instanceof Assassin) {
          target.hp = target.hp - (this.dmg - target.protectionAmount);
        }
      } else {
        target.hp = target.hp - this.dmg;
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
