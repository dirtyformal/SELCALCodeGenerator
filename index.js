const validChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'R', 'S'];
const validChars32 = [...validChars, 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function getValidCharPair(excludeChars = [], selcal32 = false) {
  const localArray = (selcal32 ? validChars32 : validChars).filter(char => !excludeChars.includes(char));
  const workingArray = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * localArray.length);
    const element = localArray[randomIndex];
    localArray.splice(randomIndex, 1);
    workingArray.push(element);
  }

  return workingArray.sort();
}

export function getSingleSelcal(selcal32 = false) {
  if (typeof selcal32 !== 'boolean') {
    throw new Error('Invalid argument: selcal32 must be a boolean');
  }

  const firstPair = getValidCharPair([], selcal32);
  const secondPair = getValidCharPair(firstPair, selcal32);

  return `${firstPair.join('')}-${secondPair.join('')}`;
}