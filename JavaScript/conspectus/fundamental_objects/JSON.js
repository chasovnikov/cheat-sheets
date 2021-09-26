
/**
 * JSON (JavaScript Object Notation)
 * – это общий формат для представления значений и объектов
 * 
 * 1) Строки и имена свойств д.б. в двойных кавычках.
 * 2) Пропускает:
 *      методы объектов,
 *      символьные свойства,
 *      свойства с undefined.
 * 
 * 3) Не должно быть циклических ссылок 
 *          (исправляется с помощью дополнительных аргументов в JSON.stringify() )
 * 4) Не поддерживает комментарии
 */

/**
 * Преобразование объектов в JSON
 * 
 * JSON.stringify(value[, replacer, space])
 *      value    - значение для кодирования.
 *      replacer - массив свойств объекта для кодирования 
 *                  или функция соответствия function(key, value)
 *      space    - дополнительное пространство (отступы), используемое для форматирования
 * 
 * @returns String
 */
let json = JSON.stringify({name: "John", age: 30});  


/**
 * Преобразование JSON в объект
 * 
 * JSON.parse(str, [reviver])
 *      str     - JSON для преобразования в объект
 *      reviver - функция для преобразования каждого значения
 * 
 * @returns Object
 */
const obj = JSON.parse(`{"name": "John","age": 30}`);





// Пример ограничения: не должно быть циклических ссылок
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [{ name: "John" }, { name: "Alice" }],
    place: room // meetup ссылается на room
};

room.occupiedBy = meetup; // room ссылается на meetup

JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON

/**
 * Исправим с помощью дополнительных аргументов
 * Вывод: {"title":"Conference","participants":[{},{}]}
 * Но нет свойств participants 
 */
alert(JSON.stringify(meetup, ['title', 'participants']));

/**
 * Включим в список все свойства, кроме room.occupiedBy
 * Вывод:
    {
    "title":"Conference",
    "participants":[{"name":"John"},{"name":"Alice"}],
    "place":{"number":23}
    }
 */
alert(JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']));

/**
 * С применение функции в replacer
 * Функция применяется рекурсивно. 
 * Значение this внутри replacer – это объект, который содержит текущее свойство.
 * Пары ключ:значение, которые приходят в replacer:
    :             [object Object]
    title:        Conference
    participants: [object Object],[object Object]
    0:            [object Object]
    name:         John
    1:            [object Object]
    name:         Alice
    place:        [object Object]
    number:       23

 * Первый вызов – особенный. Ему передаётся специальный «объект-обёртка»: {"": meetup}. 
 * Другими словами, первая (key, value) пара имеет пустой ключ, 
 * а значением является целевой объект в общем. 
 * Вот почему первая строка из примера выше будет ":[object Object]"
*/
alert(JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
}));


/**
 * Форматирование: space
 * Применяется для логирования и красивого вывода
 */
let user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};

alert(JSON.stringify(user, null, 2));
  /* отступ в 2 пробела:
{
    "name": "John",
    "age": 25,
    "roles": {
      "isAdmin": false,
      "isEditor": true
    }
}
*/

/* для JSON.stringify(user, null, 4) результат содержит больше отступов:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/


/**
 * Пользовательский «toJSON».
 * Объект может предоставлять метод toJSON для преобразования в JSON. 
 * JSON.stringify автоматически вызывает его, если он есть
 */
 let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
  };
  
  alert( JSON.stringify(room) ); // 23


/**===================================================================
 * JSON.parse
 */
 let numbers = "[0, 1, 2, 3]";

 numbers = JSON.parse(numbers);
 
 alert( numbers[1] ); // 1

/**
 * Для дат нужна функция с new Date()
 */
 let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

 let meetup = JSON.parse(str, function(key, value) {
   if (key == 'date') return new Date(value);
   return value;
 });
 
 alert( meetup.date.getDate() ); // 30 - теперь работает!