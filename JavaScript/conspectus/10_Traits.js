/**
 * Примесь (trait) – это класс, методы которого предназначены для использования 
 *      в других классах, причём без наследования от примеси.
 * Не используется сама по себе.
 * Могут наследовать друг друга.
 */
// примесь
let sayHiMixin = {
    sayHi() {
      alert(`Привет, ${this.name}`);
    },
    sayBye() {
      alert(`Пока, ${this.name}`);
    }
  };
  
  // использование:
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  // копируем методы
  Object.assign(User.prototype, sayHiMixin);
  
  // теперь User может сказать Привет
  new User("Вася").sayHi(); // Привет, 

  let sayMixin = {
    say(phrase) {
      alert(phrase);
    }
  };
  
// наследование примесей:
  let sayHiMixin = {
    __proto__: sayMixin, // (или мы можем использовать Object.create для задания прототипа)
  
    sayHi() {
      // вызываем метод родителя
      super.say(`Привет, ${this.name}`); // (*)
    },
    sayBye() {
      super.say(`Пока, ${this.name}`); // (*)
    }
  };
  
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  
  // копируем методы
  Object.assign(User.prototype, sayHiMixin);
  
  // теперь User может сказать Привет
  new User("Вася").sayHi(); // Привет, Вася!