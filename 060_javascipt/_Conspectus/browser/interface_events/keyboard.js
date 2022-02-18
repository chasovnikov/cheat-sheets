
/// События клавиатуры

// keydown  - нажатие клваиши
// keyup    - отпускание

// event.key    - символ (может давать разные символы (из-за использования разных языков))
// event.code   - физический код клавиши (разные при разном расположении клавиш)

/*  Пример:
Клавиша         event.key           event.code
Z	        z (нижний регистр)	    KeyZ
Shift+Z	    Z (Верхний регистр)	    KeyZ


Проверка по event.code
*/
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Отменить!')
  }
});

// Автоповтор
// При долгом нажатии клавиши возникает автоповтор: keydown срабатывает снова и снова


// <input> ниже ожидает телефонный номер (числа, +, (), - ):
{/* <script> */}
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
{/* </script> */}
{/* <input onkeydown="return checkPhoneKey(event.key)" placeholder="Введите телефон" type="tel">

Всё равно можем ввести в <input> что угодно с помощью правого клика мыши и пункта 
    «Вставить» контекстного меню
*/}