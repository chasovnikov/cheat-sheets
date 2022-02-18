
/**
 * URL
 *      предоставляет удобный интерфейс для создания и разбора URL-адресов.
 * 
 * new URL(url, [base])
 *      url     – полный URL-адрес или только путь, если указан второй параметр,
 *      base    – необязательный «базовый» URL (будет создан относительно url).
 */
// создать новый URL на основе существующего URL-адреса:
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl);      // https://javascript.info/profile/tester


// разбор url:
let url = new URL('https://javascript.info/url');

alert(url.protocol);        // https:
alert(url.host);            // javascript.info
alert(url.pathname);        // /url

/**
 * href         https://site.com:8080/path/page?p1=v1&p2=v2#hash
 *      - это полный URL-адрес, то же самое, что url.toString()
 * origin       https://site.com:8080
 * protocol     https:
 *      – протокол
 * host         site.com:8080
 * hostname     site.com
 * port         8080
 * pathname     /path/page
 * search       ?p1=v1&p2=v2
 *      - строка параметров, начинается с вопросительного знака ?
 * hash         #hash
 * user     - (если используется HTTP-аутентификация)
 * password - (если используется HTTP-аутентификация)
 * 
 * Можно использовать объект URL в методах fetch или XMLHttpRequest и почти 
 *      во всех других, где ожидается URL-строка.
 * 
 * 
 * SearchParams «?…»
 * 
 *      создать URL-адрес с заданными параметрами, например, 
 *      https://google.com/search?query=JavaScript.
 * 
 * параметры должны быть правильно закодированы, чтобы они могли содержать 
 *      не-латинские буквы, пробелы и т.п.
 * 
 * url.searchParams – объект типа URLSearchParams.
 *      Предоставляет методы для работы с параметрами:

append(name, value) – добавить параметр по имени,
delete(name)        – удалить параметр по имени,
get(name)           – получить параметр по имени,
getAll(name)        – получить все параметры с одинаковым именем name,
has(name)           – проверить наличие параметра по имени,
set(name, value)    – задать/заменить параметр,
sort()              – отсортировать параметры по имени (является перебираемым).
 */
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !
alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :
alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, далее tbs=qdr:y
}

/**
 * Кодирование
 *      Если мы используем строку, то надо самим позаботиться о кодировании 
 *      специальных символов.
 * 
 * Для этого есть встроенные функции:

encodeURI           – кодирует URL-адрес целиком.
decodeURI           – декодирует URL-адрес целиком.
encodeURIComponent  – кодирует компонент URL.
decodeURIComponent  – декодирует компонент URL.

encodeURI           кодирует только символы, полностью запрещённые в URL.
encodeURIComponent  кодирует эти же символы плюс, в дополнение к ним, символы 
        #, $, &, +, ,, /, :, ;, =, ? и @.
 */
let music = encodeURIComponent('Rock&Roll');
let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll

// допустимый URL-адрес IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';
// по-разному кодируются адреса IPv6:
alert(encodeURI(url));  // http://%5B2607:f8b0:4005:802::1007%5D/   (некорректный)
alert(new URL(url));    // http://[2607:f8b0:4005:802::1007]/