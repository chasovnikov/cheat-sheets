const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

// Удаление файла
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
