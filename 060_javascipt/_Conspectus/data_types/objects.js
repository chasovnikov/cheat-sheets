
/**
 * Объект - неупорядоченная коллекция именнованных значений.
 * Хранятся и копируются «по ссылке».
 * Имена свойств - строки или значения Symbol (кроме объектов Map).
 * Являются динамическими, т.к. свойства обычно можно добавлять и удалять, 
 *      но они могут использоваться для эмуляции статических объектов.
 * Объекты JavaScript являются ассоциативными массивами.
 * 
 * В дополнение к имени и значению каждое свойство имеет три атрибута свойства:
    • writable (допускает запись) указывает, можно ли устанавливать
        значение свойства;
    • enumerable (допускает перечисление) указывает, возвращается
        ли имя свойства в цикле for/in ;
    • configurable (допускает конфигурирование) указывает, можно
        ли удалять свойство и изменять его атрибуты.
 * Объект, объявленный через const, может быть изменён.
 * Cвойства упорядочены особым образом: свойства с целочисленными ключами 
 *      сортируются по возрастанию, остальные располагаются в порядке создания.
 * Два объекта равны только в том случае, если это один и тот же объект.
 */

// Три способа создания объекта
const obj1 = {};             // объектный литерал (имеют прототип Object.prototype)
const obj2 = new Object();   // прототип: значение св-ва prototype ф-ии-конструтора
const obj3 = Object.create( proto, propertiesObject );    // proto прототип для obj3
// Object.prototype не имеет прототип

const obj4 = Object.create(null);    // obj4 не имеет прототипа
const obj4 = Object.create( Object.prototype );    // аналог {}

// Защита от случайной модификации
const о = { х: 'не изменяйте это значение' };
library.function( Object.create (о) );


/// ИМЕНА СВОЙСТВ           ".", "[]"
// 2 способа запрашивания и установки свойств:
object.property;    // имя свойства как идентификатор (нельзя манипулировать)
object['property']; // имя свойства как строка (гибкий вариант)

const customer = {};
for (let i = 0; i < 3; i++) {
    customer[`address${i}`] = `address${i}`; // св-ва: address0, address1, address2
}

let age = '20';
const obj = {
    age,                 // age: age  (краткая запись)
    "likes birds": true, // имя свойства из нескольких слов должно быть в кавычках
};
/**
 * user.likes birds = true   // не работает
 */
user["likes birds"] = true;  // так работает

// Имя свойства может совпадать с зарезервированными словами
let obj = {
    for: 1,
    let: 2,
    return: 3,
};


/// НАСЛЕДОВАНИЕ             prototype, setter
// Атрибут prototype создает цепочку или связный список, от которого наследуются св-ва
// Присваивание унаслед-му св-ву создает СВОЁ св-во, если разрешена запись в унас.св-во
// Исключение: использование сеттера.


/// ОШИБКИ ДОСТУПА К СВОЙСТВАМ               &&, ?.
const book = {};
const len = book.subtitle;          // undefined
const len = book.subtitle.length;   // TyperError: ...

// 2 способа защиты:
// 1-й способ: многословная и явная меодика
let surname = undefined;
if (book) {
    if (book.author) {
        surname = book.author.surname;
    }
}
// или
surname = book && book.author && book.author.surname;   // undefined

// 2-й способ: использование оператора "?."
let surname = book?.author?.surname;                    // undefined
/**
 * Проблема «несуществующего свойства».
 * Опциональная цепочка "?." останавливает вычисление и возвращает undefined, 
 *    если часть перед "?." имеет значение undefined или null
 * Имеет три формы:
 * obj?.prop – возвращает obj.prop, если существует obj, и 
 *    undefined в противном случае.
 * obj?.[prop] – возвращает obj[prop], если существует obj, и 
 *    undefined в противном случае.
 * obj.method?.() – вызывает obj.method(), если существует obj.method, 
 *    в противном случае возвращает undefined.
 */
// "?." работает с методами
let user1 = {
    admin() {
      alert("Я администратор");
    }
  }
  let user2 = {};
  user1.admin?.(); // Я администратор
  user2.admin?.();


