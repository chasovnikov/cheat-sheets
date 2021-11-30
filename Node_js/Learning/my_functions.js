
/// Для старых версий Node.js замена колбэков:

// Запись (перезапись) в файл
const writeFileAsync = async (path, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        })
    });
};

// Запись в конец файла (без перезаписи)
const appendFileAsync = async (path, data) => {
    return new Promise( (resolve, reject) => {
        fs.appendFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        })
    });
};

// Чтение файла
const readFileAsync = async (path) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8 '}, (err, data) => {
            if (err) {
                return reject(err.mesage);
            }
            resolve(data);
        })
    });
};

// Удаление файла
const removeFileAsync = async (path) => {
    return new Promise( (resolve, reject) => {
        fs.rm(path, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
        })
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

// Пример удаления файла
removeFileAsync(pathFile).then(() => console.log('файл удалён'));