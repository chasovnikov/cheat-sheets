
/**
 * 
Итерируемые объекты   – реализуют метод [Symbol.iterator]()

Псевдомассивы         – имеют индексы и свойство length


И итерир. объекты, и псевдомассивы – это обычно не массивы, у них нет методов push, pop и т.д.

Array.from() принимает итерируемый объект или псевдомассив и делает из него «настоящий» массив

Итератор позволяет разбить процесс итерации на части: перебрать немного элементов, 
    затем остановиться, сделать что-то ещё и потом продолжить.
 */

let str = "Hello";
// делает то же самое, что и
// for (let char of str) alert(char);
let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // выводит символы один за другим
}


/**
 * Варианты цикла for
 */
// обычно
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// несколько переменных в первом выражении
for (let i = 0, b = 10; i < 3; i++) {
    console.log(i);
}

// переменная вынесена
{
    let i = 0;
    for (; i < 3; i++) {
        console.log(i);
    }
}

// переменная меняется внутри цикла
for (let i = 0, b = 10; i < 3;) {
    console.log(i++);
}


// цикл с предусловием
let a = 0;
while (a < 0) {
    console.log(a++);
}

// цикл с постусловием
let i = 0;
do {
    console.log(i++);
} while (i < 0);


/**
 * for..in  - итерирование по ключам
 * ключи - только string
 * значения любых типов
 */
const hash = {
    first: 7,
    second: 10,
};

for (const key in hash) {
    const value = hash[key];
    console.log(
        key, '\t', typeof key, '\t',
        value, '\t', typeof value
    );
}

/**
 * for..of - итерирование по значениям
 */
for (const value of hash) {
    console.log(value);
}

/**
 * break
 *      позволяет выходить из циклов и блоков кода
 */
label1: {
    console.log(1);
    label2: {
        console.log(2);
        break label1;       // напечатается: 1, 2, 5
        // break label2;    // напечатается: 1, 2, 4, 5
        console.log(3);
    }
    console.log(4);
}
console.log(5);

/**
 * continue
 *      позволяет пропустить итерацию цикла
 */
let i = 0;
while (i < 10) {
    i++;
    console.log('Hello');
    if (i === 5) continue;
    console.log('World');
}


const numbers = [7, 10, 1, 5, 2];
/**
 * item - элемент из массива
 * i    - его порядковый номер (необяз.)
 * arr  - ссылка на сам массив (необяз.)
 */
numbers.forEach( (item, i, arr) => {
    console.log(i, arr, item);
});

/**
 * Итерирование двумерного массива
 */
for (const i in matrix) {
    const row = matrix[i];
    for (const j in row) {
        const col = row[j];
        console.log(i, j, col);
    }
}

for (const row of matrix) {
    for (const item of row) {
        console.log(item);
    }
}


/**
 * Symbol.iterator.
 * Протокол итерироваемости.
 */
const range = {
    start: 1,
    end: 10,
    [Symbol.iterator]() {   // вызывается, когда испол-ся spread-опер-р или цикл
        let value = this.start;
        return {
            next: () => ({  // next() - обязательный метод
                value,
                done: value++ === this.end + 1,// false - след.итер-я; true - конец цикла
            }),
        };
    }
};

console.dir({
    range,
    names: Object.getOwnPropertyNames(range),
    symbols: Object.getOwnPropertySymbols,
});


/**
 * Обратный итератор
 */
const arr = [2, 5, -1, 7, 0];
arr[Symbol.iterator] = function() {     // "function" позвол. использ. this
    let index = this.length;
    return {
        next: () => ({
            done: index-- === 0,
            value: this[index],
        }),
    };
}


/**
 * Асинхронное итерирование
 */
 const range = {
    start: 1,
    end: 10,
    [Symbol.asyncIterator]() {
        let value = this.start;
        return {
            next: () => Promise.resolve({
                value,
                done: value++ === this.end + 1,
            }),
        };
    }
};

// асинхронный цикл
(async () => {
    for await (const number of range) {
        console.log(number);
    }
})();



/**
 * Неблокирующее асинхронное итерирование.
 * 
 * Код, который заблокирует выполнение setTimeout(для примера):
 */
const numbers = new Array(10000).fill(1);
setTimeout(() => {
    console.log('setTimeout 0');
}, 0);
numbers.forEach((item, i) => {
    console.log(i);
});
