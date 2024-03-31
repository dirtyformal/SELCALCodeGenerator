const validChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'R', 'S'];

function getValidCharPair() {
  let localArray = validChars;
  let workingArray = [];

  for (let i = 0; i < 2; i++) {
    // Calculate random index
    const randomIndex = Math.floor(Math.random() * localArray.length);  

    // If the first randomIndex value points to an 'S', restart the for loop.
    if (randomIndex === localArray.length){
      i=-1; continue;
    }


    const element = localArray[randomIndex];
    localArray = localArray.slice(randomIndex + 1);

    workingArray.push(element);

  }

  return workingArray;
}

export function getSingleSelcal() {
  let res = [];

  const firstPair = getValidCharPair();
  const secondPair = getValidCharPair();

  // Iterate through the second pair to check if any of the characters are the same as the first pair, if so, regenerate the second pair.
  for (let i = 0; i < secondPair.length; i++) {
    if (firstPair.includes(secondPair[i])) {
      return getSingleSelcal();
    }
  }
  

  res.push(firstPair.join(''));
  res.push(secondPair.join(''));
  return res.join('-');
}

