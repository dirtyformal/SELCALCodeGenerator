import 'chai/register-assert.js';
import 'chai/register-expect.js';
import 'chai/register-should.js';

import { getSingleSelcal, generateBatch, isValidSelcalCode } from "../index.js";

describe('SELCAL Code Generation', function() {
  describe('getSingleSelcal()', function() {
    let res;

    before(function() {
      res = getSingleSelcal();
    });

    describe('Formatting Checks', function() {

      it('Should return a single valid formatted code', function() {
        expect(res).to.match(/^([A-S^IONion]{2}-[A-S^IONion]{2})$/gm);
      });

      it('Should not return null or undefined', function() {
        assert.isDefined(res);
        assert.isNotNull(res);
      });

      it('Should not return an empty string', function() {
        assert.isNotEmpty(res);
      });

      it('Should return a string of correct length (5)', function() {
        assert.lengthOf(res, 5);
      });

      it('Should return a string in correct format (xx-xx)', function() {
        assert.match(res, /^[A-S]{2}-[A-S]{2}$/);
      });
      
      it('Should not contain any numbers or special characters', function() {
        let letters = res.replace('-', '');
        assert.notMatch(letters, /[\d~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/);
      });

      it('Should be in uppercase', function() {
        assert.equal(res, res.toUpperCase());
      });
    });

    describe('SELCEL Code Legality', function() {
      it('Should only contain valid SELCAL characters (A-S, no ION)', function() {
        let letters = res.replace('-', '');
        assert.match(letters, /^[A-HJ-NP-S]{4}$/);
      });

      it('Should not have repeated letters', function() {
        let letters = res.replace('-', '').split('');
        let uniqueLetters = [...new Set(letters)];
        assert.deepEqual(letters, uniqueLetters);
      });

      it('Should have each two-letter pair in alphabetical order', function() {
        let pairs = res.split('-');
        pairs.forEach(pair => {
          let letters = pair.split('');
          assert.isTrue(letters[0] <= letters[1]);
        });
      });
    });

  });

  describe('getSingleSelcal(true)', function() {
    let res;

    before(function() {
      res = getSingleSelcal(true);
    });

    describe('SELCAL 32 Code Legality', function() {
      it('Should only contain valid SELCAL 32 characters (A-Z, 1-9, no ION)', function() {
        let res = getSingleSelcal(true);
        let letters = res.replace('-', '');
        assert.match(letters, /^[A-HJ-NP-Z1-9]{4}$/);
      });
  
      it('Should not contain any invalid characters', function() {
        let res = getSingleSelcal(true);
        let letters = res.replace('-', '');
        assert.notMatch(letters, /[^A-HJ-NP-Z1-9]/);
      });
    });

    describe('Handling of invalid input', function() {
      it('Should throw an error when passed an invalid parameter', function() {
        assert.throws(() => getSingleSelcal('invalid'), Error);
      });
    });

  });

  describe('generateBatch()', function() {
    describe('Shared Tests', function() {
      let res;
  
      before(function() {
        res = generateBatch(10, Math.random() < 0.5);
      });
  
      it('Should return an array', function() {
        expect(res).to.be.an('array');
      });
  
      it('Should return the correct number of codes', function() {
        expect(res).to.have.lengthOf(10);
      });
  
      it('Should not return null or undefined values', function() {
        for (let code of res) {
          assert.isDefined(code);
          assert.isNotNull(code);
        }
      });
  
      it('Should not return any empty strings', function() {
        for (let code of res) {
          assert.isNotEmpty(code);
        }
      });

      it('Should throw a TypeError if numCodes is not a number', function() {
        assert.throws(() => generateBatch('not a number', false), TypeError, 'numCodes must be a number');
      });
  
      it('Should throw a TypeError if isSelcal32 is not a boolean', function() {
        assert.throws(() => generateBatch(10, 'not a boolean'), TypeError, 'isSelcal32 must be a boolean');
      });
    });

    describe('generateBatch()', function() {
      let res;

      before(function() {
        res = generateBatch(10, false);
      });

      it('Should return only valid SELCAL codes', function() {
        for (let code of res) {
          expect(code).to.match(/^([A-S^IONion]{2}-[A-S^IONion]{2})$/gm);
        }
      });
    });

    describe('generateBatch(true)', function() {
      let res;
    
      before(function() {
        res = generateBatch(10, true);
      });
    
      it('Should return only valid SELCAL32 codes', function() {
        for (let code of res) {
          expect(code).to.match(/^([A-HJ-NP-Z1-9]{2}-[A-HJ-NP-Z1-9]{2})$/gm);
        }
      });
    }); 
  });

  describe('isValidSelcalCode()', function() {
    it('should return a correctly formatted object for a generated valid SELCAL code', function() {
      let genSelcalCode = getSingleSelcal();
      let res = isValidSelcalCode(genSelcalCode);
      assert.deepEqual(res, { code: genSelcalCode, isValid: true, selcalCodeType: 'selcal', note: null  });
    });

    it('should return a correctly formatted object for a generated valid SELCAL32 code', function() {
      let genSelcal32Code = getSingleSelcal(true);
      let res = isValidSelcalCode(genSelcal32Code);
      assert.deepEqual(res, { code: genSelcal32Code, isValid: true, selcalCodeType: 'selcal32', note: null  })
    });

    it('should return correct invalid object for non-string inputs', function() {
      let res = isValidSelcalCode(6666);
      assert.deepEqual(res, { code: 6666, isValid: false, note: 'code is not a string' } );
    });

    it('should return correct invalid object for invalid SELCAL codes', function() {

      let duplicateChar = isValidSelcalCode('AB-CC');
      assert.deepEqual(duplicateChar, { code: 'AB-CC', isValid: false, note: 'Characters are repeated' } );

      let lettersNotSeq = isValidSelcalCode('AB-DC');
      assert.deepEqual(lettersNotSeq, { code: 'AB-DC', isValid: false, note: 'Letters not sequential', selcalCodeType: 'selcal' } );

      let numbersNotSeq = isValidSelcalCode('21-AB');
      assert.deepEqual(numbersNotSeq, { code: '21-AB', isValid: false, note: 'Numbers not sequential', selcalCodeType: 'selcal32' });

    });
  });



});