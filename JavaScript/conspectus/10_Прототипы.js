
/**
 * В JavaScript все объекты имеют скрытое свойство [[Prototype]], 
 *      которое является либо другим объектом, либо null.
 * __proto__ позволяет устанавливать/получать прототип.
 * В современном языке его заменяют функции:
 *      Object.getPrototypeOf,
 *      Object.setPrototypeOf.
 * __proto__ должно быть либо объектом, либо null.
 * Прототип используется только для чтения свойств (свойства-аксессоры – исключение, 
 *      так как запись в него обрабатывается функцией-сеттером).
 * Прототипы никак не влияют на this (при вызове метода this — всегда объект перед точкой).
 * Цикл for..in проходит и по унаследованным свойствам объекта.
 * Унаследованные свойства можно отфильтровать методом 
 *      obj.hasOwnProperty(key)
 *          (возвращает true, если у obj есть собственное свойство с именем key).
 * Почти все методы получения ключей/значений игнорируют унаследованные свойства:
 *      Object.keys, Object.values и другие.
 * Не меняйте [[Prototype]] существующих объектов, если важна скорость!
 */
 let animal = {
    eats: true
  };
  
  let rabbit = {
    jumps: true,
    __proto__: animal
  };
  
  // Object.keys возвращает только собственные ключи
  alert(Object.keys(rabbit)); // jumps
  
  // for..in проходит и по своим, и по унаследованным ключам
  for(let prop in rabbit) alert(prop); // jumps, затем eat



/**
 * F.prototype используется только при вызове new F() и присваивается 
 *      в качестве свойства [[Prototype]] нового объекта.
 *      После этого F.prototype и новый объект ничего не связывает.)
 * По умолчанию "prototype" – объект с единственным свойством constructor, 
 *      которое ссылается на функцию-конструктор.
 */
let rabbit = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");


/**
 * Эти методы нужно использовать вместо __proto__:
 * Object.create(proto, [descriptors]) 
 *      – создаёт объект c прототипом proto и необязательными 
 *      дескрипторами свойств descriptors.
 * Object.getPrototypeOf(obj) 
 *      – возвращает свойство [[Prototype]] объекта obj.
 * Object.setPrototypeOf(obj, proto) 
 *      – устанавливает proto как прототип для obj.
 */
let animal = {
    eats: true
  };
  
// создаём новый объект с прототипом animal
let rabbit = Object.create(animal, {
    jumps: {
      value: true,    // Добавляем свой метод через дескриптор
    }
});
alert(rabbit.eats); // true
alert(rabbit.jumps); // true
alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}


// клон obj c тем же прототипом (с поверхностным копированием свойств)
let clone = Object.create(
    Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj) );



/**
 * "Простейший" объект
 * 
 * Object.create(null) создаёт пустой объект без прототипа ([[Prototype]] будет null).
 * У таких объектов не будет встроенных методов объекта, таких как toString.
 * Методы вида Object.something(...) (к примеру, Object.keys(obj)) не находятся 
 *      в прототипе, так что они продолжат работать для таких объектов.
 */
let obj = Object.create(null);
alert(obj); // Error (no toString)
obj.hello = "вап";
obj.bye = "вап2";
alert( Object.keys(obj) ); // hello,bye