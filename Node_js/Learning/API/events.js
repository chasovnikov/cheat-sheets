const Emitter = require('events');

const emitter = new Emitter();

const callback = (data, second, third) => {
    console.log('Сообщение ' + data);
    console.log('Второй аргумент ' + second);
};

// Подписываемся на событие "message"
emitter.on('message', callback);
// Геренация события
emitter.emit('message', 'hello', 1234);

// Сгенерир. событие единожды (многократный "emit" сработает только единожды)
emitter.once('message2', callback);
emitter.emit('message2', MESSAGE, 1234); // сработает
emitter.emit('message2', MESSAGE, 1234); // не сработает
emitter.emit('message2', MESSAGE, 1234); // не сработает

// Удалить слушатель
emitter.removeListener('message', callback);
emitter.removeAllListeners(); // удалить все слушатели
