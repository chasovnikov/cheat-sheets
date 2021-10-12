
/**
 * Массив - упорядоченная коллекция данных.
 * Варианты неправильного применения массива:
 *      Добавление нечислового свойства, например: arr.test = 5.
 *      Создание «дыр», например: добавление arr[0], затем arr[1000].
 *      Заполнение массива в обратном порядке, например: arr[1000], arr[999] и т.д.
 * Методы push/pop выполняются быстро, а методы shift/unshift – медленно.
 * Можно, но не следует использовать цикл for..in для массивов.
 * Массивы не имеют ни Symbol.toPrimitive, ни функционирующего valueOf, 
 *      они реализуют только преобразование toString.
 * Рекомендуется массивы и объекты объявлять через "const".
 * 
 * Синтаксис:
 * [element0, element1, ..., elementN]
 * new Array(element0, element1[, ...[, elementN]])
 * new Array(arrayLength)
 */

// Создание массивов
const fruits = ["Яблоко", "Апельсин", "Груша"];
const arr = new Array("Яблоко", "Апельсин", "Груша");
const arr1 = Array("Яблоко", "Апельсин", "Груша");


/**
 * length - это наибольший положительный числовой индекс плюс один 
 *      (а не количество элементов).
 */
{
    const array = [];
    array[70] = 100;    // length: 71, создано 70 пустых элементов

    const values = [null, undefined,,];     // length: 3. 3-й элем. - "empty_item"
}

/**
 * Если в new Array один аргумент, то это кол-во пустых элементов.
 */
const arr = new Array(2);    // создастся ли массив [2]?
alert( arr[0] );             // undefined! нет элементов.
alert( arr.length );         // length 2

// создание массива из одного элемента или более
const arr = Array.of(2);


// Массивы можно конкатенировать с помощью спред-оператора:
const arrConcat = [...arr1, ...arr2];


/**
 * Перебор элементов
 */
const arr = ["Яблоко", "Апельсин", "Груша"];

for (let i = 0; i < arr.length; i++) {
    alert( arr[i] );
}

// проходит по значениям
for (let fruit of fruits) {
    alert( fruit );
}

/**
 * рекомендуется вместо нее использовать for-ы, потому что форьич предполагает,
 * что мы будет писать ф-ии с "побочными эффектами"
 */
arr.forEach( function(item, index, array) {
    console.log(item, index);
} );


const fruits = ['Яблоко', 'Банан'];
// Добавление элемента в конец массива
const newLength = fruits.push('Апельсин');
// ["Яблоко", "Банан", "Апельсин"]

// Удаление последнего элемента массива
const last = fruits.pop(); // удалим Апельсин (из конца)
// ["Яблоко", "Банан"];

// Удаление первого элемента массива
const first = fruits.shift(); // удалим Яблоко (из начала)
// ["Банан"];

// Добавление элемента в начало массива
var newLength = fruits.unshift('Клубника') // добавляет в начало
// ["Клубника", "Банан"];

// Поиск номера элемента в массиве
var pos = fruits.indexOf('Банан');
// 1



// создание копии массива из другого массива
const arr1 = Array.from(arr);
const arr1 = Array.from('123', x => parseInt(x));    // [1, 2, 3]


// заполнение массива


/**
 * Добавить элементы в конец массива
 * 
 * array.push(element1, ..., elementN)
 *      elementN    - Элементы, добавляемые в конец массива
 * 
 * @returns новую длину массива
 */
let array = ['a', 'b'];
let newLength = array.push('c', 'd');     // newLength: 4, array: ['a', 'b', 'c', 'd']


/**
 * Удалить последний элемент
 * 
 * array.pop()
 * 
 * @returns Удаленный элемент массива или undefined
 */
let array = ['a', 'b'];
const removed = array.pop();     // removed: 'b', array: ['a']


/**
 * Удалить первый элемент
 * 
 * array.shift()
 * 
 * @returns Удаленный элемент массива или undefined
 */
