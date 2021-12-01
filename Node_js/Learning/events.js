const Emitter = require('events');

const emitter = new Emitter();

const callback = (data, second, third) => {
    console.log('Сообщение ' + data);
    console.log('Второй аргумент ' + second);
};

// Создание события 'message'
emitter.on('message', callback);

const MESSAGE = process.env.message || '';

if (MESSAGE) {
    // сгенерируем событие
    emitter.emit('message', MESSAGE, 123);
} else {
    emitter.emit('message', 'Не указали сообщение');
}

// Сгенерир. событие единожды
emitter.once('message', (data, second, third) => {
    console.log('Сообщение ' + data);
    console.log('Второй аргумент ' + second);
});


emitter.removeAllListeners();   // удалить все слушатели
emitter.removeListener('message', callback);