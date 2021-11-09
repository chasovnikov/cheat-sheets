/**
 * 1. Навигация по DOM-узлам
 * 2. Навигация по таблицам
 * 3. Выбор элементов документа
 * 4. Старые методы выбора элементов
 * 5. Предварительно выбранные элементы
 * 6. Классы DOM-узлов
 * 7. Содержимое текстового узла
 * 8. Атрибуты и свойства
 * 9. Изменение документа
 * 10. Устаревшие методы изменения документа
 * 11. Размеры и прокрутка элементов
 * 12. Размеры и прокрутка окна
 * 13. Координаты
 * 14. Консоль
 * /


/**
 * Document Object Model (DOM) - объектная модель документа 
 *      (каждый HTML|XML-тег является объектом)
 * 
 * DOM-коллекция - это не массив, поэтому методы для массива на них раб-ть не будут.
 * Не используйте цикл for..in для перебора коллекций
 */

// Если скрипт подключается в начале док-а, то код нужно обернуть в след. ф-ию 
//      (чтобы JS видел всё DOM-дерево)
window.onload = function () {
    let block = document.body.querySelector('#block');
    // ...
}



/// НАВИГАЦИЯ ПО DOM-УЗЛАМ (в скобках указ. навигация по элем-ам, 
//          исключая текстовые узлы и комментарии)

/* 
document
document.documentElement                            - соответ-ет  <html>
document.body                                       - <body>
document.head                                       - <head>
node.parentNode         (parentElement)             - родитель
node.previousSibling    (previousElementSibling)    - предыдущ. сосед
// Соседи – это узлы, у которых один и тот же родитель.
node.nextSibling        (nextElementSibling)        - последующ. сосед
node.childNodes         (children)                  - список всех детей
node.firstChild         (firstElementChild)         - первый дочерн. узел/элем-т
node.lastChild          (lastElementChild)          - последний дочерн. узел/элем-т
elem.children.length    (childElementCount)
 */
const childs = document.body.childNodes;
node.childNodes[0] === node.firstChild;     // true
node.childNodes[node.childNodes.length - 1] === node.lastChild;     // true

// Оба выражения: 2-й дочерн.эл-т типа Element 1-го дочерн.эл-та объекта Document
let a = document.children[0].children[1];
let b = document.firstElementChild.firstElementChild.nextElementSibling;

// Проверка наличия дочерних узлов
node.hasChildNodes();

alert( document.documentElement.parentNode );       // выведет document
alert( document.documentElement.parentElement );    // выведет null

while(elem = elem.parentElement) {      // идти наверх до <html>
    alert( elem );
}


/// НАВИГАЦИЯ ПО ТАБЛИЦАМ

// table.rows                   - коллекция строк <tr>
// table.caption/tHead/tFoot    - <caption>, <thead>, <tfoot>
// table.tBodies                - <tbody>
// thead/tbody/tfoot.rows       - коллекция строк <tr> секции
// tr.cells             - коллекция ячеек <td> и <th> внутри <tr>
// tr.sectionRowIndex   - номер строки <tr> в текущ.секции <thead>/<tfoot>/<tbody>
// tr.rowIndex          - номер строки <tr> в таблице
// td.cellIndex         - номер ячейки в строке <tr>


{   // ПРИМЕР:
/*<html>
<body>
  <div>Пользователи:</div>
  <ul>
    <li>Джон</li>
    <li>Пит</li>
  </ul>
</body>
</html>*/

// получить элемент <div>
let div = document.body.firstElementChild;
let div = document.body.children[0];
let div = document.body.childNodes[1];  // первый узел пробел, поэтому выбираем второй

// получить <ul>
let ul = document.body.lastElementChild;
let ul = document.body.children[1];

// Второй <li> (с именем Пит):
let li2 = document.body.lastElementChild.lastElementChild;
}


/// ВЫБОР ЭЛЕМЕНТОВ ДОКУМЕНТА

