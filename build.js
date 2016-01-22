#!/bin/usr/env node
var fs = require('fs')
var _ = require('lodash')
var csv = require('csv-parser')

// Used to build `index.json`:
// cat path/to/esp-markers.csv | node build.js

var results = {}

process.stdin
  .pipe(csv())
  .on('data', function (data) {
    if (!data.Name || !data.email && !data.timestamp) return

    results[data.Name] = _(data)
      .pick('email', 'timestamp')
      .pickBy(_.identity)
      .value()
  })
  .on('finish', function () {
    fs.writeFile(__dirname + '/index.json', JSON.stringify(results, null, 2))
  })
