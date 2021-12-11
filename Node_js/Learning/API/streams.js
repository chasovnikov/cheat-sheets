const fs = require('fs');
const path = require('path');

// Стримы позволяют считывать файлы по кусочкам

// Readable     - чтение
// Writable     - запись
// Duplex       - чтение и запись
// Transform    - чтение, запись и может изменять данные по мере чтения

const pathFile = path.resolve(__dirname, 'test.txt');

// Создаем стрим для чтения
const readStream = fs.createReadStream(pathFile, { encoding: 'utf-8' });

// Стримы работают по принципу событий
// "data" позволяет считывать данные
// Один чанк по дефолту 64кб
readStream.on('data', chunk => console.log(chunk));

// На события можно подпис-ся в любом порядке - они работают АСИНХРОННО
readStream.on('end', () => console.log('Закончили читать'));
readStream.on('open', () => console.log('Начали читать'));
// Важно делать обработку ошибок
readStream.on('error', e => console.log(e));

// События стримов:
// data
// end
// open
// close
// error
// pause
// readable
// ready
// resume

// ------------------------ Стрим для записи
const writeStream = fs.createWriteStream(pathFile, { encoding: 'utf-8' });
for (let i = 0; i < 20; i++) {
    // 20 кусочков
    writeStream.write(i + '\n');
}
// writeStream нужно завершать ВРУЧНУЮ
writeStream.end();
// аналоги writeStream.end(). Вызывают события "close", "destroy"
writeStream.close();
writeStream.destroy();

// Не забываем про обработку ошибок
// writeStream.on('error');

// ------------------------- Создание сервера
const http = require('http');

http.createServer((req, res) => {
    // req - readable stream
    // res - writable stream
    const stream = fs.createReadStream(pathFile);

    // Стрим закончит читать раньше, чем пользователь скачает
    // Поэтому так не делаем:
    // stream.on('data',  chunk => res.write(chunk));
    // stream.on('end',  chunk => res.end());

    // Синхронизация между readable и writable стримами
    // readable не начинает читать нов. порцию, пока writable не закончил писать предыдущ.
    stream.pipe(res);
});
