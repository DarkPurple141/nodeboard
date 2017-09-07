/**
This file is currently a total disaster.

Please avert your eyes.

@blame @DarkPurple141

**/

// import {regions, Game} from "logic/engine.js"

const socket = io.connect('http://localhost:3000');
const game = new Game(socket);

// network stuff
socket.on('news', function (data) {
  console.log(data);
  //socket.emit('my other event', { my: 'data' });
});

socket.on('update', function (data) {
  console.log("updating!");
});

/// eventuall this will create the svg map
$(document).ready(
  () => {
    let map = $('div#map');
    for (let reg in regions) {
      let curr = regions[reg];
      console.log(curr);
      let div = $("<div>", { id: curr['id'], "class": "region"} );
      div.text(curr['name']);
      //map.append(div);
      map.append(div);
    }
})

window.game = game;
