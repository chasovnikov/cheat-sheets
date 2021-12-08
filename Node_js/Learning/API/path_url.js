const path = require('path');

// Относительный путь
path.join('first', 'second');   // 'first/second'

__dirname;      // путь к текущей папке
__filename;     // путь к текущему файлу

// Абсолютный путь
path.resolve('first', 'second');    // С:\Users\ ...

// Парсинг пути
const fullpath = path.resolve('first', 'second');
const obj = path.parse(fullpath);   // {root:'C:\\', ...}

// Разделитель в ОС
const sep = path.sep;

// Проверка на абсолютный путь
const pathAbsolute = path.isAbsolute(fullpath);

// Название файла
const basename = path.basename(fullpath);

// Расширение файла
const extname = path.extname(fullpath);

// -----------------------------------------

const siteUrl = 'http://localhost:8080/users?id=5123';

const url = new URL(siteUrl);   // {href:..., origin:..., protocol:...}