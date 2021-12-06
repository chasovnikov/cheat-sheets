const path = require('path');

let p = '';

__filename; // путь к текущему файлу

__dirname; // путь к текущей папке
p = path.dirname(__filename); // путь к текущей папке

// Название файла
p = path.basename(__filename, '.js'); // path
p = path.basename(__filename); // path.js
p = path.basename(__filename, '.php'); // path.js
p = path.win32.basename('C:\\temp\\myfile.html'); // myfile.html
p = path.posix.basename('/tmp/myfile.html'); // myfile.html

// Расширение файла
p = path.extname(__filename); // .js
p = path.extname('index.coffee.md'); // .md
p = path.extname('index.'); // .

// Разделитель пути для конкретной платформы
p = path.sep; // \
p = 'a' + path.delimiter + 'b'; // a;b
p = path.dirname(__filename).split(path.delimiter); // [ 'E:\\!ВЕБ-Разработка\\!!Node_js\\Node_Minin' ]

// Парсинг пути
p = path.parse('/home/user/dir/file.txt'); // {root: '/', dir:..., base:..., ext:..., name:...}

// Собрать путь из объекта (противоположность path.parse())
p = path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt',
}); // /home/user/dir\file.txt

// Проверка абсолютного пути
p = path.isAbsolute('/baz/..'); // true
p = path.isAbsolute('qux/'); // false

// Объединить строки в путь и нормализовать
p = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // \foo\bar\baz\asdf
p = path.join('/foo', 'bar', 'baz/asdf', 'quux'); // \foo\bar\baz\asdf\quux

// Нормализовать путь
p = path.normalize('/foo/bar//baz/asdf/quux/..'); // \foo\bar\baz\asdf

// Перечисление методов и др.
p = path.posix; // для POSIX?
p = path.win32; // для Windows?

// Относительный путь от первого аргумента ко второму
p = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'); // ..\..\impl\bbb

// Преобразует в абсолютный путь
p = path.resolve('/foo/bar', './baz'); // E:\foo\bar\baz
p = path.resolve('/foo/bar', '/tmp/file/'); // E:\tmp\file

// Только в Windows возвращает эквивалент путь с префиксом пространства имен для данного path
p = path.toNamespacedPath(__filename); // \\?\E:\!ВЕБ-Разработка\!!Node_js\Node_Minin\path.js
