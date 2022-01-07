// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs/promises');
// const zlib = require('zlib');

// const { reject } = require("lodash");

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'));
