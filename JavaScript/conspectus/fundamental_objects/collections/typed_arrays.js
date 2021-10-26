
/**
 * Типизированные массивы 
 *      формально не являются массивами (Array.isArray() возвращает для них false), 
 *      но они реализуют все методы массивов, плюс несколько собственных.
 * 
 * Все элементы тип.массива представл. собой числа, которым можно указать тип
 *      (целочисленый со знаком и без знака и с плавающей точкой IEEE-754) 
 *      и размер (от 8 до 64 бит)).* 
 * Вы должны указывать длину типизированного массива при его создании, 
 *      и эта длина никогда не изменяется (length допускает только чтение, а методы, 
 * изменяющие длину не реализованны (pop(), push() и др.)).
 * Элементы типизированного массива всегда инициализируются 0 при создании массива.
 * 
 * Типизированные массивы и класс DataView предоставляют вам все инструменты, 
 *      необходимые для обработки двоичных данных, и позволяют писать программы 
 *      JavaScript, которые выполняют такие действия, как распаковка файлов 
 *      ZIP либо извлечение метаданных из файлов JPEG.
 * 
 * ArrayBuffer - выделяет память, но доступа к ней не дает.
 * DataView    - связан с ArrayBuffer. Позволяет доступаться к памяти.
 * 
 * Виды типизированных массивов:

Int8Array()         байты со знаком
Uint8Array()        байты без знака (числа между 0 и 255)
Uint8ClampedArray() байты без знака и без переноса бит (числа между 0 и 255)
Intl6Array()        16-битные короткие целые числа со знаком
Uintl6Array()       16-битные короткие целые числа без знака
Int32Array()        32-битные целые числа со знаком
Uint32Array()       32-битные целые числа без знака
BigInt64Array()     64-битные значения B ig ln t со знаком (ES2020)
BigUint64Array()    64-битные значения B ig ln t без знака (ES2020)
Float32Array()      32-битные значения с плавающей точкой
Float64Array()      64-битные значения с плавающей точкой: обыкновенные числа JavaScript
 */
/**
 * Типы с именами, начинающимися на:
 * Int - хранят целые числа со знаком, состоящие из 1, 2 или 4 байтов (8, 16 или 32 бит). 
 * Uint - хранят целые числа без знака той же длины. 
 * BigInt и BigUnit - хранят 64-битные целые числа, представляемые как значения BigInt. 
 * Float - хранят числа с плавающей точкой. 
 * Float64Array - имеют тот же тип, что и обыкновенные числа JavaScript.
 * Float32Array - c низкой точностью и меньшим диапазоном, но требуют только половину памяти.
 * 
 * Каждый конструктор тип. массива имеет св-во BYTES_PER_ELEMENT со значениями 1, 2, 4 или 8. 
 */

/// СОЗДАНИЕ ТИПИЗИРОВАННЫХ МАССИВОВ
const bytes = new Uint8Array(1024);                   // 1024 байта
const white = Uint8ClampedArray.of(255, 255, 255, 0); // белый цвет RGBA

// копирование тип. массива с изменением типа
const ints = Uint32Array.from(white);       // те же 4 числа, но целые

// при создании массива числа могут усекаться
Uint8Array.of(1.23, 2.99, 45000);           // [1, 2, 200]

// ArrayBuffer - непрозрачная ссылка на порцию памяти
// не позволяет читать или записывать выделенные байты
const buffer = new ArrayBuffer(1024*1024);
buffer.byteLength;          // 1024*1024; один мегабайт памяти


/// МЕТОДЫ И СВОЙСТВА ТИПИЗИРОВАННЫХ МАССИВОВ
// .set(array, offset);     // offset - смещение элемента
// .subarray(begin, end);   // возращ. часть массива, на котором он вызван
// .buffer;                 // Объект ArrayBuffer для типизированного массива
// .byteOffset;             // нач. позиция данных массива внутри лежащего в основе буфера
// .byteLength;             // длина данных массива в байтах


/// класс DataView
// - определяет методы для чтения/записи значений из ArrayBuffer с явно указ. порядком байтов
let view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
let int = view.getInt32(0); // Прочитать целое число со знаком и порядком от старшего к младшему из байта 0
int = view.getInt32(
    4, 
    false       // порядок от стар. к млад.
);  // След. целое число тоже имеет порядок от стар. к млад.
int = view.getInt32(8, true);   // След. ц. число без знака имеет пор. от млад. к стар.
view.setUint32(8, int, false);  // записать его в формате с пор. от стар. к млад.
// DataView, кроме геттеров имеет и сеттеры


/// от Шемсединова
const arrayBuffer = new ArrayBuffer(10);        // выделили 10 байт памяти

console.dir(arrayBuffer);                        // ArrayBuffer {byteLength: 10}
console.log(arrayBuffer.byteLength);             // 10
console.log(typeof arrayBuffer);                 // Object
console.log(arrayBuffer instanceof ArrayBuffer); // true

const ui8a = new Uint8Array();
console.log(ArrayBuffer.isView(ui8a));           // true (ui8a - типизир.массив)

// сделам вьюшку
const len = 1024;       // выделили памяти 1 кб
const buffer = new ArrayBuffer(len);
const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 8, 24);       // 24 байта со смещением 8
const view3 = new DataView(buffer, 128, 16);     //

// заполним буфер
for (let i = 0; i < len; i++) {
    const value = (i + 7) * 5;
    view1.setUint8(i, value);
}

console.log(
    view1,// DataView {byteLength: 1024, byteOffset: 0,   buffer: ArrayBuffer { byteLength: 1024}}
    view2,// DataView {byteLength:   24, byteOffset: 8,   buffer: ArrayBuffer { byteLength: 1024}}
    view3 // DataView {byteLength:   16, byteOffset: 128, buffer: ArrayBuffer { byteLength: 1024}}
    );

// ...
