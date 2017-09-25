/**
This file is currently a total disaster.

Please avert your eyes.

@blame @DarkPurple141

*/
import { GameView, config } from "./logic/engine";

// proper game related stuff
const socket = io.connect('/got')
const game = new GameView(socket)

// network stuff
socket.on('news',
  data => console.log(data))

socket.on('update',
  data => console.log("updating!"))

/// eventuall this will create the svg map
$(document).ready(
  () => {
    setupMap(game.regions);
})

function normalizePoint(point, xOrY) {
  return xOrY ? point*config.WIDTH : point*config.HEIGHT;
}

function setupMap(data) {

  // this is needed to remove null id.
  data.shift();

  // main svg for game
  let svg = d3.select("#gameCanvas")
    .attr("width", config.VIEWBOX.x)
    .attr("height", config.VIEWBOX.y)
    .attr("viewBox", `0 0 ${config.VIEWBOX.x} ${config.VIEWBOX.y}`);

  // grp container for cities, text
  let group = svg.selectAll(".region")
    .data(data)
    .enter().append("g")
    .attr("transform", (d) => {
      return `translate(${normalizePoint(d.point[0], true)},
      ${normalizePoint(d.point[1])})`})
  	.attr("class", "region")
    .on('click', function(d, i) {
      game.selector(i)
      console.log(d.name, i)
  });

  // actual cities
  group.append("circle")
      .attr("cx", d => 0)
      .attr("cy", d => 0)
      .attr("r", 5)
      .attr("class", "city")
      .attr("id", (d, i) => "g" + (i+1));

  // text labels
  group.append("text")
    .attr("dx", d => (d.name.length/10)*(-40))
    .attr("dy", d => -10)
    .text(d => d.name)
}

window.game = game;
