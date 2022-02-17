
// document.forms   - спец. коллекция
let myForm =    document.forms.my;      // форма с именем "my" (name="my")
let firstForm = document.forms[0];      // первая форма в документе

// Любой элемент доступен в именованной коллекции form.elements:
let elem = myForm.elements.one;     // <input name="one">
let val = elem.value;               // 1: <input name="one" value="1">

// В случае с кнопками-переключателями radio form.elements[name] является коллекцией:
{/* <form>
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form> */}
let ageElems = document.forms[0].elements.age;       // [object HTMLInputElement]



/// Сокращённая форма записи: form.name

form.elements.login == form.login;      // true
// В этом случае, если изменить имя элемента, то он всё ещё будет доступен под старым именем
form.login.name = "username";           // изменяем свойство name у элемента input
// form.elements обновили свои имена:
alert(form.elements.login);             // undefined
alert(form.elements.username);          // input
// а в form мы можем использовать оба имени: новое и старое
alert(form.username == form.login);     // true



/// Обратная ссылка: element.form

// Для любого элемента форма доступна через element.form:
let inputLogin = form.login;      // HTMLInputElement
let form = inputLogin.form;       // HTMLFormElement



/// Элементы формы

input.value     = "Новое значение";
textarea.value  = "Новый текст";
input.checked   = true;             // для чекбоксов и переключателей

// Используйте textarea.value вместо textarea.innerHTML

// Элемент <select> имеет 3 важных свойства:
// select.options       – коллекция из подэлементов <option>
// select.value         – значение выбранного в данный момент <option>
// select.selectedIndex – номер выбранного <option>

{/* <select id="select">
  <option value="apple">Яблоко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select> */}
// все три строки делают одно и то же (выбран "Банан")
select.options[2].selected = true;      // Работает, если есть атрибут multiple
select.selectedIndex = 2;               // Не работает с multiple
select.value = 'banana';                // Не работает с multiple

// Атрибуты: autocomplete, disabled, form, multiple, name, required, size и др.

// Создание option:
option = new Option(text, value, defaultSelected, selected);
// Параметры:
//  text             – текст внутри <option>,
//  value            – значение,
//  defaultSelected  – если true, то ставится HTML-атрибут selected,
//  selected         – если true, то элемент <option> будет выбранным.
/* defaultSelected задаёт HTML-атрибут, его можно получить как option.getAttribute('selected'), 
а selected – выбрано значение или нет, именно его важно поставить правильно. 
Обычно ставят оба этих значения в true или не ставят вовсе (т.е. false)
*/
let option = new Option("Текст", "value");
// создаст <option value="value">Текст</option>

// Элементы <option> имеют свойства:
// option.selected      - Выбрана ли опция.
// option.index         - Номер опции среди других в списке <select>.
// option.value         - Значение опции.
// option.text          - Содержимое опции (то, что видит посетитель).



/// Фокусировка: focus/blur

// Событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус.
// Они не всплывают. Но можно использовать фазу перехвата или focusin/focusout.
// События focusin и focusout – такие же, как и focus/blur, но они всплывают
// эти события должны использоваться с elem.addEventListener, но не с on<event>

// Методы elem.focus() и elem.blur() устанавливают/снимают фокус

// Мы не можем «отменить потерю фокуса», вызвав event.preventDefault() в обработчике 
//      onblur потому, что onblur срабатывает после потери фокуса элементом

// Большинство элементов не поддерживают фокусировку по умолчанию. 
// Используйте tabindex, чтобы сделать фокусируемым любой элемент.
// Значение этого атрибута – порядковый номер элемента, когда клавиша Tab 
// (или что-то аналогичное) используется для переключения между элементами.
/*
<ul>
  <li tabindex="1">Один</li>
  <li tabindex="0">Ноль</li>
  <li tabindex="2">Два</li>
  <li tabindex="-1">Минус один</li>
</ul>
*/



/// События: change, input, cut, copy, paste
// ...



/// Отправка формы: событие и метод submit

/*
Два основных способа отправить форму:
1. Первый – нажать кнопку <input type="submit"> или <input type="image">.
2. Второй – нажать Enter, находясь на каком-нибудь поле.
Оба действия сгенерируют событие submit на форме. Обработчик может проверить данные, 
и если есть ошибки, показать их и вызвать event.preventDefault(), 
тогда форма не будет отправлена на сервер.

При отправке формы по нажатию Enter в текстовом поле, генерируется событие click 
на кнопке <input type="submit">.

Метод form.submit()  - при вызове событие submit не генерируется
*/
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// перед отправкой формы, её нужно вставить в документ
document.body.append(form);

form.submit();