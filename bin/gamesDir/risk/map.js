"use strict";

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
}

let map = {
   Afghanistan: {
      neighbours: [
         'Ukraine',
         'Ural',
         'China',
         'India',
         'Middle East'
      ],
      owner: null,
      units: 0
   },
   Alaska: {
      neighbours: [
         'Northwest Territory',
         'Alberta',
         'Kamchatka'
      ],
      owner: null,
      units: 0
   },
   Alberta: {
      neighbours: [
         'Alaska',
         'Northwest Territory',
         'Ontario',
         'Western United States'
      ],
      owner: null,
      units: 0
   },
   Argentina: {
      neighbours: [
         'Brazil',
         'Peru'
      ],
      owner: null,
      units: 0
   },
   Brazil: {
      neighbours: [
         'North Africa',
         'Argentina',
         'Peru',
         'Venezuela'
      ],
      owner: null,
      units: 0
   },
   'Central America': {
      neighbours: [
         'Western United States',
         'Eastern United States',
         'Venezuela'
      ],
      owner: null,
      units: 0
   },
   China: {
      neighbours: ['Siam', 'India', 'Afghanistan', 'Siberia', 'Ural', 'Mongolia'],
      owner: null,
      units: 0
   },
   Congo: {
      neighbours: ['East Africa', 'South Africa', 'North Africa'],
      owner: null,
      units: 0
   },
   'East Africa': {
      neighbours: [
         'Egypt',
         'Middle East',
         'Madagascar',
         'South Africa',
         'Congo',
         'North Africa'
      ],
      owner: null,
      units: 0
   },
   'Eastern Australia': {
      neighbours: ['New Guinea', 'Western Australia'],
      owner: null,
      units: 0
   },
   'Eastern United States': {
      neighbours: ['Central America',
         'Western United States',
         'Ontario',
         'Quebec'
      ],
      owner: null,
      units: 0
   },
   Egypt: {
      neighbours: ['Southern Europe',
         'Middle East',
         'East Africa',
         'North Africa'
      ],
      owner: null,
      units: 0
   },
   'Great Britain': {
      neighbours: ['Iceland', 'Northern Europe', 'Scandinavia', 'Western Europe'],
      owner: null,
      units: 0
   },
   Greenland: {
      neighbours: ['Northwest Territory', 'Ontario', 'Quebec', 'Iceland'],
      owner: null,
      units: 0
   },
   Iceland: {
      neighbours: ['Greenland', 'Great Britain', 'Scandinavia'],
      owner: null,
      units: 0
   },
   India: {
      neighbours: ['China', 'Siam', 'Middle East', 'Afghanistan'],
      owner: null,
      units: 0
   },
   Indonesia: {
      neighbours: ['Siam', 'New Guinea', 'Western Australia'],
      owner: null,
      units: 0
   },
   Irkutsk: {
      neighbours: [
         'Yakutsk',
         'Mongolia',
         'Siberia',
         'Kamchatka'
      ],
      owner: null,
      units: 0
   },
   Japan: {
      neighbours: [
         'Kamchatka',
         'Mongolia'
      ],
      owner: null,
      units: 0
   },
   Kamchatka: {
      neighbours: [
         'Japan',
         'Alaska',
         'Irkutsk',
         'Mongolia',
         'Yakutsk'
      ],
      owner: null,
      units: 0
   },
   Madagascar: {
      neighbours: [
         'East Africa',
         'South Africa'
      ],
      owner: null,
      units: 0
   },
   'Middle East': {
      neighbours: [
         'East Africa',
         'Egypt',
         'Ukraine',
         'Afghanistan',
         'India',
         'Southern Europe'
      ],
      owner: null,
      units: 0
   },
   Mongolia: {
      neighbours: [
         'Japan',
         'China',
         'Siberia',
         'Irkutsk',
         'Kamchatka'
      ],
      owner: null,
      units: 0
   },
   'New Guinea': {
      neighbours: [
         'Eastern Australia',
         'Indonesia',
         'Western Australia'
      ],
      owner: null,
      units: 0
   },
   'North Africa': {
      neighbours: [
         'Western Europe',
         'Egypt',
         'East Africa',
         'Congo',
         'Brazil'
      ],
      owner: null,
      units: 0
   },
   'Northern Europe': {
      neighbours: [
         'Scandinavia',
         'Ukraine',
         'Southern Europe',
         'Western Europe',
         'Great Britain'
      ],
      owner: null,
      units: 0
   },
   'Northwest Territory': {
      neighbours: [
         'Alaska',
         'Alberta',
         'Greenland',
         'Ontario'
      ],
      owner: null,
      units: 0
   },
   Ontario: {
      neighbours: [
         'Alberta',
         'Eastern United States',
         'Greenland',
         'Northwest Territory',
         'Quebec',
         'Western United States'
      ],
      owner: null,
      units: 0
   },
   Peru: {
      neighbours: [
         'Brazil',
         'Venezuela',
         'Argentina'
      ],
      owner: null,
      units: 0
   },
   Quebec: {
      neighbours: [
         'Eastern United States',
         'Greenland',
         'Ontario'
      ],
      owner: null,
      units: 0
   },
   Scandinavia: {
      neighbours: [
         'Ukraine',
         'Northern Europe',
         'Great Britain',
         'Iceland'
      ],
      owner: null,
      units: 0
   },
   Siam: {
      neighbours: [
         'Indonesia',
         'India',
         'China'
      ],
      owner: null,
      units: 0
   },
   Siberia: {
      neighbours: [
         'Irkutsk',
         'Yakutsk',
         'Mongolia',
         'China',
         'Ural'
      ],
      owner: null,
      units: 0
   },
   'South Africa': {
      neighbours: [
         'Congo',
         'East Africa',
         'Madagascar'
      ],
      owner: null,
      units: 0
   },
   'Southern Europe': {
      neighbours: [
         'Egypt',
         'Western Europe',
         'Northern Europe',
         'Ukraine',
         'Middle East'
      ],
      owner: null,
      units: 0
   },
   Ukraine: {
      neighbours: [
         'Ural',
         'Afghanistan',
         'Middle East',
         'Southern Europe',
         'Northern Europe',
         'Scandinavia'
      ],
      owner: null,
      units: 0
   },
   Ural: {
      neighbours: [
         'Siberia',
         'China',
         'Afghanistan',
         'Ukraine'
      ],
      owner: null,
      units: 0
   },
   Venezuela: {
      neighbours: [
         'Peru',
         'Brazil',
         'Central America'
      ],
      owner: null,
      units: 0
   },
   'Western Australia': {
      neighbours: [
         'Eastern Australia',
         'Indonesia',
         'New Guinea'
      ],
      owner: null,
      units: 0
   },
   'Western Europe': {
      neighbours: [
         'Great Britain',
         'North Africa',
         'Southern Europe',
         'Northern Europe'
      ],
      owner: null,
      units: 0
   },
   'Western United States': {
      neighbours: [
         'Alberta',
         'Central America',
         'Eastern United States',
         'Ontario'
      ],
      owner: null,
      units: 0
   },
   Yakutsk: {
      neighbours: [
         'Kamchatka',
         'Irkutsk',
         'Siberia'
      ],
      owner: null,
      units: 0
   }
}

