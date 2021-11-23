

// январь – это нулевой месяц
// Дни недели в getDay() отсчитываются с нуля (воскресенью)
// Date самостоятельно корректируется при введении значений, выходящих за рамки допустимых
// Даты можно вычитать, и разность возвращается в миллисекундах

const MS_DAY = 24 * 60 * 60 * 1000;     // День 86 400 000 миллисекунд

const obj = new Date();         // объект Date, представляющий текущюю дату
let string = Date();            // строка с текущей датой

let timestamp = Date.now();     // текущее время (таймстамп)
let timestamp1 = obj.getTime(); // текущее время (таймстамп)
let timestamp2 = Date.UTC(2100, 0, 1);  // время (таймстамп) по UTC

//  в браузерах:
let now = performance.now(); // миллисекунды, с точностью до одной тысячной миллисекунды

/**
 * new Date();
 * new Date(value);
 * new Date(dateString);
 * new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);
 * new Date( Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]]))
 * 
 * Значения, большие логического диапазона (например, 13 в качестве номера месяца) 
 *      «переметнутся» на соседние значения 
 */
const obj5 = new Date(3600); // милисекунды от 01.01.1970 UTC+0 
const obj1 = new Date('December 17, 1995 03:24:00');
const obj3 = new Date("2017-01-26"); 
const obj4 = new Date ("2100-01-01T00:00:00Z"); // Формат даты ISO
const obj2 = new Date(2021, // год 2021
                    0,      // Месяцы: от 0 (Январь) до 11 (Декабрь)
                    1,      // Дни месяца: от 1 до 31
                    0,      // Часы: от 0 до 23
                    3, 4,   // Секунды и минуты: от 0 до 59
                    5);     //  .005, локальное время
const obj6 = new Date ( Date.UTC(2100, 0, 1) ); // в скоординированном всемирном времени


// Датам до 1 января 1970 будут соответствовать отрицательные таймстампы
const Dec31_1969 = new Date(-24 * 3600 * 1000);   // 31 декабря 1969 года


// = START ======= Локаль ====================================

// час в часовом поясе UTC+0 (лондонское время без перехода на летнее время)
alert( new Date().getUTCHours() );

/**
 * Возвращает строку с языкозависимым представлением даты
 * 
 * dateObj.toLocaleString([locales[, options]])
 *      locales - код языка, код письменности и код страны, разделённые символами дефиса
 *      options - объект со свойствами
 * 
 * Получение даты в русскоязычном формате 
 *      (сб, 28 августа 2021 г., Москва, стандартное время)
 */
new Date().toLocaleString('ru',
  {
    weekday: 'narrow',      // сб
    year: 'numeric',        // 2021 г.
    month: 'long',          // августа
    day: 'numeric',         // 28
    timeZoneName: 'long',   // Москва, стандартное время
    // Возможны другие опции
  });


// Проверка поддержки аргументов locales и options браузером
function toLocaleStringSupportsLocales() {
    try {
      new Date().toLocaleString('i');
    } catch (e) {
      return e​.name === 'RangeError';
    }
    return false;
  }


var date = new Date( Date.UTC(2012, 11, 12, 3, 0, 0));
console.log( date.toLocaleString());
// → "12/11/2012, 7:00:00 PM", если код запущен с локалью en-US 
//   и часовым поясом America/Los_Angeles


/**
 * Интернационализация.
 * Объект Intl является пространством имён для API интернационализации ECMAScript, 
 * предоставляющим языка-зависимое сравнение строк, 
 * форматирование чисел и дат со временем
 */

/**
 * Возвращает массив, содержащий канонические коды языков
 * 
 * Intl.getCanonicalLocales(locales)
 *      locales - Список строк, из которых нужно получить канонические коды языков.
 */
Intl.getCanonicalLocales(['RU-RU', 'Fr']); // ["ru-RU", "fr"]


/**
 * Конструктор объектов, включающих языка-зависимое форматирование даты и времени
 * 
 * new Intl.DateTimeFormat([locales[, options]])
 * Intl.DateTimeFormat.call(this[, locales[, options]])
 */
// В американском английском используется порядок месяц-день-год
console.log( new Intl.DateTimeFormat('en-US').format(date) );   // → "12/19/2012"


/**
 * Конструктор сортировщиков — объектов, включающих языка-зависимое сравнение строк
 * 
 * new Intl.Collator([locales[, options]])
 * Intl.Collator.call(this[, locales[, options]])
 */
// В немецком буква ä идёт рядом с буквой a
console.log( new Intl.Collator('de').compare('ä', 'z') );     // -1  ('ä' < 'z')

// В немецком буква a является базовой для буквы ä (использ-ся арг. "options")
console.log(new Intl.Collator('de', { sensitivity: 'base' }).compare('ä', 'a'));
// → 0


