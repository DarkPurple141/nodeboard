"use strict";

const maps = require('./maps'),
      map = maps.Regions,
      continents = maps.Continents

class Region {
   constructor(name, parent, neighbours) {
      this._name = name
      this._neighbours = neighbours
      this._parent = parent
      this._owner = null
      this._units = 0
   }

   get name() {
      return this._name
   }

   get neighbours() {
      return this._neighbours
   }

   get owner() {
      return this._owner
   }

   get units() {
      return this._units
   }

   set owner(newOwner) {
      this._owner = newOwner
   }

   set units(newUnits) {
      this._units = newUnits
   }
}

class Continent {
   constructor (name, bonus) {
      this._name = name
      this._bonus = bonus
      this._territories = {}
   }

   get children() {
      return this._territories
   }

   get bonus() {
      return this._bonus
   }

   get name() {
      return this._name
   }

   _addRegion(key, region) {
      this._territories[key] = region
   }

   isOwned(player) {
      for (let territory in this._territories) {
         if (this._territories[territory].owner != player) {
            return false
         }
      }
      return true
   }

}

class Board {
   constructor() {
      this._map = {}
      this._continents = {}

      for (let key in continents) {
         this._continents[key] = new Continent(
            key,
            continents[key].bonus
         )
         for (let placeIndex in continents[key].territories) {
            let place = continents[key].territories[placeIndex]
            let neighbours = map[place].neighbours
            let r = new Region(place, this._continents[key], neighbours)
            this._map[place] = r
            this._continents[key]._addRegion(place, r)
         }
      }
   }

   get places() {
      return Object.keys(this._map)
   }

   get continents() {
      return Object.keys(this._continents)
   }

   getRegion(region) {
      return this._map[region]
   }

   getContinentBonuses(player) {
      let bonus = 0
      for (let cont in this._continents) {
         if (this._continents[cont].isOwned(player)) {
            bonus += this._continents[cont].bonus
         }
      }
      return bonus
   }

   getNeighbours(region) {
      return this._map[region] ? this._map[region].neighbours : null
   }

   boardState() {
      let returnObj = {}
      for (let key in this._map) {
         returnObj[key] = {
            owner: this._map[key].owner,
            value: this._map[key].units
         }
      }
      return returnObj
   }
}

module.exports = Board
