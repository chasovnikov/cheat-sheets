/**
 * Интернационализация
 * 
 * Intl
 *      предоставляет языка-зависимое сравнение строк, форматирование чисел 
 *          и дат со временем.
 *  
 * Локаль описывается строкой из трёх компонентов, которые разделяются дефисом:
 *      Код языка.
 *      Код способа записи.
 *      Код страны.
 * 
 * Пример:
 * en-US      – английский язык, используемый в США (US).
 * zh-Hans-CN – китайский язык (zh), записываемый упрощённой иероглифической 
 *              письменностью (Hans), используемый в Китае (CN).
 * 
 * Через суффикс -u-* можно указать расширения локалей, например 
 *      "th-TH-u-nu-thai" – тайский язык (th), используемый в Таиланде (TH), 
 *      с записью чисел тайскими буквами (๐, ๑, ๒, ๓, ๔, ๕, ๖, ๗, ๘, ๙) .
 * 
 * Все локали обязаны поддерживать следующие наборы настроек:

weekday, year, month, day, hour, minute, second
weekday, year, month, day
year, month, day
year, month
month, day
hour, minute, second
 * 
 * Все методы принимают локаль в виде строки или массива, 
 *      содержащего несколько локалей в порядке предпочтения.
 * Если локаль не указана или undefined – берётся локаль по умолчанию, 
 *      установленная в окружении (браузере).
 * 
 * 
 * Intl.getCanonicalLocales()
 *      Returns canonical locale names.
 */

/**
 *      Строки, Intl.Collator
 * 
 * let collator = new Intl.Collator([locales, [options]])
 * 
 *      Умеет правильно сравнивать и сортировать строки.
 * @param {string|Array} locales    Локали в порядке предпочтения
 * @param {object}       options    Настройки:
 *  localeMatcher – алгоритм выбора подходящей локали:
 *      "lookup" – простейший поиск путём обрезания суффикса, 
 *              например zh-Hans-CN → zh-Hans → zh → локаль по умолчанию.
 *      "best fit" – использует встроенные алгоритмы и предпочтения окружения.
 *  usage       – цель сравнения: сортировка "sort"(по умолчанию) или поиск "search".
 *  sensitivity – чувствительность к различиям в символах, варианты:
 *      base    – учитывать только разные символы, без диакритических знаков и регистра, 
 *              например: а ≠ б, е = ё, а = А.
 *      accent  – учитывать символы и диакритические знаки, например: а ≠ б, е ≠ ё, а = А.
 *      case    – учитывать символы и регистр, например: а ≠ б, е = ё, а ≠ А.
 *      variant – учитывать всё(по умолчанию).
 *  ignorePunctuation – игнорировать знаки пунктуации: true/false, по умолчанию false.
 *  numeric     – использовать ли численное сравнение: true/false, если true, 
 *              то будет 12 > 2, иначе 12 < 2.
 *  caseFirst   – в сортировке должны идти первыми прописные или строчные буквы, варианты: 
 *      "upper" (прописные), 
 *      "lower" (строчные) или 
 *      "false" (стандартное для локали, также является значением по умолчанию). 
 *          Не поддерживается IE11.
 */
let collator = new Intl.Collator();
alert( "ёжик" > "яблоко" );                  // true (ёжик больше, что неверно)
alert( collator.compare("ёжик", "яблоко") ); // -1 (ёжик меньше, верно)


/**
 *      Даты, Intl.DateTimeFormat
 * 
 * let formatter = new Intl.DateTimeFormat([locales, [options]])
 * 
 *      Умеет форматировать дату и время в соответствии с нужным языком.
 * @param {string|Array} locales    Локали в порядке предпочтения
 * @param {object}       options    Настройки:
 *  localeMatcher – алгоритм выбора подходящей локали (как в Intl.Collator).
 *  formatMatcher - Алгоритм подбора формата (basic, best fit (по умолчанию)).
 *  hour12   - Включать ли время в 12-часовом формате (true|false).
 *  timeZone - Временная зона, например, "Europe/Moscow" (UTC - по умолчанию).
 *  weekday  - День недели (narrow, short, long).
 *  era      - Эра	 (narrow, short, long).
 *  year     - Год	 (2-digit, numeric). По умолчанию: undefined или numeric.
 *  month - Месяц (2-digit, numeric, narrow, short, long). По умолч.: undefined/numeric.
 *  day      - День	 (2-digit, numeric). По умолчанию: undefined или numeric.
 *  hour     - Час	 (2-digit, numeric).
 *  minute   - Минуты	(2-digit, numeric).
 *  second   - Секунды	(2-digit, numeric).
 *  timeZoneName - Название таймзоны (нет в IE11)	(short, long).
 */
let date = new Date(2014, 11, 31, 12, 30, 0);
let formatter = new Intl.DateTimeFormat("ru", {
  weekday:  "long",
  year:     "numeric",
  month:    "long",
  day:      "numeric"
});
alert( formatter.format(date) );    // среда, 31 декабря 2014 г.

// Только время:
let date = new Date(2014, 11, 31, 12, 30, 0);
let formatter = new Intl.DateTimeFormat("ru", {
  hour:   "numeric",
  minute: "numeric",
  second: "numeric"
});
alert( formatter.format(date) );    // 12:30:00


