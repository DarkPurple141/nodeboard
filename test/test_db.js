const assert = require('assert');
const mongoose = require('mongoose');
const db = require('../model/db')(mongoose, "Test");

const User = mongoose.model('User');
const Game = mongoose.model('Game');

describe('db.js', function() {

  before(() => mongoose.Promise = global.Promise)

  describe('Game', function() {
    describe('#save()', function() {

      it('Should save record without error', function(done) {
        let game = new Game({
          name: "Squares",
          active: true
        })
        game.save(done)
      });

      it('Should find Squares', function() {
        Game.findOne({name: "Squares"}, function(err, data) {
          if (err) throw err;
          assert.equal(data.active, true)
          assert.equal(data.private, false)
          assert.equal(data.name, "Squares")
        })
      })

      it("Should find and update Squares", function() {
        Game.findOneAndUpdate({ name: 'Squares' }, { name: 'Waiting' }, function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Waiting");
        })
      })

    })
  });

  describe('User', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
});
