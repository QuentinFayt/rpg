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
        console.log(`You tried to heal yourself...But fail!`);
      } else if (this.hp + 8 > this.maxhp) {
        if (this.user) {
          console.log(
            `You use Heal and restore %c${
              this.maxhp - this.hp
            } %cof your life points!`,
            `color:#32cd32`,
            `clear`
          );
        } else {
          console.log(
            `%c${this.name} %cuses Heal and restores %c${
              this.maxhp - this.hp
            } %cof his life points!`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        }
        this.hp = this.maxhp;
      } else {
        if (this.user) {
          console.log(
            `You use Heal and restore %c8%c of your life points!`,
            `color:#32cd32`,
            `clear`
          );
        } else {
          console.log(
            `%c${this.name} %cuses Heal and restores %c8%c of his life points!`,
            `color:#e97451; font-style: italic`,
            `clear`,
            `color:#32cd32`,
            `clear`
          );
        }
        this.hp = this.hp + 8;
      }
      if (this.user) {
        console.log(
          `You now have %c${this.actualMana} mana %cleft.`,
          `color:#1e90ff`,
          `clear`
        );
      } else {
        console.log(
          `%c${this.name} %cnow has %c${this.actualMana} mana %cleft.`,
          `color:#e97451; font-style: italic`,
          `clear`,
          `color:#1e90ff`,
          `clear`
        );
      }
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
