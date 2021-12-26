const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

let pathFile = path.resolve(__dirname, 'test.txt');
let data = 'df sd w78sjd js';
let data2 = ' ДОБАВИЛИ В КОНЕЦ';

// Создать файл и записать в него данные
fs.writeFile(pathFile, data, err => {
    if (err) {
        throw err;
    }
    console.log('Файл записан');

    // Добавить данные в конец файла сразу после создания файла
    fs.appendFile(pathFile, data2, err => {
        if (err) {
            throw err;
        }
        console.log('Добавили в конец');
    });
});

fsPromises.writeFile('path', data, options).then().catch();
fsPromises.appendFile('path', data, options).then().catch();

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

// Пример использования (запись, добавление, чтение)
const pathFile = path.resolve(__dirname, 'test.txt');
writeFileAsync(pathFile, 'data')
    .then(() => appendFileAsync(pathFile, '123'))
    .then(() => appendFileAsync(pathFile, '456'))
    .then(() => appendFileAsync(pathFile, '789'))
    .then(() => readFileAsync(pathFile))
    .then(data => console.log(data))
    .catch(err => console.log('err'));
