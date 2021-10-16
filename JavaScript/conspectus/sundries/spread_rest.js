
/**
 * Spread-оператор разворачивает итерируемые объекты
 */

const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e'];

console.log(arr1);     // ['a', 'b', 'c']
console.log(...arr1);  // 'a', 'b', 'c'

// копирование массива
const copyArr = [...arr1];

// объединение массивов
const allArr = [...arr1, ...arr2];
const allArr1 = [...arr1, 'f', ...arr2];
 

const obj1 = {param1: 10, param2: 20};
const obj2 = {param1: 35, param3: 45};

// с объектами так не работает
console.log(...obj1);       // TypeError...
// только при копировании в новый объект
console.log( {...obj1} );   // {param1: 10, param2: 20}

// объединение объектов (последний затирает одинаковые ключи: param: 35)
console.log( {...obj1, ...obj2} );   // {param1: 35, param2: 20, param3: 45}


Math.max(4, 7, 2, 1);   // 7
// если есть только массив чисел
const numbers = [4, 7, 2, 1];
Math.max(numbers);      // NaN
Math.max(...numbers);   // 7

// раньше делали так
Math.max.apply(null, numbers);  // 7


function sum(a, b) {
    return a + b;
}
const numbers1 = [1, 2, 3, 4, 5];
// sum примет все значения, но обработает первые 2
sum(numbers);   // 3



/**
 * Rest-оператор собирает остальные параметры в массив
 */
function sum(a, b, ...rest) {
    console.log(rest);      // [3, 4, 5]  - оставшиеся значения
    return a + b;
}

function sum1(...rest) {
    console.log(rest);      // [1, 2, 3, 4, 5]  - оставшиеся значения
    // return a + b;
}

// в диструкт. присваивании
const [a, b, ...other] = numbers1;  // 1  2  [3, 4, 5]

const person = {
    name: 'Max',
    age: 20,
    city: 'Moscow',
    country: 'Russia'
};

const {name, age, ...address} = person; // 'Max'  20  {...}