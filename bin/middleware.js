#!/usr/bin/env node

const middleware = (socketObject) => {

  const risk    = require('./gamesDir/risk-backend')(socketObject)
  const squares = require('./gamesDir/squares-backend.js')(socketObject);
  const got     = require('./gamesDir/got-backend.js')(socketObject);

}

module.exports = middleware;
