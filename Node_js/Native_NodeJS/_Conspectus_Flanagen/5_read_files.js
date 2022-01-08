const fs = require('fs');
// Можно прочитать файл одним вызовом (большой расход памяти для больших файлов)

let buffer = fs.readFileSync('test.data'); // синхронно вернет буфер
let text = fs.readFileSync('data.csv', 'utf8'); // синхронно вернёт строку

// Есть аналогичные методы для асинхронного чтения через колбэки и через промисы

// Читать байты асинхронно
fs.readFile('test.data', (err, buffer) => {
    if (err) {
        // Обработать ошибку
    } else {
        // Байты файла находятся в буфере
    }
});

// Асинхронное чтение на основе Promise,
fs.promises.readFile('data.csv', 'utf8').then(processFileText).catch(handleReadError);
// Или применить API-интерфейс Promise c await внутри
// асинхронной функции.
async function processText(filename, encoding = 'utf8') {
    let text = await fs.promises.readFile(filename, encoding);
    // ...обработать текст...
}

// Если у вас есть возможность обрабатывать содержимое файла последовательно и
//      отсутствует необходимость, чтобы все содержимое файла находилось
//      в памяти, тогда чтение файла через поток может оказаться самым эффективным подходом
function printFile(filename, encoding = 'utf8') {
    fs.createReadStream(filename, encoding).pipe(process.stdout);
}

// Если вас интересует низкоуровневый контроль над тем, какие
//      именно байты вы читаете из файла и когда, то можете открыть файл для получения
//      файлового дескриптора и затем использовать функцию f s . read (),
//      fs.readSync() или fs.promises.read()
const fs = require('fs');
// Чтение указанной порции файла данных,
fs.open('data', (err, fd) => {
    if (err) {
        // Сообщить об ошибке,
        return;
    }
    try {
        // Прочитать байты с 20 по 420 во вновь выделенный буфер.
        fs.read(fd, Buffer.alloc(400), 0, 400, 20, (err, n, b) => {
            // err - ошибка, если есть.
            // n - количество фактически прочитанных байтов.
            // b - буфер, в который были прочитаны байты.
        });
    } finally {
        // Использовать конструкцию finally, чтобы всегда
        fs.close(fd); // закрывать открытый файловый дескриптор.
    }
});

// Если вы можете использовать синхронный API-интерфейс (или API-интерфейс
//      на основе Promise с await), то читать множество порций из файла будет легко
function readData(filename) {
    let fd = fs.openSync(filename);
    try {
        // Прочитать заголовок файла.
        let header = Buffer.alloc(12); // Буфер из 12 байтов.
        fs.readSync(fd, header, 0, 12, 0);
        // Проверить магическое число файла,
        let magic = header.readInt32LE(0);
        if (magic !== OxDADAFEED) {
            throw new Error('File is of wrong type');
        }
        // Файл имеет неправильный тип
        // Получить из заголовка смещение и длину данных,
        let offset = header.readInt32LE(4);
        let length = header.readInt32LE(8);
        // Прочитать эти байты из файла,
        let data = Buffer.alloc(length);
        fs.readSync(fd, data, 0, length, offset);
        return data;
    } finally {
        // Всегда закрывать файл, даже если
        // было сгенерировано исключение,
        fs.closeSync(fd);
    }
}
