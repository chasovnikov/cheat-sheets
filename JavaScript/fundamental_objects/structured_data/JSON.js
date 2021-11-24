
/**
 * JSON (JavaScript Object Notation)
 * 
 * 1) Строки и имена свойств д.б. в двойных кавычках.
 * 2) Пропускает:
 *      методы объектов,
 *      символьные свойства,
 *      свойства с undefined.
 * 
 * 3) Не должно быть циклических ссылок 
 *          (исправляется с помощью второго аргумента в JSON.stringify() )
 * 4) Не поддерживает комментарии
 * 
 * JSON не способен представлять все значения JavaScript.
 * 
 * Поддерживается сериализация и восстановление:
 *      объеков, массивов, строк, конечных чисел, true, false, null.
 * 
 * NaN, Infinity, -Infinity сериализуются в null.
 * 
 * Объекты Date сериал-ся в строки дат формата ISO, но JSON.parse() оставляет
 *      их в строковой форме.
 * 
 * Объекты Function, RegExp, Error и undefined не сериал-ся и не восстан-ся.
 */


// Преобразование объектов в JSON (Сериализует только ПЕРЕЧИСЛИМЫЕ СОБСТВЕННЫЕ св-ва)
// JSON.stringify(value[, replacer, space])
//      replacer    - для выбора/исключения св-в, 
//      space       - для логирования и красивого вывода
let json = JSON.stringify({name: "John", age: 30});  


// Преобразование JSON в объект
// JSON.parse(str, [reviver]) 
//      reviver     - ф-ия для преобраз-я каждой пары
const obj = JSON.parse(`{"name": "John","age": 30}`);


// Реализация метода toJSON (для сериализации по своим правилам)
 let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
};  
alert( JSON.stringify(room) ); // 23



// ПРИМЕРЫ

// Исключение циклических ссылок
let room = {
    number: 23
};
let meetup = {
    title: "Conference",
    participants: [{ name: "John" }, { name: "Alice" }],
    place: room     // meetup ссылается на room
};
room.occupiedBy = meetup; // room ссылается на meetup
alert(JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']));


// Использование ф-ии в качестве replacer, а не массив
alert(JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));
/*
    :             [object Object]
    title:        Conference
    participants: [object Object],[object Object]
    0:            [object Object]
    name:         John
    1:            [object Object]
    name:         Alice
    place:        [object Object]
    number:       23

Первый вызов: {"": meetup}.
Первая (key, value) пара имеет пустой ключ, а значением является целевой объект
*/


// Проверять свойство по значению ф-ии replacer
let room = {
  number: 23
};
let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));
/*
(key =="") чтобы исключить первый вызов, где {"": meetup}

{
  "title":"Совещание",
  "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
  "place":{"number":23}
}
*/


// JSON.parse
numbers = JSON.parse("[0, 1, 2, 3]");
alert( numbers[1] ); // 1


// Для дат нужна функция с new Date()
let json = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
const meetup = JSON.parse(json, (key, value) => {
    if (key == 'date') {
        return new Date(value);
    }
    return value;
});

alert( meetup.date.getDate() ); // 30 - теперь работает!