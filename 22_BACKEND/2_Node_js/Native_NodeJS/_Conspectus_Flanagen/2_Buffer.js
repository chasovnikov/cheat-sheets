// --------------- Буферы
// Буфер содержит последовательность байтов
// Теперь, когда Unit8Array входит в состав языка JavaScript,
//      класс Buffer среды Node реализован как подкласс Unit8Array
// Buffer отличается от Unit8Array тем, что он спроектирован для взаимодействия со строками
// Имея строку текста и кодировку символов, мы можем закодировать символы строки
//      в последовательность байтов (и обратно)
// Поддерживаемые кодировки:
//      utf8            - Unicode
//      utf16le (ucs2)  - Двухбайтовые символы Unicode с порядком байтов от младшего к старшему
//      latin1 (binary) - ISO-8859-1 с одним байтом на символ
//      ascii           - 7-битная кодировка ASCII только для английского языка
//      hex             -  преобразует каждый байт в пару шестнадцатеричных цифр ASCII
//      base64          - преобразует в последовательность из четырех символов ASCII

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

// Создать новые "пустые" буферы с помощью Buffer.alloc() .
let zeros = Buffer.alloc(1024); // 1024 нуля,
let ones = Buffer.alloc(128, 1); // 128 единиц,
let dead = Buffer.alloc(1024, 'DEADBEEF', 'hex'); // Повторяющийся шаблон байтов.

// Буферы имеют методы для чтения и записи многобайтовых
//      значений из и в буфер с любым указанным смещением,
dead.readUInt32ВЕ(0); // => OxDEADBEEF
dead.readUInt32BE(1); // => OxADBEEFDE
dead.readBigUInt64BE(6); // => OxBEEFDEADBEEFDEADn
dead.readUInt32LE(1020); // => OxEFBEADDE