/// УДАЛЕНИЕ СВОЙСТВ             delete
// Операция delete удаляет только собственные свойства, но не унаследованные
// delete не удаляет свойства с атрибутом "configurable: false"
delete book.author;     // true, если удаление прошло успешно или безрезультатно
delete user?.name;      // Удалить user.name, если пользователь существует


/// ПРОВЕРКА СВОЙСТВ          in, hasOwnProperty(), properyIsEnumerable()
// in - вернёт true, если объект имеет такое СОБСТВЕННОЕ ИЛИ УНАСЛЕДОВАННОЕ св-во:
book.age;               // undefined
'age'      in book;     // false
book.age = undefined;
'age'      in book;     // true (хоть и undefined)
'toString' in book;     // true (наследуется)

// hasOwnProperty() выявляет ТОЛЬКО СОБСТВЕННЫЕ св-ва:
book.hasOwnProperty('age');         // true
book.hasOwnProperty('toString');    // false (наследуется)

// Выявление СОБСТВЕННОГО ПЕРЕЧИСЛИМОГО св-ва (c атрибутом "enumerable: true")
book.propertyIsEnumerable('age');                  // true
Object.prototype.propertyIsEnumerable('toString'); // false (не перечислимое)


/// ПЕРЕЧИСЛЕНИЕ СВОЙСТВ
// for..in - цикл по перечислимым собственым и унаследованным св-вам
for (prop in object) {
    if (!object.hasOwnProperty(prop)) continue; // пропуст. унаслед. св-ва
    alert( object[prop] );
}
// альтернатива for..in - это for..of с массивом имён св-в
// 4 функции для получения массива имён:

// 1) Возр. массив имен СОБСТВЕННЫХ ПЕРЕЧИСЛИМЫХ НЕСИМВОЛЬНЫХ св-в
const arr1 = Object.keys(obj);

// 2) Возр. массив всех СОБСТВЕННЫХ НЕСИМВОЛЬНЫХ св-в
const arr2 = Object.getOwnPropertyNames(obj);

// 3) Возр. массив всех СОБСТВЕННЫХ СИМВОЛЬНЫХ св-в
const arr3 = Object.getOwnPropertySymbols(obj);

// 4) Возр. массив всех СОБСТВЕННЫХ св-в
const arr4 = Reflect.ownKeys(obj);

// ПОРЯДОК ПРЕЧИСЛЕНИЯ св-в по именам:
// 1) Неотрицат. целые числа (от меньш. к больш.)
// 2) Затем все оставшиеся строковые (в порядке добавления)
// 3) Наконец, все символьные св-ва (в порядке добавления)


/// РАСШИРЕНИЕ ОБЪЕКТОВ         // Object.assign(), spead-оператор
// Object.assign() - копирует ВСЕ ПЕРЕЧИСЛИМ. СОБСТВЕН. св-ва
const objAll = {};              // целевой объект
const obj1 = { prop1: true };
const obj2 = { prop2: false };
Object.assign(objAll, obj1, obj2/*, ...*/);  // objAll: {prop1: true, prop2: false}
// св-ва obj2 ПЕРЕОПРЕДЕЛЯЮТ такие же св-ва в objAll и obj1

// Такое же копирование св-в можно сделать с помощью spead-оператора:
const objAll1 = {...obj1, ...obj2};

// Своя ф-ия расширения объектов:
// не переопределяет св-ва и не обрабатывает символьные св-ва
function merge(target, ...sources) {
    for (let source of sources) {
        for (let key of Object.keys(sources)) {
            if (!(key in target)) {     // отличие от Object.assign()
                target[key] = source[key];
            }
        }
    }
    return target;
}


/**
 * Глубокое клонирование - вложенное копирование
 * Object.assign() - не подходит
 * Подойдёт:
 *  _.cloneDeep(obj) из JavaScript-библиотеки lodash
 * 
 * Клонирование с дескрипторами свойств:
 */
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// Функция копирования объекта
function copy(o) {
    var copy = Object.create(Object.getPrototypeOf(o));
    var propNames = Object.getOwnPropertyNames(o);
  
    propNames.forEach(function(name) {
      var desc = Object.getOwnPropertyDescriptor(o, name);
      Object.defineProperty(copy, name, desc);
    });
  
    return copy;
}


/// СЕРИАЛИЗАЦИЯ ОБЪЕКТОВ       JSON.stringify(), JSON.parse()
// Описание JSON дано в \fundamental_objects\structured_data\JSON.js


