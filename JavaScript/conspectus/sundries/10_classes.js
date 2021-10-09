
/**
 * В JavaScript класс – это разновидность функции.
 * 
 * Конструкция class User {...}:
 *  1.Создаёт функцию User с кодом из метода constructor.
 *  2.Сохраняет все методы в User.prototype.
 * 
 * Конструктор класса не может быть вызван без new.
 * Методы класса изначально являются неперечислимыми (флаг enumerable в false).
 * Классы всегда используют use strict.
 * Как и функции, классы можно определять внутри другого выражения,
 *      передавать, возвращать, присваивать и т.д.
 */
 class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}

// класс - это функция
alert(typeof User); // function

// ...или, если точнее, это метод constructor
alert(User === User.prototype.constructor); // true

// Методы находятся в User.prototype, например:
alert(User.prototype.sayHi); // alert(this.name);

// в прототипе ровно 2 метода
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi


/**
 * Аналогично Named Function Expression, Class Expression может иметь имя.
 * Если у Class Expression есть имя, то оно видно только внутри класса:
 */
let User = class MyClass {
    sayHi() {
      alert(MyClass); // имя MyClass видно только внутри класса
    }
};
new User().sayHi(); // работает, выводит определение MyClass
alert(MyClass); // ошибка, имя MyClass не видно за пределами класса



/**
 * После extends разрешены любые выражения.
 * Пример вызова функции, которая генерирует родительский класс:
 */
function f(phrase) {
    return class {
      sayHi() { alert(phrase) }
    }
}
class User extends f("Привет") {}  
new User().sayHi(); // Привет


/**
 * super.method(...) вызывает родительский метод.
 * super(...) вызывает родительский конструктор (работает только 
 *      внутри нашего конструктора).
 */
class Rabbit extends Animal {
    constructor(name) {
        super();    
        this.name = name;
    }

    hide() {
        alert(`${this.name} прячется!`);
    }

    stop() {
        super.stop(); // вызываем родительский метод stop
        this.hide(); // и затем hide
    }
}


/** 
 * У стрелочных функций нет super.
 * При обращении к super стрелочной функции он берётся из внешней функции:
 */
class Rabbit extends Animal {
    stop() {
      setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
    }
  }



/**
 * Если класс расширяет другой класс и не имеет конструктора, то 
 *      автоматически создаётся такой «пустой» конструктор.
 * В классах-потомках конструктор обязан вызывать super(...)
 *      перед использованием this.
 */
class Rabbit extends Animal {
    // генерируется для классов-потомков, у которых нет своего конструктора
    constructor(...args) {
        super(...args);
    }
}



/**
 * Статические свойства и методы.
 * 
 * Обозначение   - static.
 * this          - сам конструктор класса. 
 * Наследуются.
 * Принадлежат классу «в целом», а не относятся к конкретному объекту класса.
 * Используются в классах, относящихся к базам данных.
 */
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    // Это то же самое, что и прямое присваивание: Article.publisher = "Илья Кантор";
    static publisher = "Илья Кантор";
    
    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}
const articles = new Article('dvfvf', 0);
articles.sort(Article.compare);
alert( Article.publisher ); // Илья Кантор



class Rabbit extends Object {}
alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true


/**
 * Инкапсуляция.
 * 
 * Св-ва и меоды м.б.:
 *      1.Публичные.
 *      2.Приватные - префикс # (реализовано на уровне языка).
 *          Доступны только внутри класса.
 *          С приватными свойствами this['#name'] не работает.
 *      3.Защищенные - префикс _ (НЕ реализовано на уровне языка).
 *          Реализ-ся с помощью ф-ий и условий.
 * М.б. два одинаковых поля одновременно – приватное и публичное.
 * Чтобы создать св-во только для чтения, нужно сделать для него только геттер,
 *      не делая сеттера.
 */
class CoffeeMachine {
    _waterAmount = 0;

    /**
     * Использование функций getWaterAmount/setWaterAmount предпочтительнее, 
     * чем геттеров/сеттеров (get waterAmount/set waterAmount )
     */
    setWaterAmount(value) {
        if (value < 0) throw new Error("Отрицательное количество воды");
        this._waterAmount = value;
    }
    
    getWaterAmount() {
        return this._waterAmount;
    }
  
    /**
     * Использование функций get.../set... предпочтительнее, чем геттеров/сеттеров:
     */
    // set waterAmount(value) {
    //   if (value < 0) throw new Error("Отрицательное количество воды");
    //   this._waterAmount = value;
    // }
  
    // get waterAmount() {
    //   return this._waterAmount;
    // }
  
    constructor(power) {
      this._power = power;
    }

    get power() {
        return this._power;
    }
  
}

// создаём новую кофеварку
let coffeeMachine = new CoffeeMachine(100);
// устанавливаем количество воды
coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды
coffeeMachine.power = 25; // Error (no setter)



/**
 * Расширение встроенных классов
 * 
 * От встроенных классов (Array, Map, ...) можно наследовать.
 * Встроенные методы (filter, map, ...) возвращают новые объекты. 
 *      Для этого они используют свойство объекта "constructor".
 * Symbol.species возращает свой конструктор.
 * Другие коллекции (Map, Set, ...) работают аналогично.
 * Встроенные классы не наследуют статические методы друг друга.
 */
 class PowerArray extends Array {
    // свой метод
    isEmpty() {
      return this.length === 0;
    }
  
    // встроенные методы массива будут использовать этот метод как конструктор
    static get [Symbol.species]() {
      return Array;
    }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter создаст новый массив, используя arr.constructor[Symbol.species] как конструктор
let filteredArr = arr.filter(item => item >= 10);

// filteredArr не является PowerArray, это Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function



/**
 * instanceof 
 *      позволяет проверить принадлежность к классу с учётом наследования.
 */
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true

// Symbol.hasInstance - изменяет поведение "instanceof".
class MyArray {
    static [Symbol.hasInstance](instance) {
      return Array.isArray(instance);
    }
}
console.log([] instanceof MyArray); // true



/**
 * У toString имеются скрытые возможности:
 *      можно использовать его как расширенную версию typeof 
 *          и как альтернативу instanceof.
 * 
 */
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]

/**
 * Поведение toString можно настраивать через Symbol.toStringTag.
 */
let user = {
[Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User],   typeof: [object]