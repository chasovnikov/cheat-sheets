// Наследование
// Пример
class Animal {
    constructor(name) {}
    run(speed) {}
    stop() {}
}

// Наследуем от Animal указывая "extends Animal"
class Rabbit extends Animal {
    hide() {}
}

// После extends разрешены любые выражения
function f(phrase) {
    return class {
        sayHi() {
            alert(phrase);
        }
    };
}
class User extends f('Привет') {}
new User().sayHi(); // Привет

// ---------------- Переопределение методов. Ключевое слово "super"
// super.method(...) вызывает родительский метод
// super(...) вызывает родительский конструктор (работает только внутри нашего конструктора)

class Animal {
    constructor(name) {}
    run(speed) {}
    stop() {}
}

class Rabbit extends Animal {
    hide() {}

    // Переопределяемый метод
    stop() {
        super.stop(); // вызываем родительский метод stop
        this.hide(); // и затем hide
    }
}

// У стрелочных функций нет super (он берётся из внешней функции):
class Rabbit extends Animal {
    stop() {
        setTimeout(() => super.stop(), 1000); // вызывает родительский stop после 1 секунды
    }
}

// ------------------- Переопределение конструктора
class Rabbit extends Animal {
    // генерируется для классов-потомков, у которых нет своего конструктора
    constructor(...args) {
        super(...args);
    }
}

// в классах-потомках конструктор обязан вызывать super(...) перед использованием this
class Rabbit extends Animal {
    constructor(name, earLength) {
        super(name);
        this.earLength = earLength;
    }
}

// Методы запоминают свой объект
// Копировать метод, использующий super, между разными объектами небезопасно
