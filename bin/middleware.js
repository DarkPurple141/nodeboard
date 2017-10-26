#!/usr/bin/env node

const middleware = (socketObject) => {

  const riskSocket = require('./socket-config')(socketObject, 'risk')
  const squaresSocket = require('./socket-config')(socketObject, 'squares')
  const gotSocket = require('./socket-config')(socketObject, 'got')

  const risk    = require('./gamesDir/risk-backend')(riskSocket)
  const squares = require('./gamesDir/squares-backend.js')(squaresSocket);
  const got     = require('./gamesDir/got-backend.js')(gotSocket);

}

module.exports = middleware;
