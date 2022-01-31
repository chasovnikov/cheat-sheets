// Межпроцессовое взаимодействие

// Мастер-процесс и воркер-процессы
// ...

// Способы взаимодействия:
// 1) через сокеты (можно масштабироваться между разными серверами)
// 2) через email в Unix (локальные почтовые ящики)
// 3) Memory web files (файлы, отображаемвые в памяти) (самое быстр., но опасное)
// 4) Файловые потоки stdin, stdout (работают в рамках одного сервера)
// 5) UDP-пакеты
// 6) читать/писать файлы в файловую систему
// 7) на уровне БД (транзакции, вызов удалённых процедур)

// Связанность между компонентов может быть:
// - на уровне данных
// - на уровне вызовов
// - на уровне событий

// Используемые библиотеки:
// • child-process
// • cluster
// • net: TCP, ...
// child-process и cluster работают в рамках одной ОС
// child-process и cluster - это взаимодействие через сокеты ОС

// child-process ==========================================

const os = require('os');
const cp = require('child_process');

console.log('Started master:', process.pid);

const cpuCount = os.cpus.length; // кол-во ядер
const workers = [];
for (let i = 0; i < cpuCount; i++) {
    const worker = cp.fork('.worker.js'); // созд. дочерн. процесс
    console.log('Started worker:', worker.pid);
    workers.push(worker);
}

// раздаем задания процессам
const task = [2, 17, 3, 2, 5, 7, 15, 22];
const results = [];

workers.forEach(worker => {
    worker.send({ task });
    worker.on('exit', code => {
        // если code !== 0 (передан в .exit()), то, возможно, это выход с ошибкой
        console.log('Worker exited:', worker.pid, code);
    });
    // ответы из дочерних процессов:
    worker.on('message', message => {
        console.log('Message for worker:', worker.pid);
        console.log(message);
        results.push(message.result);
        if (results.length === cpuCount) {
            process.exit(0); // 0 - code (передаем в событие 'exit')
        }
    });

    // Если задачи не выполнены за 5 сек, то завершить с ошибкой
    // сигнал 9: принудительно завершить все процессы (мастер и дочерн.)
    setTimeout(() => process.exit(1), 5000);
});

// Worker ---------
console.log('Hello from worker', process.pid);

const calculations = item => item * 2;

process.on('message', message => {
    console.log('Message to worker', process.pid); // у всех worker-ов одна консоль
    console.log('from master', message);

    const result = message.task.map(calculations);
    process.send({ result }); // результат отправляем в мастер-процесс
});

// Cluster =========================================================
// Библ. cluster - это обёртка над child-process
// Исполь-ся, если нужно передавать обработ-ки файлов, сокетов между процессами
const cluster = require('cluster');

// Когда форкаем cluster, то управление попадает на один и тот же файл
// Поэтому в файле будет проверка на мастер/воркер
// есть флаги isMaster, isWorker
if (cluster.isMaster) {
    require('./master.js');
} else {
    require('./worker.js');
}

// './master.js': ---------------
const os = require('os');
const cluster = require('cluster');

console.log('Started master:', process.pid);

const cpuCount = os.cpus().length;
const worker = [];

for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork(); // форкаем свою же точку входа
    console.log('Started worker:', worker.process.pid);
    workers.push(worker);
}

// раздаем задания процессам
const task = [2, 17, 3, 2, 5, 7, 15, 22];
const results = [];

workers.forEach(worker => {
    // console.dir({worker});
    worker.send({ task });
    worker.on('exit', code => {
        // если code !== 0 (передан в .exit()), то, возможно, это выход с ошибкой
        console.log('Worker exited:', worker.pid, code);
    });
    // ответы из дочерних процессов:
    worker.on('message', message => {
        console.log('Message for worker:', worker.pid);
        console.log(message);
        results.push(message.result);
        if (results.length === cpuCount) {
            process.exit(0); // 0 - code (передаем в событие 'exit')
        }
    });

    // Если задачи не выполнены за 5 сек, то завершить с ошибкой
    // сигнал 9: принудительно завершить все процессы (мастер и дочерн.)
    setTimeout(() => process.exit(1), 5000);
});

// TCP ===================================================
const net = require('net');

// server.js ---------------
const user = { name: 'Varus', age: 1895 };

// создаем TCP-сервер
const server = net.createServer(socket => {
    console.log('Connected:', socket.localAddress);
    socket.write(JSON.stringify(user));
    socket.on('data', data => {
        const message = data.toString();
        console.log('Data received (by server):', data);
        console.log('toString:', message);
    });
});
server.listen(2000);

// client.js --------------
const socket = new net.Socket();

socket.connect(
    {
        port: 2000,
        host: '127.0.0.1',
    },
    () => {
        socket.write('Hello from client');
        socket.on('data', data => {
            const message = data.toString();
            const user = JSON.parse(message);
            console.log('Data received (by client):', data); // буфер
            console.log('toString:', message); // строка
            console.log(`Age of ${user.name} is ${user.age}`); // объект
        });
    }
);
