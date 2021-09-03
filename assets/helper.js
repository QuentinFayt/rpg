"use strict";
//Console color const
const HERO_COLOR = [`color:#e97451; font-style: italic`, `clear`];
const CLASS_COLOR = [`color:#00b654`, `clear`];
const DMG_COLOR = [`color:#ef1523`, `clear`];
const HP_COLOR = [`color:#32cd32`, `clear`];
const MANA_COLOR = [`color:#1e90ff`, `clear`];
const ROUND_COLOR = [
  `font-size:20px ; font-style:bold ; text-decoration:underline ; color:#77f0ff`,
];
const ENTERING = [`font-size:20px ; font-style:bold ; color:#77f0ff`];
const TURN_COLOR = [
  `font-size:15px ; font-style:bold ; text-decoration:underline ; color:#e97451`,
];
const END_OF_FIGHT_COLOR = [`font-size:15px ; font-style:bold`];
const BLOCKED_COLOR = [`color:#ffe135`, `clear`];
const ITALIC = [`font-style:italic`, `clear`];
/**
 * Randomize array function
 * @param  {array} array : array to shuffle
 * @return {array} array randomized
 */
function shuffle(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}
