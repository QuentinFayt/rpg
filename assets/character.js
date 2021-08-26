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
    this.selected = false;
  }
  dealDamage(target) {
    if (this.state !== "dead") {
      let lifetmp = target.hp;
      if (target.protection) {
        if (!(target instanceof Assassin)) {
          target.hp = target.hp - (this.dmg - target.protectionAmount);
        }
      } else {
        target.hp = target.hp - this.dmg;
      }
      if (target.hp <= 0) {
        this.kill(target, lifetmp);
      }
    }
  }
  kill(target, lifetmp) {
    console.log(`%c${this.name} killed ${target.name}!`, `color:#ff4646`);
    target.state = "dead";
    if (this.actualMana !== this.mana) {
      this.recoverMana();
    }
    if (this instanceof Berserker) {
      this.rageleech(lifetmp);
    }
  }
  recoverMana() {
    if (this.actualMana + 20 > this.mana) {
      if (this.player) {
        console.log(
          `You recover %c${
            this.mana - this.actualMana
          } mana%c! You now have %c${this.mana} mana %cleft!`,
          `color:#1e90ff`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      } else {
        console.log(
          `%c${this.name} %crecovers %c${this.mana - this.actualMana} mana! %c${
            this.name
          } %cnow has %c${this.mana} mana %cleft!`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      }
      this.actualMana = this.mana;
    } else {
      this.actualMana = this.actualMana + 20;
      if (this.player) {
        console.log(
          `You recover %c20 mana %c! You now have %c${this.actualMana} mana %cleft!`,
          `color:#1e90ff`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      } else {
        console.log(
          `%c${this.name} %crecovers %c20 mana! %c${this.name} %cnow has %c${this.actualMana} mana %cleft!`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      }
    }
  }
}
