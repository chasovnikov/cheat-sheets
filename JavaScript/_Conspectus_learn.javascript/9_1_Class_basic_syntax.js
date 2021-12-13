// Пример
class User {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        alert(this.name);
    }
}

let user = new User('Иван');
user.sayHi(); // Иван

// User - это функция
alert(typeof User); // function

// Через функции:
function User(name) {
    this.name = name;
}
User.prototype.sayHi = function () {
    alert(this.name);
};

// Есть важные отличия "class" от "function":
// 1. "class" помечается специальным внутренним свойством [[IsClassConstructor]]: true
// 2. Конструктор класса не может быть вызван без new
// 3. Методы класса являются неперечислимыми
// 4. Классы всегда используют use strict

// --------------------------- Class Expression
let User = class {
    sayHi() {
        alert('Привет');
    }
};

// Именнованный Class Expression
let User = class MyClass {
    sayHi() {
        alert(MyClass); // имя MyClass видно только внутри класса
    }
};
new User().sayHi(); // работает, выводит определение MyClass
alert(MyClass); // ошибка, имя MyClass не видно за пределами класса

// Можем динамически создавать классы «по запросу»:
function makeClass(phrase) {
    return class {
        sayHi() {
            alert(phrase);
        }
    };
}
let User = makeClass('Привет');
new User().sayHi(); // Привет

// ----------------------------- Геттеры/сеттеры, другие сокращения
// Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства,
//      геттеры/сеттеры и т.д.

// При объявлении класса геттеры/сеттеры создаются на User.prototype:
Object.defineProperties(User.prototype, {
    name: {
        get() {
            return this._name;
        },
        set(name) {
            // ...
        },
    },
});

// Пример с вычисляемым свойством в квадратных скобках:
class User {
    ['say' + 'Hi']() {
        alert('Привет');
    }
}
new User().sayHi();

// -------------------------- Свойства классов
class User {
    // Свойство не устанавливается в User.prototype
    // Оно создаётся оператором new перед запуском конструктора, это именно свойство объекта
    name = 'Аноним';

    sayHi() {}
}

// MyClass технически является функцией-конструтор
// Методы, геттеры и сеттеры записываются в MyClass.prototype.
class MyClass {
  prop = value;
  constructor(/*...*/) {
    // ...
  }
  method(/*...*/) {}
  get something(/*...*/) {}
  set something(/*...*/) {}
  [Symbol.iterator]() {}
  // ...
}