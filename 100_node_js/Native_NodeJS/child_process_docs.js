// Модуль child_process предоставляет возможность создавать подпроцессы аналогично,
//      но не идентично popen(3). Эта возможность в первую очередь обеспечивается
//      функцией child_process.spawn():

/**
 * По умолчанию каналы для stdin, stdout и stderr устанавливаются между родительским
 * процессом Node.js и порожденным подпроцессом. Эти трубы имеют ограниченную
 * (и зависящую от платформы) пропускную способность. Если подпроцесс записывает в
 * стандартный вывод сверх этого предела без захвата вывода, подпроцесс блокируется,
 * ожидая, пока буфер канала примет больше данных. Это идентично поведению труб в оболочке.
 * Используйте параметр {stdio: 'ignore'}, если вывод не будет использоваться.
 *
 * Поиск команд выполняется с использованием переменной среды options.env.PATH, если
 * она находится в объекте параметров. В противном случае используется process.env.PATH.
 * В Windows переменные среды нечувствительны к регистру. Node.js лексикографически сортирует
 * ключи env и использует первый, совпадающий без учета регистра. Подпроцессу будет передана
 * только первая (в лексикографическом порядке) запись. Это может привести к проблемам в Windows
 * при передаче в параметр env объектов, которые имеют несколько вариантов одного и того же
 * ключа, например PATH и Path.
 */

/*
Метод child_process.spawn () асинхронно порождает дочерний процесс, не блокируя цикл 
событий Node.js. Функция child_process.spawnSync () обеспечивает эквивалентную 
функциональность в синхронном режиме, которая блокирует цикл событий до тех пор, 
пока порожденный процесс не завершится или не завершится.

Для удобства модуль child_process предоставляет несколько синхронных и асинхронных 
альтернатив child_process.spawn () и child_process.spawnSync (). Каждая из этих 
альтернатив реализована поверх child_process.spawn () или child_process.spawnSync ().
*/
