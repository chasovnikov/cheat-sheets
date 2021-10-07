
/**
 * Reflect – встроенный объект, упрощающий создание прокси.
 * 
 * Для каждого внутреннего метода, перехватываемого Proxy, 
 *      есть соответствующий метод в Reflect, который имеет такое же имя 
 *      и те же аргументы, что и у ловушки Proxy.
 * 
 * Методы в Reflect имеют те же названия, что и соответствующие ловушки, 
 *      и принимают такие же аргументы. 
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