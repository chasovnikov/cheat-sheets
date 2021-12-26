const path = require('path');
const fs = require('fs');

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
