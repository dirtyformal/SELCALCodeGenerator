# SELCAL Code Generator

This project is a simple SELCAL and SELCAL 32 code generator.

## Features

- Generate a single SELCAL code
- Generate a single SELCAL 32 code
- Generate a batch of SELCAL codes
- Generate a batch of SELCAL and SELCAL 32 codes
- Validate SELCAL codes

## Usage

Import the `getSingleSelcal`, `generateBatch` and `validateSelcal` functions from the `index.js` file.

```javascript
import { getSingleSelcal, generateBatch, isValidSelcalCode } from './index.js';
```

### Single SELCAL Code:

To generate a SELCAL code, call the function without any arguments:

```javascript
  const selcalCode = getSingleSelcal();
  console.log(selcalCode) // Outputs a SELCAL code.
```

### Single SELCAL 32 Code:

To generate a SELCAL 32 code ([refer to ASRI program documentation](https://asri.aero/selcal/selcal-32/)), call the function with `true` as the single argument:

```javascript
  const selcal32Code = getSingleSelcal(true);
  console.log(selcal32Code) // Outputs a SELCAL 32 code.
```

### Batch of SELCAL Codes:

To generate a batch of SELCAL codes, call the `generateBatch` function with the number of codes you want to generate:

```javascript
const selcalCodes = generateBatch(10);
console.log(selcalCodes) // Outputs an array of 10 SELCAL codes
```

### Batch of SELCAL 32 Codes:

To generate a batch of SELCAL and SELCAL 32 codes, call the `generateBatch` function with the number of codes you want to generate, and `true` as the second argument.

**Note**: This will generate *both* SELCAL and SELCAL32 codes. As these are random, there is every chance you will not have a SELCAL 32 code generated. 

```javascript
const selcal32Codes = generateBatch(10, true);
console.log(selcal32Codes) // Outputs an array of 10 SELCAL and SELCAL 32 codes
```

### Validate SELCAL codes

To validate a SELCAL code, call the `isValidSelcalCode()` function, with the code you would like to validate. The function is expecting a string, following the format `XX-XX`.

```javascript
const validSelcalReturnObj = isValidSelcalCode('AB-CD');
console.log(validSelcalReturnObj) // Logs an object containing various return parameters
```

The validation function will return a object, with the following keys:

``` javascript
{
  code: {string}, // Original SELCAL code string passed into the function
  isValid: {Boolean}, // Will return true if the code passes all validation checks, and false if it fails any.
  selcalCodeType: {string}, // Will return a string containing the SELCAL code type. either 'selcal' or 'selcal32'.
  note: null // Returns null by default. If validation has failed, it be a string containing the reason for validation failure.
}
```



## Testing

This project includes a suite of tests to ensure correct functionality. To run these tests, use the following command:

```javascript
npm test
```

## Roadmap

I am looking to add:

- ~~**Batch Code Generation**: A function to generate a batch of unique SELCAL or SELCAL 32 codes, or a mixture of.~~
- **Advanced Batch Generation**: Generate a given number of codes, with an explicit number of each type. For example, 30 codes, where 12 are SELCAL 32 codes.
  - This will likely require me to split out SELCAL and SELCAL 32 generation into their own discrete functions.
- **Code Generation with Constraints**: An option to generate codes that meet certain constraints, such as starting with certain characters.
- ~~**Code Validation**: A function to validate a given SELCAL or SELCAL 32 code.~~
- **Add to NPM**: Add to NPM as a package.

## Contributing

Contributions are welcome.

## License

This project is licensed under the MIT license.
