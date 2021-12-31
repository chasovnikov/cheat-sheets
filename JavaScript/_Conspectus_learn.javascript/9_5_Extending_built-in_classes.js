// От встроенных классов, таких как Array, Map и других, тоже можно наследовать.

// добавим один метод (можно более одного)
class PowerArray extends Array {
    isEmpty() {
        return this.length === 0;
    }

    // встроенные методы массива будут использовать этот метод как конструктор
    static get [Symbol.species]() {
        return Array; // тперь возращает Array вместо PowerArray
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArr = arr.filter(item => item >= 10);

// filteredArr не является PowerArray, это Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

// Встроенные классы не наследуют статические методы друг друга (в отличие то невстроенных)
