// Инверсия управления - код имеет два слоя: системный код и прикладной. Системный управляет
//      прикладным кодом. Выделяется управляющая абстракция и управляемая
// Самая распространенная инверсия управления - это внедрение зависимостей
// Внедрение зависимости используется для неявного связывания модулей, на уровень абстракций это не влияет

// Создание песочницы
globalThis.api = {}; // создаем пространство имен
api.fs = require('fs');
api.vm = require('vm'); // позволяет создавать песочницу
api.sandboxedFs = require('sandboxed-fs');

// оборачивать (перехватывать) интерфейсы
// оптимально перехватывать в 3-х местах:
//      1) до вызова ф-ии,
//      2) после вызова,
//      3) до вызова колбэка (можно ещё и 4) после вызова колбэка)
// cloneInterface - клонирует весь интерфейс, добавляя обёртки
// wrapFunction - оборачивает одну функцию
const { cloneInterface, wrapFunction } = require('./wrapper');

const log = s => {
    console.log('Логирование:');
    console.log(s);
};

// Вместо require
const safeRequire = name => {
    if (name === 'fs') {
        const msg = 'Вы не имеете доступа к API fs';
        console.log(msg);
        return new Error(msg);
    } else {
        return require(name);
    }
};

// Умеет из каждого приложения запускать точку входа 'main'
const runSandboxed = path => {
    const fileName = path + 'main.js';

    // создаем глобальный контекст
    const context = {
        module: {},
        require: safeRequire,
        // все библ-ки в песочнице объединим в простр-во имен 'api'
        // например, вместо require('fs') - api.fs
        api: {
            console: { log },
            timers: {
                setTimeout: wrapFunction('setTimeout', setTimeout),
            },
            fs: cloneInterface(api.sandboxedFs.bind(path)), // две обертки
        },
    };
    context.global = context; // рекурсивная ссылка
    const sandbox = api.vm.createContext(context);
    api.fs.readFile(fileName, (err, src) => {
        const script = new api.vm.Script(src, fileName);
        const f = script.runInNewContext(sandbox);
        if (f) f();
    });
};

// Запуск 2-х приложений внутри 2-х песочниц
runSandboxed('./applications/application1');
runSandboxed('./applications/application1');
