// https://habr.com/ru/post/479048/
const { Readable } = require('stream');
// Стрим можно создать используя наследование или с помощью функции-конструктора.

// 1 - Используя конструктор
const myReadable = new Readable(opt);

// 2 - Наследуя класс
class myReadable extends Readable {
    constructor(opt) {
        super(opt);
    }
}

// ------------- Readable stream
const { Readable } = require('stream');

class Counter extends Readable {
    constructor(opt) {
        super(opt);
        this._max = 1000;
        this._index = 0;
    }

    _read() {
        this._index += 1;

        if (this._index > this._max) {
            this.push(null);
        } else {
            const buf = Buffer.from(`${this._index}`, 'utf8');

            console.log(`Added: ${this._index}. Could be added? `, this.push(buf));
        }
    }
}

// highWaterMark — максимальное количество байтов внутреннего буфера стрима (по умолчанию 16кб)
//      по достижению которого считывание из ресурса приостанавливается
const counter = new Counter({ highWaterMark: 2 });
counter.on('data', chunk => {
    // в консоли выведутся цифры от 1 до 1000
    console.log(`Received: ${chunk.toString()}`);
});

// --------------- Writable stream
const { Writable } = require('stream');

class Counter extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());

        callback();
    }
}

const counter = new Counter({ highWaterMark: 2 });
(async () => {
    for (let i = 1; i < 1000; i += 1) {
        const canWrite = counter.write(Buffer.from(`${i}`, 'utf8'));

        console.log(`Can we write bunch of data? ${canWrite}`);

        if (!canWrite) {
            await events.once(counter, 'drain');
            console.log('drain event fired.');
        }
    }
})();

// -------------- Duplex stream
