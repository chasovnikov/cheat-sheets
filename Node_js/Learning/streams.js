
// Readable     - чтение
// Writable     - запись
// Duplex       - чтение и запись
// Transform    - чтение, запись и может изменять данные по мере чтения

const fs = require('fs');
const path = require('path');

const pathFile = path.resolve(__dirname, 'test.txt');

// Создаем стрим для чтения
const readStream = fs.createReadStream(pathFile, {encoding: 'utf-8'});

// Стримы работают по принципу события
// "data" позволяет считывать данные
// Один чанк по дефолту 64кб
readStream.on('data', chunk => console.log(chunk));

// На события можно подпис-ся в любом порядке - они работают АСИНХРОННО
readStream.on('end', () => console.log('Закончили читать'));
readStream.on('open', () => console.log('Начали читать'));
// Важно делать обработку ошибок
readStream.on('error', e => console.log(e));


// Стрим для записи
const writeStream = fs.createWriteStream(pathFile, {encoding: 'utf-8'});
for (let i = 0; i < 20; i++) {      // 20 кусочков
    writeStream.write(i + '\n');
}
writeStream.end();

// аналоги writeStream.end(). Вызывают события "close", "destroy"
writeStream.close();
writeStream.destroy();

// writeStream.on('error');


const http = require('http');

http.createServer((req, res) => {
    // req - readable stream
    // res - writable stream
    const stream = fs.createReadStream(pathFile);

    // Стрим закончит читать раньше, чем пользователь скачает
    // stream.on('data',  chunk => res.write(chunk));
    // stream.on('end',  chunk => res.end());
    
    // Сихронизирует readable stream и передачу по сети (writable stream)
    stream.pipe(res);
})