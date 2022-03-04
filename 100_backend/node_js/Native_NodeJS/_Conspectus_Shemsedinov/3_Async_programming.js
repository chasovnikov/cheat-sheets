// ----------- Подходы:
// callbacks    - самые быстрые
// async.js     - на основе библиотеки async.js
// promises
// async/await
// generators/yield
// observable/events
// functor + chaining + composition
// for await + Symbol.asyncIterator

//
// async.js     -> под капотом: callbacks
// async/await  -> на promises
// events       -> obsevable -> callbacks
// functor + chainig + composition

// При передачи фаргументов в функцию принято (contracts):
// error        - first
// callback     - last
const fn = (err, callback) => {};

// Callbacks
f1(a1, (e, data) => {
    f2(a2, (e, data) => {
        f3(a3, (e, data) => {
            // ...
        });
    });
});

// через bind
f1(
    a1,
    f2.bind(
        null,
        a2,
        f2.bind(
            null,
            a2,
            f4.bind(a3, (e, data) => {
                // ...
            })
        )
    )
);

// -------------- Events
// Связывание через события
const ee = new EventEmitter();
const f1 = () => ee.emit('step2');
const f2 = () => ee.emit('step3');
const f3 = () => ee.emit('done');
ee.on('step1', f1.bind(null, par));
ee.on('step2', f2.bind(null, par));
ee.on('step3', f3.bind(null, par));
ee.on('done', () => console.log('done'));
ee.emit('step1');

// -------------- Promise
// Из асинх. ф-ии возращ. результат без данных, но мы подписываемся на данные и отдельно на ошибки
new Promise((resolve, reject) => {
    resolve(data);
    reject(new Error(/*...*/));
})
    .then(
        result => {},
        reason => {} // обычно с "catch" не пишут
    )
    .catch(err => {}); // обычно с "reason => {}" не пишут

// Последовательное исполнение (sequential)
Promise.resolve()
    .then(f1.bind(null, a1))
    .then(f2.bind(null, a2))
    .then(f3.bind(null, a3))
    .catch(err => console.log(err.message))
    .then(f4.bind(null, a4))
    .catch(err => console.log(err.message))
    .then(data => {
        console.dir({ data });
    });

// Параллельное исполнение
Promise.all([f1(a1), f2(a2), f3(a3), f4(a4)])
    .then(data => {
        console.log('done');
        console.dir({ data });
    })
    .catch(/*...*/);

// Смешанное исполнение(mixed)
Promise.resolve()
    .then(f1.bind(null, a1))
    .then(() => Promise.all([f2(a2), f3(a3)]))
    .then(f4.bind(null, a4))
    .then(data => {
        console.log('done');
        console.dir({ data });
    })
    .catch(/*...*/);

// -------------- async/await
// Возращаемое значение асинх-й ф-ии автом-ки оборач-ся в Promise.resolve()
// throw error автом-ки оборач-ся в Promise.reject() (через catch можно поймать)
async function f() {
    return await new Promise(/*...*/);
}

f().then(console.log('...')).catch(console.error('...'));

// --------------- Functor + Chaining + composition
const c1 = chain().do(f1, a1).do(f1, a1).do(f3, a3);
c1();

// Реализация
// В библиотек Do есть оптимизированная версия этой ф-ии
function chain(prev = null) {
    const cur = () => {
        if (cur.prev) {
            cur.prev.next = cur;
            cur.prev();
        } else {
            cur.forward();
        }
    };
    cur.prev = prev;
    cur.fn = null;
    cur.args = null;
    cur.do = (fn, ...args) => {
        cur.fn = fn;
        cur.args = args;
        return chain(cur);
    };
    cur.forward = () => {
        if (cur.fn) {
            cur.fn(cur.args, () => {
                if (cur.next) {
                    cur.next.forward();
                }
            });
        }
    };
    return cur;
}

// ------------------ Проблемы асинхронности
// У промисов нет timeout (нужен, чтобы, если не успели за определен. время, то - прервать опер-ию)

// Ф-ия обёртка для создания возможности timeout
function timeout(msec, fn) {
    let timer = setTimeout(() => {
        if (timer) console.log('Function timeout');
        timer = null;
    }, msec);
    return (...args) => {
        if (timer) {
            timer = nullfn(...args);
        }
    };
}
// Применение
const fn = par => console.log('Function called, par:' + par);
const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);
setTimeout(() => {
    fn100('first'); // не выполнится
    fn100('first'); // выполнится
}, 150);

// Промис нельзя отменить
// Ф-ия обёртка для создания возможности отмены
const cancelable = fn => {
    const wrapper = (...args) => {
        if (fn) return fn(...args);
    };
    wrapper.cancel = () => (fn = null);
    return wrapper;
};
// Применение
const fn = par => console.log('Function called, par:' + par);
const f = cancelable(fn);
f('first');
f.cancel();
f('second');

