const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const { Http2ServerRequest } = require('http2');

let pathDirRecursive = path.resolve(__dirname, 'dir', 'dir2', 'dir3');

// ============ Работа с каталогами
// -------- Создать папку

// Создать папку синхронно в текущей папке (рекурсивно со вложенными папками)
fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), { recursive: true });

// Создать папку асинхронно (рекурсивно со вложенными папками)
fs.mkdir(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), { recursive: true }, err => {
    if (err) {
        console.log(err);
        return;
    }
});

// Создать папку через промисы (рекурсивно со вложенными папками)
fsPromises
    .mkdir(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), { recursive: true })
    .then(processFileText)
    .catch(handleReadError);

// ---------- Удалить папку

// Удалить папку асинхронно через колбэки (рекурсивно)
fs.rm(path.resolve(__dirname, 'dir'), { recursive: true }, err => {
    if (err) {
        throw err;
    }
});

// Удаление папки на промисах
fsPromises.rm('path', options).then().catch();
fsPromises.rmdir('path', options).then().catch();

// ============

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

// ------------- НАБЛЮДЕНИЕ ЗА ФАЙЛОВОЙ СИСТЕМОЙ

// Наблюдение за изменениями файлов (например, за лог-файлом)
// Есть спец. репозиторий у Шемсединова на гитхабе: HowProgrammingWorks/FilesystemWatch

// Будет ждать, пока с файлом что-то случится
fs.watch('./log.js', (event, file) => {
    console.dir({ event, file });
}); // { event: 'change', file: '6-watch.js' }

// ------ Пример просмотра папки
// Массив изменений
const changes = [];

// Эскейп-последовательность (очистка экрана)
const clear = () => console.log('\x1Bc');

// Визуализирует список файлов
const display = files => {
    clear();
    while (changes.length > 10) {
        changes.shift();
    }
    console.log('Changes');
    for (const item of changes) {
        console.log(item.date.toISOString(), item.event, ':', item.file);
    }
    console.log('\nFiles:');
    for (const file of files) {
        console.log(file);
    }
};

// Перечисляет файлы и применяет к каждому display()
const ls = path => {
    fs.readdir(path, (err, files) => {
        if (err) return;
        display(files);
    });
};

// Навешивает слушатели
// event: только  change или rename
const watch = path => {
    fs.watch(path, (event, file) => {
        clear();
        changes.push({ date: new Date(), event, file });
        ls(path);
    });
};
const path = './';
ls(path);
watch(path);

// ----- Пример работы с кэшем
const cache = Map();

// Читаем файл и записываем в кэш
const cacheFile = path => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            cache.delete(path);
            return;
        }
        cache.set(path, data);
    });
};

// Каждый файл в папке добавляет в кэш
const cacheFolder = path => {
    fs.readdir(path, (err, files) => {
        if (err) return;
        files.forEach(cacheFile);
    });
};

// Следит за изменением кеша
const watch = path => {
    fs.watch(path, (event, file) => {
        cacheFile(file);
    });
};

const path = './';
cacheFolder(path);
watch(path);

http.createServer((req, res) => {
    const url = req.url.substring(1);
    console.log(url);
    const data = cache.get(url);
    if (data) res.end(data);
    else res.end('File' + url + 'not found');
}).listen(8000);

// =========================
// ========================= Practic