/**
 * Конструктор объектов, включающих языка-зависимое форматирование чисел
 * 
 * new Intl.NumberFormat([locales[, options]])
 * Intl.NumberFormat.call(this[, locales[, options]])
 * 
 * Пример:
 *      В России в качестве разделителя целой и дробной части используется запятая, 
 *      а в качестве разделителя разрядов - пробел
 */
console.log( new Intl.NumberFormat('ru-RU').format(number) );    // 123 456,789


// = END ======= Локаль ====================================


/**
 * Самый быстрый метод для вычисления разности дат,
 * т.к. не использует приведение к типу Number 
 */
let milliseconds = date1.getTime() - date2.getTime();

date.setTime(milliseconds);

/**
 * У всех этих методов, 
 * есть UTC-вариант, например: getUTCHours()
 */
date.getFullYear(); // год 4 цифры
date.getMonth();    // месяц от 0 до 11
date.getDate(); 
date.getDay();      // день недели от 0 (воскресенье) до 6 (суббота)
date.getMonth(); 
date.getHours();
date.getMinutes(); 
date.getSeconds(); 
date.getMilliseconds(); 

date.setFullYear(year, [month], [date])
date.setMonth(month, [date])
date.setDate(date)
date.setHours(hour, [min], [sec], [ms])
date.setMinutes(min, [sec], [ms])
date.setSeconds(sec, [ms])
date.setMilliseconds(ms)

// разница в минутах между местным часовым поясом и UTC
date.getTimezoneOffset();

// прибавить 2 дня
date.setDate(date.getDate() + 2);

/**
 * Вывести последнее число месяца
 * (первый день месяца - это 1)
 */
date.getDate(0);

// Даты можно вычитать и складывать, в результате получаем разность в миллисекундах
let ms = obj1 - obj2;

// Преобразование к типу Number даёт таймстамп (медленее, чем getTime())
let date = new Date();
alert(date); // Mon Aug 23 2021 13:53:04 GMT+0300 (Москва, стандартное время)
alert(+date); // 1629715984955

// добавляет к текущей дате три месяца и две недели
let d = new Date ();
d.setMonth(d.getMonth() + 3, d.getDate() + 14);


// преобразования объектов Date в строки
let d = new Date (2020, 0, 1, 17, 10, 30); // 5:10:30pm, день Нового года 2020
    d.toString()             // "Wed Jan 01 2020 17:10:30 GMT-0800
    d.toUTCString()         // "Thu, 02 Jan 2020 01:10:30 GMT"
    d.toLocaleDateString()  // "1/1/2020": локаль `en-US`
    d.toLocaleTimeString()  // "5:10:30 PM": локаль `en-US`
    d.toISOString()         //"2020-01-02T01:10:30.000Z"
    // ...


/**
 * Разбор строки с датой
 * Формат строки: YYYY-MM-DDTHH:mm:ss.sssZ
 * sss - 417 (милисеунды)
 * Z - -07:00 (часовой пояс в формате +-hh:mm)
 * Возращает таймстамп
 */
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

const IPOdate = new Date();
IPOdate.setTime(Date.parse("Aug 9, 1995"));
    


/**=== START Бенчмаркинг ===========================================================
 * Бенчмаркинг - вычисления, замеряющие производительность/
 * Какая из двух функций быстрее
 */
function diffSubtract(date1, date2) {
    return date2 - date1;
}

function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// добавляем для "разогрева" перед основным циклом
bench(diffSubtract);
bench(diffGetTime);

// bench(upperSlice) и bench(upperLoop) поочерёдно запускаются 10 раз
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

alert( 'Итоговое время diffSubtract: ' + time1 );
alert( 'Итоговое время diffGetTime: ' + time2 );
  
// === END Бенчмаркинг =============================================================


/**
 * Получить количество секунд с начала эпохи Unix.
 * В этом случае важно возвращать только целое число (так что простое 
 * деление не подойдёт), а также возвращать только фактически прошедшие 
 * секунды (поэтому этот код использует Math.floor () а не Math.round ())
 */
var seconds = Math.floor( Date.now() / 1000);


// код, показывающий количество дней оставшихся до конца текущего года:
var today = new Date(); // Получаем текущую дату
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Устанавливаем месяц и день на конец года
endYear.setFullYear(today.getFullYear()); // Устанавливаем текущий год
var msPerDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одних сутках
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); // возвращает количество дней, оставшихся до конца года


// функция JSClock(), которая возвращает время в формате электронных часов:
function JSClock() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var temp = "" + ((hour > 12) ? hour - 12 : hour);
    if (hour == 0)
      temp = "12";
    temp += ((minute < 10) ? ":0" : ":") + minute;
    temp += ((second < 10) ? ":0" : ":") + second;
    temp += (hour >= 12) ? " P.M." : " A.M.";
    return temp;
  }