let array = ['a', 'b'];
const removed = array.shift();     // removed: 'a', array: ['b']


/**
 * Добавить элементы в начало
 * 
 * array.unshift(element1[, ...[, elementN]])
 *      elementN    - Элементы, добавляемые в конец массива
 * 
 * @returns новую длину массива
 */
let array = ['a', 'b'];
const newLength = array.unshift('c', 'd');     // newLength: 4, array: ['c', 'd', 'a', 'b']


/**
 * Удалять, заменять, добавлять элементы в массиве
 * 
 * array.splice(start[, deleteCount[, item1[, item2[, ...]]]] )
 *      start               - стартовый индекс
 *      deleteCount         - кол-во удаляемых элементов
 *      item1, item2, ...   - добавляемые элементы
 * 
 * Изменит исходный массив
 * @returns массив из удалённых элементов.
 */
let array = ['a', 'b', 'c', 'd'];
const removedArray = array.splice(-1, 2, "new1", "new2");   // removedArray: ['a','b'], array: ['new2', 'b', 'c', 'new1']


/**
 * Копировать элементы в новый массив, не изменяя исходного
 * 
 * array.slice([start[, end]])
 *      start,      - стартовый индекс
 *      end     - конечный индекс (не включая)
 * 
 * @returns массив из скопированных элементов
 */
let array = ['a', 'b', 'c', 'd'];
const copyArray = array.slice(1, -1);   // copyArray: ['b', 'c']


/**
 * Соединение массивов|значений в массив
 * 
 * array.concat(value1[, value2[, ...[, valueN]]] )
 *      valueN      - массивы и/или значения, соединяемые в новый массив
 * 
 * @returns новый массив
 */
const unitedArray = ['a', 'b'].concat( ['c', 'd'], 'value', ['e', 'f'] ); 
//   ['a', 'b', 'c', 'd', 'value', 'e', 'f']


/**
 * Поиск первого индекса по значению
 * 
 * array.indexOf( value[, start = 0] )
 *      value       - искомое ЗНАЧЕНИЕ в массиве.
 *      start       - стартовый индекс
 * 
 * @returns первый индекс или -1
 */
const firstIndex = ['a', 'b', 'c', 'd'].indexOf('c', 1);     // 2


/**
 * Поиск ПОСЛЕДНЕГО индекса по значению
 * 
 * array.lastIndexOf( value[, start = array.length] )
 *      value       - искомое ЗНАЧЕНИЕ в массиве.
 *      start       - стартовый индекс в обратном направлении
 * 
 * @returns последний индекс или -1
 */
const lastIndex = ['a', 'b', 'c', 'd'].lastIndexOf('c');     // 2


/**
 * Проверка наличия элемента
 * 
 * array.includes( value[, start = 0] )
 *      value       - искомое ЗНАЧЕНИЕ в массиве.
 *      start       - стартовый индекс (м.б. отриц.)
 * 
 * @returns true|false
 */
const bool = ['a', 'b', 'c', 'd'].includes('c', 1);     // true


/**
 * Найти первый попавшийся элемент, на котором функция-колбэк вернёт true
 * 
 * array.find( function(item, index, array) {}[, thisArg] )
 *      item        - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      thisArg     - Значение, используемое в качестве this при выполнении функции
 * 
 * @returns Значение или undefined
 */
 let objArmy = {
    age: 18,
    canJoin(user) {
      return user.age === this.age;
    }
  };
  
  let arrayUsers = [
    {name: 'Vasia', age: 18},
    {name: 'Kostia', age: 20},
  ];
  
  let objSoldiers = arrayUsers.find(objArmy.canJoin, objArmy);
  alert(objSoldiers.name); // 'Vasia'

  
/**
 * Найти индекс первого попавшегося элемента, на котором функция-колбэк вернёт true
 * 
 * array.findIndex( function(item, index, array) {}[, thisArg] )
 *      item        - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      thisArg     - Значение, используемое в качестве this при выполнении функции
 * 
 * @returns индекс или undefined
 */
