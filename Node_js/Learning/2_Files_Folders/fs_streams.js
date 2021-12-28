const fs = require('fs');
const path = require('path');

// Стрим — это концепция, c помощью которой можно обрабатывать данные частями,
//      что позволяет задействовать небольшой объем оперативной памяти
// memory-stream - когда origin и distination чтения и записи в буфер может быть кусок памяти
// stdin, stdout - тоже потоки
// Потоки позвол. раб. с устр-вами ввода/вывода или с памятью

// Readable     - чтение
// Writable     - запись
// Duplex       - чтение и запись (объединяют поток Readable и поток Writable в один объект)
// Transform    - чтение, запись и может изменять данные по мере чтения

// По умолчанию потоки читают и записывают буферы

// Стримы работают по принципу событий:
// data     - поток передает право владения фрагментом данных потребителю (если есть данные)
// end      - из потока больше нет данных, которые нужно потреблять
// open     - открытие дескриптора файла <fs.ReadStream>
// close    - дескриптор файла <fs.ReadStream> закрывается
// error
// pause    - вызывается stream.pause () и readableFlowing - true
// readable -  данные доступны для чтения или когда достигнут конец потока (случ-ся в любом случ.)
// ready    - <fs.ReadStream> готов к использованию
// resume   - вызывается stream.resume (), а readableFlowing - false

// -------------- Стрим для чтения (Readable)
// Есть два режима чтения на основе событий
//      (подходят, если нельзя использовать каналы или асинхронную итерацию)
//      Их нельзя смешивать
// 1. Режим извлечения данных (flowing mode)
//      Читабельные данные выпускаются в форме события "data"
//      Вызывать метод read () в этом режиме не нужно
// 2. Режим ожидания (paused mode)
//      Если вы не регистр-ли обработчик событий "data” и не вызывали pipe()
//      Выпускает события "readable"
//      Используется read()

let pathFile = path.resolve(__dirname, 'test.txt');
let data = 'df sd w78sjd js';
let data2 = ' ДОБАВИЛИ В КОНЕЦ';

const pathFile = path.resolve(__dirname, 'test.txt');
const readStream = fs.createReadStream(pathFile, { encoding: 'utf-8' });
// Режим ожидания (paused mode):
readStream.on('readable', () => {
    console.log('readable');
    const buffer = readStream.read(); // читаем в буфер
    if (buffer) {
        console.log(buffer);
    }
});
// Режим извлечения данных (flowing mode):
// Один чанк по дефолту 64кб
readStream.on('data', chunk => {
    console.log('data');
    console.log(chunk);
});

// На события можно подпис-ся в любом порядке - они работают АСИНХРОННО
readStream.on('end', () => console.log('Закончили читать'));
readStream.on('open', () => console.log('Начали читать'));
readStream.on('error', e => console.log(e)); // Важно делать обработку ошибок

// ------------------------------------------------------------------------
// -------------- Стрим для чтения через промисы (Readable)
// Потоки Readable являются асинхронными итераторами, т.е. внутри функции async можно
//      применять цикл fo r / aw ait для чтения строки и порций буфера из потока, используя код,
//      который структурирован как синхронный код.
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

// ------------------------------------------------------------------------
// из книги Флэнагана:
// как применять поток Readable в качестве асинхронного итератора
// не обрабатываем противодавление (необходимо дописать)
async function grep(source, destination, pattern, encoding = 'utf8') {
    source.setEncoding(encoding);
    destination.on('error', err => process.exit());
    let incompleteLine = '';
    for await (let chunk of source) {
        let lines = (incompleteLine + chunk).split('\n'); // Разбить конец последней и этой порции на строки
        incompleteLine = lines.pop(); // Последняя строка неполная
        for (let line of lines) {
            if (pattern.test(line)) {
                destination.write(line + '\n', encoding);
            }
        }
    }
    // Наконец, проверить на предмет совпадения хвостовой текст
    if (pattern.test(incompleteLine)) {
        destination.write(incompleteLine + '\n', encoding);
    }
}
let pattern = new RegExp(process.argv[2]); // Получить регулярное выражение из командной строки.
grep(process.stdin, process.stdout, pattern) // Вызвать асинхронную функцию grep()
    .catch(err => {
        // Обработать асинхронные исключения,
        console.error(err);
        process.exit();
    });