// Поиск элем-ов в DOM по селекторам CSS:
//      .querySelector(...)
//      .querySelectorAll(...)     - возр. итерир. объект NodeList
let spinner = document.querySelector('#spinner');       // возр. первый совпад.эл-т или null
let titles = document.querySelectorAll('h1, h2, h3');

// В querySelectorAll() NodeList - "пассивный" (длина и содержимое не может изменяться)

// CSS-селекторы:
// div          - любой элемент <div>
// #nav         - id="nav"
// .warning     - class="warning"
// p[lang="fr"] - <p lang="fr">
// *[name="x"]  - любой элем-т с атрибутом name="x"
// #long span   - любой потомок <span> внутри элемента c id="long"
// #long>span   - любой дочерний <span> элемента c id="long"
// body>h1:first-child - первый дочерний <h1> эл-та <body>
// img + p.caption     - эл. <p class="caption">, идущий сразу после <img>
// h2 ~ p       - <p> после <h2> и явл-ся родственным ему
// button, input[type="button"]     // Все <button> и <input type="button">

// closest() - метод в классе Element. В отличие от querySelector() ищет выше по дереву
// полезен, когда вы регистр. обраб-к соб-й на высок. уровне в дереве документа
// Найти ближайший объемл-й <a>, кот-й имеет href
let hyperlink = event1.target.closest('a[href]');

// matches() - проверка
// вернуть true, если е - заголовочный HTML-элемент
elem.matches('h1,h2,h3,h4,h5,h6');



/// СТАРЫЕ МЕТОДЫ ВЫБОРА ЭЛЕМЕНТОВ

// Строка, указ-я в id - это глобальная переменная (плохой стиль)
// <div id="elem-content">Элемент</div>
// <script>
  // elem - ссылка на элемент с id="elem"
  elem.style.background = 'red';
// </script>

// подобен      document.querySelector('#sect1')
let sect1 = document.getElementById('sect1');

// Методы ниже возр-ют "активный"(длина и содержимое может меняться) NodeList
// подобен      document.querySelectorAll('*[name="color"]')
let colors = document.getElementsByName('color');       // поиск по атрибуту "name"

// подобен      document.querySelectorAll('h1')
let heading = document.getElementsByTagName('h1');

// подобен      document.querySelectorAll('.tooltip')
let tooltips = document.getElementsByClassName('tooltip');

/*Когда мы ищем элементы с помощью getElementsBy* , то получаем HTML-коллекцию
А когда ищем через querySelectorAll , то получаем NodeList
(у HTML-collection нет метода forEach в отличии от NodeList)

Скопировать путь к любому элементу для JS: кликаете в дереве страницы по любому 
элементу правой кнопкой --> copy --> copy JS path*/


// ПРИМЕР:
// 1. Таблица с `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Все label в этой таблице
table.getElementsByTagName('label')
// или
document.querySelectorAll('#age-table label')

// 3. Первый td в этой таблице
table.rows[0].cells[0]
// или
table.getElementsByTagName('td')[0]
// или
table.querySelector('td')

// 4. Форма с name="search"
// предполагаем, что есть только один элемент с таким name в документе
let form = document.getElementsByName('search')[0]
// или, именно форма:
document.querySelector('form[name="search"]')

// 5. Первый input в этой форме
form.getElementsByTagName('input')[0]
// или
form.querySelector('input')

// 6. Последний input в этой форме
let inputs = form.querySelectorAll('input') // найти все input
inputs[inputs.length-1] // взять последний



/// ПРЕДВАРИТЕЛЬНО ВЫБРАННЫЕ ЭЛЕМЕНТЫ

// Свойства класса Document:
//      document.forms       - все  <form>
//      document.images      - все <img>
//      document.links       - все <a>, имеющим href
// Эти св-ва ссылаются на объекты HTMLCollection 
//      (в отлич. от NodeList мог. индекс-ся по идентиф-ру или по имени элемента)
let addr = document.forms.address;      // <form id="address">



/// КЛАССЫ DOM-УЗЛОВ (в порядке наследования от друг друга: от страшего к млад.)

