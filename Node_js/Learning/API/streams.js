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
// readable -  доступны данные для чтения или когда достигнут конец потока
readStream.on('readable', () => {
    console.log('readable');
    const buffer = rs.read(); // получить буфер
    if (buffer) {
        console.log(buffer);
    }
});

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

// Считываение файлов через промисы и потоки
const main = async () => {
    const stream = fs.createReadStream('path', 'utf-8');

    // ждёт пока не случится событие у стрима
    for await (const chunk of stream) {
        console.log(chunk);
    }

    const data = await fs.promises.readFile('path', 'utf-8');
    console.log(data);
};
main().catch(console.error);

// Считываем с одного файла, пишем в другой
const rs = fs.createReadStream('path1', 'utf-8');
const ws = fs.createReadStream('path2', 'utf-8');
// rs.on('data', buffer => {
//     console.log('Copy' + buffer.length + ' chars');
//     ws.write(buffer);
// });
rs.pipe(ws);
rs.on('end', () => {
    console.log('Done');
});

// transform-stream
const zlib = require('zlib');
const rs = fs.createReadStream('path1', 'utf-8');
const ws = fs.createReadStream('path2', 'utf-8');
const gs = zlib.createGzip();
rs.pipe(gs).pipe(ws);
rs.on('end', () => {
    console.log('Done');
});

// Передача по сети (например, отображение HTML-страницы)
const prepareCache = callback => {
    let buffer = null;

    const rs = fs.createReadStream('path1', 'utf-8');
    const gs = zlib.createGzip();

    const buffers = []; // Если большой файл, то буфер будет из кусков

    gs.on('data', buffer => {
        buffers.push(buffer);
    });
    gs.on('end', () => {
        buffer = Buffer.concat(buffers);
        // Вместо if можно использовать ф-ию-обёртку util.once() ?
        if (callback) {
            callback(null, buffer);
            callback = null;
        }
    });
    rs.on('error', error => {
        if (callback) {
            callback(error);
            callback = null;
        }
    });
    gs.on('error', error => {
        if (callback) {
            callback(error);
            callback = null;
        }
    });
    rs.pipe(gs);
};
const startServer = (err, buffer) => {
    if (err) {
        throw err;
    }
    const server = hhtp.createServer((request, response) => {
        console.log(request.url);
        response.writeHead(200, { 'Content-Encoding': 'gzip' });
        response.end(buffer);
    });
    server.listen(8000);
};
prepareCache(startServer);
