const fs = require('fs');
const path = require('path');


// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true});


// console.log('START');   // проверка асинхронности
// fs.mkdir(path.resolve(__dirname, 'dir'), err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Папка создана');
// });
// console.log('END');   // проверка асинхронности


const text = process.env.TEXT || '';
const pathFile = path.resolve(__dirname, 'text.txt');

writeFileAsync(pathFile, text)
    .then(() => reaFileAsync(pathFile))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(
        path.resolve(__dirname, 'count.txt'), `Кол-во слов ${count}`));