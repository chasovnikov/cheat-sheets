/*
Модуль util поддерживает потребности внутренних API-интерфейсов Node.js. 
Многие утилиты также полезны для разработчиков приложений и модулей.
Чтобы получить к нему доступ:
*/
const util = require('util');
/*
util.callbackify(original)    - преобр-ет асинх. ф-ию в ф-ию, принимающую колбэк
util.debuglog(section[, callback])  - записывает отладочные сообщения в stderr на основе существования переменной среды NODE_DEBUG
debuglog().enabled    -  используется для создания теста, который можно использовать в условных выражениях на основе существования переменной среды NODE_DEBUG
util.debug(section)   - Псевдоним для util.debuglog
util.deprecate(fn, msg[, code])   - обертывает fn (который может быть функцией или классом) таким образом, что он помечен как устаревший
util.format(format[, ...args])    - возвращает форматированную строку, используя первый аргумент в качестве строки формата, подобной printf
util.formatWithOptions(inspectOptions, format[, ...args])   -  идентична util.format(), за исключением того, что она принимает аргумент параметров проверки, который определяет параметры, передаваемые в util.inspect()
util.getSystemErrorName(err)    - Возвращает строковое имя числового кода ошибки, полученного из Node.js API
util.getSystemErrorMap()    - Возвращает карту всех кодов системных ошибок, доступных в Node.js API
util.inherits(constructor, superConstructor)    - Использование не рекомендуется. Наследовать методы прототипа от одного конструктора к другому

util.inspect(object[, options])   - возвращает строковое представление объекта, предназначенного для отладки
util.inspect(object[, showHidden[, depth[, colors]]])   - тоже
Customizing util.inspect colors
Modifiers
Foreground colors
Background colors
Custom inspection functions on objects
util.inspect.custom   - Пользовательские функции [util.inspect.custom](глубина, параметры) обычно возвращают строку, но могут возвращать значение любого типа, которое будет соответствующим образом отформатировано с помощью util.inspect()
util.inspect.defaultOptions

util.isDeepStrictEqual(val1, val2)    - Возвращает значение true, если существует глубокое строгое равенство между val1 и val2

util.promisify(original)
Custom promisified functions
util.promisify.custom

util.stripVTControlCharacters(str)    - Возвращает str с удаленными экранирующими кодами ANSI.

Class: util.TextDecoder   - Реализация API декодера текста стандарта кодирования WHATWG.
WHATWG supported encodings
Encodings supported by default (with full ICU data)
Encodings supported when Node.js is built with the small-icu option
Encodings supported when ICU is disabled
new TextDecoder([encoding[, options]])
textDecoder.decode([input[, options]])
textDecoder.encoding
textDecoder.fatal
textDecoder.ignoreBOM

Class: util.TextEncoder   - Реализация API кодирования стандартного текстового кодера WHATWG. Все экземпляры Text Encoder поддерживают только кодировку UTF-8.
textEncoder.encode([input])
textEncoder.encodeInto(src, dest)
textEncoder.encoding

util.toUSVString(string)    - Возвращает строку после замены любых суррогатных кодовых точек (или, что эквивалентно, любых непарных единиц суррогатного кода) символом замены в Юникоде U+FFFD.

util.types    - обеспечивает проверку типов для различных типов встроенных объектов. В отличие от instanceof или Object.prototype.toString.call(значение), эти проверки не проверяют свойства объекта, доступные из JavaScript (например, их прототип), и обычно имеют накладные расходы при вызове в C++
util.types.isAnyArrayBuffer(value)
util.types.isArrayBufferView(value)
util.types.isArgumentsObject(value)
util.types.isArrayBuffer(value)
util.types.isAsyncFunction(value)
util.types.isBigInt64Array(value)
util.types.isBigUint64Array(value)
util.types.isBooleanObject(value)
util.types.isBoxedPrimitive(value)
util.types.isCryptoKey(value)
util.types.isDataView(value)
util.types.isDate(value)
util.types.isExternal(value)
util.types.isFloat32Array(value)
util.types.isFloat64Array(value)
util.types.isGeneratorFunction(value)
util.types.isGeneratorObject(value)
util.types.isInt8Array(value)
util.types.isInt16Array(value)
util.types.isInt32Array(value)
util.types.isKeyObject(value)
util.types.isMap(value)
util.types.isMapIterator(value)
util.types.isModuleNamespaceObject(value)
util.types.isNativeError(value)
util.types.isNumberObject(value)
util.types.isPromise(value)
util.types.isProxy(value)
util.types.isRegExp(value)
util.types.isSet(value)
util.types.isSetIterator(value)
util.types.isSharedArrayBuffer(value)
util.types.isStringObject(value)
util.types.isSymbolObject(value)
util.types.isTypedArray(value)
util.types.isUint8Array(value)
util.types.isUint8ClampedArray(value)
util.types.isUint16Array(value)
util.types.isUint32Array(value)
util.types.isWeakMap(value)
util.types.isWeakSet(value)
*/
