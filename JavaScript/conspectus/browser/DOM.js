
/**
 * В соответствии с объектной моделью документа («Document Object Model», коротко DOM), 
 *      каждый HTML|XML-тег является объектом.
 * 
 * Например, document.body – объект для тега <body>.
 */
document.body.style.background = 'red';                      // сделать фон красным
setTimeout(() => document.body.style.background = '', 3000); // вернуть назад

/**
 * По историческим причинам пробелы и перевод строки перед тегом <head> игнорируются.
 * Если мы записываем что-либо после закрывающего тега </body>, 
 *      браузер автоматически перемещает эту запись в конец body, 
 *      поскольку спецификация HTML требует, чтобы всё содержимое было внутри <body>. 
 *      Поэтому после закрывающего тега </body> не может быть никаких пробелов.
 */


/**
 * Навигация по DOM-элементам.
 * 
 * Основные ссылки, по которым можно переходить между узлами DOM:
document
document.documentElement   <html>
document.body              <body>
parentNode
previousSibling | nextSibling  
childNodes
firstChild | lastChild
 */

/**
 * document.body может быть равен null.
 * 
 * Коллекция childNodes содержит список всех детей, включая текстовые узлы.
 */
elem.childNodes[0] === elem.firstChild;
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;

// Проверка наличия дочерних узлов
elem.hasChildNodes();



/// ВЫБОР ЭЛЕМЕНТОВ ДОКУМЕНТА
// .querySelector() и .querySelectorAll() - поиск элем-ов в DOM по селекторам CSS:
// div          - любой элемент <div>
// #nav         - эл. с id="nav"
// .warning     - эл-ы с class="warning"
// p[lang="fr"] - <p lang="fr">
// *[name="x"]  - эл-ы с name="x"
// #long span   - любой потомок <span> элемента c id="long"
// #long>span   - любой дочерний <span> элемента c id="long"
// body>h1:first-child - первый дочерний <h1> эл-та <body>
// img + p.caption     - эл. <p class="caption">, идущий сразу после <img>
// h2 ~ p       - <p> после <h2> и явл-ся родственным ему
// button, input[type="button"]     // Все <button> и <input type="button">
let spinner = document.querySelector('#spinner');       // возр. первый совпад.эл-т или null
let titles = document.querySelectorAll('h1, h2, h3');   // возр. итерир. объект NodeList
// В querySelectorAll() NodeList - "пассивный" (длина и содержимое не может изменяться)

// querySelector() и querySelectorAll() реализ. для классов Document и Element:
let elem = spinner.querySelector('#elem');              // возр. только потомки эл-та

// closest() - метод в классе Element. В отличие от querySelector() ищет выше по дереву
// полезен, когда вы регистр. обр-к соб. на высок. уровне в дереве документа

// Найти ближайший объемл-й <a>, кот-й имеет href
let hyperlink = event.target.closest('a[href]');

// вернуть true, если эл-т е нах-ся внутри спискового HTML-элемента
function insideList(e) {
    return e.closest('ul,ol,dl') !== null;
}

// Метод matches()
// вернуть true, если е - заголовочный HTML-элемент
function isHeading(e) {
    return e.matches('h1,h2,h3,h4,h5,h6');
}


/// СТАРЫЕ МЕТОДЫ ВЫБОРА ЭЛЕМЕНТОВ
// Возр. "активный"(длина и содержимое может меняться) NodeList (кроме getElementById())
// подобен      document.querySelector('#sect1')
let sect1 = document.getElementById('sect1');

// подобен      document.querySelectorAll('*[name="color"]')
let colors = document.getElementsByName('color');

// подобен      document.querySelectorAll('h1')
let heading = document.getElementsByTagName('h1');

// подобен      document.querySelectorAll('.tooltip')
let tooltips = document.getElementsByClassName('tooltip');


/// ПРЕДВАРИТЕЛЬНО ВЫБРАННЫЕ ЭЛЕМЕНТЫ
// Свойства класса Document:
//      images      - все <img>
//      forms       - все  <form>
//      links       - все <a>, имеющим href
// Эти св-ва ссылаются на объекты HTMLCollection (в отлич. от NodeList мог. 
//      индекс-ся по идентиф-ру или по имени элемента)
let addr = document.forms.address;      // <form id="address">


/// СТРУКТУРА И ОБХОД ДОКУМЕНТА
// Свойства объектов Element:
//      parentNode   - ссылка на родителя элемента
//      children     - объект NodeList, содерж-й эл-ты типа Element (но не Text, Comment)
//      childElementCount   - children.length
//      firstElementChild
//      lastElementChild
//      nextElementSibling      - элементы непосредственно до
//      previousElementSibling  - элементы непосредственно после

// Оба выражения: 2-й дочерн.эл-т типа Element 1-го дочерн.эл-та объекта Document
let a = document.children[0].children[1];
let b = document.firstElementChild.firstElementChild.nextElementSibling;

// рекурс-й обход в глубину док-а с вызовом указ-й ф-и для каждого элемента
function traverse(e, f) {
    f(e);
    for(let child of e.children) {
        traverse(child, f);
    }
}
function traverse2(e, f) {
    f(e);
    let child = e.firstElementChild;

    while(child !== null) {
        traverse2(child, f);
        child = child.nextElementSibling;
    }
}
