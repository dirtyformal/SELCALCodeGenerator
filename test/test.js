import 'chai/register-assert.js';
import 'chai/register-expect.js';
import 'chai/register-should.js';

import { getSingleSelcal } from "../index.js";

describe('SELCAL Code Check', function() {
  let res;

  before(function() {
    res = getSingleSelcal();
    console.log(`The test code is: ${res}`);
  });

  describe('Return a single SELCAL Code', function() {

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

    describe('SELCAL code shall be legal', function() {

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

});


