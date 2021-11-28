import { square, cube } from './math.js';
import fs from 'fs';
// import _ from 'underscore';
import _ from 'lodash';
// const _ = require('lodash');

// let text = fs.readFileSync('../readme.md', 'utf8');
// console.log(text);


// function printNumbers(from, to) {
//     // let n = from;
//     // let timerId = setInterval(n => {
//     //     console.log(n);
//     //     return n++;
//     // }, 1000, n);

//     // setTimeout(() => { clearInterval(timerId) }, to * 1000);

//     let timerId = setTimeout(function tick(from, to) {
//         let n = from;
//         console.log(n);
//         if (n < to) {
//             timerId = setTimeout(tick, 1000, ++n, to);
//         }
//       }, 1000, from, to);

// }

// // clearInterval( printNumbers(1, 5));
// printNumbers(1, 5);

function printNumbers(from, to) {
    let n = from;
    let timerId = setInterval(() => {
        console.log(n);
        if (n >= to) {
            clearInterval(timerId);
        }
        n++;
    }, 1000);


}

// clearInterval( printNumbers(1, 5));
printNumbers(1, 5);
