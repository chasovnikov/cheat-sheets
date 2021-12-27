/**
 * можем использовать немедленно вызываемые выражения
функций для обеспечения своего рода модульности, оставляя детали реализации и служебные функции 
скрытыми внутри включающей функции, но делая
открытый API-интерфейс модуля возвращаемым значением функции
 */
const BitSet = (function () {
    // Установить BitSet в возвращаемое
    // значение этой функции
    // Здесь находятся закрытые детали реализации
    function isValid(set, n) {
        // ...
    }
    function has(set, byte, bit) {
        // ...
    }
    const BITS = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
    const MASKS = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);

    // Открытый API-интерфейс модуля - это просто класс BitSet,
    // который мы здесь определяем и возвращаем.
    // Класс может использовать закрытые функции и константы,
    // определенные выше, но они будут скрыты от пользователей класса,
    return class BitSet extends AbstractWritableSet {
        // ... реализация не показана ...
    };
})();

// Вот так мы могли бы определить модуль расчета статистических данных.
const stats = (function () {
    // Служебные функции закрыты по отношению к модулю,
    const sum = (х, у) => х + у;
    const square = х => х * х;

    // Открытая функция, которая будет экспортироваться,
    function mean(data) {
        return data.reduce(sum) / data.length;
    }

    // Открытая функция, которая будет экспортироваться,
    function stddev(data) {
        let m = mean(data);
        return (
            Math,
            sqrt(
                data
                    .map(x => x - m)
                    .map(square)
                    .reduce(sum) /
                    (data.length - 1)
            )
        );
    }
    // Открытые функции экспортируются в виде свойств объекта,
    return { mean, stddev };
})();
// А так мы можем использовать модуль.
stats.mean([1, 3, 5, 7, 9]); // => 5
stats.stddev([1, 3, 5, 7, 9]); //=> Math, sqrt (10)

/**
 * берет набор файлов, помещает содер.
жимое каждого файла внутрь немедленно вызываемого выражения функции,
отслеживает возвращаемое выражение каждой функции и объединяет все в
один большой файл
 */
const modules = {};
function require(moduleName) {
    return modules[moduleName];
}

modules['sets.js'] = (function () {
    const exports = {};
    // Здесь находится содержимое файла sets.js:
    exports.BitSet = class BitSet {
        // ...
    };
    return exports;
})();

modules['stats.js'] = (function () {
    const exports = {};
    // Здесь находится содержимое файла stats.js:
    const sum = (x, y) => x + y;
    const square = x => x * x;
    exports.mean = function (data) {
        // ...
    };
    exports.stddev = function (data) {
        // ...
    };
    return exports;
})();

/*
Код является грубым наброском того, как работают инструменты пакетирования кода 
(наподобие webpack и Parcel) для веб-браузеров, а также простым введением в функцию 
r e q u ir e () вроде той, что применяется в программах Node
*/
// Получить ссылки на необходимые модули (или на содержимое модуля):
const stats = require('stats.js');
const BitSet = require('sets.js').BitSet;
// Код для использования этих модулей:
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // средняя величина равна 20

// Каждый файл в Node является независимым модулем с закрытым пространством имен

// В Node определен глобальный объект exports, который доступен всегда

// Чтобы экспортировать множ-во значений достаточно присвоить их объекту exports:
exports.mean = data => data.reduce(sum) / data.length;
exports.stddev = function (d) {
    let m = exports.mean(d);
    // ...
};

// Если нужно экспортировать ф-ию или класс:
module.exports = class BitSet extends AbstractWritableSet {
    // реализация не показана
};

// Еще один подход - экспортирование одиночного объекта в
// конце модуля вместо экспортирования функций друг за другом:
module.exports = { mean, stddev };

// ---------- Импорт ---------------------------

// импортирования именно тех функций, которые мы хотим
const { stddev } = require('./stats.js');
