
// -- На прототипах
const Text = function(s) {
    this.value = s;
};

Text.prototype.line = function(a) {
    this.value += '\n' + a;
    return this;             // позволяет создавать цепочки вызовов
};

// Вызывается при приведении объекта к строке
Text.prototype.toString = function() {
    return this.value;
};

// Usage:
const txt = new Text('line1')
    .line('line2')
    .line('line3')
    .line('line4');     // из каждого метода line возращается объект


// -- На классах
class Text {
    constructor(s) {
        this.value = s;
    }
    line(a) {
        this.value += '\n' + a;
        return this;
    }
    toString() {
        return this.value;
    }
}


// -- Через функторы 
// Не мутабельный вариант (на каждой итерации новый объект)
const text = (s = '') => ({
    line: a => text(s + '\n' + a),  // рекурсия!
    toString: () => s,
});                                 // объект попал в замыкание

// Usage:
const txt = text('line1')
    .line('line2')
    .line('line3')
    .line('line4');

// Мутабельный вариант (Один и тот же изменяемый объект)
const text = (s = '', o = {             // во второй аргумент перед-ся объект по умолчанию
    line: a => text(s += '\n' + a, o),  // оба выражения высчит-ся, но вернётся последнее
    toString: () => s,
}) => o;

// То же + итерирование объекта
const text = (s = '', o = {
    line: a => text(s + '\n' + a, o),
    [Symbol.iterator]: () => ({
        next() {
            // finished -> undefined; done == false: итерирование продолжается
            const res = { value: s, done: this.finished };
            this.finished = true;   // done == true: завершающаяся итерация
            return res;
        }
    }),
}) => o;

console.log(`"${[...txt]}"`);


// На промисах:
class ArrayChain {
    constructor(array) {
        this._promise = Promise.resolve(array);
    }

    then(fn) {
        return this._promise.then(fn);
    }

    catch(fn) {
        return this._promise.catch(fn);
    }

    fetch(fn) {
        return (this
            .then(data => fn(null, data))
            .catch(err => fn(err))
        );
    }

    _chain(performer, fn, initial) {
        this._promise = this._promise.then(array => (
            new Promise((resolve, reject) => (
                performer(array, fn, (err, result) => (
                    (err ? reject(err) : resolve(result))
                ), initial)
            ))
        ));
    }

    map(fn) {
        this._chain(api.metasync.map, fn);
        return this;
    }

    filter(fn) {
        this._chain(api.metasync.filter, fn);
        return this;
    }

    reduce(fn) {
        this._chain(api.metasync.reduce, fn, initial);
        return this;
    }
}


module.exports = (chaining, done) => {
    let count = 0;
    const next = () => (++count === 3 && done ? done() : 0);

    // Обычый чейнинг: последовательное выполнение, несовместимо с ассинхронным програм-ем
    chaining
        .for([1, 2, 3, 4])               // запихиваем массив в замыкание
        .filter(item => item % 2 === 0)
        .map(item => item * 2)
        .reduce((a, b) => a + b)
        .fetch((err, result) => {        // получение данных
            if (err) throw err;
            if (!done) console.dir(result);
            next();                      // запуск следующего теста
        });
    
    // На колбэках: не блокирующая, совместима с ассинхронным програм-ем
    // отдает часть времени исполнения в Event Loop
    chaining
        .for([1, 2, 3, 4])
        .filter((item, callback) => callback(null, item % 2 === 0))
        .map((item, callback) => callback(null, item * 2))
        .reduce((a, b, callback) => callback(null, a + b))
        .fetch((err, result) => {
            if (err) throw err;
            if (!done) console.dir(result);
            next();
        });
    
    // process.nextTick будет отдавать всё время в Event Loop
    chaining
        .for([1, 2, 3, 4])
        .filter((item, cb) => process.nextTick(cb, null, item % 2 === 0))
        .map((item, cb) => process.nextTick(cb, null, item * 2))
        .reduce((a, b, cb) => process.nextTick(cb, null, a + b))
        .fetch((err, result) => {
            if (err) throw err;
            if (!done) console.dir(result);
            next();
        });
    
    // генерация ошибки
    chaining
        .for([1, 2, 3, 4])
        .map((item, callback) => callback(new Error('Something happened')))
        .fetch((err, result) => {
            if (!done) {
                if (err) console.log(err.result);
                else console.dir(result);
            }
            next();
    });
}

// на функторах
const arrayChain = (array, prev = null) => {
    let next = null, done = null, fail = null;

    const self = (err, data) => {
        array = data;
        if (next) next();
        if (err) {
            if (fail) fail(err);
        } else if (done) {
            done(data);
        }
    };

    if (!prev) process.nextTick(() => self(null, array));

    self.then = fn => (done = fn, self);
    self.catch = fn => (fail = fn, self);
    self.fetch = fn => (self
        .then(data => fn(null, data))
        .catch(err => fn(err))
    );

    const chain = performer => (fn, initial) => {
        const res = arrayChain(null, self);
        next = () => performer(array, fn, res, initial);
        return res;
    };

    self.map = chain(api.metasync.map);
    self.filter = chain(api.metasync.filter);
    self.reduce = chain(api.metasync.reduce);

    return self;
};

module.exports = {
    for: arrayChain
};


// На прототипах
const async = op => {
    switch (op) {
        case 'map': return api.metasync.map;
        case 'filter': return api.metasync.filter;
        case 'reduce': return api.metasync.reduce;
    }
};

function ArrayChain() {
    this.array = this.array;
    this.chain = [];
}

ArrayChain.prototype.execute = function(err) {
    const item = this.chain.shift() || {};
    if (err) {
        if (!item.op) throw err;
        if (item.op === 'catch') {
            item.fn(err);
            return this.execute();
        } else {
            return this.execute(err);
        }
    }
    if (!item.op) return;
    if (item.op === 'then') {
        item.fn(this.array);
        return this.execute();
    }
    const op = async(item.op);
    if (!op) return this.execute();
    op(this.array, item.fn, (err, data) => {
        if (err) return this.execute(err);
        this.array = data;
        this.execute();
    });
};

ArrayChain.prototype.then = function(fn) {
    this.chain.push({ op: 'then', fn });
    return this;
}

ArrayChain.prototype.catch = function(fn) {
    this.chain.push({ op: 'catch', fn });
    return this;
}

// fetch исполняет отложенные операции (только на прототипах)
ArrayChain.prototype.fetch = function(fn) {
    this.chain.push({ op: 'then', fn: res => fn(null, res) });
    this.chain.push({ op: 'catch', fn });
    this.execute();
    return this;
}

ArrayChain.prototype.map = function(fn) {
    this.chain.push({ op: 'map', fn });
    return this;
}

module.exports = {
    for: array => new ArrayChain(array)
};
