// Прототипное наследование позволяет создавать новые объекты на основе старых
//      без копирования или переопределения методов

// Объекты имеют скрытое свойство [[Prototype]],
//      которое либо равно null, либо ссылается на другой объект

// Способ задать [[Prototype]] - использовать __proto__
// Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]
// В современном языке его заменяют функции:
//      Object.getPrototypeOf
//      Object.setPrototypeOf

let animal = { eats: true };
let rabbit = { jumps: true };
rabbit.__proto__ = animal; // rabbit прототипно наследует от animal
alert(rabbit.eats); // true
alert(rabbit.jumps); // true

// Есть только два ограничения:
// 1. Нельзя назначить __proto__ по кругу
// 2.__proto__ может быть только объектом или null

//
//  -----------------------   // Операция записи не использует прототип

// Прототип используется только для чтения свойств.
// Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером
let user = {
    name: 'John',
    surname: 'Smith',

    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    },
};

let admin = {
    __proto__: user,
    isAdmin: true,
};
alert(admin.fullName); // John Smith
admin.fullName = 'Alice Cooper';
alert(admin.name); // Alice
alert(admin.surname); // Cooper

//
//  -----------------------   // Значение «this»

// В объекте или его прототипе this — всегда объект перед точкой.
// методы animal
let animal = {
    sleep() {
        this.isSleeping = true;
    },
};

let rabbit = {
    name: 'White Rabbit',
    __proto__: animal,
};

rabbit.sleep(); // задает rabbit.isSleeping

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (нет такого свойства в прототипе)

// В результате методы являются общими, а состояние объекта — нет.

//
//  -----------------------   // Цикл for…in

// for..in проходит и по унаследованным свойствам тоже

// Унаследованные св-ва можно отфильтровать:
// obj.hasOwnProperty(key) -  возвращает true, если key - имя собственного св-ва
let animal = {
    eats: true,
};

let rabbit = {
    jumps: true,
    __proto__: animal,
};

for (let prop in rabbit) {
    if (rabbit.hasOwnProperty(prop)) {
        alert(prop); // jumps
    }
}

// Почти все остальные методы получения ключей/значений игнорируют унаследованные свойства
// (такие как Object.keys, Object.values и другие)

//
//  -----------------------   // Из задач

// С точки зрения производительности, для современных движков неважно,
//      откуда берётся свойство – из объекта или из прототипа.
//      Они запоминают, где было найдено свойство, и повторно используют его в следующем запросе.