let index = arrayUsers.findIndex(objArmy.canJoin, objArmy);     // 0


/**
 * Создать массив с элементами, прошедшими проверку в функции-колбэке
 * 
 * array.filter( function(element, index, array) {}[, thisArg] )
 *      element     - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      thisArg     - Значение, используемое в качестве this при выполнении функции
 * 
 * @returns новый массив
 */
 let objArmy = {
    age: 18,
    canJoin(user) {
      return user.age === this.age;
    }
  };
  
  let arrayUsers = [
    {name: 'Vasia', age: 18},
    {name: 'Kostia', age: 20},
  ];
  
let arrSoldiers = arrayUsers.filter(objArmy.canJoin, objArmy);
// [{name: 'Vasia', age: 18}]


  
/**
 * Создать массив с результатом вызова указанной функции для каждого элемента массива
 * 
 * array.map( function(item, index, array) {}[, thisArg] )
 *      item        - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      thisArg     - Значение, используемое в качестве this при выполнении функции
 * 
 * @returns новый массив
 */
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
// [{name: 'Vasia', age: 18}]
// [{name: 'Vasia', age: 18}]


  
/**
 * .forEach
 * выполняет указанную функцию один раз для каждого элемента в массиве
 * 
 * array.forEach( function callback( currentValue, index, array) {
          //your iterator
      }[, thisArg]);
 *      currentValue        - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      thisArg     - Значение, используемое в качестве this при выполнении функции
 * 
 * Не существует способа остановить или прервать цикл forEach() 
 *    кроме как выбрасыванием исключения
 * 
 * @returns undefined
 */
["Bilbo", "Gandalf", "Nazgul"].forEach((word) => {
  console.log(word)
  if (word === 'Gandalf') {
    words.shift()
  }
});


  
/**
 * Сортирует массив (изменяет исходный)
 * 
 * array.sort([compareFunction])
 *      compareFunction - функция, задающая порядок сортировки
 * 
 * По умолчанию элементы сортируются как строки
 * 
 * @returns отсортированный ИСХОДНЫЙ массив
 */
let arr = [ 1, 2, 15 ];
// метод сортирует содержимое arr
arr.sort();
alert( arr );  // 1, 15, 2
// [{name: 'Vasia', age: 18}]


  
/**
 * Перевернуть массив
 * 
 * array.reverse()
 * 
 * @returns перевёрнутый массив
 */
let arr = [1, 2, 3, 4, 5];
arr.reverse();
alert( arr ); // 5,4,3,2,1
// [{name: 'Vasia', age: 18}]


  
/**
 * Объединяет все элементы массива (или массивоподобного объекта) в строку
 * 
 * arr.join([separator])
 *      separator  - строка-разделитель
 * 
 * По умолчанию разделитель - ","
 * 
 * @returns Строка, содержащая все элементы массива
 */
let str = ['Вася', 'Петя', 'Маша'].join(';');     // Вася;Петя;Маша



  
/**
 * Применяет функцию к каждому элементу массива (слева-направо), 
 *      возвращая одно результирующее значение
 * 
 * arr.reduce( function(previousValue, item, index, array) {}, [initial])
 *      previousValue - результат предыдущего вызова (равен initial при первом вызове)
 *      item        - текущий обрабатываемый элемент
 *      index       - его индекс
 *      array       - сам массив
 *      initial     - значение первого аргумента при первом вызове функции callback
 * 
 * @returns одно результирующее значение
 * 
 * Метод arr.reduceRight работает аналогично, но проходит по массиву справа налево
 */
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result); // 15


/**
 * Интроспекция коллекций
 */
const types = [Object, Array, Set, Map, WeakSet, WeakMap, Int8Array];
const output = types.map(item => ({
    name: item.name,
    type: typeof item,              // все 'function' (ссылки на конструкторы)
    ctr: item.constructor.name,     // все 'Function'
    item,
}));
console.table(output);