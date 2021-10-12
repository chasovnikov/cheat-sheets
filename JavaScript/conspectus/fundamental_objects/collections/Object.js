
/**
 * Object.keys(obj)             – возвращает массив ключей.
 * Object.values(obj)           – возвращает массив значений.
 * 
 * Object.entries(obj)          – создает массив массивов [ключ, значение].
 * Array.from(obj)              - создает массив из итерируемого объекта или строки
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

/**
 * Применение методов массива к объектам:
 */
 let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
  };
  
  let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map( ([key, value]) => [key, value * 2] )
  );
  
alert(doublePrices.meat); // 8


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