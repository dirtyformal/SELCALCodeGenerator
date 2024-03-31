import 'chai/register-assert.js';
import 'chai/register-expect.js';
import 'chai/register-should.js';

import { getSingleSelcal, generateBatch } from "../index.js";

describe('SELCAL Code Generation', function() {
  describe('Normal SELCAL Code', function() {
    let res;

    before(function() {
      res = getSingleSelcal();
      console.log(`The test SELCAL code is: ${res}`);
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

  describe('SELCAL 32 Code', function() {
    let res;

    before(function() {
      res = getSingleSelcal(true);
      console.log(`The test SELCAL32 code is: ${res}`);
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

  describe('Batch Generation of SELCAL Codes', function() {
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

    describe('SELCAL Codes', function() {
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

    describe('SELCAL32 Codes', function() {
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
});