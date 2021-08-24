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
        if (target.name !== "Sylvanas") {
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

//Classes//
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
          if (target.name !== "Sylvanas") {
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
}
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
          if (target.name !== "Sylvanas") {
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
class Berzerker extends Characters {
  constructor(
    name,
    hp = 8,
    dmg = 4,
    mana = 0,
    cost = 0,
    maxhp = 8,
    needTarget = false
  ) {
    super(name, hp, dmg, mana, cost, maxhp, needTarget);
  }
  description() {
    return `${this.name}'s special ability is "Rage" : for ${this.cost} mana but 1 life point, ${this.name} hurts himself to awake his battle spirit, enraging himself and giving him +1 damage point until the end of the fight`;
  }
  special() {
    if (this.hp !== 1) {
      console.log(`${this.name} hurts himself, loosing 1 hp...
${this.name} enrages himself! ${this.name}'s damages increases for 1!`);
      this.hp = this.hp - 1;
      this.dmg = this.dmg + 1;
    } else {
      console.log(`${this.name}'s battle spirit restrain his arm...`);
    }
  }
}
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
          if (target.name !== "Sylvanas") {
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
