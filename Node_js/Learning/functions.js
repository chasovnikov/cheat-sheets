
// Для старых версий Node.js замена колбэков
const writeFileAsync = async (path, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
    })});
};
const appendFileAsync = async (path, data) => {
    return new Promise( (resolve, reject) => {
        fs.appendFile(path, data, err => {
            if (err) {
                return reject(err.mesage);
            }
            resolve();
    })});
};

// Чтение файла
const readFileAsync = async (path) => {
    return new Promise( (resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8 '}, (err, data) => {
            if (err) {
                return reject(err.mesage);
            }
            resolve(data);
    })});
};

// Пример использования (создастся файл, запишутся данные, про)
const pathFile = path.resolve(__dirname, 'test.txt');
writeFileAsync(pathFile, 'data')
    .then(() => appendFileAsync(pathFile, '123'))
    .then(() => appendFileAsync(pathFile, '456'))
    .then(() => appendFileAsync(pathFile, '789'))
    .catch(err => console.log('err'));