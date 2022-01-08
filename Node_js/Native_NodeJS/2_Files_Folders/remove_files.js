const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

let pathFile = path.resolve(__dirname, 'test.txt');

// -------------------------------------
// Удалить через 5 сек
setTimeout(() => {
    if (fs.existsSync(pathFile)) {
        fs.unlink(pathFile, () => {});
    }
}, 5000);

// -------------------------------------
// Удаление файла (полифил)
const removeFileAsync = async path => {
    return new Promise((resolve, reject) => {
        fs.rm(path, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        });
    });
};
// Пример удаления файла
removeFileAsync(pathFile).then(() => console.log('файл удалён'));
