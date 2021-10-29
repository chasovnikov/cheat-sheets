
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
//      "mousedown"
//      "mousemove"
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

// 2. Передача обработчика методу addEventListener() объекта или элемента
// Рекомендуемый способ
/**
 * target.addEventListener(type, listener[, options]);
 *      type - тип события,
 *      listener - ф-ия-обработчик, вызываемая при возникновении события
 *      options
 */
let b = document.querySelector("#mybutton");    // поиск эл-та по id="mybutton"
b.addEventListener('click', () => { 
    console.log("Thankc again!"); 
}, {
    capture: true,      // зарег. обраб-к как захватывающий
    once: true,         // однократный запуск (автомат. удаление слушателя соб.)
    passive: true,      // не будет вызывать метод preventDefault() для отмены станд.дейст.
});
// Еще вызовы addEventListener() позвол. зарегистр. разные ф-ии для одного типа соб.

/**     Удаление обработчика события
 * target.removeEventListener(type, listener[, options]);
 *      type - тип события,
 *      listener - ф-ия-обработчик
 *      options
 */


/// ОБРАБОТЧИКИ СОБЫТИЙ
// единственный аргумент - объект Event
// Свойства Event:
//      type - тип события
//      target - объект, в котором произошло  событие
//      currentTarget - для распростр. соб-й это объект, в кот. зарег. текущ. обр-к соб-й
//      timeStamp - отметка времени события
//      isTrusted - true, если событие отправил браузер, false - событие от JS
//      clientX (для соб. мыши и указателя) - координата окна, где произошло событие
//      clientY (для соб. мыши и указателя) - координата окна, где произошло событие

// this внтури тела обр-ка ссыл-ся на объект, для кот-го обр-к был зарегисрт-н
// но для стрелочных ф-й this имеет то же знач, что и обл. видим. в кот. они определены