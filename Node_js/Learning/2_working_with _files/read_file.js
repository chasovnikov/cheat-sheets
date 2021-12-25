const fs = require('fs');

// Синхронно
let buffer = fs.readFileSync('test.data'); // синхронно вернет буфер
let text = fs.readFileSync('data.csv', 'utf8'); // синхронно вернёт строку

// Асинхронно
fs.readFile('test.data', (err, buffer) => {
    if (err) {
    } else {
    }
});

// Через промисы
fs.promises.readFile('data.csv', 'utf8').then(processFileText).catch(handleReadError);
// или так
let text = await fs.promises.readFile(filename, 'utf8');

// Через потоки
fs.createReadStream(filename, 'utf8').pipe(process.stdout);

// Низкоуровневый контроль + асинхронно
fs.open('data', (err, fd) => {
    if (err) {
        // Сообщить об ошибке
        return;
    }
    try {
        fs.read(fd, Buffer.alloc(400), 0, 400, 20, (err, n, b) => {
            // ...
        });
    } finally {
        fs.close(fd);
    }
});

// Низкоуровневый контроль + синхронно
function readData(filename) {
    let fd = fs.openSync(filename); // получить файловый дескриптор
    try {
        let header = Buffer.alloc(12); // выделить буфер
        fs.readSync(fd, header, 0, 12, 0);
        let magic = header.readInt32LE(0);
        if (magic !== OxDADAFEED) {
            throw new Error('File is of wrong type');
        }
        let offset = header.readInt32LE(4);
        let length = header.readInt32LE(8);
        let data = Buffer.alloc(length);
        fs.readSync(fd, data, 0, length, offset);
        return data;
    } finally {
        fs.closeSync(fd);
    }
}
