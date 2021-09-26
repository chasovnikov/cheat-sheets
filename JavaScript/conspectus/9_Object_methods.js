
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