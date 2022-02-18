// Подключение модулей
const lib = {};
[('submodel', 'submode2', 'submode3')].forEach(name => {
    const sub = require(`./lib${name}.js`); // асинхронно
    Object.assign(lib, sub);
});
console.log('We combined submodules');
console.log(Object.keys(lib).join(', '));
module.exports = lib;

// Файла export.mjs, import.mjs используются для применения инструкций экспорта и импорта:
// Несовместим с require

// export.mjs:
// 'use strict';
const field = 'value';
const func = () => {};
export { field, func };

// import.mjs
import { field, func } from './export.mjs';
console.log({ field, func });

// Пример
// Чтобы избежать плохого кода: функциональные блоки кода
// 1. Слой доступа к данным (например, работа с файловой системой)
// 2. Парсинг, сериализация и десериализация
// 3. Сервер HTTP
//  3.1 Кеширование ответов
//  3.2 Работа с Cookie
//  3.3 Склеивание буфера
//  3.4 Логирование вызовов
//  3.5 Маршрутизация обработки запросов
// 4. Бизнес-логика предметной области
// 5. Управление зависимостями
// 6. Конфигурирование (например, порт и хост)
// 7. Подстановка переменных в шаблон

// Пример хорошего кода
const http = require('http');

const PORT = 8000;

const me = { name: 'jura', age: 22 };

const routing = {
    '/': '<h1>welcome to homepage</h1>',
    '/user': me,
    '/user/name': () => me.name,
    '/user/age': () => me.age,
};

// Сериализация. Справочник типов
const types = {
    object: JSON.stringify,
    string: s => s,
    undefined: () => 'not found',
    function: (fn, req, res) => fn(req, res).toString(),
};

http.createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data, req, res);
    res.end(result);
}).listen(PORT);

// -------------------- Песочницы

// Если две разные библиотеки модифицируют конструкции языка, то их нужно положить
//      в две песочницы. Между этими песочницами еще нужно организовать взаимодействие
// Для этого есть библиотека 'vm'
const PARSING_TIMEOUT = 1000;
const EXECUTION_TIMEOUT = 5000;

// The framework can require core libraries
const fs = require('fs');
const vm = require('vm');
const timers = require('timers');
const events = require('events');

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
const context = {
    module: {},
    console,
    require: name => {
        // не даем библ-ку fs
        if (name === 'fs') {
            console.log('Module fs is restricted');
            return null;
        }
        return require(name);
    },
};

// Рекурсивная ссылка
context.global = context;
const sandbox = vm.createContext(context); // Преобраз-ем в песочницу

// Prepare lambda context injection
const api = { timers, events };

// Read an application source code from the file
const fileName = './application.js';
fs.readFile(fileName, 'utf8', (err, src) => {
    // We need to handle errors here

    // Wrap source to lambda, inject api
    // Это нужно, чтобы в код в файле внедрить идентификаторы
    src = `api => { ${src} };`;

    // Run an application in sandboxed context
    let script;
    try {
        // Если timeout испчерпается, то перейдем к catch
        script = new vm.Script(src, { timeout: PARSING_TIMEOUT });
    } catch (e) {
        console.dir(e);
        console.log('Parsing timeout');
        process.exit(1);
    }

    try {
        // В песочнице запускаем скрипт. timeout ограничит использ-е ресур-ов чужим кодом
        const f = script.runInNewContext(sandbox, { timeout: EXECUTION_TIMEOUT });
        f(api);
        const exported = sandbox.module.exports;
        console.dir({ exported });
    } catch (e) {
        // Вылет по timeout
        console.dir(e);
        console.log('Execution timeout');
        process.exit(1);
    }

    // We can access a link to exported interface from sandbox.module.exports
    // to execute, save to the cache, print to console, etc.
});

// Отлов остальных ошибок
process.on('uncaughtException', err => {
    console.log('Unhandled exception: ' + err);
});

// ------------- Удалить require из кеша
const lib1 = require('./main.js');
const libPath = require.resolve('./main.js'); // перезагрузка './main.js' (изменился)
delete require.cache[libPath];
const lib2 = require('./main.js');

if (lib1 === lib2) {
    console.log('Cache not reloaded');
} else {
    console.log('Cache reloaded');
}
