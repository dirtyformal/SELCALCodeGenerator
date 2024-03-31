const validChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'R', 'S'];

function getValidCharPair(excludeChars = []) {
  const localArray = validChars.filter(char => !excludeChars.includes(char));
  const workingArray = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * localArray.length);
    const element = localArray[randomIndex];
    localArray.splice(randomIndex, 1);
    workingArray.push(element);
  }

  return workingArray.sort();
}

export function getSingleSelcal() {
  const firstPair = getValidCharPair();
  const secondPair = getValidCharPair(firstPair);

  return `${firstPair.join('')}-${secondPair.join('')}`;
}
