const validChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'R', 'S'];
const validChars32 = [...validChars, 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const VALID_SELCAL_REGEX = /^[A-HJ-NP-S]{2}-[A-HJ-NP-S]{2}$/;
const VALID_SELCAL_32_REGEX = /^[A-HJ-NP-Z1-9]{2}-[A-HJ-NP-Z1-9]{2}$/;

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
  let secondPair;

  // If selcal32 is true and the first pair doesn't contain a SELCAL32 character,
  // generate the second pair with the condition that it must contain a SELCAL32 character
  if (selcal32 && !firstPair.some(char => validChars32.includes(char) && !validChars.includes(char))) {
    do {
      secondPair = getValidCharPair(firstPair, true);
    } while (!secondPair.some(char => validChars32.includes(char) && !validChars.includes(char)));
  } else {
    secondPair = getValidCharPair(firstPair, selcal32);
}

  return `${firstPair.join('')}-${secondPair.join('')}`;
}

export function generateBatch(numCodes, isSelcal32 = false) {
  if (typeof numCodes !== 'number') {
    throw new TypeError('numCodes must be a number');
  }
  if (typeof isSelcal32 !== 'boolean') {
    throw new TypeError('isSelcal32 must be a boolean');
  }

  const codes = [];
  for (let i = 0; i < numCodes; i++) {
    codes.push(getSingleSelcal(isSelcal32));
  }
  return codes;
}

/* SELCAL Check */

/**
 * Returns an object indicating that the code is invalid.
 * @param {string} code - The SELCAL code that is being checked
 * @param {string} note - The reason the code is invalid
 * @returns {Object} An object with properties for the SELCAL code, its validity and a note.
 */
function setInvalid(code, note) {
  return {
    code,
    isValid: false,
    note
  };
}
 
/**
 * Checks if the character pairs in the code are valid.
 * @param {string} code - The SELCAL code that is being checked
 * @returns {Object} - An object indicating if the character pairs are valid, and if not, the reason.
 */
function checkValidCharPairs(code) {
  const pairsArray = code.split('-');
  
  for (let pair of pairsArray) {
    const pairArray = pair.split('');
    const letters = pairArray.filter(char => isNaN(char));
    const numbers = pairArray.filter(char => !isNaN(char));

    const letterIndexes = letters.map(char => validChars32.indexOf(char));
    const numberIndexes = numbers.map(char => validChars32.indexOf(char));

    if (letters.length > 1 && letterIndexes[1] <= letterIndexes[0]) {
      return {
        isValid: false,
        reason: 'Letters not sequential'
      };
    }

    if (numbers.length > 1 && numberIndexes[1] <= numberIndexes[0]) {
      return {
        isValid: false,
        reason: 'Numbers not sequential'
      };
    }
  }

  return {
    isValid: true
  };
}
 
/**
 * Checks if the code contains repeated characters.
 * @param {string} code - The SELCAL code that is being checked
 * @returns {Object} - An object indicating whether or not the code contains repeated characters
 */
function checkRepeatedCharacters(code) {
  const charArray = code.replace('-', '').split('');
  const charSet = new Set(charArray);
  
  return {
    isValid: charSet.size === charArray.length
  };
}

/**
 * Checks if a SELCAL code is valid.
 * @param {string} code - The SELCAL code to check
 * @returns {Object} - An object with properties for the code, its validity, the type of SELCAL code, and a note if the code is invalid.
 */
export function isValidSelcalCode(code) {
  if (typeof code !== 'string') {
    return setInvalid(code, 'code is not a string');
  }
  
  const validationResult = {
    code,
    isValid: null,
    selcalCodeType: null,
    note: null
  }
  
  if (VALID_SELCAL_REGEX.test(code)) {
    validationResult.selcalCodeType = 'selcal';
  } else if (VALID_SELCAL_32_REGEX.test(code)) {
    validationResult.selcalCodeType = 'selcal32';
  } else {
    return setInvalid(code, 'Invalid Character');
  }
  
  const repeatedCharactersCheck = checkRepeatedCharacters(code);
  
  if (!repeatedCharactersCheck.isValid) {
    return setInvalid(code, 'Characters are repeated');
  }
  
  const validCharPairsCheck = checkValidCharPairs(code);
  
  if (!validCharPairsCheck.isValid) {
    return {
      ...validationResult,
      isValid: false,
      note: validCharPairsCheck.reason
    };
  }
  
  return {
    ...validationResult,
    isValid: true
  };
}


// console.log(isValidSelcalCode(6));
// console.log(isValidSelcalCode('AB-CC'));
// console.log(isValidSelcalCode('AB-CD'));
// console.log(isValidSelcalCode('A9-BC'));
// console.log(isValidSelcalCode('AI-BT'));
// console.log(isValidSelcalCode('AB-DC'));
// console.log(isValidSelcalCode('12-AB'));
// console.log(isValidSelcalCode('21-AB'));

//
//
//
//
//

