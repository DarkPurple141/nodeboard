const assert = require('assert');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const db = require('../model/db')("test");

const User = mongoose.model('User');
const Game = mongoose.model('Game');
const GameInstance = mongoose.model('GameInstance');

describe('db.js', function() {
  let squares, jeff;
  // preamble
  before(function(done) {
     squares = new Game({
      name: "Squares",
      urlkey: "Squares".toLowerCase(),
      description: "Squares is fun!"
     })
     squares.save(function(err) {
      if (err) throw err;
     })
     jeff = new User({
       name: "Jeff",
       fbId: 666,
       admin: true
     })
     jeff.save(function(err) {
      if (err) throw err;
     })
     done()
  })


  describe('Game', function () {
    describe('#save()', function() {
      it('Should save record without error', function(done) {
        let game = new Game({
          name: "Blocks",
          urlkey: "Blocks".toLowerCase(),
          description: "Blocks is great, yo!"
        })
        game.save(done)
      });

      it('Should find Blocks', function(done) {
        Game.findOne({ name: "Blocks" })
                    .populate('game')
                    .exec(function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Blocks")
          assert.equal(data.url, `/play/${data.name}/`)
          done()
        })

      })

      it("Should find and update Blocks", function(done) {
        Game.findOneAndUpdate(
          { name: 'Blocks' },
          { name: 'Blocks 2' },
          { new: true }, function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Blocks 2")
          done()
        })
      })
    })
  })

  describe('GameInstance', function() {
    describe('#save()', function() {

      it('Should save record without error', function(done) {
        let game = new GameInstance({
          name: "Squares",
          active: true,
          game: squares._id,
          host: jeff._id
        })
        game.save(done)
      });

      it('Should find Squares', function(done) {
        GameInstance.findOne({ name: "Squares" })
                    .populate('game')
                    .exec(function(err, data) {
          if (err) throw err;
          assert.equal(data.active, true)
          assert.equal(data.private, false)
          assert.equal(data.name, "Squares")
          assert.equal(data.game.name, "Squares")
          assert.equal(data.url, `/play/${data.name}/game/${data._id}`)
          done()
        })

      })

      it("Should find and update Squares", function(done) {
        GameInstance.findOneAndUpdate(
          { name: 'Squares' },
          { private: true },
          { new: true }, function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Squares")
          assert.equal(data.private, true)
          done()
        })
      })

    })
  });

  describe('User', function() {
    describe('#save()', function() {
      it('Should save user without error', function(done) {
        let user = new User({
          fbId: 0,
          name: "Barney Rubble",
          admin: false
        })
        user.save(done)
      });

      it('Should find a existing user', function(done) {
        User.findOne({ fbId: 0 }, function(err, data) {
          if (err) throw err;
          assert.equal(data.name, "Barney Rubble");
          done()
        });
      });

      it('Should edit the update time for user', function(done) {
        User.findOneAndUpdate(
          { fbId: 0 },
          { updated_at: Date('2014-01-22T14:56:59.301Z')},
          { new: true },
          function(err, data) {
          if (err) throw err;
          assert.equal(data.updated_at, Date('2014-01-22T14:56:59.301Z'));
          done()
        })
      })
    })
  })

  after(function(done) {
    mongoose.connection.db.dropDatabase()
    db.close()
    done()
  })
});
