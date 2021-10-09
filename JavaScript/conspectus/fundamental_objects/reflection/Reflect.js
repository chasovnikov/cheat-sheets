
/**
 * Отражение или рефлексия означает процесс, во время которого программа 
 *      может отслеживать и модифицировать собственную структуру и поведение 
 *      во время выполнения. Это один из видов метапрограммирования.
 * 
 * Reflect – встроенный объект, предоставляющий методы для перехватывания операций
 *      аналогично методам proxy handler`ов.
 * 
 * Для функционально программирования позволяет получить ссылку на ф-ию.
 * 
 * Reflect - это не конструктор. Нельзя использовать его с оператором new 
 *      или вызывать как функцию. 
 * Все свойства и методы являются статическими (так же, как и у объекта Math).
 * 
 * Методы в Reflect имеют те же названия, что и соответствующие ловушки Proxy, 
 *      и принимают такие же аргументы. 
 * 
 * 
 * Reflect.get()
 *      Функция, которая возвращает значение свойств.
 * 
 * Reflect.set()
 *      Функция, присваивающая значения свойствам. 
 *      Возвращает Boolean значение true при успешном выполнении.
 * 
 * Reflect.apply()
 *      Вызывает целевую функцию с аргументами, переданными в параметре args.
 * 
 * Reflect.construct()
 *      Оператор new как функция. Аналогично new target(...args). 
 *      Также предоставляет возможность определить другой прототип.
 * 
 * Reflect.getPrototypeOf()
 *      Аналогично Object.getPrototypeOf().
 * 
 * Reflect.setPrototypeOf()
 *      Функция, присваивающая прототип целевому объекту.
 * 
 * Reflect.defineProperty()
 *      Похож на Object.defineProperty(). Возвращает Boolean.
 * 
 * Reflect.deleteProperty()
 *      Оператор delete как функция. Аналогично delete target[name].
 * 
 * Reflect.enumerate()
 *      Похож на цикл for...in. Возвращает итератор с собственными перечисляемыми 
 *      и наследуемыми свойствами целевого объекта.
 * 
 * Reflect.getOwnPropertyDescriptor()
 *      Аналогично Object.getOwnPropertyDescriptor(). Возвращает дескриптор 
 *      свойства объекте, иначе undefined.
 * 
 * Reflect.has()
 *      Оператор in как функция. Возвращает значение Boolean в зависимости 
 *      от факта наличия собственного или наследованного свойства.
 * 
 * Reflect.isExtensible()
 *      Аналогично Object.isExtensible().
 * 
 * Reflect.preventExtensions()
 *      Аналогично Object.preventExtensions(). Возвращает Boolean.
 * 
 * Reflect.ownKeys()
 *      Возвращает массив строк с именами собственных (не наследованных) свойств.
 */
let user = {
  name: "Вася",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // выводит "GET name"
user.name = "Петя"; // выводит "SET name=Петя"


/**
 * receiver нужен для задания контекста
 */
let user = {
  _name: "Гость",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {                 // receiver = admin
    // return target[prop];                     // target = user  (1)
    return Reflect.get(target, prop, receiver);
    // return Reflect.get(...arguments);        // можно так
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Админ"
};

// alert(admin.name); // выводится Гость, если испльзовать строку (1)
alert(admin.name);    // Админ


/**
 * Интроспекция
 * 
 * Просмотреть методы объектов с помощью Reflect.ownKeys(namespace):
 */
const namespaces = [Atomics, Math, JSON, Reflect, Intl, WebAssembly];
const output = namespaces.map(namespace => ({
    type: typeof namespace,
    namespace,
    methods: Reflect.ownKeys(namespace),
}));
console.table(output);


/**
 * Reflect.apply(...)
 */
const number = [2, 4, 1];
const { max, min } = Math;      // выдернем выражение функций
const { apply } = Reflect;

// const maxNumber = max.apply(null, numbers);
const maxNumber = apply(max, null, numbers);

// const minNumber = min.apply(null, numbers);
const minNumber = apply(min, null, numbers);


/**
 * Reflect.construct(...)
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// const obj1 = new Point(10, 20);
const obj1 = Reflect.construct(Point, 10, 20);  // можно взять ссылку на "construct"