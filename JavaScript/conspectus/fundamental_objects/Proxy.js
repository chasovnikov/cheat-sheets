
/**
 * Объект Proxy «оборачивается» вокруг другого объекта и 
 *      может перехватывать и переопределить основные операции для данного объекта.
 * 
 * var p = new Proxy(target, handler);
 * @param {object} target   Исходный объект
 * @param {object} handler  Объект-обработчик
 * 
 * traps (ловушки) - методы, которые можно добавить в handler:
 * 
 *      Ловушка:        Что вызывает:
 * 
 *      get             - чтение свойства
 *      set             - запись свойства
 *      has             - оператор in
 *      apply           - вызов функции
 *      construct       - оператор new
 *      deleteProperty  - оператор delete
 *      defineProperty -
 *                      Object.defineProperty, 
 *                      Object.defineProperties
 *      getPropertyOf   - Object.getPrototypeOf
 *      setPropertyOf   - Object.setPrototypeOf
 *      isExtensible    - Object.isExtensible
 *      preventExtensions - Object.preventExtensions
 *      getOwnPropertyDescriptior - 
 *                              Object.getOwnPropertyDescriptor, 
 *                              for..in, 
 *                              Object.keys/values/entries
 *      ownKeys -
 *                  Object.getOwnPropertyNames, 
 *                  Object.getOwnPropertySymbols, for..in, 
 *                  Object.keys/values/entries
 * 
 * Инварианты (условия на реализацию внутренних методов и ловушек.):
 *      set должен возвращать true, если значение было успешно записано, иначе false.
 *      deleteProperty должен возвращать true, если значение было успешно удалено, 
 *          иначе false.
 *      getPropertyOf, применённый к прокси, должен возвращать то же значение, 
 *          что и метод getPropertyOf, применённый к оригинальному объекту.
 */

/**
 * get(target, property, receiver)
 * 
 * @param {object} target   Оригинальный объект
 * @param {string} property Имя свойства
 * @param {object} receiver Если свойство объекта является геттером, 
 *      то receiver – это объект, который будет использован как this при его вызове. 
 *      Обычно это сам объект прокси (или наследующий от него объект).
 */
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // значение по умолчанию
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (нет такого элемента)


/**
 * Следует заменять переменную, чтобы никто не мог ссылаться 
 *      на оригинальный объект после того, как он был проксирован.
 */
dictionary = new Proxy(dictionary, /*...*/);


/**
 * set(target, property, value, receiver)
 * 
 * @param {object} target   Оригинальный объект
 * @param {string} property Имя свойства
 * @param {any} value       Значение свойства
 * @param {object} receiver Если свойство объекта является сеттером, 
 *      то receiver – это объект, который будет использован как this при его вызове. 
 *      Обычно это сам объект прокси (или наследующий от него объект).
 */
let numbers = [];

numbers = new Proxy(numbers, {   // (*)
  set(target, prop, val) {       // для перехвата записи свойства
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1);        // добавилось успешно
numbers.push(2);        // добавилось успешно
alert("Длина: " + numbers.length); // 2

numbers.push("тест");   // TypeError (ловушка set на прокси вернула false)