/**
 *      Числа, Intl.NumberFormat
 * 
 * let formatter = new Intl.NumberFormat([locales[, options]]);
 * 
 *      Умеет форматировать числа в соответствии с нужным языком.
 * @param {string|Array} locales    Локали в порядке предпочтения
 * @param {object}       options    Настройки:
 *  localeMatcher – алгоритм выбора подходящей локали (как в Intl.Collator).
 *  style           - Стиль форматирования	(decimal(по умолч.), percent, currency).
 *  currency        - Алфавитный код валюты, например USD.
 *  currencyDisplay - Показывать валюту в виде кода, локализованного символа 
 *          или локализованного названия (code, symbol(по умол.), name).
 *  useGrouping     - Разделять ли цифры на группы	(true(по умолч.), false).
 *  minimumIntegerDigits    - Мин. количество цифр целой части (от 1 до 21(по умолч.)).
 *  minimumFractionDigits   - Минимальное количество десятичных цифр	(от 0 до 20).
 *          По умолч.: для чисел и процентов 0, для валюты зависит от кода.
 *  maximumFractionDigits   - Максимальное количество десятичных цифр	
 *          (от minimumFractionDigits до 20).
 *          По умолч.: для чисел max(minimumFractionDigits, 3), для процентов 0, 
 *          для валюты зависит от кода.
 *  minimumSignificantDigits - Мин. кол-во значимых цифр (от 1(по умолч.) до 21).
 *  maximumSignificantDigits - Макс. кол-во значимых цифр 
 *          (от minimumSignificantDigits(по умолч.) до 21).
 */
// Пример без опций:
let formatter = new Intl.NumberFormat("ru");
alert( formatter.format(1234567890.123) );    // 1 234 567 890,123

// С ограничением значимых цифр (важны только первые 3):
let formatter = new Intl.NumberFormat("ru", {
  maximumSignificantDigits: 3
});
alert( formatter.format(1234567890.123) );    // 1 230 000 000

// С опциями для валюты и двумя цифрами после запятой:
let formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2
});
alert( formatter.format(1234.5) );       // 1 234,50 £


/**
 * Методы в Date, String, Number 
 *      (при запуске создают соответствующий объект Intl.* и передают ему опции).
 * 
 * String.prototype.localeCompare(that [, locales [, options]])
 *      Сравнивает строку с другой, с учётом локали.
 */
let str = "ёжик";
alert( str.localeCompare("яблоко", "ru") ); // -1

/**
 * Date.prototype.toLocaleString([locales [, options]])
 *      Форматирует дату в соответствии с локалью.
 */
let date = new Date(2014, 11, 31, 12, 00);
alert( date.toLocaleString("ru", { year: 'numeric', month: 'long' }) ); // Декабрь 2014

/**
 * Date.prototype.toLocaleDateString([locales [, options]])
 *      То же, что и выше, но опции по умолчанию включают в себя год, месяц, день
 * 
 * Date.prototype.toLocaleTimeString([locales [, options]])
 *      То же, что и выше, но опции по умолчанию включают в себя часы, минуты, секунды
 * 
 * Number.prototype.toLocaleString([locales [, options]])
 *      Форматирует число, используя опции Intl.NumberFormat.
 */


/**
 * new Intl.DisplayNames(locales, options)
 *      обеспечивает согласованный перевод отображаемых имен языка, региона и сценария.
 * 
 * Intl.DisplayNames.supportedLocalesOf()
 *      Возвращает массив,содержащий те из предоставленных локалей, 
 *      которые поддерживаются без необходимости возврата к стандартной локали 
 *      по умолчанию.
 * 
 * Intl.DisplayNames.prototype.of()
 *      Этот метод получает code и возвращает строку на основе языкового 
 *      стандарта и параметров, предоставленных при Intl.DisplayNames 
 *      экземпляра Intl.DisplayNames .
 * 
 * Intl.DisplayNames.prototype.resolvedOptions()
 *      Возвращает новый объект со свойствами,отражающими локаль и параметры 
 *      форматирования,вычисленные при инициализации объекта.
 */
// Get display names of region in English
let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
regionNames.of('419'); // "Latin America"
regionNames.of('BZ');  // "Belize"

// Get display names of language in English
let languageNames = new Intl.DisplayNames(['en'], {type: 'language'});
languageNames.of('fr');      // "French"

// Получаем отображаемые имена скрипта на английском языке
let scriptNames = new Intl.DisplayNames(['en'], {type: 'script'});
// Получаем имена скриптов
scriptNames.of('Latn'); // "Latin"


/**
 * Intl.ListFormat()
 *  Конструктор для объектов, которые позволяют форматировать список с учетом языка.
 * 
 * Intl.Locale()
 *  Конструктор объектов, представляющий идентификатор локали Юникода.
 * 
 * Intl.NumberFormat()
 *  Конструктор объектов, которые позволяют форматировать числа с учетом языка.
 * 
 * Intl.PluralRules()
 *  Конструктор для объектов, которые включают форматирование с учетом 
 *      множественного числа и языковые правила для множественного числа.
 * 
 * Intl.RelativeTimeFormat()
 *  Конструктор объектов, которые позволяют форматировать относительное время 
 *      с учетом языка.
 */