/*
Чтобы работал import/export, нужно для браузеров указывать атрибут <script type="module">. 
У модулей есть ряд особенностей:
• Отложенное (deferred) выполнение по умолчанию.
• Атрибут async работает во встроенных скриптах.
• Для загрузки внешних модулей с другого источника, он должен ставить заголовки CORS.
• Дублирующиеся внешние скрипты игнорируются.
*/

// Экспорт
// Файл sayHi.js:
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// Импорт
// Файл: main.js
import { sayHi } from './sayHi.js.js.js';
// -------------------------------------

// Код в модуле выполняется только один раз при импорте,
// даже если один и тот же модуль используется в нескольких местах

import { admin } from './admin.js.js.js';
admin.name = 'Pete'; // Другой модуль тоже увидит admin.name

// import.meta содержит информацию о текущем модуле
console.log(import.meta.url);

// Не допускаются «голые» модули (в браузерах):
import { sayHi } from 'sayHi'; // Ошибка, "голый" модуль

// ----------------------------

// экспорт массива
export const months = ['Jan', 'Feb'];

// экспорт константы
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// экспорт класса
export class User {
  constructor(name) {
    this.name = name;
  }
}

// -------------------
// say.js
function sayHi(user) {}
function sayBye(user) {}
export { sayHi, sayBye };

// main.js
import { sayHi, sayBye } from './say.js.js.js';

// или
import * as say from './say.js.js.js';
say.sayHi('John');

// или
import { sayHi as hi, sayBye as bye } from './say.js.js.js';
hi('John');

// -------------------
// 📁 say.js
// ...
export { sayHi as hi, sayBye as bye };

// -------------- Экспорт по умолчанию
// 📁 user.js
export default class User {}

// 📁 main.js (импортируем без фигурных скобок)
// есть правило: имена импортируемых переменных должны соответствовать именам файлов
import User from './user.js.js.js';

// или
import * as user from './user.js.js.js';
let User = user.default; // экспорт по умолчанию

// или
// для экспорта по умолчанию мы выбираем любое имя при импорте
import MyUser from './user.js.js.js';

// в файле может быть максимум один export default
// экспортируемая сущность не обязана иметь имя

// Можно так
export {User as default};

// экспорт по умолчанию вместе с именованным экспортом
// 📁 main.js
import {default as User, sayHi} from './user.js.js.js';

// ------------------ Реэкспорт (импортировать что-то и тут же экспортировать)

// импортировать login/logout и тут же экспортировать
import {login, logout} from './helpers.js.js.js';
export {login, logout};
// или
export {login, logout} from './helpers.js.js.js';

// импортировать экспорт по умолчанию как User и тут же экспортировать
import User from './user.js.js.js';
export {User};
// или
export {default as User} from './user.js.js.js';

// реэкспортировать и именованные экспорты и экспорт по умолчанию
export * from './user.js.js.js'; // для реэкспорта именованных экспортов
export {default} from './user.js.js.js'; // для реэкспорта по умолчанию

// ====================== Динамические импорты =============
// Выражение import(module) загружает модуль и возвращает промис, 
// результатом которого становится объект модуля, содержащий все его экспорты

let modulePath = prompt("Какой модуль загружать?");
import(modulePath)
  .then(obj => '<объект модуля>')
  .catch(err => '<ошибка загрузки, например если нет такого модуля>')

// или
const {hi, bye} = await import('./say.js.js.js');

// если по умолчанию
let obj = await import('./say.js.js.js');
let say = obj.default;