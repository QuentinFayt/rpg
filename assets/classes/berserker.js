class Berserker extends Characters {
  constructor(
    name,
    hp = 9,
    dmg = 4,
    mana = 0,
    cost = 0,
    maxhp = 9,
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
    this.rage = false;
  }
  description() {
    return `${this.name}'s special ability is "Rage" : for ${this.cost} mana but 1 life point, ${this.name} hurts himself to awake his battle spirit, enraging himself and giving him +1 damage point until the end of the fight. If ${this.name} kills an opponent while being enraged, he leeches half of the damage done.`;
  }
  special() {
    if (this.hp !== 1) {
      console.log(`${this.name} hurts himself, loosing 1 hp...
${this.name} enrages himself! ${this.name}'s damages increases for 1!`);
      this.hp = this.hp - 1;
      this.dmg = this.dmg + 1;
      this.rage = true;
    } else {
      console.log(`${this.name}'s battle spirit restrain his arm...`);
    }
  }
  berserkerAI(computer, target) {
    if (target.hp - computer.dmg <= 0) {
      return 0;
    } else if (computer.hp > 5) {
      return Math.floor(Math.random() * 2);
    } else {
      return 0;
    }
  }
}
