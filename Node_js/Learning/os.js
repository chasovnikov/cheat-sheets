const os = require('os');
const cluster = require('cluster');

console.log( os.platform());    // win32
console.log( os.arch());        // x64 - 64-разрядная архит-ра процессора
console.log( os.cpus());        // массив с опиисанием каждого ядра процессора
console.log( os.cpus().length); // кол-во ядер

// В завис-ти от кол-ва ядер запуск разного кол-ва процессов
const cpus = os.cpus();
// желательно оставить 1-2 ядра свободными для ОС
for (let i = 0; cpus.length - 2; i++) {
    const CPUcore = cpus[i];
    console.log('Запустить еще один node_js процесс')
}


// Кластеризвция
if (cluster.isMaster) {     // Является ли текущий процесс главным
    for (let i = 0; i < os.cpus().length - 1; i++) {
        cluster.fork();     // Запускаем дочерний процесс
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Воркер с pid= ${worker.process.pid} умер`)
        cluster.fork();   // сразу запускаем новый процесс  
    });
} else {
    console.log(`Воркер с pid= ${process.pid} запущен`)

    setInterval(() => {
        console.log(`Воркер с pid= ${process.pid} еще работает`)
    }, 5000);
}