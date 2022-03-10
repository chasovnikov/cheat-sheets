// process предоставляет информацию о текущем процессе Node.js. и контролирует его

process.pid; // id текущего процесса
process.env; // переменные окружения
process.argv; // аргументы, указываемые в консоли при запуске программы
process.exit(0); // успешное завершение процесса
process.exit(1); // завершение процесса с ошибкой
process.abort(); // завершение процесса Node.js и генерация основного файла (недоступна в Worker)

// Events:
('beforeExit'); // цикл событий очищен и нет дополн-й работы для планирования перед завершением
('disconnect'); // при закрытии канала IPC
('exit'); // завершение процесса
('message'); // дочерний процесс получает сообщение от родит. процесса с помощью childprocess.send()
('multipleResolves'); // промис был либо:
// • Решалось не раз.
// • Отклонено более одного раза.
// • Отклонено после разрешения.
// • Решено после отклонения
('rejectionHandled'); // промис был отклонен и к нему был прикреплен обработчик ошибок
('uncaughtException'); // неперехваченное исключение возвращается обратно в цикл обработки событий
('uncaughtExceptionMonitor'); //  перед событием uncaughtException или перед process.setUncaughtExceptionCaptureCallback()
('unhandledRejection'); // промис отклоняется, и обработчик ошибок не прикрепляется к промису
('warning'); // когда выдает предупреждение процесса

// Если не хотите, чтобы исключения приводили к полному отказу вашей программы,
// тогда зарегистрируйте функцию глобального обработчика:
process.setUncaughtExceptionCaptureCallback(e => {
    console.error('Uncaught exception:', e);
    // Неперехваченное исключение
});

// Перехват всех исключений для промисов:
process.on('unhandledRejection', (reason, promise) => {
    // reason - любое значение, которое передавалось бы вызову .catch ().
    // promise - объект Promise, который был отклонен.
});

// цикл событий очищен и нет дополнительной работы для планирования перед завершением
process.on('beforeExit', code => {
    console.log('Process beforeExit event with code: ', code);
});

// завершение процесса
process.on('exit', code => {
    console.log('Process exit event with code: ', code);
});

// Процессы
process.pid; // PID процесса
process.ppid; // PID родительского элемента текущего процесса
process.title; // заголовок текущего процесса
process.abort(); // завершение процесса Node.js и генерация основного файла (недоступна в Worker)
process.allowedNodeEnvironmentFlags; // Набор флагов, допустимых в переменной среды
process.throwDeprecation; // установлен ли флаг --throw-deprecation для текущего процесса
process.traceDeprecation; // установлен ли флаг --trace-deprecation
process.noDeprecation; // указывает, установлен ли флаг --no-deprecation для текущего процесса
process.exit(code); // завершить процесс синхронно со статусом выхода кода
process.exitCode; // код выхода корректно завершенного процесса
process.kill(pid, signal); // отправляет сигнал процессу, идентифицированному pid
process.send(message, sendHandle, options, callback); // отправка сообщений родительскому процессу

// Консоль
process.argv; // аргументы командной строки. Первым элементом будет process.execPath
process.argv0; // хранит доступную только для чтения копию исходного значения argv[0]
process.execArgv; // набор специфичных для Node.js параметров командной строки

// Канал IPC
process.channel; // ссылка на канал IPC или undefined
process.channel.ref(); // заставляет канал IPC поддерживать цикл обработки событий процесса
process.channel.unref(); // заставляет канал IPC не поддерживать цикл обработки событий процесса
process.connected; // true, пока канал IPC подключен
process.disconnect(); // закроет канал IPC для родительского процесса

process.config; // параметры конфигурации JavaScript для компиляции текущего файла
process.env; // объект, содержащий пользовательскую среду

process.arch; // Архитектура ЦП операционной системы
process.platform; // возвращает строку, определяющую платформу операционной системы
process.cpuUsage(previousValue); // использование времени ЦП
process.mainModule; // альтернативный способ получения require.main
process.memoryUsage(); // использование памяти процессом Node.js, измеренное в байтах
process.memoryUsage.rss(); // целое число, представляющее размер резидентного набора (RSS) в байтах
process.resourceUsage(); // использование ресурсов для текущего процесса

