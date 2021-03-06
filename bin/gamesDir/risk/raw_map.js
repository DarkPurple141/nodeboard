let graph = {
    "Afghanistan": [
        "Ukraine",
        "Ural",
        "China",
        "India",
        "Middle East"
    ],
    "Alaska": [
        "Northwest Territory",
        "Alberta",
        "Kamchatka"
    ],
    "Alberta": [
        "Alaska",
        "Northwest Territory",
        "Ontario",
        "Western United States"
    ],
    "Argentina": [
        "Brazil",
        "Peru"
    ],
    "Brazil": [
        "North Africa",
        "Argentina",
        "Peru",
        "Venezuela"
    ],
    "Central America": [
        "Western United States",
        "Eastern United States",
        "Venezuela"
    ],
    "China": [
        "Siam",
        "India",
        "Afghanistan",
        "Siberia",
        "Ural",
        "Mongolia"
    ],
    "Congo": [
        "East Africa",
        "South Africa",
        "North Africa"
    ],
    "East Africa": [
        "Egypt",
        "Middle East",
        "Madagascar",
        "South Africa",
        "Congo",
        "North Africa"
    ],
    "Eastern Australia": [
        "New Guinea",
        "Western Australia"
    ],
    "Eastern United States": [
        "Central America",
        "Western United States",
        "Ontario",
        "Quebec"
    ],
    "Egypt": [
        "Southern Europe",
        "Middle East",
        "East Africa",
        "North Africa"
    ],
    "Great Britain": [
        "Iceland",
        "Northern Europe",
        "Scandinavia",
        "Western Europe"
    ],
    "Greenland": [
        "Northwest Territory",
        "Ontario",
        "Quebec",
        "Iceland"
    ],
    "Iceland": [
        "Greenland",
        "Great Britain",
        "Scandinavia"
    ],
    "India": [
        "China",
        "Siam",
        "Middle East",
        "Afghanistan"
    ],
    "Indonesia": [
        "Siam",
        "New Guinea",
        "Western Australia"
    ],
    "Irkutsk": [
        "Yakutsk",
        "Mongolia",
        "Siberia",
        "Kamchatka"
    ],
    "Japan": [
        "Kamchatka",
        "Mongolia"
    ],
    "Kamchatka": [
        "Japan",
        "Alaska",
        "Irkutsk",
        "Mongolia",
        "Yakutsk"
    ],
    "Madagascar": [
        "East Africa",
        "South Africa"
    ],
    "Middle East": [
        "East Africa",
        "Egypt",
        "Ukraine",
        "Afghanistan",
        "India",
        "Southern Europe"
    ],
    "Mongolia": [
        "Japan",
        "China",
        "Siberia",
        "Irkutsk",
        "Kamchatka"
    ],
    "New Guinea": [
        "Eastern Australia",
        "Indonesia",
        "Western Australia"
    ],
    "North Africa": [
        "Western Europe",
        "Egypt",
        "East Africa",
        "Congo",
        "Brazil"
    ],
    "Northern Europe": [
        "Scandinavia",
        "Ukraine",
        "Southern Europe",
        "Western Europe",
        "Great Britain"
    ],
    "Northwest Territory": [
        "Alaska",
        "Alberta",
        "Greenland",
        "Ontario"
    ],
    "Ontario": [
        "Alberta",
        "Eastern United States",
        "Greenland",
        "Northwest Territory",
        "Quebec",
        "Western United States"
    ],
    "Peru": [
        "Brazil",
        "Venezuela",
        "Argentina"
    ],
    "Quebec": [
        "Eastern United States",
        "Greenland",
        "Ontario"
    ],
    "Scandinavia": [
        "Ukraine",
        "Northern Europe",
        "Great Britain",
        "Iceland"
    ],
    "Siam": [
        "Indonesia",
        "India",
        "China"
    ],
    "Siberia": [
        "Irkutsk",
        "Yakutsk",
        "Mongolia",
        "China",
        "Ural"
    ],
    "South Africa": [
        "Congo",
        "East Africa",
        "Madagascar"
    ],
    "Southern Europe": [
        "Egypt",
        "Western Europe",
        "Northern Europe",
        "Ukraine",
        "Middle East"
    ],
    "Ukraine": [
        "Ural",
        "Afghanistan",
        "Middle East",
        "Southern Europe",
        "Northern Europe",
        "Scandinavia"
    ],
    "Ural": [
        "Siberia",
        "China",
        "Afghanistan",
        "Ukraine"
    ],
    "Venezuela": [
        "Peru",
        "Brazil",
        "Central America"
    ],
    "Western Australia": [
        "Eastern Australia",
        "Indonesia",
        "New Guinea"
    ],
    "Western Europe": [
        "Great Britain",
        "North Africa",
        "Southern Europe",
        "Northern Europe"
    ],
    "Western United States": [
        "Alberta",
        "Central America",
        "Eastern United States",
        "Ontario"
    ],
    "Yakutsk": [
        "Kamchatka",
        "Irkutsk",
        "Siberia"
    ]
}
let finalGraph = {}

for (key in graph) {
   let neighbours = graph[key]
   finalGraph[key] = {}
   finalGraph[key]['neighbours'] = neighbours
   finalGraph[key]['owner'] = null
   finalGraph[key]['units'] = {
      cavalry: 0,
      infantry: 0,
      cannon: 0
   }
}

console.log(finalGraph)