let continents = {

   'North America': {
      bonus: 5,
      territories: [
         'Alaska',
         'Alberta',
         'Central America',
         'Eastern United States',
         'Greenland',
         'Northwest Territory',
         'Ontario',
         'Quebec',
         'Western United States'
      ]
   },

   'South America' : {
      bonus: 2,
      territories: [
         'Argentina',
         'Brazil',
         'Peru',
         'Venezuela'
      ]
   },

   'Europe' : {
      bonus: 5,
      territories: [
         'Great Britain',
         'Iceland',
         'Northern Europe',
         'Scandinavia',
         'Southern Europe',
         'Ukraine',
         'Western Europe'
      ]
   },

   'Africa' :{
      bonus: 3,
      territories: [
         'Congo',
         'East Africa',
         'Egypt',
         'Madagascar',
         'North Africa',
         'South Africa'
      ]
   },

   'Asia' : {
      bonus: 7,
      territories: [
         'Afghanistan',
         'China',
         'India',
         'Irkutsk',
         'Japan',
         'Kamchatka',
         'Middle East',
         'Mongolia',
         'Siam',
         'Siberia',
         'Ural',
         'Yakutsk'
      ]
   },

   'Australia' : {
      bonus: 2,
      territories: [
         'Eastern Australia',
         'Indonesia',
         'New Guinea',
         'Western Australia'
      ]
   }
}

module.exports = Board
