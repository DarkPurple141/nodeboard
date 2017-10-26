const assert = require('assert')
const io     = require('socket.io')()
const squares = require('../bin/gamesDir/squares-backend')(io)

describe('squares-backend', function() {
  describe('#Fields of backend object', function() {
    it('Check .connection exists', function() {
      assert.equal('object', typeof squares.connection)
    })
  })
})
