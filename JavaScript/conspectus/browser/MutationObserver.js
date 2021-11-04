
/**
 * Встроенный объект MutationObserver 
 *      запускает колбэк при изменении DOM-элементов.
 */
let observer = new MutationObserver(callback);
observer.observe(node, config);         // прикрепляем к DOM-узлу
/* config – это объект с булевыми параметрами «на какие изменения реагировать»:
childList       – изменения в непосредственных детях node,
subtree         – во всех потомках node,
attributes      – в атрибутах node,
attributeFilter – массив имён атрибутов, чтобы наблюдать только за выбранными.
characterData   – наблюдать ли за node.data (текстовое содержимое)
characterDataOldValue   – если true, - передавать и старое и новое значение node.data
attributeOldValue       – если true, - передавать и старое и новое значение атрибута

После изменений выполняется callback, в который изменения передаются первым аргументом 
    как список объектов MutationRecord, а сам наблюдатель идёт вторым аргументом.

Свойства MutationRecord:
    type    – тип изменения, один из:
        "attributes"    - изменён атрибут,
        "characterData" - изменены данные elem.data, это для текстовых узлов
        "childList"     - добавлены/удалены дочерние элементы,
    target      – где произошло изменение
    addedNodes/removedNodes     – добавленные/удалённые узлы,
    previousSibling/nextSibling – предыд/след. одноуровн. элемент для добавл./удал. элем-ов
    attributeName/attributeNamespace – имя/пространство имён (для XML) изменённого атрибута
    oldValue    – предыдущее значение, только для изменений атрибута или текста

observer.disconnect() – останавливает наблюдение.
mutationRecords = observer.takeRecords() – получает список необработанных записей 
    изменений, которые произошли, но колбэк для них ещё не выполнился.
*/ 

{/* <div contentEditable id="elem">Отредактируй <b>меня</b>, пожалуйста</div> */}
let observer = new MutationObserver( mutationRecords => {
  console.log(mutationRecords);
});

// наблюдать за всем, кроме атрибутов
observer.observe(elem, {
  childList: true,              // наблюдать за непосредственными детьми
  subtree: true,                // и более глубокими потомками
  characterDataOldValue: true   // передавать старое значение в колбэк
});

// если мы изменим текст внутри <b>меня</b>
mutationRecords = [{
  type: "characterData",
  oldValue: "меня",
//   target: <text node>,
  // другие свойства пусты
}];


// Пример динамической подсветки синтаксиса
let observer = new MutationObserver( mutations => {

  for(let mutation of mutations) {
    // проверим новые узлы, есть ли что-то, что надо подсветить?

    for(let node of mutation.addedNodes) {
      // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
      if (!(node instanceof HTMLElement)) continue;

      // проверить, не является ли вставленный элемент примером кода
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // или, может быть, пример кода есть в его поддереве?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});