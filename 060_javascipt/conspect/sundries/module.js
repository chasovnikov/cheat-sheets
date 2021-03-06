
/**
 * Синтаксис
 */

// Экспорт
export function say1() {}                       // ключевое слово "export"
export let name1, name2;
export { Circle, degreesToRadians, PI };        // экспорт многих
export default class {}                         // имя с "default" необяз.
export { say1 as default, say2 };

// Импорт
import { say1, say2 } from './sayHi.js';         // именованные
import { say1 as say, say2 } from './sayHi.js';  // замена имени
import * as say from './say.js';                 // всё сразу в объект
import User from './user.js';                    // по умолч. (по имени файла (необяз.))
import User, {  say1, say2 } from './user.js';   // по умолч. + имен-ные
import {default as User, say1} from './user.js'; // по умолч. + имен-ные
import User, * as say from './user.js';          // по умолч. + имен-ные в объект
import './user.js';                              // сущности не будут доступны
import('./user.js')
    .then(module => console.log(module));        // Динамич. импорт

// Реэкспорт (для единой точки входа)
export { say1, say2 } from './say.js';
export { say1 as say, say2 } from './say.js';    // замена имени            
export {default as User} from './user.js';
// export User from './user.js';                  не будет работать.

// для реэкспорта именов. + по умолч. нужно две инструкции
export * from './user.js';
export {default} from './user.js';



/**
 * Модуль – это файл. 
 * Для модулей в HTML нужно указывать атрибут <script type="module">. 
 * Для старых браузеров используют атрибут «nomodule»:
 * У модулей есть ряд особенностей:
 *      Отложенное (deferred) выполнение по умолчанию.
 *      Атрибут async работает во встроенных скриптах.
 *      Для загрузки внешних модулей с другого источника, он должен ставить заголовки CORS.
 *      Дублирующиеся внешние скрипты игнорируются.
 * У модулей есть своя область видимости.
 * Всегда включена директива use strict.
 * Код в модулях выполняется только один раз. 
 *      Экспортируемая функциональность создаётся один раз и передаётся всем импортёрам. 
 * 
 * import.meta
 *      Содержит информацию о текущем модуле.
 * 
 * Можем поставить import/export в начало или в конец скрипта.
 * Инструкции import/export не работают внутри фигурных скобок.
 * В модуле на верхнем уровне this не определён.
 * Файл при импорте выполняется.
 * 
 * в коде модулей нельзя использовать оператор with , объект arguments 
 *      или необъявленные переменные.
 */

/**
 * Чтобы экспортировать константу, переменную, функцию или класс из модуля, 
 *      добавьте перед объявлением "export".
 */
export const PI = Math.PI;
export function degreesToRadians (d) { return d * PI / 180; }
export class Circle {
    constructor(r) { this.r = r; }
    area() { return PI * this.r * this.r; }
}

/**
 * Взамен отдельных ключевых слов "export" в
 *      коде можно написать одну эквивалентную строку в конце:
 */
export { Circle, degreesToRadians, PI };



// в файле sayHi.js (модуль):
export function sayHi(user) {
    alert(`Hello, ${user}!`);
}
// Тогда другой файл может импортировать её и использовать:
// в файле main.js:
import {sayHi} from './sayHi.js';
alert(sayHi); // function...


// Не допускаются «голые» модули (без пути)
import {sayHi} from 'sayHi'; // Ошибка, "голый" модуль


/**
 * Сборщик.
 * 
 * Обычно, мы объединяем модули вместе, используя сборщик (например, Webpack).
 * Сборщик делает следующее:
 *      Анализирует зависимости (импорты, импорты импортов и так далее).
 *      Собирает файл/файлы со всеми модулями, 
 *      заменяет "import" функцией импорта от сборщика.
 *      Удаляются: недостижимый код, неиспользуемые экспорты, 
 *          специфические операторы (console, debugger и др.).
 *      Синтаксис JavaScript можно трансформировать в предыдущий стандарт.
 *      Полученный файл можно минимизировать.
 * 
 * Итоговую сборку можно подключать без атрибута type="module", как обычный скрипт
 */


