//  console.error(), отличается от вывода, отображаемого с помощью console.log(),
// поскольку console.error() осуществляет запись в стандартный поток ошибок stderr.

// Node может читать свои аргументы командной строки через process.argv
// Может принимать ввод от переменных среды через process.env

// -----------------  Жизненный цикл программы
// Если не хотите, чтобы исключения приводили к полному отказу вашей программы,
// тогда зарегистрируйте функцию глобального обработчика:
process.setUncaughtExceptionCaptureCallback(e => {
    console.error('Uncaught exception:', e);
    // Неперехваченное исключение
});

// Перехват всех исключений для промисов:
process.on('unhandledRejection', (reason, promise) => {
    // reason - любое значение, которое передавалось бы вызову .catch ().
    // promise - объект Promise, который был отклонен.
});

// ------------------ Модули Node
// Модулb CommonJS подключаются через require() и module.exports и не разрешает
//      применять ключевые слова import и export.
// Для модулей ES6 - наоборот.
// Расширение файла .mjs - для ES6
// Расширение файла .cjs - для CommonJS
// Для других расширений Node смотрит package.json в той же папке или подпапках и
//      проверяет свойство type. Если его значение - "module", то загруз-ся как ES6,
//      а, если "commonjs" - CommonJS
// Если package.json не найден или нет type, то - CommonJS
// Node разрешает модулям ES6 загружать модули CommonJS, используя ключевое слово import,
//      но CommonJS не может применять require() для загрузки модуля ES6

// ------------------- Диспетчер пакетов Node
// Когда устанавливается пакет с помощью npm, то записывается зависимость в package.json
// > npm install    - устанавливает все пакеты из package.json

// ----------------- Среда Node асинхронна по умолчанию

// Worker - разновидность потока, позаимствованныя у веб-браузера
// Взаимодействие между процессами и воркерами осущест-ся через передачу сообщений, и
//      они не позволяют легко совместно использовать память друг друга
// Нод добивается высоких уровней параллелизма, но сохраняет однопоточность
//  засчет асихронности API и его неблокируемости
// Некоторые функции в API-интерфейсе Node являются синхронными, но неблокирующими
//      Они выполняются до завершения и возвращают управление без потребности в блокировке

const fs = require('fs');
// Читает файл конфигурации, разбирает его содержимое как JSON
// и передает результирующее значение обратному вызову.
// Если что-то идет не так, тогда выводит сообщение об ошибке
// в stderr и вызывает обратный вызов с null,
function readConfigFile(path, callback) {
    fs.readFile(path, 'utf8', (err, text) => {
        if (err) {
            // Что-то пошло не так при чтении файла,
            console.error(err);
            callback(null);
            return;
        }
        let data = null;
        try {
            data = JSON.parse(text);
        } catch (e) {
            //Что-то пошло не так при разборе содержимого файла,
            console.erгог(е);
        }
        callback(data);
    });
}

// Легко создать основанные на промисах варианты API-интерфейсов на базе колбэков
//      с применением оболочки util.promisify()
const util = require('util');
const fs = require('fs');
const pfs = { readFile: util.promisifу(fs.readFile) };
function readConfigFile(path) {
    return pfs.readFile(path, 'utf-8').then(text => {
        return JSON.parse(text);
    });
}

// Затем можем упростить ф-ию, используя async и await
async function readConfigFile(path) {
    let text = await pfs.readFile(path, 'utf-8');
    return JSON.parse(text);
}

// fs.promises имеет несколько предопределенных функций
// в предыдущем коде мы могли бы заменить pfs.readFile() на fs.promises.readFile()

// Когда сервер запускается впервые и читает свои файлы конфигурации, он
// еще не обрабатывает сетевые запросы и потому можно использовать синхрон. ф-ии
function readConfigFileSync(path) {
    let text = fs.readFileSync(path, 'utf-8');
    return JSON.parse(text);
}

// Встроенные неблокирующие функции Node
// работают с применением версий обратных вызовов и обработчиков событий, предоставляемых ОС

// Cтиль параллелизма на основе событий:
// В своей основе Node имеет единственный поток, который выполняет “цикл обработки событий”
