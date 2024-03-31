const validChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'R', 'S'];

function getValidCharPair(excludeChars = []) {
  let localArray = validChars.filter(char => !excludeChars.includes(char));
  let workingArray = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * localArray.length);
    const element = localArray[randomIndex];
    localArray.splice(randomIndex, 1);
    workingArray.push(element);
  }

  return workingArray.sort();
}

export function getSingleSelcal() {
  let res = [];

  const firstPair = getValidCharPair();
  const secondPair = getValidCharPair(firstPair);

  res.push(firstPair.join(''));
  res.push(secondPair.join(''));
  return res.join('-');
}

