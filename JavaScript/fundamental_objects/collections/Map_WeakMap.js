
/**
 *  Map
 * 
 *  Ключи любого типа
 * 
 *  В ключах NaN === NaN
 * 
 *  Перебор в том же порядке, в каком и добавление
 * 
 *  Для перебора можно использовать for..of и forEach(fn)
 * 
 *  Методы и свойства: 
 *      get(), set(), has(), delete(), clear(), size, forEach()
 * 
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}
 */

let map = new Map([
    ['1', 'str1'],
    [NaN, 'num2'],
]); 

map.set(true, 'bool1').set(2, false);   // добавить элементы и вернуть объект Map

const elem = map.get(NaN);      // вернуть значение по ключу

let bool = map.has(NaN);        // проверка наличия элемента по ключу

let bool1 = map.delete(NaN);    // удалить элемент по ключу

map.clear();                    // очистить всю коллекцию 

let size = map.size;            // показать кол-во элементов

console.log( [...map] );        // Spread syntax



/**
 * Три метода для перебора:
 * 
 * map.keys() – перебор по ключам,
 * map.values() – перебор по значениям,
 * map.entries() – перебор по парам вида [ключ, значение] (по умолчанию в for..of)
 */

// перебор по ключам
for (let key of map.keys()) {
       alert(key);
}
     
// перебор по значениям
for (let value of map.values()) {
       alert(value);
}

// перебор по элементам в формате [ключ, значение]
for (let entry of map) { // то же самое, что и map.entries()
       alert(entry);
}

// выполняем функцию для каждой пары (ключ, значение)
map.forEach( (value, key, map) => {
       alert(`${key}: ${value}`);
     } );

// Создать Мар из обычного объекта
let map1 = new Map( Object.entries( {name: 'alex'} ) );

// Создать обычный объект из Мар
let map2 = Object.fromEntries( map1.entries() );

// Массив из Мар
const arr = Array.from( map.values() );



/**=================================
 *            WeakMap
 * 
 * Ключи только объекты
 * 
 * При сборке мусора элементы удаляются, если больше не достижимы в коде
 * 
 * Не поддерживает перебор, size и методы keys(), values(), entries()
 * 
 * Используется 
 *      в качестве дополнительного хранилища данных,
 *      для кеширования
 */

// Присутствуют  только следующие методы:
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)


// Пример использования WeakMap
const cities = {
    beijing: {name: 'Beijing'},
    kiev: {name: 'Kiev'},
    london: {name: 'London'},
}
const capitalOf = new WeakMap();
capitalOf.set(cities.beijing, 'China');
capitalOf.set(cities.kiev, 'Ukraine');
capitalOf.set(cities.london, 'Unnited Kingdom');

delete cities.london;
capitalOf.delete(cities.kiev);



// Простая реализация своего Map
 class Dictionary {
    constructor() {
        this.map = Object.create(null); // Создание объекта без предков
    }
    set(key, value) {
        this.map[key] = value;
        return this;
    }
    get(key) {
        return this.map[key];
    }
    has(key) {
        // TODO: handel false, null, undefined, '', 0 and other
        return!!this.map[key];
    }
    delete(key) {
        delete this.map[key];
    }
    get size() {
        return Object.keys(this.map).length; // Берет массив ключей и возр. его длину
    }
    keys() {
        return Object.keys(this.map);
    }
    // Пересоздает объект пустым, а старый удаляется мусоросборщиком
    clear() {
        this.map = Object.create(null);
    }
    /**
     * Принимает объект и перебирает его в свой объект
     */
    static from(hash) {
        const instance = new Dictionary();
        for (const key in hash) {
            instance.set(key, hash[key]);
        }
        return instance;
    }
}

const cities = {
    Delhi: 16787941,
    Lagos: 16000000,
};

const cityPopulation = Dictionary.from(cities);
cityPopulation.set('Shanghai', 20000000);
cityPopulation.delete('Lagos');

if (cityPopulation.has('Delhi')) {
    console.log('Delhi', cityPopulation.get('Delhi'));
}
console.log('size', cityPopulation.size);
console.log('keys', cityPopulation.keys());