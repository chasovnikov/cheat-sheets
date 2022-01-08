const { EventEmitter, errorMonitor } = require('events');

/**
 * EventEmitter - патерн, позволяющий создать объект, навешивать на него несколько
 * обработчиков событий, создавать в нём события. Каждое событие имеет имя и масив
 * обраб-ов
 */

//  События нужны:
//      когда API-интерфейс разработан относительно объекта,
//      когда функция обратного вызова должна вызываться много раз
//      или когда требуется множество типов функций-колбэков

// Все объекты, излучающие события, являются экземплярами класса EventEmitter

// Все функции, связанные с событием, вызываются синхронно

// Если функция обработчика событий генерирует исключение, то
// оно распространяется из вызова emit() и препятствует выполнению любых
// функций обработчиков, которые были зарегистрированы после той, что сгенерировала исключение

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// связывает событие с функцией-обработчиком
myEmitter.on('event', (a, b) => {
    console.log(a, b, this);
});

// генерир. событие
myEmitter.emit('event', 'a', 'b');

// EventEmitter вызывает всех слушателей синхронно (в порядке регистрации)
// Можно переключаться в асинх. режим с помощью методов setImmediate() или process.nextTick():
myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    });
});

// Вызов события не более одного раза
// Автомат-ки удал-ся из массива слушателей после первого запуска
const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
    console.log(++m);
});
myEmitter.emit('event'); // Prints: 1
myEmitter.emit('event'); // Ignored

// Рекомендуется всегда добавлять слушателей для событий «ошибки»
myEmitter.on('error', err => {
    console.error('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!')); // Prints: whoops! there was an error

// Не поглощая выданную ошибку, установив прослушиватель с помощью символа events.errorMonitor
myEmitter.on(errorMonitor, err => {
    MyMonitoringTool.log(err);
});
myEmitter.emit('error', new Error('whoops!')); // По-прежнему выкидывает и вылетает Node.js

// Асинх. обработчик может привести к необработ. отклонению в случае сгенерир. исключения
myEmitter.on('something', async value => {
    throw new Error('kaboom');
});

// {captureRejections: true} направляет исключение в метод [Symbol.for('nodejs.rejection')]
// или в обработчик события error, если его нет
const ee1 = new EventEmitter({ captureRejections: true });
ee1.on('something', async value => {
    throw new Error('kaboom');
});

ee1[Symbol.for('nodejs.rejection')] = console.log;
// ee1.on('error', console.log); // или так

// Это изменит значение по умолчанию для всех новых экземпляров EventEmitter
EventEmitter.captureRejections = true;

// Рекомендуется не использовать асинхронные функции в качестве обработчиков событий «error»

// -------------- Class: EventEmitter

// Event: 'newListener' - перед тем как слушатель будет добавлен к внутреннему массиву слушателей
// Дополнительные слушатели с тем же именем в обработ-ке newListener, вставляются
// перед слушателем, который находится в процессе добавления

// Event: 'removeListener' - генерируется после удаления слушателя

emitter.on(eventName, listener); // Добавляет функцию прослушивателя в конец массива прослушивателей
emitter.addListener(eventName, listener); // Псевдоним для emitter.on (eventName, listener)
emitter.once(eventName, listener); // Доб. функцию одноразового прослушивателя для события eventName
events.once(emitter, name, options); // Создает промис, которое выполняется при генерацииданного соб.
emitter.prependListener(eventName, listener); // Доб. ф-ию прослушивателя в начало массива слушателей
emitter.prependOnceListener(eventName, listener); // однораз. обраб-к в начало массива слушателей

emitter.emit(eventName, ...args); // Синхронно вызывает каждого из прослушивателей

emitter.removeListener(eventName, listener); // Удаляет указанный слушатель из массива слушателей
emitter.off(eventName, listener); // Псевдоним для emitter.removeListener()
emitter.removeAllListeners(eventName); // Удаляет всех слушателей или слушателей eventName

// По умолчанию для одного события можно зарегистрировать не более 10 слушателей
emitter.getMaxListeners(); // текущее максимальное значение прослушивателя для EventEmitter
emitter.setMaxListeners(n); // позволяет изменять ограничение для этого конкретного экземпляра
events.setMaxListeners(n, ...eventTargets); // Максимальное кол-во слушателей на событие EventTarget
events.defaultMaxListeners; // изменить значение по умолчанию для всех экземпляров EventEmitter
emitter.listenerCount(eventName); // Возвращает количество слушателей для соб. eventName
events.listenerCount(emitter, eventName); // Deprecated
emitter.eventNames(); // Список событий с зарегистрированными слушателями
emitter.listeners(eventName); // Возвращает копию массива слушателей для события eventName
emitter.rawListeners(eventName); // Возвр. копию массива слушателей для события eventName
events.getEventListeners(emitterOrTarget, eventName); // копию массива слушателей для события

// Вызывается, если происходит отклонение промиса и включен captureRejection
emitter[Symbol.for('nodejs.rejection')](err, eventName, ...args);
events.errorMonitor; // установка прослушивателя только для отслеживания «ошибочных» событий

events.captureRejections; // captureRejections: true направл. искл-е в метод [Symbol.for('nodejs.rejection')]
events.captureRejectionSymbol; // Значение: Symbol.for('nodejs.rejection')
events.on(emitter, eventName, options); // Возвр.: <AsyncIterator>, который выполняет итерацию событий

// -----------------  Class: Event
// Объект Event - это адаптация Event Web API. Экземпляры создаются внутри Node.js

event.cancelable; // Истинно, если событие было создано с возможностью отмены.
event.currentTarget; // EventTarget, отправляющий событие. Псевдоним для event.target
event.defaultPrevented; // true, если cancelable - true и был вызван event.preventDefault()
event.isTrusted; // Событие «abort» <AbortSignal> испускается с isTrusted, установленным в true
event.preventDefault(); // Устан/ для defaultPrevented значение true, если cancelable равно true
event.srcElement; // Тип: <EventTarget> EventTarget, отправляющий событие
event.stopImmediatePropagation(); // Остан-ет вызов слушателей событий после завершения текущего
event.target; // Тип: <EventTarget> EventTarget, отправляющий событие
event.timeStamp; // Метка времени в миллисекундах, когда был создан объект Event
event.type; // Идентификатор типа события

// -----------------  Class: EventTarget

eventTarget.addEventListener(type, listener, options); // Добавляет новый обработчик для события
eventTarget.dispatchEvent(event); // Отправляет событие в список обработчиков для event.type
eventTarget.removeEventListener(type, listener); // Удаляет слушателя из списка обработчиков

// ----------------- Class: NodeEventTarget
// это специфичное для Node.js расширение EventTarget, которое имитирует подмножество EventEmitter API

// разница между addListener() и addEventListener() - addListener() вернет ссылку на EventTarget
nodeEventTarget.addListener(type, listener, options);

// возвращает массив имен типов событий, для которых зарегистрированы прослушиватели событий
nodeEventTarget.eventNames();
nodeEventTarget.listenerCount(type); // количество прослушивателей событий
nodeEventTarget.off(type, listener); // Псевдоним для eventTarget.removeListener()
nodeEventTarget.on(type, listener, options); // Псевдоним для eventTarget.addListener()
nodeEventTarget.once(type, listener, options); // добавляет однократный прослушиватель
nodeEventTarget.removeAllListeners(type); // удаляются все зарегистрированные слушатели для типа
nodeEventTarget.removeListener(type, listener); // удаляет прослушиватель для данного типа
