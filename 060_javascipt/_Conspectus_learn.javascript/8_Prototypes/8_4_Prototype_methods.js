// Эти методы нужно использовать вместо __proto__:
Object.create(proto, [descriptors]); // создаёт пустой объект с proto
Object.getPrototypeOf(obj); // возвращает свойство [[Prototype]] объекта obj
Object.setPrototypeOf(obj, proto); // устанавливает свойство [[Prototype]] объекта obj как proto

// Пример
let animal = { eats: true };
let rabbit = Object.create(animal); // новый объект с прототипом animal
alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

// Добавить свойство через дескриптор
let rabbit = Object.create(animal, {
    jumps: {
        value: true,
    },
});
alert(rabbit.jumps); // true

// клон obj c тем же прототипом (с поверхностным копированием свойств)
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
// создаёт точную копию объекта obj, включая все свойства: перечисляемые и неперечисляемые,
// геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]]

// Не меняйте [[Prototype]] существующих объектов, если важна скорость
