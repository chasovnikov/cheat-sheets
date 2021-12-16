const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');

let pathDirRecursive = path.resolve(__dirname, 'dir', 'dir2', 'dir3');

// Создать папку синхронно (рекурсивно со вложенными папками)
fs.mkdirSync(pathDirRecursive, { recursive: true });

// Создать папку асинхронно (рекурсивно со вложенными папками)
fs.mkdir(pathDirRecursive, { recursive: true }, err => {
    if (err) {
        console.log(err);
        return;
    }
});

// Создать папку через промисы (рекурсивно со вложенными папками)
fsPromises.mkdir(pathDirRecursive, { recursive: true });

// Удалить папку через колбэки (рекурсивно)
fs.rm(path.resolve(__dirname, 'dir'), { recursive: true }, err => {
    if (err) {
        throw err;
    }
});

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

// Работа с fs с помощью промисов:
fsPromises.mkdir('path', options).then().catch();
fsPromises.readFile('path', options).then().catch();
fsPromises.writeFile('path', data, options).then().catch();
fsPromises.appendFile('path', data, options).then().catch();
fsPromises.rm('path', options).then().catch();
fsPromises.rmdir('path', options).then().catch();

/// ------------- Для старых версий Node.js замена колбэков на промисы:

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

// Чтение файла
const readFileAsync = async path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8 ' }, (err, data) => {
            if (err) {
                return reject(err.mesage);
            }
            resolve(data);
        });
    });
};

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

// Наблюдение за изменениями файлов (например, за лог-файлом)
// Есть спец. репозиторий у Шемсединова на гитхабе: HowProgrammingWorks/FilesystemWatch
// Будет ждать, пока с файлом что-то случится
fs.watch('./log.js', (event, file) => {
    console.dir({ event, file });
}); // { event: 'change', file: '6-watch.js' }

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
