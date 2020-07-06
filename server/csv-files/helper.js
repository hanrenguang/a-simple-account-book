'use strict';
/* eslint no-unused-vars: "off" */
const csv = require('csv-parser');
const fs = require('fs');

exports.csvParser = function csvParser(file) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
};
