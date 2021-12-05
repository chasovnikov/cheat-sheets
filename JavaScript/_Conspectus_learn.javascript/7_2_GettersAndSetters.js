// Два типа свойств объекта:
// 1. Свойства-данные    (data properties)
// 2. Свойства-аксессоры (accessor properties) - геттеры и сеттеры

// Пример
let user = {
    name: 'John',
    surname: 'Smith',

    // геттер, срабатывает при чтении
    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    // сеттер, срабатывает при записи
    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    },
};
alert(user.fullName); // John Smith
user.fullName = 'Alice Cooper';
alert(user.name); // Alice
alert(user.surname); // Cooper

//
//  -----------------------   // Дескрипторы свойств доступа

// Геттеры/сеттеры не имеют в дескрипторах value и writable, но предлагают функции get и set.

Object.defineProperty(user, 'fullName', {
    enumerable: true,
    configurable: true,

    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(' ');
    },
});

//
//  -----------------------   // Умные геттеры/сеттеры

// Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств

// Пример:  запретить устанавливать короткое имя для user
let user = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            alert('Имя слишком короткое, должно быть более 4 символов');
            return;
        }
        this._name = value;
    },
};
user.name = 'Pete';
alert(user.name); // Pete
user.name = ''; // Имя слишком короткое...

//
//  -----------------------   // Использование для совместимости

// Аксессоры позволяют в любой момент изменить поведение "обычного" свойства

// Пример: удалили обычное св-во age, но для совмест-ти со старым кодом сделали для age геттер:
function User(name, birthday) {
    this.name = name;
    // this.age = age;      // свойство удалено
    this.birthday = birthday;

    // возраст рассчитывается из текущей даты и дня рождения
    Object.defineProperty(this, 'age', {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        },
    });
}
let john = new User('John', new Date(1992, 6, 1));
alert(john.birthday); // доступен как день рождения
alert(john.age); // ...так и возраст
