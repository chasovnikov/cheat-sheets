
/// ОПРЕДЕЛЕНИЯ:
// Тип события - строка с видом происшедшего события ("mousemove", "load", ...)
// Цель события - объект, в кот. возникло событ. или с кот. оно ассоциировано 
//      (Window, Document, Element, ...)
// Обработчик (прослушиватель) - ф-ия, реагирующая на событие
// Объект события - объект, ассциированный с событием и содерж. детали об этом событии
//      имеют св-ва:
//      type    - тип события
//      target  - цель события
// Распространение событий - процесс, определяющий объекты для запуска обработчиков соб-й
//      Для событий, относ-ся к одиноч. объекту ("load" - Window, "message" - Worker)


/// КАТЕГОРИИ СОБЫТИЙ
// Зависимые от устройства события ввода: 
//      "mousedown"     - нажатие мыши (без отпускания)
//      "mouseup"       - отпускание мыши
//      "mousemove"     - движение мыши
//      "mouseover"     - при наведении мыши на элемент
//      "mouseout"      - уводим мышь от элемента
//      "contextmenu"   – кликнули на элемент правой кнопкой мыши.
//      "touchstart"
//      "touchmove"
//      "touched"
//      "keydown"       - клавиатурный ввод
//      "keyup"
//      ...
// Независимые от устр-ва соб. ввода:
//      "click"         - была активизирована ссылка
//      "input"         - независ. от устр-ва альтернатива соб-ю "keydown"
//      "pointerdown"   - незав. то устр. альтер-ва соб-ю "mousedown"
//      "pointermove"   - незав. то устр. альтер-ва соб-ю "mousemove"
//      "pointerup"
//       ...
// События польз-го интерфейса:
//      "focus"
//      "change"
//      "submit"
//      ...
// События изменения состояния:
//      "load"
//      "DOMContentLoaded"
//      "online"            - изменение подклаемости к сети
//      "offline"           - изменение подклаемости к сети
//      "popstate"          - ответ на щелчок кнопки перехода на предыдущ. страницу
//      ...
// События, специфичные для API-интерфейса:
//      Для настройки мультимедийного содержимого:
//      "waiting"
//      "playing"
//      "seeking"
//      "volumechange"

//      API-интерфейс IndexedDB (запросы к базе данных):
//      "success"
//      "error"


/// РЕГИСТРАЦИЯ ОБРАБОТЧИКОВ СОБЫТИЙ
// Два способа:
// 1. Установка св-ва объекта или элемента док-а, кот. является целью события
// Переписывает ранее написанные обработчики
//      Имена этих св-в состоят из "on" плюс имя события в нижн. регистре ("onclick")
window.onload = function() {
    let form = document.querySelector("form#shipping");
    form.onsubmit = function(event) {
        if (!isFormValid(this)) {
            event.preventDefault();
        }
    };
};

// Отмена обработки события более 3-х срабатываний
window.onload = function() {
    let block = document.querySelector(".block");

    block.onclick = function() {
        if (counter == 3) {
            this.onclick = null;
            return;
        }
        counter++;
    }
};


// Св-ва для обраб-ов соб-й можно определять в HTML-дескрипторах (атрибутов тегов) (не реком.)
// Значение атрибута - тело ф-и обработчика событий кода JavaScript.
// <button onclick="console.log(`Thank you`);">Please Click</button>
// браузер преобраз. в:
let fn = function(event) {
    with(document) {        // with - св-ва document будут переменными в своей обл.видим-и
        with(this.form || {}) {
            with(this) {
                // ...
            }
        }
    }
}
// код JavaScript в атрибутах HTML-дескрипторов никогда не бывает строгим

// <input type="button" id="button" onclick="sayThanks()">
// разметка генерирует такое свойство:
button.onclick = function() {
  sayThanks();      // содержимое атрибута оборчивается в аноним. ф-ию
};

// Назначение обработчика строкой elem.onclick = "alert(1)" также сработает. 
// Это сделано из соображений совместимости, но делать так не рекомендуется.

// Не используйте setAttribute для обработчиков.

// Убрать обработчик можно назначением elem.onclick = null.

// Фундаментальный недостаток описанных выше способов назначения обработчика 
// – невозможность повесить несколько обработчиков на одно событие.


// 2. Передача обработчика методу addEventListener() объекта или элемента
// Рекомендуемый способ
// Позвол. зарегистр. РАЗНЫЕ Ф-ИИ для одного типа соб. (в отличие от ".on<событие>")

/**
 * target.addEventListener(type, listener[, options]);
 *      type - тип события,
 *      listener - ф-ия-обработчик, вызываемая при возникновении события
 *      options
 */
let button = document.querySelector("#mybutton");    // поиск эл-та по id="mybutton"

button.addEventListener('click', clickHandler, {
    capture: true,      // зарег-ть обраб-к как захватывающий
    once: true,         // однократный запуск (автомат. удаление слушателя соб.)
    passive: true,      // не будет вызывать метод preventDefault() для отмены станд.дейст.
});

const clickHandler = (event) => console.log("Thanks again!", event);


/**     Удаление обработчика события
 * target.removeEventListener(type, listener[, options]);
 *      type       - тип события
 *      listener   - ф-ия-обработчик (требует ИМЕННО ТУ ЖЕ ФУНКЦИЮ)
 *      options
 */
button.removeEventListener('click', onClick)

/// ОБРАБОТЧИКИ СОБЫТИЙ

