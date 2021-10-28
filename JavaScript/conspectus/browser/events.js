
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
//      Имена этих св-в состоят из "on" плюс имя события ("onclick")
window.onload = function() {
    let form = document.querySelector("form#shipping");
    form.onsubmit = function(event) {
        if (!isFormValid(this)) {
            event.preventDefault();
        }
    };
};
// Св-ва для обраб-ов соб-й можно определять в HTML-дескрипторах.
// 2. Передача обработчика методу addEventListener() объекта или элемента
// Рекомендуемый способ