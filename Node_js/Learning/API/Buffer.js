// Объекты буфера используются для представления последовательности байтов фиксированной длины
// Выделение чистой памяти. Буфер заполнен нулями
const b1 = Buffer.alloc(1024);
const b3 = Buffer.alloc(10).fill('A'); // аллокировал на 10 байтов и заполнил буквами А

// Выделение памяти без очистки (может остаться хлам от предыдущей работы)
// По скорости лучше, чем alloc
const b2 = Buffer.allocUnsafe(1024);

// Буфер из массива
const b1 = Buffer.from([1, 2, 3, 4, 5, 6]);
console.log(b1); // <Buffer 01 02 03 04 05 06>

const b2 = Buffer.from('Какая-то строка данных');
console.log(b2.toString('hex')); // --> набор цифр и букв
console.log(b2.toString('base')); // --> набор букв
console.log(b2.toString('utf8')); // --> полностью читаемый вид
console.log(b2.toString('binary')); // -->читается только анг.буквы (кириллица не читается)

// Буферы можно конкатинировать
const buffer = Buffer.concat([b1, b2, b3]);

// поиск подстроки
b2.includes('строка'); // true

// Буфер еще имеет методы:
// .indexOf(), .slice()
// Можно итерироваться "for..of buffer.values", "for..of buffer.entries"