// ------------------------------------------------------------------------
// ПРОТИВОДАВЛЕНИЕ
// write() возращает true, если внутренний буфер пока еще не полон
// Если же буфер уже полон или переполнен, тогда write() возвращает false.
// false метода write() является формой противодавления
//      (или обратного давления; backpressure), т.е. сообщением от потока о
//      том, что вы записали данные быстрее, чем они могут быть обработаны
//      Надлежащая реакция на противодавление такого рода предусматривает прекращение вызова
//      write() до тех пор, пока поток не выпустит событие "drain"
//      (опустошен), сигнализирующее о том, что в буфере снова есть место
// Отсутствие реакции на противодавление может привести к тому, что ваша
//      программа станет потреблять больше памяти, чем должна, когда внутренний
//      буфер потока Writable переполняется и продолжает свой рост
function write(stream, chunk, callback) {
    let hasMoreRoom = stream.write(chunk); // Записать указанную порцию в указанный поток
    // Проверить возвращаемое значение метода write() :
    if (hasMoreRoom) {
        setImmediate(callback); // асинхронно вызвать обратный вызов.
    } else {
        stream.once('drain', callback); // вызвать обратный вызов
    }
}
// когда вы применяете pipe(), среда Node обрабатывает противодавление автоматически

// Основанная на Promise версия служебной функции write(),
//      чтобы должным образом обрабатывать противодавление
function write(stream, chunk) {
    let hasMoreRoom = stream.write(chunk);
    if (hasMoreRoom) {
        return Promise.resolve(null);
    } else {
        return new Promise(resolve => {
            stream.once('drain', resolve);
        });
    }
}
async function copy(source, destination) {
    destination.on('error', err => process.exit());
    for await (let chunk of source) {
        // Записать порцию и ожидать, пока не появится больше места в буфере.
        await write(destination, chunk);
    }
}
copy(process.stdin, process.stdout); // Копировать стандартный ввод в стандартный вывод

// ------------------------------------------------------------------------
// -------------- Стрим для записи (Writable)
const writeStream = fs.createWriteStream(pathFile, { encoding: 'utf-8' });
for (let i = 0; i < 20; i++) {
    // 20 кусочков
    writeStream.write(i + '\n');
}
writeStream.end(); // writeStream нужно завершать ВРУЧНУЮ
writeStream.close(); // аналог writeStream.end(). Вызывает событие "close"
writeStream.destroy(); // аналог writeStream.end(). Вызывает событие "destroy"

// Не забываем про обработку ошибок
// writeStream.on('error');

// ------------------------------------------------------------------------
// -------------- Стримы: чтение и запись (Duplex)
const readStream = fs.createReadStream('path1', 'utf-8');
const writeStream = fs.createReadStream('path2', 'utf-8');
// readStream.on('data', buffer => {
//     console.log('Copy' + buffer.length + ' chars');
//     writeStream.write(buffer);
// });
const handleError = () => {
    console.log('Error');
    readStream.destroy;
    writeStream.end('Finished with error...');
};

readStream
    .on('error', handleError) // обраб-ка ошибок при чтении
    .pipe(writeStream) // автом-ки навесит событие "data"
    .on('error', handleError); // обраб-ка ошибок при записи

readStream.on('end', () => console.log('Done'));

// ------------------------------------------------------------------------
// ---------------- Transform-stream
const zlib = require('zlib');

const readStream = fs.createReadStream('path1', 'utf-8');
const writeStream = fs.createReadStream('path2', 'utf-8');
const compressStream = zlib.createGzip();

readStream
    .on('error', handleError) // обраб-ка ошибок при чтении
    .pipe(compressStream)
    .pipe(writeStream) // автом-ки навесит событие "data"
    .on('error', handleError); // обраб-ка ошибок при записи

readStream.on('end', () => console.log('Done'));

// ------------------------------------------------------------------------
// Чтение файла кусками
const stream = fs.createReadStream(pathFile, { encoding: 'utf8' });
stream.on('data', chunk => {
    console.log(chunk);
});
stream.on('end', () => console.log('End'));
stream.on('open', () => console.log('Open'));
stream.on('error', console.error);

// ---------------------------------------------
// Записать в файл 20 кусков данных
const writeStream = fs.createWriteStream(pathFile);
for (let i = 0; i < 20; i++) {
    writeStream.write(i + '\n');
}
writeStream.end();

// ---------------------------------------------
var stream = fs.createWriteStream('my_file.txt');
stream.once('open', function (fd) {
    stream.write('My first row\n');
    stream.write('My second row\n');
    stream.end();
});

// ---------------------------------------------
// ? (от Флэнагана)
function printFile(filename, encoding = 'utf8') {
    fs.createReadStream(filename, encoding).pipe(process.stdout);
}

// ---------------------------------------------
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

// ---------------------------------------------
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
// ------------------------------------------------------------------------
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

// ------------------------------------------------------------------------
// -------------------  Передача по сети (например, отображение HTML-страницы)
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

// ------------------------------------------------------------------------
