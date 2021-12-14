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

// Functor + Chaining + composition
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
