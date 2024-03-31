# SELCAL Code Generator

This project is a simple SELCAL and SELCAL 32 code generator.

## Features

- Generate a single SELCAL code
- Generate a single SELCAL 32 code

## Usage

Import the `getSingleSelcal` function from the `index.js` file.

```javascript
import { getSingleSelcal } from './index.js';
```

To generate a SELCAL code, call the function without any arguments:

```javascript
  const selcalCode = getSingleSelcal();
  console.log(selcalCode) // Outputs a SELCAL code.
```

To generate a SELCAL 32 code ([refer to ASRI program documentation](https://asri.aero/selcal/selcal-32/)), call the function with `true` as the single argument:

```javascript
  const selcal32Code = getSingleSelcal();
  console.log(selcal32Code) // Outputs a SELCAL 32 code.
```

## Testing

This project includes a suite of tests to ensure correct functionality. To run these tests, use the following command:

```javascript
npm test
```

## Contributing

Contributions are welcome.

## License

This project is licensed under the MIT license.
