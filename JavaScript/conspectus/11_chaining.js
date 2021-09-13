
// -- На прототипах
const Text = function(s) {
    this.value = s;
};

Text.prototype.line = function(a) {
    this.value += '\n' + a;
    return this;    // позволяет создавать цепочки вызовов
};

// Приведение объекта к строке в случае, например, конкатенации с другой строкой
Text.prototype.toString = function() {
    return this.value;
};

// Usage:
const txt = new Text('line1')
    .line('line2')
    .line('line3')
    .line('line4');


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
});

// Usage:
const txt = text('line1')
    .line('line2')
    .line('line3')
    .line('line4');

// Мутабельный вариант (Один и тот же изменяемый объект)
const text = (s = '', o = {             // во второй аргумент объект по умолчанию
    line: a => text(s + '\n' + a, o),   // оба выражения высчитаются, но вернётся последнее
    toString: () => s,
}) => o;

// То же + итерирование объекта
const text = (s = '', o = {
    line: a => text(s + '\n' + a, o),
    [Symbol.iterator]: () => ({
        next() {
            // finished -> undefined, done == false: итерирование продолжается
            const res = { value: s, done: this.finished };
            this.finished = true;   // done == true: завершающаяся итерация
            return res;
        }
    }),
}) => o;

console.log(`"${[...txt]}"`);


// Обычый чейнинг: последовательное выполнение, несовместима с ассинхронным програм-ем
chaining
    .for([1, 2, 3, 4])
    .filter(item => item % 2 === 0)
    .map(item => item * 2)
    .reduce((a, b) => a + b)
    .fetch((err, result) => {
        if (err) throw err;
        if (!done) console.dir(result);
        next();
    });

// На колбэках: не блокирующая, совместима с ассинхронным програм-ем
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

// process.nextTick будет отдавать время в Event Loop
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