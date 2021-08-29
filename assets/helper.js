/**
 * Randomize array function
 * @param  {array} array : array to shuffle
 * @return {array} array randomized
 */
function shuffle(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}
