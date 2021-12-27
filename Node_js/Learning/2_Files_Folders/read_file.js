const fs = require('fs');
const { resolve } = require('path');

// ---------------------------------------------
// ---- Sync
let buffer = fs.readFileSync('test.txt'); // синхронно вернет буфер
let text = fs.readFileSync('data.csv', 'utf8'); // синхронно вернёт строку

// ---------------------------------------------
// ---- Async
fs.readFile('test.txt', (err, buffer) => {
    if (err) throw err;
});

// ---------------------------------------------
// ---- Promises
fs.promises
    .readFile(pathFile, 'utf8')
    .then(data => console.log(data))
    .catch(console.error);

// ---------------------------------------------
// ---- Полифил промисов
const readFileAsync = async path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err.message);
            resolve(data);
        });
    });
};
// использование
readFileAsync(pathFile)
    .then(data => console.log(data))
    .catch(console.error);

// ---------------------------------------------
// ---- Низкоуровневый контроль + асинхронно
fs.open('data', (err, fd) => {
    if (err) throw err;
    try {
        fs.read(fd, Buffer.alloc(400), 0, 400, 20, (err, n, b) => {
            // ...
        });
    } finally {
        fs.close(fd);
    }
});

// ---------------------------------------------
// ---- Низкоуровневый контроль + синхронно
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
