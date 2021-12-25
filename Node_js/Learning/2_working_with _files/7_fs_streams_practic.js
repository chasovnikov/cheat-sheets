var fs = require('fs');
var zlib = require('zlib');

// 1) --------------
// прочитать любой файл и вывести его текст в кодировке utf-8 по кусочкам в консоль
// + вывести надпись "начали" в момента начала чтения и "конец" - в конце чтения
// + обработка ошибок
const readStream = fs.createReadStream(path.resolve(__dirname, 'test.txt'), { encoding: 'utf-8' });
readStream.on('data', chunk => {
    console.log(chunk);
});
readStream.on('end', () => console.log('Закончили читать'));
readStream.on('open', () => console.log('Начали читать'));
readStream.on('error', e => console.log(e));

// 2) ------------
// использовать канал и поток Transform. Прочитать и записать файл в архивированном виде
var gzip = zlib.createGzip();
var rstream = fs.createReadStream('myfile.txt');
var wstream = fs.createWriteStream('myfile.txt.gz');

rstream // reads from myfile.txt
    .pipe(gzip) // compresses
    .pipe(wstream) // writes to myfile.txt.gz
    .on('finish', function () {
        // finished
        console.log('done compressing');
    });
