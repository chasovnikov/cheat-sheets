// import { square, cube } from './math.js';
// import fs from 'fs';
// // import _ from 'underscore';
// import _ from 'lodash';
// const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const Emitter = require('events');

const emitter = new Emitter();

emitter.on('message', (data, second, third) => {
    console.log('Сообщение: ' + data);
    console.log('Второе сообщение: ' + second);
});

let MESSAGE = 'hello';
emitter.emit('message', MESSAGE, 1234);
