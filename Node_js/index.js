// import { square, cube } from './math.js';
// import fs from 'fs';
// // import _ from 'underscore';
// import _ from 'lodash';
// const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

const log = a => console.log(a);

const text = process.env.TEXT || 'sdsdd sds sdgg';

fsPromises
    .writeFile(path.resolve(__dirname, 'terxt.txt'), text)
    .then(() => fsPromises.readFile(path.resolve(__dirname, 'terxt.txt'), { encoding: 'utf-8' }))
    .then(data => data.split(' ').length)
    .then(count =>
        fsPromises.writeFile(path.resolve(__dirname, 'count.txt'), `Кол-во слов${count}`)
    )
    .then(() => fsPromises.rm(path.resolve(__dirname, 'terxt.txt')))
    .then(() => fsPromises.rm(path.resolve(__dirname, 'count.txt')));
// fsPromises.readFile(path.resolve(__dirname, 'terxt.txt')).then(data => console.log(data));
