// Проверочные задания (своё):
// 1. Создать класс, наследуемый от другого класса.
//      Создать объект-примесь. Внедрить его методы в первый класс.
//      Показать результат в консоли или браузере

// Своё:
const mixin = {
    sayCool() {
        return 'Cool!';
    },
};

class EventUser {
    constructor(event) {
        this.event = event;
    }

    sayHi() {
        return this.event;
    }
}

class User extends EventUser {
    constructor(event, name) {
        super(event);
        this.name = name;
    }

    sayBi() {
        return 'Bi, ' + this.name;
    }

    sayHi() {
        return super.sayHi() + ', ' + this.name;
    }
}

Object.assign(User.prototype, mixin);

const user = new User('hi', 'Вася');

// console.log(user.sayCool());
// console.dir(User.prototype);
console.log(user.sayHi());
