const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

let pathFile = path.resolve(__dirname, 'test.txt');
let data = 'df sd w78sjd js';
let data2 = ' ДОБАВИЛИ В КОНЕЦ';

// Чтение файла кусками
const stream = fs.createReadStream(pathFile, { encoding: 'utf8' });
stream.on('data', chunk => {
    console.log(chunk);
});
stream.on('end', () => console.log('End'));
stream.on('open', () => console.log('Open'));
stream.on('error', console.error);

// Записать в файл 20 кусков данных
const writeStream = fs.createWriteStream(pathFile);
for (let i = 0; i < 20; i++) {
    writeStream.write(i + '\n');
}
writeStream.end();

// ? (от Флэнагана)
function printFile(filename, encoding = 'utf8') {
    fs.createReadStream(filename, encoding).pipe(process.stdout);
}

//
function pipe(readable, writable, callback) {
    function handleError(err) {
        readable.close();
        writable.close();
        callback(err);
    }

    readable
        .on('error', handleError)
        .pipe(writable)
        .on('error', handleError)
        .on('finish', callback);
}

// Заархивировать файл
function gzip(filename, callback) {
    // Создать потоки.
    let source = fs.createReadStream(filename);
    let destination = fs.createWriteStream(filename + '.gz');
    let gzipper = zlib.createGzip();
    // Настроить канал,
    source
        .on('error', callback) // Вызвать callback при ошибке чтения,
        .pipe(gzipper)
        .pipe(destination)
        .on('error', callback) // Вызвать callback при ошибке записи.
        .on('finish', callback);
}
gzip(pathFile, err => console.error);
