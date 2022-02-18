// крутим цикл для задержки времени (блокирующая задержка)
const sleep = msec => {
    const end = new Date().getTime() + msec;
    while (new Date().getTime() < end);
};

// на промисах
const sleep = msec =>
    new Promise(resolve => {
        setTimeout(resolve, msec);
    });

(async () => {
    console.log('Start sleep: ' + new Date().toISOString());
    await sleep(3000); // блокирования не происходит
    console.log('After sleep: ' + new Date().toISOString());
})();

// еще один вариант вызова
console.log('Start sleep: ' + new Date().toISOString());
sleep(3000).then(() => {
    console.log('After sleep: ' + new Date().toISOString());
});

// ------------- timeout
// Ф-ия обёртка для создания возможности timeout
function timeout(msec, fn) {
    let timer = setTimeout(() => {
        if (timer) console.log('Function timeout');
        timer = null;
    }, msec);
    return (...args) => {
        if (timer) {
            timer = nullfn(...args);
        }
    };
}
// Применение
const fn = par => console.log('Function called, par:' + par);
const fn100 = timeout(100, fn);
const fn200 = timeout(200, fn);
setTimeout(() => {
    fn100('first'); // не выполнится
    fn100('first'); // выполнится
}, 150);
