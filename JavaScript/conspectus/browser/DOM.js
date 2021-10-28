
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