// единственный аргумент - объект Event
// Свойства Event (неполный список):
document.querySelector("body > div").onclick = function(event) {
    alert(
        event.type          + ' - тип события \n' +
        event.target        + ' - ссылка на целевой объект, на котором произошло событие. \n' +
        event.currentTarget + ' - объект, которому планируется отправка события \n' +
        event.timeStamp     + ' - отметка времени события \n' +
        event.isTrusted     + ' - true: инициировано браузером, false: из скрипта \n' +
        event.clientX       + ' - координата окна, где произошло событие (для указ-ля) \n' +
        event.clientY       + ' - координата окна, где произошло событие (для указ-ля) \n' +
        event.bubbles       + ' -  всплыло ли событие вверх по DOM или нет \n' + 
        ' и другие (смотри сайт MDN)'
        );
    alert("Координаты: " + event.clientX + ":" + event.clientY);
};

// this внтури тела обр-ка ссыл-ся на объект/элемент, для кот-го обр-к был зарегисрт-н
// но для стрелочных ф-й this имеет то же знач, что и обл. видим. в кот. они определены
/*
В коде ниже button выводит своё содержимое, используя this.innerHTML:
<button onclick="alert(this.innerHTML)">Нажми меня</button>*/

// обраб-ки соб. ничего не должны возращать (современное поведение)

// Обработчики некоторых событий можно назначать только через addEventListener
// Например: DOMContentLoaded

// Обработчиком можно назначить объект или класс с обязательным методом handleEvent:
class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Кнопка мыши нажата";
    }

    onMouseup() {
      elem.innerHTML += "...и отжата.";
    }
}
let menu = new Menu();
elem.addEventListener('mousedown', menu);
elem.addEventListener('mouseup', menu);


/// РАСПРОСТРАНЕНИЕ СОБЫТИЙ
// Захватывание событий обратен процессу пузырькового подъема (сверху винз по дереву DOM)
// ...
// Почти все события всплывают. Например, событие focus не всплывает.

/// ОТМЕНА СОБЫТИЙ
// preventDefault() - запрет браузеру реагировать стандартно на пользовательские события
// stopPropagation() - отменить распространение событий
// stopImmediatePropagation() - stopPropagetion() плюс отмена последующ. обр-ков того же объекта


/// ОТПРАВКА СПЕЦИАЛЬНЫХ СОБЫТИЙ
// Своё событие:
// уведомление о том, что мы заняты
document.dispatchEvent(new CustomEvent(
    'busy',                 // тип события
    { 
        detail: true,
        // bubbles: true        // поднятие подобно пузырьку
    }        // 
));

fetch(url)
    .then(handleNetworkResponse)
    .catch(handleNetworkResponse)
    .finally(() => {
        // уведомл-е о том, что мы больше не заняты
        document.dispatchEvent(new CustomEvent('busy', { detail: false }));
    });

// регистр-я соб-я
document.addEventListener('busy', (e) => {
    if (e.detail) {
        showSpinner();
    } else {
        hideSpinner();
    }
});


/// КОНСОЛЬ
// Узнать какие обработчики навешаны на события можно по пути:
// Консоль -> Element -> Event Listeners



/// ДЕЙСТВИЯ БРАУЗЕРА ПО УМОЛЧАНИЮ
/*два способа отменить действие браузера:
1. метод event.preventDefault().
2. Если же обработчик назначен через on<событие> (не через addEventListener), 
то также можно вернуть false из обработчика.*/ 

// Необязательная опция passive: true для addEventListener сигнализирует браузеру, 
//      что обработчик не собирается выполнять preventDefault().

// event.defaultPrevented - Возвращает boolean-значение, информирующее о том, 
//      был ли вызван event.preventDefault() в текущем обработчике события.



/// ПОЛЬЗОВАТЕЛЬСКИЕ СОБЫТИЯ

// Создание своего события:
  
{/* <h1 id="elem">Привет из кода!</h1> */}
// Для своих событий использ-ся addEventListener, т.к. on<event> - не сработает
document.addEventListener("hello", function(event) {
    alert("Привет от " + event.target.tagName);     // Привет от H1
});

let myEvent = new Event(
    "hello",                    // тип события (любая строка)
    {
        bubbles:    true,       // событие всплывает
        cancelable: true,       // можно отменить действие по умолчанию
        composed:   false,      // событие не будет всплывать наружу за пределы Shadow DOM
        // По умолчанию все три свойства установлены в false
    }
);
elem.dispatchEvent(myEvent);   // запуск события на элементе elem

// Проверка: настоящее (true) событие или сгенерированное (false)
let checkEvent = myEvent.isTrusted;      // false

// Для конкретных типов событий есть свои конструкторы (имеют свои спец. св-ва)
UIEvent
FocusEvent
MouseEvent      // Св-ва: clientX/clientY и др.
WheelEvent
KeyboardEvent
CustomEvent     // для генер-ии соб-й совершенно новых типов

// Вложенные события обрабатываются синхронно
{/* <button id="menu">Меню (нажми меня)</button> */}
  menu.onclick = function() {
    alert(1);

    // alert("вложенное событие")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('вложенное событие'))
// Порядок вывода: 1 → вложенное событие → 2.

// Чтобы запуст. асинхронно поместить dispatchEvent в конец обраб-ка
//      или использ. setTimeout с нулевой задержкой:
menu.onclick = function() {
    alert(1);

    // alert(2)
    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

document.addEventListener('menu-open', () => alert('вложенное событие'))
// Новый порядок вывода: 1 → 2 → вложенное событие.