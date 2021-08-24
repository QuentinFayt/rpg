class Monk extends Characters {
  constructor(
    name,
    hp = 8,
    dmg = 2,
    mana = 200,
    cost = 25,
    maxhp = 8,
    needTarget = false
  ) {
    super(name, hp, dmg, mana, cost, maxhp, needTarget);
  }
  description() {
    return `${this.name}'s special ability is "Heal" : for ${this.cost} mana, ${this.name} attempts to use his ki to heal himself from up to 8 life points.`;
  }
  special() {
    if (this.actualMana >= this.cost) {
      this.actualMana = this.actualMana - this.cost;
      if (this.hp === this.maxhp) {
        console.log(`${this.name} tries to heal himself...But fails!`);
      } else if (this.hp + 8 > this.maxhp) {
        console.log(
          `${this.name} restores ${this.maxhp - this.hp} of his life points!`
        );
        this.hp = this.maxhp;
      } else {
        console.log(`${this.name} restores 8 of his life points!`);
        this.hp = this.hp + 8;
      }
      console.log(`${this.name} now have ${this.actualMana} mana left.`);
    }
  }
}
