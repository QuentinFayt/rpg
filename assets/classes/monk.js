class Monk extends Characters {
  constructor(
    name,
    hp = 10,
    dmg = 2,
    mana = 200,
    cost = 25,
    maxhp = 10,
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
          `Uses Heal and ${this.name} restores ${
            this.maxhp - this.hp
          } of his life points!`
        );
        this.hp = this.maxhp;
      } else {
        console.log(
          `Uses Heal and ${this.name} restores 8 of his life points!`
        );
        this.hp = this.hp + 8;
      }
      console.log(`${this.name} now have ${this.actualMana} mana left.`);
    }
  }
  monkAI(computer) {
    if (computer.hp === computer.maxhp) {
      return 0;
    } else if (computer.hp <= computer.maxhp / 2) {
      return 1;
    } else {
      return Math.floor(Math.random() * 2);
    }
  }
}
