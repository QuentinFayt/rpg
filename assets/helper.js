export const shuffle = (array) => array.sort((a, b) => 0.5 - Math.random());
/**
 * function qui demanderait au user un input et vérifierait qu'il
 * est valide range des input acceptés + le body de ce qu'on demande
 * @param  {string} body :
 * @param  {array} values :
 * @return {string} | @return {int} :
 */
export function promptUser(body, values) {
  console.log(values);
  let userInput;
  if (values.every((value) => typeof value === 'number')) {
    do {
      userInput = Math.trunc(Number(prompt(body)));
    } while (!values.includes(userInput));
    return userInput;
  } else {
    do {
      userInput = prompt(body);
      console.log(userInput);
      //console.log(/^\\d$/.test(userInput));
      if (!isNaN(parseInt(userInput, 10))) {
        userInput = parseInt(userInput, 10);
      }
      console.log(values.includes(userInput));
      if (typeof userInput === 'string' && values.includes(userInput)) {
        userInput = values.indexOf(userInput);
      }
      console.log(typeof userInput);
      console.log(typeof userInput === 'number');
    } while (typeof userInput !== 'number' || userInput < 0 || userInput > values.length);
    return userInput;
  }
}
