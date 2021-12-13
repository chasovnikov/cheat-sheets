
// крутим цикл для задержки времени (блокирующая задержка)
const sleep = msec => {
    const end = new Date().getTime() + msec;
    while (new Date().getTime() < end);
};


// на промисах
const sleep = msec => new Promise(resolve => {
    setTimeout(resolve, msec);
});

(async () => {
    console.log('Start sleep: ' + new Date().toISOString());
    await sleep(3000);      // блокирования не происходит
    console.log('After sleep: ' + new Date().toISOString());
})();

// еще один вариант вызова
console.log('Start sleep: ' + new Date().toISOString());
sleep(3000).then(() => {
    console.log('After sleep: ' + new Date().toISOString());
});
