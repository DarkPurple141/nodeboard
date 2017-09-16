const assert = require('assert');
const mongoose = require('mongoose');
const db = require('../model/db')(mongoose, "test");

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

      it('Should find Squares', function(done) {
        Game.findOne({name: "Squares"}, function(err, data) {
          if (err) throw err;
          assert.equal(data.active, true)
          assert.equal(data.private, false)
          assert.equal(data.name, "Squares")
          done()
        })

      })

      it("Should find and update Squares", function(done) {
        Game.findOneAndUpdate({ name: 'Squares' }, { private: true }, {new: true}, function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Squares")
          assert.equal(data.private, true)
          done()
        })
      })

    })
  });

  describe('User', function() {
    it('Should save user without error', function(done) {
      let user = new User({
        fbId: 0,
        name: "Barny Rubble",
        admin: false
      })
      user.save(done)
    });

    it('Should find a existing user', function() {
      User.findOne({fbId: 0}, function(err, data) {
        if(err) throw err
      });
    });

    it('Should edit the update time for user', function() {
      User.findOneAndUpdate({ fbId: 0 }, { updated_at: new Date('2014-01-22T14:56:59.301Z') }, function(err, data) {
        if (err) throw err;
        assert.equal(data.updated_at, new Date('2014-01-22T14:56:59.301Z'));
      })
    });

  });

  after(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
});
