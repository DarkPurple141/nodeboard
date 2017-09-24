/**
This file is currently a total disaster.

Please avert your eyes.

@blame @DarkPurple141

**/

import { regions, Game } from "./logic/engine";

const socket = io.connect('/got')
const game = new Game(socket)

// network stuff
socket.on('news',
  data => console.log(data))

socket.on('update',
  data => console.log("updating!"))

/// eventuall this will create the svg map
$(document).ready(
  () => {
    let map = $('div#map');

    for (let reg in regions)
    {
      let curr = regions[reg];
      console.log(curr);
      let div = $("<div>", {
        id: curr['id'],
        "class": "region"
      });
      div.text(curr['name'])
      map.append(div)
    }
})

window.game = game;
