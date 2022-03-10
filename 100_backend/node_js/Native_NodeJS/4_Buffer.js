// Хоть Buffer и встроен в Node, рекомендуется его подключать
import { Buffer } from 'buffer';
// const { Buffer } = require('buffer');

// Buffer объекты используются для представления последовательности байтов фиксированной длины
// Буфер позвол. работать с частью памяти, которая не подлежит сборке мусора
// Сборке мусора будет подвержен только идентификатор, который ссылается на этот буфер
// В Buffer класс является подклассом JavaScript Uint8Array class

// 3 метода создания буфера: alloc, allocUnsafe, from
const buf1 = Buffer.alloc(10); // Создает заполненный нулями буфер длиной 10
const buf2 = Buffer.alloc(10, 1); // Создает заполненный единицами буфер длиной 10
const dead = Buffer.alloc(1024, 'DEADBEEF', 'hex'); // Повторяющийся шаблон байтов.
const buf3 = Buffer.allocUnsafe(10); // без предварит. очистки памяти (небезопасно)
const buf4 = Buffer.from([1, 2, 3]); // из иттерир. объекта
const buf = Buffer.from('tést', 'latin1'); // в заданной кодировке (по умолчанию UTF-8)

buf.fill('A', 0, 10); // заполнить буфер бкувами А с 0 позиции до 10

// Поддерживаемые кодировки:
//      utf8            - Unicode
//      utf16le (ucs2)  - Двухбайтовые символы Unicode с порядком байтов от младшего к старшему
//      latin1 (binary) - ISO-8859-1 с одним байтом на символ
// Кодировки двоичного кода:
//      ascii           - 7-битная кодировка ASCII только для английского языка
//      hex             -  преобразует каждый байт в пару шестнадцатеричных цифр ASCII
//      base64          - преобразует в последовательность из четырех символов ASCII
//  и другие.

buf.toString('hex'); // Prints: 68656c6c6f20776f726c64
buf.toString('base64'); // Prints: aGVsbG8gd29ybGQ=

let b = Buffer.from([0x41, 0x42, 0x43]); // <Buffer 41 42 43>
b.toString(); // => 'АВС'; по умолчанию utf8
b.toString('hex'); // => 414243
let computer = Buffer.from('IBM3111', 'ascii');
for (let i = 0; i < computer, length; i++) {
    computer[i]--;
}
computer.toString('ascii'); // => "HAL2000"
computer
    .subarray(0, 3)
    .map(x => x + 1)
    .toString(); // => "IBM”

// Буферы имеют методы для чтения и записи многобайтовых
//      значений из и в буфер с любым указанным смещением,
dead.readUInt32ВЕ(0); // => OxDEADBEEF
dead.readUInt32BE(1); // => OxADBEEFDE
dead.readBigUInt64BE(6); // => OxBEEFDEADBEEFDEADn
dead.readUInt32LE(1020); // => OxEFBEADDE

// Есть методы как у строки
const buffer = Buffer.from('Hello, World!');
const k = buffer.indexOff('Hello'); // 0
const k1 = buffer.slice(2, 5); // 'llo'

// По буферу можно итерироваться
// buf.values(), buf.keys(), а также buf.entries() могут использоваться для создания итераторов
for (const char of buffer.values()) {
    console.log(char);
}

for (const [index, code] of buffer.entries) {
    const char = String.fromCodePoint(code);
    console.log(index, code, char);
}

// ---------- Класс Blob
// инкапсулирует неизменяемые необработанные данные, которые могут безопасно
//      совместно использоваться несколькими рабочими потоками
const blob = new buffer.Blob(sources, options);

// Его методы и свойства:
blob.arrayBuffer();
blob.size;
blob.slice(start, end, type);
blob.stream();
blob.text();
blob.type;

// После создания объекта {Blob} его можно отправить через MessagePort в несколько
//      пунктов назначения без передачи или немедленного копирования данных.
//      Данные, содержащиеся в Blob копируется только тогда, когда вызыв-ся arrayBuffer()
//      или text()
