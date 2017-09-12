const assert = require('assert')
const io     = require('socket.io')()
const squares = require('../bin/gamesDir/squares-backend')(io)

describe('squares-backend', function() {
  describe('#Fields of backend object', function() {
    it('Check .connection exists', function() {
      assert.equal('object', typeof squares.connection);
    });
  });
  // just to remember
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
