'use strict';
const http = require('http');

// basic-class ----------------------------
const hostname = '127.0.0.1';
const port = 8000; // до 1024-го порта нужны права

// колбэк срабатывает при event: "request"
// req, res - обёртки над одним и тем же сокетом
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// ошибка сервера
server.on('error', err => {
  // EACCES - не прав, чтобы открыть порт
  if (err.code === 'EACCES') {
    console.log(`No access to port: ${port}`);
  }
});

// basic-http -----------------------------
const user = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  proffesion: 'emperor',
};

const server = http.createServer((req, res) => {
  res.end(`${user.name} said "Java is a crap!" and chiao from ${user.city}`);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);

// native-simple -------------------------
const user = { name: 'jura', age: 22 };

// хэш-таблица
const routing = {
  '/': '<h1>welcome to homepage</h1><hr>', // статическая запись
  '/user': user, // ссылочная
  '/user/name': () => user.name.toUpperCase(), // функциональная
  '/user/age': () => user.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] },
  '/api/method1': (req, res) => {
    console.log(req.url + ' ' + res.statusCode);
    return { status: res.statusCode };
  },
  '/api/method2': req => ({
    user,
    url: req.url,
    cookie: req.headers.cookie, // на сервере можем распарсить куки
  }),
};

// справочник сериализаторов
const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data, req, res);
    res.end(result);
  })
  .listen(8000);

// Сложно-читаемая версия кода:
// http.createServer((req, res) => {
//   const data = routing[req.url];
//   res.end(types[typeof data](data, req, res));
// }).listen(8000);

// чтобы видеть,что роутинг постоянно отдает и сериализует новый объект
setInterval(() => user.age++, 2000);

// native-advenced --------------------------------
// Тестовый пример. Так писать нельзя.
// Проблема: здесь всё происходит синхронно. Ф-ии в роутинге и сериализаторах могут
//      быть не быстрыми. Могут не ловиться следующие запросы после первого.
const user = { name: 'jura', age: 22 };

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
  // путь с маскировкой (вместо * можно другое, например /{1}/{2}/ ):
  '/user/*': (client, par) => 'parameter=' + par[0],
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par),
};

// все пути со * будут лежать отдельно
const matching = [];
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];
    matching.push([rx, route]);
    delete routing[key];
  }
}

const router = client => {
  let par;
  let route = routing[client.req.url];
  if (!route) {
    for (let i = 0; i < matching.length; i++) {
      const rx = matching[i];
      par = client.req.url.match(rx[0]);
      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  const type = typeof route;
  const renderer = types[type];
  return renderer(route, par, client);
};

http
  .createServer((req, res) => {
    res.end(router({ req, res }) + '');
  })
  .listen(8000);

// native-async --------------------

const user = { name: 'jura', age: 22 };

const routing = {
  '/': '<h1>welcome to homepage</h1><hr>',
  '/user': user,
  '/user/name': () => user.name.toUpperCase(),
  '/user/age': () => user.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] },
  '/api/method1': (req, res, callback) => {
    console.log(req.url + ' ' + res.statusCode);
    callback({ status: res.statusCode });
  },
  '/api/method2': req => ({
    user,
    url: req.url,
    cookie: req.headers.cookie,
  }),
};

const types = {
  object: ([data], callback) => callback(JSON.stringify(data)),
  undefined: (args, callback) => callback('not found'),
  function: ([fn, req, res], callback) => {
    if (fn.length === 3) fn(req, res, callback);
    else callback(JSON.stringify(fn(req, res)));
  },
};

// можно написать без рекурсии:
const serve = (data, req, res) => {
  const type = typeof data;
  if (type === 'string') return res.end(data);
  const serializer = types[type];
  serializer([data, req, res], data => serve(data, req, res));
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    serve(data, req, res);
  })
  .listen(8000);

setInterval(() => user.age++, 2000);

// native-cluster -----------------------------
// Запускать сервер в несколько процессов
// Серверный сокет откроется в мастер-процессе
// Проблема: при подаче серьезной нагрузки у мастера 100% загрузка, а воркеры не догружены

const cluster = require('cluster');
const os = require('os');

const PORT = 2000;

const user = { name: 'jura', age: 22 };
const pid = process.pid;

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, par, client) => JSON.stringify(fn(client, par)),
};

if (cluster.isMaster) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
  // Когда уже этот же код будет запускаться внутри воркера:
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);
  // Благодаря библ. "cluster", createServer сделается действительно только в мастер-процессе, а
  // на child-процессах будет съэмулирован createServer
  http
    .createServer((req, res) => {
      const data = routing[req.url];
      const type = typeof data;
      const serializer = types[type];
      // Чтобы понимать какой клиентский процесс ответил:
      // в инспекторе: network -> headers
      res.setHeader('Process-Id', pid);
      res.end(serializer(data, req, res));
    })
    .listen(PORT);
}

// native-cp (child-process) --------------------------
// Самый лучший способ из рассмотренных (особенно для балансировки)
// master ---------------
const cp = require('child_process');
const os = require('os');

const pid = process.pid;
const count = os.cpus().length;

console.log(`Master pid: ${pid}`);
console.log(`Starting ${count} forks`);

for (let i = 0; i < count; ) {
  cp.fork('./worker.js', [++i]); // [++i] - передача ID
}

// worker ---------------
const BASE_PORT = 2000;

const pid = process.pid;
const id = parseInt(process.argv[2], 10); // отдает мастер [++i]
// Способ балансировки:
// номер порта (обычно несколько) присылается клиенту через заголовки или после авторизации
// выдать или в html-странице прислать
const port = BASE_PORT + id - 1;
const user = { name: 'jura', age: 22 };

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, par, client) => JSON.stringify(fn(client, par)),
};

console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
http
  .createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    res.setHeader('Process-Id', process.pid);
    res.end(serializer(data, req, res));
  })
  .listen(port);

// ip-sticky -------------------------------------------
// Приклеивание по IP (еще один способ балансировки (не лучший))
// За каждым клиентом закрепляется один процесс
const net = require('net');
const cpus = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master pid: ${process.pid}`);
  console.log(`Starting ${cpus} forks`);

  const workers = [];

  for (let i = 0; i < cpus; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }

  // Делаем из IP одно число
  const ipToInt = ip => ip.split('.').reduce((res, item) => (res << 8) + +item, 0);

  const balancer = socket => {
    const ip = ipToInt(socket.remoteAddress);
    // Так получится, что один IP будет всегда связан с одним и тем же процессом
    const id = Math.abs(ip) % cpus; // дает примерно равномерное распределение между всеми процессами
    const worker = workers[id];
    if (worker) worker.send({ name: 'socket' }, socket);
  };

  const server = new net.Server(balancer);
  server.listen(2000);
} else {
  console.log(`Worker pid: ${process.pid}`);

  const dispatcher = (req, res) => {
    console.log(req.url);
    res.setHeader('Process-Id', process.pid);
    res.end(`Hello from worker ${process.pid}`);
  };

  const server = http.createServer(dispatcher);
  server.listen(null); // слушать межпроцессовое взаимодействие

  // ловим сообщение из мастера
  process.on('message', (message, socket) => {
    if (message.name === 'socket') {
      socket.server = server;
      server.emit('connection', socket); // как-только ловит это событие, то вызывает dispatcher
    }
  });
}
