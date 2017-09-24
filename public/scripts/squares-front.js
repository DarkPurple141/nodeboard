// client side code

const socket = io('/squares');
const game = Squares(socket);
const d3 = require('d3')

// game related logic
function Squares(socket) {

    socket.on('update', data => game.updateState(data))
    socket.on('hi', msg => console.log(msg))

    socket.sendTurn = (data) => socket.emit('update', data);

    const gameObj = {
      turn: true,
      connection : socket,
      hash : gridData(),
      updateState : function(data) {
        //  { x: 401, y: 1, width: 50, height: 50, click: 1 }
        this.turn = !this.turn;
        console.log(data, this)
        let toUpdate = this.hash[data.id];
        toUpdate.x = data.x;
        toUpdate.y = data.y;
        toUpdate.click = data.click;

        updateCSS(d3.select("rect#" + data.id ), data.click)
        console.log("turn update");
      }
    }
    return gameObj;
}

// grid
function gridData() {
    let data = new Array();
    let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1;
    let width = 50;
    let height = 50;
    let click = 0;
    let counter = 0;

    let hash = new Object();
    hash.data = data;

    // iterate for rows
    for (let row = 0; row < 10; row++)
    {
        data.push( new Array() )

        // iterate for cells/columns inside rows
        for (var column = 0; column < 10; column++) {
            let toAdd = {
                x: xpos,
                y: ypos,
                id: "g" + counter,
                width: width,
                height: height,
                click : click
            }
            data[row].push(toAdd)
            hash[toAdd.id] = toAdd
            counter++
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += width
        }
        // reset the x position after a row is complete
        xpos = 1
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height
    }
    return hash;
}

function updateCSS(el, count) {
  // change colour based on selector
  switch (count % 4)
  {
    case 0: el.style("fill","#fff")
      break
    case 1: el.style("fill","#2C93E8")
      break
    case 2: el.style("fill","#F56C4E")
      break
    case 3: el.style("fill","#838690")
      break
  }
}

window.onload = () => {

  let grid = d3.select("#gameCanvas")
  	.append("svg")
  	.attr("width","510px")
  	.attr("height","510px");

  let row = grid.selectAll(".row")
  	.data(game.hash.data)
  	.enter().append("g")
  	.attr("class", "row");

  let column = row.selectAll(".square")
  	.data( d => d )
  	.enter().append("rect")
  	.attr("class", "square")
    .attr("id", d => d.id )
  	.attr("x", d => d.x )
  	.attr("y", d => d.y )
  	.attr("width", d => d.width)
  	.attr("height", d => d.height)
  	.style("fill", "#fff")
  	.style("stroke", "#222")
  	.on('click', function(d, i) { // can't use arrow here as we need this
       if (game.turn === false) {
         alert("Not your turn fam.");
         return;
       }
       d.click++;
       game.connection.sendTurn( d );
       updateCSS(d3.select(this), d.click);
    })
}
