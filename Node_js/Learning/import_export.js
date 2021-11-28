
// импорт для утилит nod.js
const fs = require('fs');   // достаточно указать абстрактный путь
console.log(fs);            // полезно посмотреть


// файл myModule.js:
function say() {
    console.log('hello');
}
module.exports = { say };

// для импорты модулей
const { say } = require('./components/myModule');
say();


// Если одна функция в модуле:
module.exports = () => {
    console.log('hello');
};


// Без "module.exports"
exports.hello = function say() {
    console.log('hello');
};