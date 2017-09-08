// client side code

function Squares(socket) {
  this.connection = socket;

  this.connection.on('update', (data) => {
    console.log(data)
  })

  this.connection.on('hi', (msg) => {
    $('svg#gameCanvas').append('<g>Message</g>');
    console.log(msg)
  })
}


const socket = io('/squares');
const game = new Squares(socket);
