
/// СОБЫТИЯ МЫШИ

/*
1. Простые:
mousedown/mouseup   - Кнопка мыши нажата/отпущена над элементом.
mouseover/mouseout  - Курсор мыши появляется над элементом и уходит с него.
mousemove           - Каждое движение мыши над элементом генерирует это событие.
contextmenu         - Попытка открытия контекстного меню

2. Комплексные:
click       - Левой кнопкой мыши: mousedown + mouseup над одним и тем же элементом
dblclick    - Вызывается двойным кликом на элементе.

Порядок событий:    mousedown → mouseup → click


    Информация о кнопке:
event.which == 1    – левая кнопка
event.which == 2    – средняя кнопка
event.which == 3    – правая кнопка 


    Модификаторы: shift, alt, ctrl и meta
true, если во время события была нажата соответствующая клавиша
shiftKey:   Shift
altKey:     Alt (или Opt для Mac)
ctrlKey:    Ctrl
metaKey:    Cmd для Mac
*/
// <button id="button">Нажми Alt+Shift+Click на мне!</button>
button.onclick = function(event) {              // Click
    if (event.altKey && event.shiftKey) {       // Alt + Shift
      alert('Ура!');
    }
};
/*
Обычно на Mac используется клавиша Cmd вместо Ctrl.
Левый клик в сочетании с Ctrl интерпретируется как правый клик на MacOS 
    и генерирует событие contextmenu, а не click как на Windows/Linux.


    События мыши имеют координаты двух видов:
1. Относительно окна:       clientX и clientY.
2. Относительно документа:  pageX и pageY.
*/

// Отключаем выделение:
document.body.onmousedown = function(event) {
    return false;
}

// Предотвращение копирования:
document.body.oncopy = function(event) {
    return false;
}


// События mouseover/mouseout

/*  Для события mouseover:
event.target        – элемент, на который курсор перешёл (для события mouseout наоборот)
event.relatedTarget – элемент, с которого курсор ушёл (для события mouseout наоборот).

relatedTarget === null (указатель мыши пришёл/ушёл из/в неоткуда/некуда)

Если двигать мышкой очень быстро, то некоторые DOM-элементы могут быть пропущены

mouseout генерируется в том числе, когда указатель переходит с элемента на его ПОТОМКА.
По логике браузера, курсор мыши может быть только над одним элементом в любой 
момент времени – над самым глубоко вложенным и верхним по z-index.
*/


// События mouseenter/mouseleave
/*
События mouseenter/mouseleave похожи на mouseover/mouseout. Но есть пара отличий:
1. Переходы внутри элемента, на его потомки и с них, не считаются.
2. События mouseenter/mouseleave не всплывают.
*/


// Делегирование событий
// Нельзя делегировать события, которые не всплывают.
// Будем использовать mouseover/mouseout.

// выделим элемент под мышью (при заходе сежду ячеек тоже будет подсвечиваться)
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};
table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};


// Убрать подсветку при заходе между ячеек (остальное оставить)
// ячейка <td> под курсором в данный момент (если есть)
let currentElem = null;
table.onmouseover = function(event) {
  // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
  // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
  // это переход внутри - игнорируем такое событие
  if (currentElem) return;

  let target = event.target.closest('td');

  // переход не на <td> - игнорировать
  if (!target) return;

  // переход на <td>, но вне нашей таблицы (возможно при вложенных таблицах)
  // игнорировать
  if (!table.contains(target)) return;

  // ура, мы зашли на новый <td>
  currentElem = target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  // если мы вне <td>, то игнорируем уход мыши
  // это какой-то переход внутри таблицы, но вне <td>,
  // например с <tr> на другой <tr>
  if (!currentElem) return;

  // мы покидаем элемент – но куда? Возможно, на потомка?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
    // если да, то это переход внутри элемента – игнорируем
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // мы действительно покинули элемент
  currentElem.style.background = '';
  currentElem = null;
};