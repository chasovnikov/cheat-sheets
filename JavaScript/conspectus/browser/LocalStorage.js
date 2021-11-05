
/**
 * Объекты веб-хранилища window.localStorage и window.sessionStorage позволяют хранить 
 *      пары ключ/значение в браузере.
 * Лимит 2 Мб+, зависит от браузера.
 * 
 * window.localStorage      - данные не имеют ограничений по времени хранения.
 * window.sessionStorage    - хранит данные в течение сеанса (до закрытия браузера).
 * 
 * В отличие от куки, объекты веб-хранилища не отправляются на сервер при каждом запросе.
 * Сервер не может манипулировать объектами хранилища через HTTP-заголовки. 
 * Хранилище привязано к источнику (домен/протокол/порт).
 * Ключ и значение должны быть строками. Можно использовать JSON.
 */

// localStorage и sessionStorage предоставляют одинаковые методы и свойства:
/*
setItem(key, value) – сохранить пару ключ/значение.
getItem(key)        – получить данные по ключу key.
removeItem(key)     – удалить данные с ключом key.
clear()             – удалить всё.
key(index)          – получить ключ на заданной позиции.
length              – количество элементов в хранилище.
*/


// Перебор ключей
// for
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}

// for..in
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue;   // пропустит такие ключи, как "setItem", "getItem" и так далее
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}

// for..of
let keys = Object.keys(localStorage);   // игнорирование наследуемых ключей
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}


// При изменении данных в localStorage или sessionStorage срабатывает событие storage. 
// Но это событие не происходит при записи без setItem, как свойства объекта.
localStorage.test = 2;              // плохо
localStorage.setItem('test') = 2;   // хорошо

// Свойства события storage:
/*
key         – ключ, который обновился (null, если вызван .clear()).
oldValue    – старое значение (null, если ключ добавлен впервые).
newValue    – новое значение (null, если ключ был удалён).
url         – url документа, где произошло обновление.
storageArea – объект localStorage или sessionStorage, где произошло обновление.

Событие срабатывает на всех остальных объектах window, где доступно хранилище, 
    кроме того окна, которое его вызвало.
Это позволяет разным окнам одного источника обмениваться сообщениями.
Современные браузеры также поддерживают Broadcast channel API специальный API 
    для связи между окнами одного источника
*/
// срабатывает при обновлениях, сделанных в том же хранилище из других документов
window.onstorage = event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
