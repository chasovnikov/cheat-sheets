
/**
 * Есть бесконечный цикл, в котором движок JavaScript ожидает и исполняет задачи.
 * Если задача поступает, но движок занят чем-то другим, тогда она ставится в очередь.
 * Такую очередь называют «очередью макрозадач» (macrotask queue, термин v8).
 * Задачи из очереди исполняются по правилу «первым пришёл – первым ушёл».
 * 
 * Микрозадачи приходят только из кода. Обычно они создаются промисами 
 *      или через queueMicrotask(f).
 * Сразу после каждой макрозадачи движок исполняет все задачи из очереди микрозадач 
 *      перед тем, как выполнить следующую макрозадачу.
 * 
 * Для длительных тяжёлых вычислений, которые не должны блокировать событийный цикл, 
 *      мы можем использовать Web Workers (исполнение кода в параллельном потоке).
 * Web Workers не имеют доступа к DOM.
 */

// Пример 1: разбиение «тяжёлой» задачи с помощью setTimeout
let i = 0;
let start = Date.now();

function count() {
  // перенесём планирование очередного вызова в начало
  if (i < 1e9 - 1e6) {
    setTimeout(count); // запланировать новый вызов
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }
}
count();


// Пример 2: индикация прогресса
{/* <div id="progress"></div> */}
  let i = 0;

  function count() {
    // сделать часть крупной задачи (*)
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }
  }
  count();


/// ВСПЛЫТИЕ / ПОГРУЖЕНИЕ
/*Стандарт DOM Events описывает 3 фазы прохода события:

Фаза погружения (capturing phase)   – событие сначала идёт сверху вниз.
Фаза цели       (target phase)      – событие достигло целевого(исходного) элемента.
Фаза всплытия   (bubbling stage)    – событие начинает всплывать.
*/ 
// Чтобы поймать событие на стадии погружения, нужно использовать третий аргумент capture вот так:
elem.addEventListener(/*...,*/ {capture: true})
// или просто "true", как сокращение для {capture: true}
elem.addEventListener(/*...,*/ true)

// Чтобы убрать обработчик removeEventListener, нужна та же фаза

// На каждой фазе разные обработчики на одном элементе срабатывают в порядке назначения


/// Делегирование    - пример: вместо того, чтобы назначать обработчик onclick для каждой ячейки 
//      <td> – мы повесим «единый» обработчик на элемент <table>.
/*Алгоритм:
Вешаем обработчик на контейнер.
В обработчике проверяем исходный элемент event.target.
Если событие произошло внутри нужного нам элемента, то обрабатываем его.

Ограничения делегирования:
Во-первых, событие должно всплывать. Некоторые события этого не делают. 
Также, низкоуровневые обработчики не должны вызывать event.stopPropagation().
Во-вторых, делегирование создаёт дополнительную нагрузку на браузер, 
ведь обработчик запускается, когда событие происходит в любом месте контейнера, 
не обязательно на элементах, которые нам интересны. Но обычно эта нагрузка 
настолько пустяковая, что её даже не стоит принимать во внимание.*/

// Пример:
// По клику на кнопкt с class="remove-button" удаляется елемент с class="pane"
container.onclick = function(event) {
      if (event.target.className != 'remove-button') return;

      let pane = event.target.closest('.pane');
      pane.remove();
};