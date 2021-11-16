
/**
 * Деструктуризация позволяет разбивать объект или массив 
 * на переменные при присвоении.
 * Полный синтаксис для объекта:
 * let {prop : varName = default, ...rest} = object
 * Свойства, которые не были упомянуты, копируются в объект rest
 * 
 * Полный синтаксис для массива:
 * let [item1 = default, item2, ...rest] = array
 * 
 * Можно извлекать данные из вложенных объектов и массивов, 
 * для этого левая сторона должна иметь ту же структуру, что и правая.
 */

let [firstName, surname] = ["Ilya", "Kantor"];

// пропуск значения
let [firstName, , title] = ["Julius", "Caesar", "Consul"];

// можно использовать любой перебираемый объект
let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);

// копирование в свойства объекта
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

for (let [key, value] of Object.entries(user)) {
    alert(`${key}:${value}`); // name:John, затем age:30
  }


// остаточные параметры
let [name1, ...rest] = ["Julius", "Caesar", "Consul"];
alert(rest); // ["Caesar", "Consul"]


// значения по умолчанию
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // Anonymous (значение по умолчанию)

let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];


let {var1, var2} = {var1: 'sd', var2: 'fg'};

// порядок не имеет значения
let {height, width, title} = { title: "Menu", height: 200, width: 100 };

// переопределить в переменные: w, h
let {height: h, width: w, title} = { title: "Menu", height: 200, width: 100 };
alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200

// значения по умолчанию
let {height = 200, width = 100, title} = { title: "Menu" };

// можем совмещать : и =
let {height: h = 200, width: w = 100, title} = { title: "Menu" };

// остаток объекта
let {title, ...rest} = { title: "Menu", height: 200, width: 100 };
alert(rest.height);  // 200
alert(rest.width);   // 100


let title, width, height;
// скобки обязательны, если нет "let|const"
({title, width, height} = {title: "Menu", width: 200, height: 100});


// Вложенная деструктуризация
let options = {
    size: {
      width: 100,
      height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
  };
  
  // деструктуризация разбита на несколько строк для ясности
  let {
    size: { // положим size сюда
      width,
      height
    },
    items: [item1, item2], // добавим элементы к items
    title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
  } = options;
  // переменные для size и items отсутствуют, так как мы взяли сразу их содержимое.
  
  alert(title);  // Menu
  alert(width);  // 100
  alert(height); // 200
  alert(item1);  // Cake
  alert(item2);  // Donut


/**
 * Умные параметры функций
 * Мы передаём объект в функцию
 */
let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
  };
  
  // ...и она немедленно извлекает свойства в переменные
  function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – взято из options,
    // width, height – используются значения по умолчанию
    alert( `${title} ${width} ${height}` ); // My Menu 200 100
    alert( items ); // Item1, Item2
  }
  
  showMenu(options);



  let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
  };
  
  function showMenu({
    title = "Untitled",
    width: w = 100,  // width присваиваем в w
    height: h = 200, // height присваиваем в h
    items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
  }) {
    alert( `${title} ${w} ${h}` ); // My Menu 100 200
    alert( item1 ); // Item1
    alert( item2 ); // Item2
  }
  
  showMenu(options);

// Полный синтаксис – такой же, как для деструктурирующего присваивания:
// function({
//   incomingProperty: varName = defaultValue
//   ...
// })


/**===========================================================
 * Задачи
 */
 let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

function topSalary(salaries) {    
  let max = 0,
      maxKey = '',
      arr = Object.entries(salaries);

  if (arr.length <= 0) return null;

  for(let [key, val] of Object.entries(salaries))  {
      if (max < val) {
          max = val;
          maxKey = key;
      }
  }
  return maxKey;
}

alert( topSalary(salaries) );