// МЕТОДЫ OBJECT  (Описаны в \fundamental_objects\collections\Object.js)

/**
 * Методы объекта
 */
 let user = {
  name: "Джон",
  hi() { alert(this.name); }
};

// разделим получение метода объекта и его вызов в разных строках
let hi = user.hi;
hi(); // Ошибка, потому что значением this является undefined



/**
 * Преобразование к примитивам
 * Существуют 3 типа преобразований (хинтов):
 * "string" (для alert и других операций, которым нужна строка),
 * "number" - (для математических операций)
 * "default" - когда оператор «не уверен», какой тип ожидать
 * На практике все встроенные объекты, исключая Date,
 * реализуют "default" преобразования тем же способом, что и "number"
 * В процессе преобразования движок JavaScript пытается найти и вызвать 
 * три следующих метода объекта:
 * obj[Symbol.toPrimitive](hint) – метод с символьным ключом Symbol.toPrimitive 
 *    (системный символ), если такой метод существует, и передаёт ему хинт.
 * Иначе, если хинт равен "string"
 *    пытается вызвать obj.toString(), а если его нет, то obj.valueOf(), если он существует.
 * В случае, если хинт равен "number" или "default"
 *    пытается вызвать obj.valueOf(), а если его нет, то obj.toString(), если он существует.
 */


/// СОКРАЩЕННАЯ ЗАПИСЬ СВОЙСТВ
let x =1, y = 2;
let o = {
    x,      // вместо x: x
    y,      // вместо y: x
};
let z = o.x + o.y;      // 3


/// ВЫЧИСЛЯЕМЫЕ ИМЕНА СВОЙСТВ
// Вычисление имени возможно внутри объектного литерала
function computePropName() {
    return "p" + 2;
}
const p = {
    [computePropName()]: 2,     // p2: 2
};

// Символьный свойства:
const o = {
    [Symbol("my symbol")]: 5,
};


/// СОКРАЩЕННАЯ ЗАПИСЬ МЕТОДОВ
const METHOD_NAME = "m";
const symbol = Symbol();
const o = {
    area() {                        // без ": function"
        return 5;
    },
    "method With Spaces"(x) {       // с пробелами только в кавычках
        return x + 1;
    },
    [METHOD_NAME](x) {              // вычисляемое выражение в "[]"
        return x + 2;
    },
    [symbol](x) {                   // символьное имя метода
        return x + 3;
    },
};


/// ГЕТТЕРЫ И СЕТТЕРЫ           get, set
// При наличии только "get" св-во может только читаться
// При наличии только "set" св-во может только записываться
const obj = {
    valOnlyGet: 'valOnlyGet',
    valOnlySet: 'valOnlySet',
    valBoth:    'valBoth',

    get methOnlyGet() {            // getter без сеттера
        return this.valOnlyGet;
    },
    set methOnlySet(value) {       // setter без геттера
        this.valOnlySet = value;
    },

    get methBoth() {               // getter
        return this.valBoth;
    },
    set methBoth(value) {          // setter
        this.valBoth = value;
    },
};
// только геттер
console.log(obj.valOnlyGet);               // valOnlyGet - прочиталось по имени св-ва
console.log(obj.methOnlyGet);              // valOnlyGet - прочиталось по имени геттера
console.log(obj.valOnlyGet = 'changed');   // changed    - записалось по имени св-ва
console.log(obj.methOnlyGet = 'changed');  // TypeError  - не записалось по имени геттера

// только сеттер
console.log(obj.valOnlySet);                // valOnlyGet - прочиталось по имени св-ва
console.log(obj.methOnlySet);               // undefined  - не прочиталось по имени сеттера
console.log(obj.valOnlySet = 'changed');    // changed    - записалось по имени св-ва
console.log(obj.methOnlySet = 'updated');   // updated    - записалось по имени сеттера

// геттер и сеттер (имена методов совпадают)
console.log(obj.valBoth);                // valBoth - прочиталось по имени св-ва
console.log(obj.methBoth);               // valBoth  - прочиталось по имени метода
console.log(obj.valBoth = 'changed');    // changed    - записалось по имени св-ва
console.log(obj.methBoth = 'updated');   // updated    - записалось по имени метода