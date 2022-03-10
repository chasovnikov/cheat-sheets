const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

let pathFile = path.resolve(__dirname, 'test.txt');
let data = 'df sd w78sjd js';
let data2 = ' ДОБАВИЛИ В КОНЕЦ';

// ---------------------------------------------
// синхронно
fs.writeFileSync(pathFile, data);

// ---------------------------------------------
if (!fs.existsSync(pathFile)) {
    // Создать файл и записать в него данные. Перезатирает данные
    fs.writeFile(pathFile, data, err => {
        if (err) throw err;
        console.log('Файл записан');

        // Добавить данные в конец файла сразу после создания файла
        fs.appendFile(pathFile, data2, err => {
            if (err) throw err;
            console.log('Добавили в конец');
        });
    });
}

// ---------------------------------------------
// Работает подобно fs.appendFileSync() .
fs.writeFileSync('messages.log', 'hello', { flag: 'a' });

// ---------------------------------------------
// Скопировать файл с созданием папки
fs.readFile('.test.txt', 'unf8', (error, data) => {
    fs.mkdir('./files', () => {
        fs.writeFile('./files/test2.txt', data, error => {
            if (error) throw error;
        });
    });
});
// ---------------------------------------------
// Открыть поток записи, но генерировать ошибку, если файл уже существует.
// Мы не хотим случайно что-то перезаписать!
// Обратите внимание, что параметром выше был flag, а здесь - flags.
fs.createWriteStream('messages.log', { flags: 'wx' });

// ---------------------------------------------
// Аналоги на промисах
fsPromises
    .writeFile(pathFile, data)
    .then(() => {
        fsPromises.appendFile(pathFile, data2).catch(console.error);
    })
    .catch(console.error);

// ---------------------------------------------
// Усечь файл
fs.truncate();
fs.truncateSync();
fsPromises.truncate();

// ---------------------------------------------
// ============ Полифилы, если Node без промисов:
// Запись (перезапись) в файл
const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        });
    });
};

// ---------------------------------------------
// Запись в конец файла (без перезаписи)
const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        });
    });
};

// ---------------------------------------------
// Пример использования (запись, добавление, чтение)
const pathFile = path.resolve(__dirname, 'test.txt');
writeFileAsync(pathFile, 'data')
    .then(() => appendFileAsync(pathFile, '123'))
    .then(() => appendFileAsync(pathFile, '456'))
    .then(() => appendFileAsync(pathFile, '789'))
    .then(() => readFileAsync(pathFile))
    .then(data => console.log(data))
    .catch(err => console.log('err'));

// ---------------------------------------------
// ------ Копировать файл. Не потоковая (и потому неэффективная) функция
function copyFile(sourceFilename, destinationFilename, callback) {
    fs.readFile(sourceFilename, (err, buffer) => {
        if (err) {
            callback(err);
        } else {
            fs.writeFile(destinationFilename, buffer, callback);
        }
    });
}
copyFile(pathFile, 'test2.txt', err => {
    if (err) throw err;
});