// Файловая система
process.execPath; // абсолютный путь к исполняемому файлу
process.cwd(); // возвращает текущий рабочий каталог процесса
process.chdir(directory); // изменяет текущий рабочий каталог процесса
process.chdir(path.resolve(__dirname, '../linux'));

process.debugPort; // Порт, используемый отладчиком

process.dlopen(module, filename, flags); // позволяет динамически загружать общие объекты

process.emitWarning(warning, options); // выдача настраиваемых предупреждений
process.emitWarning(warning, type, code, ctor); // выдача настраиваемых предупреждений

// Группы
process.getgid(); // числовой идентификатор группы процесса
process.getegid(); // числовая эффективная идентичность группы процесса
process.setgid(id); // устанавливает групповой идентификатор процесса
process.setegid(id); // устанавливает эффективный групповой идентификатор процесса
process.getgroups(); // массив с идентификаторами дополнительных групп
process.initgroups(user, extraGroup); // считывает файл /etc/group и инициализирует список доступа группы
process.setgroups(groups); // устанавливает идентификаторы дополнительных групп для процесса

// Пользователь
process.getuid(); // числовой идентификатор пользователя процесса
process.setuid(id); // устанавливает идентификатор пользователя процесса
process.geteuid(); // числовой идентификатор эффективного пользователя процесса
process.seteuid(id); // устанавливает действующий идентификатор пользователя процесса

// Неперехваченные исключения
process.setUncaughtExceptionCaptureCallback(fn); // fn вызыв-ся при возник-ии неперехв. исключения
process.hasUncaughtExceptionCaptureCallback(); // использ-ся ли process.setUncaughtExceptionCaptureCallback()

// Реальное время
process.hrtime(time); // реальное время с высоким разрешением
process.hrtime.bigint(); // реальное время с высоким разрешением в наносекундах как bigint

process.nextTick(callback, ...args); // добавляет обратный вызов в «очередь следующего тика».

process.release; // объект, содержащий метаданные, относящиеся к текущему выпуску

// Диагностические отчеты
process.report; // объект с методами диагностических отчетов для текущего процесса
process.report.compact; // Создавайте отчеты в компактном однострочном формате JSON
process.report.directory; // Справочник, в котором написан отчет
process.report.filename; // Имя файла, в котором написан отчет
process.report.getReport(err); // объект диагностического отчета для запущенного процесса
process.report.reportOnFatalError; // true - диагностический отчет создается при фатальных ошибках
process.report.signal; // Сигнал для запуска создания диагностического отчета
process.report.reportOnSignal; // true - диагн. отчет созд-ся при сигнале, указ. в process.report.signal
process.report.reportOnUncaughtException; // true - диагн. отчет создается при неперехв-ом исключении
process.report.writeReport(filename, err); // Записывает диагностический отчет в файл

process.setSourceMapsEnabled(val); // включает/отключает поддержку SourceMap v3 для трассировки стека

process.stdin; // возвращает поток, подключенный к stdin (fd 0)
process.stdin.fd; // относится к значению базового файлового дескриптора process.stdin. Значение фиксировано на 0
process.stdout; // возвращает поток, подключенный к stdout (fd 1)
process.stdout.fd; // относится к значению базового файлового дескриптора process.stdout. Значение фиксировано на 1
process.stderr; // возвращает поток, подключенный к stderr (fd 2)
process.stderr.fd; // относится к значению базового файлового дескриптора process.stderr. Значение фиксировано на 2

process.umask(); //  Deprecated. Возвращает маску создания файлового режима процесса
process.umask(mask); // устанавливает маску для режима создания файлового режима процесса
process.uptime(); // возвращает количество секунд, в течение которых выполнялся текущий процесс

process.version; // содержит строку версии Node.js
process.versions; // объект, в котором перечислены строки версии Node.js и его зависимости