// EventTarget  - корневой класс. Объекты не создаются. Это основа для событий над эл-ми
// Node         - основа для DOM-узлов. Объекты не создаются
// Element      - базовый класс для DOM-элем-в
// HTMLElement  - баз. класс для всех остальных HTML-элементов
//      От него наслед.:
//      HTMLInputElement    - класс для тега <input>
//      HTMLBodyElement     - класс для <body>
//      HTMLAnchorElement   - класс для <a>
//      ...
// Text, Comment - наслед-ся от Node
// SVGElement    - наслед-ся от Element
/*
                EventTarget
                /         \
              Node
            /   |   \
       Element  Text  Comment
       /    \
HTMLElement  SVGElement
    |
HTMLBodyElement, HTMLInputElement, HTMLAnchorElement, ...
*/

// Узнать имя класса DOM-узла:
alert( document.body.constructor.name );    // HTMLBodyElement
alert( document.body );                     // [object HTMLBodyElement]
alert( document.body instanceof HTMLBodyElement );  // true
alert( document.body instanceof HTMLElement );      // true

/// Свойство "nodeType" (устаревш.)
// elem.nodeType == 1   для узлов-элементов
// elem.nodeType == 3   для текстовых узлов
// elem.nodeType == 9   для объектов документа
// ...
let elemType = document.body.nodeType;   // 1


// Узнать имя узла или элемента
alert( document.body.nodeName );    // BODY (nodeName - для любых узлов Node)
alert( document.body.tagName );     // BODY (tagName - только для элементов Element)


/// innerHTML: получает и изменяет содержимое элемента
// Свойство innerHTML есть только у узлов-элементов.
document.body.innerHTML = 'Новый BODY!';
// Вставленный через innerHTML тег <script> не запускается


// outerHTML: получает и заменяет (не изменяет) HTML элемента целиком
alert(elem.outerHTML);      // <div id="elem">Привет <b>Мир</b></div>



/// СОДЕРЖИМОЕ ТЕКСТОВОГО УЗЛА (nodeValue/data)

// Свойство data (или nodeValue) позволяет получить содержимое текст. узла или комментария

// <body>Привет <!-- Комментарий --></body>
let text = document.body.firstChild.data;       // Привет
let comment = text.nextSibling.data;            // Комментарий


/// elem.textContent    - просто текст (без тегов)
// в отличие от innerHTML втавляет КАК ЕСТЬ (даже теги могут отображ-ся в тексте)

// <h1>Срочно в номер!</h1><p>Марсиане атаковали человечество!</p>
alert(news.textContent);        // Срочно в номер! Марсиане атаковали человечество!



/// АТРИБУТЫ И СВОЙСТВА

/// Свойство hidden (работает как style="display:none")
// <div id="elem">Мигающий элемент</div>
setInterval( () => elem.hidden = !elem.hidden, 1000 );


/// Другие св-ва DOM-элементов:
// value - значения для <input>,<select>,<textarea> (HTMLInputElement, HTMLSelectElement, ...)
// href  - адрес ссылки "href" для <a href="..."> (HTMLAnchorElement)
// id    - значение атрибута id (HTMLElement)
// ...
// <input type="text" id="elem" value="значение">
alert(elem.type);     // "text"
alert(elem.id);       // "elem"
alert(elem.value);    // значение

// можно создавать свои св-ва:
document.body.myData = {                    
  name: 'Caesar',
  title: 'Imperator'
};
// можно добавлять свои методы:
document.body.sayTagName = function() {
  alert(this.tagName);
};
// Для нестандартных атрибутов DOM-свойства не создаются при парсинге, но они доступны
// Методы для доступа ко всем свойствам:
//      elem.hasAttribute(name)     - провер. наличие атрибута
//      elem.getAttribute(name)     - получает значение атрибута
//      elem.setAttribute(name)     - устан. значение атрибута
//      elem.removeAttrbute(name)   - удаляет атрибут
//      elem.attributes       - получ. все атрибуты (итерир.коллекц. Attr со св-ми name, value)