// Разные полезные обёртки
const f1 = timeout(1000, fn);
const f2 = cancelable(fn);
const f3 = once(fn); // вызывается не более одного раза
const f4 = limit(10, fn); // вызывается не более 10 раз
const f5 = throttle(10, 1000, fn); // вызывается не более 10 раз за 1 сек
const f6 = debounce(1000, fn); // вызывается не более одного раза за 1 сек
const f7 = utils(fn).limit(10).throttle(10, 1000).timeout(1000); // объединение ф-ий

// Адаптеры асинхронности (Promisify and Callbackify)
// В Node.js встроены в модуле utils
// асинх. ф-ию оборачивает в промис
const promise = promisify(asyncFunction);
promise.then(/*...*/).catch(/*...*/);

// Из промиса делает колбэк
const callback = callbackify(promise);
callbackify((err, value) => {
    /*...*/
});

// --------------- Синхронный контракт привести к асинхронному
//      (что была совместимость контр-ов и можно было использовать в цепочках)
const last = arr => arr[arr.length - 1];
const toAsync =
    fn =>
    (...args) => {
        const callback = last(args);
        args.pop;
        callback(null, fn(...args));
    };

// -------------- Sync function to Promise
const toPromise =
    fn =>
    (...args) =>
        new Promise(resolve => resolve(fn(...args)));
// Применение:
const f1 = par => par;
const f2 = par => par;
const f3 = par => par;
const f4 = par => par;
console.log(f4(f3(f2(f1('value')))));
const pf1 = toPromise(f1);
const pf2 = toPromise(f2);
const pf3 = toPromise(f3);
const pf4 = toPromise(f4);
Promise.resolve()
    .then(pf1.bind(null, 'value'))
    .then(pf2())
    .then(pf3())
    .then(pf4())
    .then(data => console.log(data));

// --------------- Конверторы (есть в библ-ке metasync)
// err-back to Promise
// Promise to err-back
// sync function to Promise
// sync function to err-back
// Events to Promise
// Promise to Events
// Events to err-back
// err-back to Events

// ---------------- Библиотека Metasync

// -------------- Последовательное и параллельное исполнение
const f1 = sequential(
    (name, cb) => fs.readFile(name, cb),
    (data, cb) => http.get(data.url, cb),
    (query, cb) => db.select(query, cb)
);
const f2 = parallel(dbReq1, dbReq2, dbReq3);

// -------------- Параллельно-последовательная композиция
const fx = metasync.flow([f1, f2, f3, [[f4, f5, [f6, f7], f8]], f9]);
// [...]    - последоват.
// [..[..[..]..]..] - параллельн.

// ----------- Абстракция Data Collector (очень похожа на EventEmitter)
const dc1 = new metasync.DataCollector(4); // 4 кусочка данных
const dc2 = new metasync.DataCollector(4, 5000); // 5000 - время в мс
dc1.on('error', (err, key) => {});
dc2.on('timeout', (err, data) => {});
dc2.on('done', (errs, data) => {});
dc1.collector(data); // кусочки данных добавляются в коллекцию (после сбора всех --> "done")

// Key Collector
const keyCollector = new keyCollector(['k1', 'k2'], data => console.log(data));
keyCollector.collector('k1', {});
fs.readFile('HISTORY.md', (err, data) => keyCollector.collect('history', data));

// Это будет быстрее, чем на колбэках, потому что на колбэках заполн-ся стэк,
//      а через события заполнение стэка меньше

const dc1 = metasync
    .collect(3)
    .timeout(5000)
    .done((err, data) => {});
dc(item);
const dc2 = metasync
    .collect(['key1', 'key2', 'key3'])
    .timeout(5000)
    .done((err, data) => {});
dc2(key, value);

// Collector feature
const dc = metasync
    .collect(count)
    .distinct()
    .done((err, data) => {});
dc(key, error, vallue);
dc.pick(key, value); // передает ключ и значение
dc.fail(key, error); // ключу сопоставляет ошибку
dc.take(key, fs.readFile, filename); // взамен: fs.readFile(filename, dc.bind(null, key));

// ------------------ Queue (асинхронная очередь)
// Очереди позволяют задать ограничение пропускной способности, чтобы не повисло приложение
const cq = metasync
    .queue(3) // 3 канала системы массового обслуживания (СМО)
    .wait(2000)
    .timeout(5000)
    .throttle(100, 1000)
    .process((item, cb) => cb(err, result)) // обработка запроса
    .success(item => {})
    .failure(item => {})
    .done(() => {}) // результат или ошибка
    .drain(() => {}); // Это событие случается, когда вся очередь рассосалась
