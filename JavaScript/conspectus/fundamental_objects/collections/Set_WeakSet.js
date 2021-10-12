
/**
 * Set - «множество» УНИКАЛЬНЫХ значений без ключей.
 * Позволяет легко работать с множествами: пересечения, разница, обратная разница.
 * Перебор в том же порядке, в каком и добавление
 * 
 */
let set = new Set( ["апельсин", "яблоко", "банан"] );

// добавить элемент и вернуть объект Set
set.add( {fruit: "яблоко"} ) // не добавится - уже есть
   .add( {fruit: "яблоко"} ) // не добавится
   .add( {fruit: "груша"} );

// удалить значение и вернуть "true", если оно присутствовало
alert( set.delete("яблоко") ); 

// проверить наличие значения
alert( set.has('яблоко') );

// очистить всё множество
set.clear();

// показать количество элементов
alert( set.size );

// Перебирается с помощью for..of и forEach
for (let value of set) {
    alert(value);
}

set.forEach( (value, valueAgain, set) => {
  alert(value);
} );

/**
 * Set имеет те же встроенные методы, что и Map:
 * set.values(),
 * set.keys() – присутствует для обратной совместимости с Map,
 * set.entries() – возвращает перебираемый объект для пар вида [значение, значение], 
 *      присутствует для обратной совместимости с Map.
 */


/**
 * При добавлении объектов в Set, могут появляться дубликаты.
 * Это можно исправить данной функцией:
 */
 const distinct = dataset => {
    const keys = new Set();
    return dataset.filter(record => {
        const cols = Object.keys(record.sort());
        const key = cols.map(field => record[field]).join('\x00');
        const has = keys.has(key);
        if (!has) keys.add(key);
        return !has;
    });
};


/**
 * Операции с МНОЖЕСТВАМИ. Реализация на массивах
 * 
 * Объединение
 */
 const union = (s1, s2) => {
    const ds = s1.slice(0);
    for (let i = 0; i < s2.length; i++) {
        const item = s2[i];
        if (!ds.includes(item)) ds.push(item);
    }
    return ds;
};

// Пересечение
const intersection = (s1, s2) => {
    const ds = [];
    for (let i = 0; i < s1.length; i++) {
        const item = sl[i];
        if (s2.include(item)) ds.push(item);
    }
    return ds;
};

// Разница (что есть в первом массиве такого чего нет во втором)
const difference = (s1, s2) => {
    const ds = [];
    for (let i = 0; i < s1.length; i++) {
        const item = s1[i];
        if (!s2.includes(item)) ds.push(item);
    }
    return ds;
};

// Обратная разница (чего есть во 2-м массиве такого чего нет в 1-ом)
const complement = (s1, s2) => difference(s2, s1);

// Usage
const cities1 = ['Beijing', 'Kiev'];
const cities2 = ['Kiev', 'London', 'Baghdad'];
// Список операций
const operations = [union, intersection, difference, complement];

const results = operations.map(operation => ({
    [operation.name]: operation(cities1, cities2)
}));


/**
 * Операции с МНОЖЕСТВАМИ. Реализация на Set
 * 
 * Объединение
 */
const union = (s1, s2) => new Set([...s1, ...s2]);

// Пересечение
const intersection = (s1, s2) => new Set(
    [...s1.filter(v => s2.has(v))]
);

// Разница
const difference = (s1, s2) => new Set(
    [...s1].filter(v => !s2.has(v))
);

// Обратная разница
const complement = (s1, s2) => difference(s2,s1);

// Usage
const cities1 = new Set(['Beijing', 'Kiev']);
const cities2 = new Set(['Kiev', 'London', 'Baghdad']);
// Список операций
const operations = [union, intersection, difference, complement];

const results = operations.map(operation => ({
    [operation.name]: operation(cities1, cities2)
}));



/**===============================
 *          WeakSet
 * аналогична Set, но мы можем добавлять в WeakSet только объекты
 * Объект присутствует в множестве только до тех пор, пока доступен где-то ещё.
 * Как и Set, она поддерживает add, has и delete, но не size, keys() и не является перебираемой.
 * 
 */