// <body something="non-standard">
alert(document.body.getAttribute('something'));     // non-standard

/* Все атрибуты, начинающиеся с префикса «data-», зарезервированы для использования 
программистами. Они доступны в свойстве dataset.*/
// <body data-about="Elephants"></body>
alert(document.body.dataset.about);     // Elephants
// data-order-state  ->  dataset.orderState.



/// ИЗМЕНЕНИЕ ДОКУМЕНТА

// document.createElement(tag)      - создать нов. эл-т
// document.createTextNode(text)    - создать новый текстовый узел

// document.body.append(div)    - вставить div в конец body
// elem.prepend(...)            - встав. в начало узла elem
// elem.before(...)             - встав. перед узлом elem
// elem.after(...)              - встав. после узла elem
// elem.replaceWith(...)        - заменяет узел elem
// elem.remove()                - удаляет

// elem.insertAdjacentHTML(where, html) - вставл. узлы как HTML
//      where: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// <div id="div"></div>
div.insertAdjacentHTML('beforebegin', '<p>Привет</p>');
div.insertAdjacentHTML('afterend', '<p>Пока</p>');
/* Получим: 
<p>Привет</p>
    <div id="div"></div>
<p>Пока</p> 
*/

// elem.insertAdjacentText(where, text)     – text вставляется «как текст», вместо HTML,
// elem.insertAdjacentElement(where, elem)  – вставляет элемент elem.

// elem.cloneNode(true)     - "глубокий" клон со всеми атрибутами и дочерн. элем-ми
// elem.cloneNode(false)    - клон без дочерн. элем-ов


// DocumentFragment
//      - спец. DOM-узел, кот-й служит обёрткой для передачи списка узлов
{/* <ul id="ul"></ul> */}
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }
  return fragment;
}
ul.append(getListContent()); 
// будет:
/*
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
*/
// Альтернатива:
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }
  return result;
}
ul.append(...getListContent()); // append + оператор "..." = друзья!


// elem.className       - соответ-т атрибуту 'class'
// elem.classList       - объект с методами add/remove/toggle/contains
// elem.classList.add/remove("class")   – добавить/удалить класс.
// elem.classList.toggle("class")       – добавить класс, если его нет, иначе удалить.
// elem.classList.contains("class")     – проверка наличия класса, возвращает true/false.
document.body.classList.add('article');

for (let name of document.body.classList) {         // итерируемый
    alert(name);
}

// Вычисленные стили getComputedStyle(element, [pseudo])
let computedStyle = getComputedStyle(document.body);
alert( computedStyle.marginTop );   // margin-top
alert( computedStyle.color );       // rgb(255, 0, 0)


// Свойство объекта HTMLElement "style" (стили CSS):
let left = message.style.left;
// можно задавать текст CSS-кода
message.style.cssText = "position:fixed; color: red";



/// УСТАРЕВШИЕ МЕТОДЫ ИЗМЕНЕНИЯ ДОКУМЕНТА
parentElem.appendChild(node);                // Добавл. node в конец дочерн. элем-ов parentElem
parentElem.insertBefore(node, nextSibling);  // Встав. node перед nextSibling в parentElem
parentElem.replaceChild(node, oldChild); //Замен. oldChild на node среди дочерних элементов parentElem
parentElem.removeChild(node);               //Удаляет node из parentElem

// document.write
//      - добавить HTML на страницу до завершения её загрузки.
// Вызов document.write работает только во время загрузки страницы.
/*если нам нужно динамически добавить много текста в HTML, 
и мы находимся на стадии загрузки, и для нас очень важна скорость, это может помочь*/



/// РАЗМЕРЫ И ПРОКРУТКА ЭЛЕМЕНТОВ

// elem.offsetParent        - ближайший предок, удовлет-ющий условиям:
//      1) CSS-позиционирован (position: absolute, relative, fixed или sticky)
//      2) или <td>, <th>, <table>
//      3) или <body>

