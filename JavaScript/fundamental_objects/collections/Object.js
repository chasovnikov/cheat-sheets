
/**
 * Объекты JS описаны в \data_types\objects.js
 * 
 * Object.fromEntries(array)    - создает объект из массива
 * 
 * Object.keys/values/entries   - игнорируют символьные свойства
 * 
 * Object.getOwnPropertySymbols - возвращающий массив символьных ключей
 * Reflect.ownKeys(obj)         - возвращает все ключи. 
 * 
 * Object.keys(obj).length      – берет массив ключей и возр. его длину.
 * 
 * методы вида Object.* возвращают «реальные» массивы, а не итерируемые объекты
 */

let user = {
  name: "John",
  age: 30
};
// Возращают массив ключей/значений/пар "ключ значение" (игнорируют символьные свойства)
const arrKeys = Object.keys(user);          // ["name", "age"]
const arrValues = Object.values(user);      // ["John", 30]
const arrEntries = Object.entries(user);    // [ ["name","John"], ["age",30] ]

// перебор значений
for (let value of Object.values(user)) {
  alert(value);     // John, затем 30
}


const arrSymbols = Object.getOwnPropertySymbols(object1);   // массив всех символьных свойст

const arrKeysAll = Reflect.ownKeys(object1);    // массив все св-в (и символьных)



/**
 * Создание объекта через замыкания и стрелочную ф-ию.
 * Не нужно писать constructor, т.к. свойства задаются в аргументах.
 */
 const point = (x, y) => {
    const p = {};

    p.move = (dx, dy) => {
        x += dx;
        y += dy;
    };

    p.toString = () => `[${x}, ${y}]`;

    return p;
};
const p1 = point(10, 20);
p1.move(-5, 10);


/// Метод toString()
// возр. строковое представление объекта
// атомат-ки вызывается при необходимости преобразовании объекта в строку
const obj = {x: 1, y: 2}.toString();       // "[object Object]"

// Так можно определить собственный метод toString():
const point = {
    x: 1,
    y: 2,
    toString: function() { 
        return `(${this.x}, ${this.y})`;
    },
};
String(point);      // "(1, 2)"


/// Метод toLocaleString()
// возр. локализованное строковое представление объъекта
// Стандартный метод в Object просто вызывает toString()
// При реализации метода полезны классы интернационализации


/// Метод valuOf()
// автомат-ки вызывается при преобраз-ии объекта в примитивный тип (обычно в число)
const obj = {
    x: 3,
    y: 4,
    valueOf: function() {
        return Math.hypot(this.x, this.y);
    },
};
Number(obj);        // 5


/// Метод toJSON()
// автом-ки вызывается при вызове JSON.stringify()
const point = {
    x: 1,
    y: 2,
    toString: function() { 
        return `(${this.x}, ${this.y})`;
    },
    toJSON: function() {
        return this.toString();
    },
};
JSON.stringify([point]);        // '["(1, 2)"]'



// Работа с объектом как с массивом (преобразование в массив и обратно)
// Удвоить цены
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};
let doublePrices = Object.fromEntries(
  Object.entries(prices).map( ([key, value]) => [key, value * 2] )
);
alert(doublePrices.meat);   // 8


const obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol('d')]: 4,
    [Symbol('e')]: 5,
};
const arr = [1, 2, 3];
/**
 * Object.getOwnPropertyNames - Возвращает массив, содержащий имена всех свойств.
 * Object.getOwnPropertyDescriptor - Возвращает дескриптор свойства.
 */
const objProp = Object
    .getOwnPropertyNames(obj)
    .map(key => ({ key, ...Object.getOwnPropertyDescriptor(obj, key)}));

// Object.getOwnPropertySymbols - возвращающий массив символьных ключей
const objSymbolProp = Object
    .getOwnPropertySymbols(obj)
    .map(key => ({ key, ...Object.getOwnPropertyDescriptor(obj, key)}));

/**
 * Object.isExtensible(obj)
 *      Определяет, разрешено ли расширение объекта.
 */


/**
 * Объединение объектов
 */
const objConcat1 = Object.assign({}, obj1, obj2);
const objConcat2 = { ...obj1, ...obj2};         // с помощью спред-оператора


/**
 * Создание символьного ключа:
 */
const SYMBOL_FILENAME = Symbol('filename');
const hash1 = {
    key1: value1,
    [SYMBOL_FILENAME]: './file1.v8',
    [SYMBOL_FILENAME]: './file2.v8',     // 2-й SYMBOL_FILENAME перезатрёт 1-й
    [Symbol('filename')]: './file3.v8',  // а здесь добавится (каждый вызов Symbol() создает новый символ)
};


/**
 * Создание объекта без предков
 */
const clearObject = Object.create(null);




/**
 * Object.length
 *      Имеет значение 1.
 * 
 * Object.assign()
 *      Создаёт новый объект путём копирования значений всех собственных 
 *      перечислимых свойств из одного или более исходных объектов в целевой объект.
 * 
 * Object.create()
 *      Создаёт новый объект с указанными объектом прототипа и свойствами.
 * 
 * Object.keys()
 *      Возвращает массив, содержащий имена всех собственных перечислимых
 *      свойств переданного объекта.
 * 
 * Object.defineProperty()
 *      Добавляет к объекту именованное свойство, описываемое переданным дескриптором.
 * 
 * Object.defineProperty(obj, prop, descriptor) 
 *      Определяет новое или изменяет существующее свойство непосредственно на объекте, 
 *      возвращая этот объект
 * 
 * Обычное добавление свойств через присваивание создаёт свойства, которые можно 
 * увидеть через перечисление свойств (с помощью цикла for...in или метода Object.keys), 
 * чьи значения могут быть изменены и которые могут быть удалены. 
 * Этот же метод позволяет настроить эти дополнительные детали свойства.
 */
const data = {};
Object.defineProperties(data, 'add', {
   configurable: false,     // нельзя изменять и удалять
   enumerable: false,       // нельзя увидеть через перечисление свойств
   value(key, value) {
     data[key] = value;
     return data;
   }
});
 
/**
 * Object.defineProperties()
 *      Добавляет к объекту именованные свойства, описываемые переданными дескрипторами.
 * 
 * Object.freeze()
 *      Замораживает объект: другой код не сможет удалить или изменить никакое свойство.
 * 
 * Object.isFrozen()
 *      Определяет, был ли объект заморожен.
 * 
 * Object.getOwnPropertyDescriptor()
 *      Возвращает дескриптор свойства для именованного свойства объекта.
 * 
 * Object.getOwnPropertyNames()
 *      Возвращает массив, содержащий имена всех переданных объекту собственных 
 *      перечисляемых и неперечисляемых свойств.
 * 
 * Object.getOwnPropertySymbols()
 *      Возвращает массив всех символьных свойств, найденных непосредственно в 
 *      переданном объекте.
 * 
 * Object.getPrototypeOf()
 *      Возвращает прототип указанного объекта.
 * 
 * Object.setPrototypeOf()
 *      Устанавливает прототип (т.е. внутреннее свойство [[Prototype]])
 * 
 * Object.is()
 *      Определяет, являются ли два значения различимыми
 * 
 * Object.isExtensible()
 *      Определяет, разрешено ли расширение объекта.
 * 
 * Object.preventExtensions()
 *      Предотвращает любое расширение объекта.
 * 
 * Object.seal()
 *      Предотвращает удаление свойств объекта другим кодом.
 * 
 * Object.isSealed()
 *      Определяет, является ли объект запечатанным (sealed).
 * 
 * Object.observe()
 *      Асинхронно наблюдает за изменениями в объекте.
 */