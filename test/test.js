var assert = require('mocha');

describe('SELCAL Code Check', function() {

  describe('Return a single SELCAL Code', function() {

    it('Should return a single valid formatted code', function() {
      
      let res = getSingleSelcal();
      const regex = /^([\w^IONion]{2}-[\w^IONion]{2})$/gm;

      assert.deepEqual(res, regex);

    });

  });

});