// elem.offsetLeft / offsetTop    - координаты x/y относит. верхн. лево. угла offsetParent

// offsetWidth / offsetHeight   - внешняя ширина/высота элемента
// clientLeft / clientTop       - ширина левой/верхней рамки
// clientWidth / clientHeight   - ширина обл-ти содерж-го вместе с внутр.отступ. padding
// scrollWidth / scrollHeight   - как clientWidth/clientHeight плюс прокрученную 
//      (которую не видно) часть элемента.
// scrollLeft / scrollTop       - ширина/высота невидимой(прокрученной) части

// Не стоит брать width/height из CSS



/// РАЗМЕРЫ И ПРОКРУТКА ОКНА

// Чтобы получить ширину/высоту окна
let height = documentElement.clientHeight;

// window.innerWidth / innerHeight включают в себя еще и полосу прокрутки.

// Чтобы надёжно получить полную высоту документа, 
//      нам следует взять максимальное из этих свойств:
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
alert('Полная высота документа с прокручиваемой частью: ' + scrollHeight);

// текущую прокрутку можно прочитать из свойств window.pageXOffset/pageYOffset:
alert('Текущая прокрутка сверху: ' + window.pageYOffset);
alert('Текущая прокрутка слева: ' + window.pageXOffset);

// scrollBy(x,y)            - прокручивает страницу относительно её текущего положения
// scrollTo(pageX,pageY)    - прокручивает страницу на абсолютные координаты (pageX,pageY)
// elem.scrollIntoView(top) - прокруч. так, чтобы elem оказ-ся 
//      в верху (top=true) или внизу (top=false)

// запретить прокрутку страницы:
document.body.style.overflow = "hidden";


/// КООРДИНАТЫ
// Большинство методов JavaScript работают в одной из двух систем координат:
// 1. Относительно окна браузера – как position:fixed (будем обозначать их clientX/clientY)
// 2. Относительно документа – как position:absolute (будем обозначать их pageX/pageY)
/*
Две системы координат связаны следующими формулами:
    pageY = clientY + высота вертикально прокрученной части документа.
    pageX = clientX + ширина горизонтально прокрученной части документа.*/

// Координаты относительно окна:
// elem.getBoundingClientRect() 
//      - возвращает размер элемента и его позицию относительно viewport (окна браузера).
//      Возвращает объект DOMRect, который является объединением прямоугольников.

// Некоторые св-ва объекта DOMRect:
//      x/y             - коорд-ы начала прямоуг-ка относит-но окна
//      width/height    - ширина/высота прямоугольника (могут быть отрицательными).
//      top/bottom      - Y-координата верхней/нижней границы прямоугольника,
//      left/right      - left/right – X-координата левой/правой границы прямоугольника.

// document.elementFromPoint(x, y) 
//      возвращает самый глубоко вложенный элемент в окне, находящийся по координатам (x, y).

// Выводит имя тега элемента, который сейчас в центре окна браузера:
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;
let elem = document.elementFromPoint(centerX, centerY);
alert(elem.tagName);


let elem = document.getElementById("coords-show-mark");
function createMessageUnder(elem, html) {
  // создаём элемент, который будет содержать сообщение
  let message = document.createElement('div');
  // для стилей лучше было бы использовать css-класс здесь
  message.style.cssText = "position:fixed; color: red";

  // устанавливаем координаты элементу, не забываем про "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}


// Использование:
// добавим сообщение на страницу на 5 секунд
let message = createMessageUnder(elem, 'Hello, world!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);


// получаем координаты элемента в контексте документа
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
}

function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "position:absolute; color: red";

  let coords = getCoords(elem);

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}



/// КОНСОЛЬ

// Полезные данные в консоли:
// Консоль -> Elements -> Properties

// console.dir(elem) выводит элемент в виде DOM-объекта, что удобно для анализа его свойств.
// в списке св-в можно выбрать, например, style и в нем backgroundColor ...
block.style.backgroundColor = 'rgba(20, 203, 150)';