// Импортировать все export-ы как объект say
import * as say from './say.js';
say.sayHi('John');
say.sayBye('John');
/**
 * Но явно перечисляя в фигурных скобках (import {sayHi} from './say.js';), 
 *      мы помогает сборщику оптимизировать код и др.
 */

/**
 * Импортирование под другими именами через "as"
 * 
 * import {sayHi as hi, sayBye as bye} from './say.js';
 * 
 * Аналогично для экспорта
 * 
 * export {sayHi as hi, sayBye as bye};
 */



/**
 *      ЭКСПОРТ ПО УМОЛЧАНИЮ
 */
// 📁 user.js
export default class User {      // просто добавьте "default"
    constructor(name) {
      this.name = name;
    }
}
// В файле может быть не более одного "export default".
// …И потом импортируем без фигурных скобок (как const):
// 📁 main.js
import User from './user.js';       // не {User}, просто User
new User('John');

/**
 * В одном модуле может быть как экспорт по умолчанию, 
 *      так и именованные экспорты, но на практике обычно их не смешивают.
 * 
 * Так как в файле может быть максимум один export default, 
 *      то экспортируемая сущность не обязана иметь имя.
 */
export default class {      // у класса нет имени
  constructor() { /*...*/ }
}

// Вот как импортировать экспорт по умолчанию вместе с именованным экспортом:
// 📁 main.js
import {default as User, sayHi} from './user.js';
// или 
import User, { sayHi } from './user.js';

// Как объект "import *"(его свойство default – и будет экспортом по умолчанию)
// 📁 main.js
import * as user from './user.js';
let User = user.default; // экспорт по умолчанию
new User('John');

// для экспорта по умолчанию мы выбираем любое имя при импорте:
import User from './user.js'; // сработает
import MyUser from './user.js'; // тоже сработает
/**
 * Так что члены команды могут использовать разные имена для импорта 
 *      одной и той же вещи, и это не очень хорошо.
 * Чтобы избежать этого, есть правило: имена импортируемых переменных 
 *      должны соответствовать именам файлов. Вот так:
 */
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';


/**
 *      Реэкспорт
 * 
 * export ... from ... 
 * 
 * позволяет импортировать что-то и тут же экспортировать, 
 *      возможно под другим именем, вот так:
 * Помогает сделать функциональность доступной через единую точку входа.
 */
export {sayHi} from './say.js'; // реэкспортировать sayHi
export {default as User} from './user.js'; // реэкспортировать default


/**
 *      Реэкспорт экспорта по умолчанию.
 * Обрабатывается особым образом.
 */
// 📁 user.js
export default class User {
    // ...
}
// 📁 auth/index.js
// export User from './user.js';     не будет работать.
export {default as User} from './user.js';      // так работает

/**
 * Чтобы реэкспортировать именованные экспорты и экспорт по умолчанию, 
 *      то понадобятся две инструкции:
 */
export * from './user.js';           // для реэкспорта именованных экспортов
export {default} from './user.js';   // для реэкспорта по умолчанию


// Только подключить модуль (его код запустится), но не присваивать его переменной:
import "module"


/**
 *      Динамические импорты.
 * 
 * import(module) 
 *      загружает модуль и возвращает промис, 
 *      результатом которого становится объект модуля, содержащий все его экспорты.
 * import() - это не функция. Не можем скопировать import в другую переменную 
 *      или вызвать при помощи .call/apply.
 * Динамический импорт работает в обычных скриптах, 
 *      он не требует указания script type="module".
 */
let modulePath = prompt("Какой модуль загружать?");
import(modulePath)
  .then(obj => "<объект модуля>")
  .catch(err => "<ошибка загрузки, например если нет такого модуля>");

// Внутри асинхронной функции:
let module = await import(modulePath);


// 📁 say.js
export function hi() {
  alert(`Привет`);
}
export function bye() {
  alert(`Пока`);
}

let {hi, bye} = await import('./say.js');
hi();
bye();


// экспорт по умолчанию: следует взять свойство default объекта модуля
let obj = await import('./say.js');
let say = obj.default;
// или, одной строкой: 
let {default: say} = await import('./say.js');
say();


async function load() {
    let say = await import('./say.js');
    say.hi();
    say.bye();
    say.default();  // экспорт по умолчанию
}