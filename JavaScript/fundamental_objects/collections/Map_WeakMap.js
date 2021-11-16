
/**
 *  Map - коллекция значений с КЛЮЧАМИ ЛЮБОГО ТИПА
 *     (у обычного объекта ключи - строки и символы)
 *  В ключах Мар 
 *      NaN === NaN (обычно NaN != NaN)
 *  Перебор в том же порядке, в каком и добавление
 *  Для перебора можно использовать for..of и forEach(fn)
 *  Отличия от обычного объекта Object:
       Что угодно может быть ключом, в том числе и объекты.
       Есть дополнительные методы, свойство size.
 */

let map = new Map([
    ['1', 'str1'],
    [NaN, 'num2'],
]); 

// добавить элементы и вернуть объект Map
map.set(true, 'bool1')
   .set(2, false);

// Spread syntax
console.log( [...map] );

// вернуть значение по ключу
alert( map.get(NaN) );

// удалить элемент по ключу
map.delete(NaN);

// проверка наличия элемента по ключу
alert( map.has(NaN) );

// очистить всю коллекцию
map.clear();         

// показать кол-во элементов
alert( map.size );



/**
 * Три метода для перебора:
 * map.keys() – перебор по ключам,
 * map.values() – перебор по значениям,
 * map.entries() – перебор по парам вида [ключ, значение], 
       этот вариант используется по умолчанию в for..of.
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



/**
 * Создать Мар из обычного объекта
 */
let map1 = new Map( Object.entries( {name: 'alex'} ) );


/**
 * Создать обычный объект из Мар
 */
let map2 = Object.fromEntries( map1.entries() );



/**=================================
 *            WeakMap
 *  – это Map-подобная коллекция
 * Ключи должны быть объектами
 * При сборке мусора ключи удаляются
 * В основном используется в качестве дополнительного хранилища данных
 * Не поддерживает методы и свойства, работающие со всем содержимым сразу или возвращающие информацию о размере коллекции
 * Возможны только операции на отдельном элементе коллекции.
 * Нельзя итерироваться.
 * Используется для сопоставления с сылочными типами.
 */



/**
 * Простая реализация своего Map
 */
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