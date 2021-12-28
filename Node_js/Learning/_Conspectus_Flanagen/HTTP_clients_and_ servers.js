const http = require('http');
const https = require('https');

http.get(); // частный случай http.request
https.get(); // частный случай https.request

// В следующей функции postJSON() иллюстрируется применение https.request() для
// выдачи HTTPS-запроса POST, который включает тело запроса в формате JSON
function postJSON(host, endpoint, body, port, username, password) {
    return new Promise((resolve, reject) => {
        let bodyText = JSON.stringify(body);

        let requestOptions = {
            method: 'POST',
            host: host,
            path: endpoint,
            headers: {
                'Content-Type': 'application/j son',
                'Content-Length': Buffer.byteLength(bodyText),
            },
        };
        if (port) {
            requestOptions.port = port;
        }
        if (username && password) {
            requestOptions.auth = `${username}:${password}`;
        }
        let request = https.request(requestOptions);
        request.write(bodyText);
        request.end();

        request.on('error', е => reject(е));
        request.on('response', response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));
                // В этом случае нас не интересует тело ответа, но мы
                //не хотим, чтобы оно оставалось где-то в буфере,
                //а потому переводим поток в режим извлечения данных,
                //не регистрируя обработчик для событий "data",
                // так что тело отбрасывается.
                // вызывает явно приостановленный поток Readable
                response.resume();
                return;
            }
            response.setEncoding('utf8');
            let body = '';
            response,
                on('data', chunk => {
                    body += chunk;
                });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (е) {
                    reject(е);
                }
            });
        });
    });
}

// создает простой HTTP-сервер, обслуживающий статические файлы в локальной файловой системе
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
function serve(rootDirectory, port) {
    let server = new http.Server();
    server.listen(port);
    console.log('Listening on port', port);
    server.on('request', (request, response) => {
        // Получить порцию пути URL запроса, игнорируя
        // любые параметры, добавленные к запросу,
        let endpoint = url.parse(request.url).pathname;
        // Если запрос был к "/test/mirror", тогда послать запрос
        // обратно в том же виде. Полезно, когда нужно видеть
        // заголовки и тело запроса,
        if (endpoint === '/test/mirror') {
            // Установить заголовок ответа.
            response.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            // Указать код состояния ответа,
            response.writeHead(200); // 200 OK
            // Начать тело ответа с запроса.
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);
            // Вывести заголовки запроса.
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i + 1]} \r\n`);
            }
            // Закончить заголовки дополнительной пустой строкой,
            response.write('\r\n');
            // Теперь необходимо скопировать тело запроса в тело ответа.
            // Поскольку они оба являются потоками, можно использовать
            // канал.
            request.pipe(response);
        }
        //В противном случае обслужить файл из локального каталога,
        else {
            // Отобразить конечную точку на файл в локальной
            // файловой системе.
            let filename = endpoint.substring(1); // Убрать ведущий
            // символ "/".
            //Не разрешать "../" в пути, потому что это приведет к брепв
            //в системе безопасности, позволяющей обслуживать что угодно
            // вне корневого каталога,
            filename = filename.replace(/.\.\//g, '');
            // Преобразовать относительное имя файла в абсолютное,
            filename = path.resolve(rootDirectory, filename);
            // Выяснить тип содержимого файла на основе его расширения,
            let type;
            switch (path.extname(filename)) {
                case '.html':
                case '.htm':
                    type = 'text/html';
                    break;
                case '.js':
                    type = 'text/javascript';
                    break;
                case '.css':
                    type = 'text/css';
                    break;
                case '.png':
                    type = 'image/png';
                    break;
                case '.txt':
                    type = 'text/plain';
                    break;
                default:
                    type = 'application/octet-stream';
                    break;
            }
            let stream = fs.createReadStream(filename);
            stream.once('readable', () => {
                // Если поток становится читабельным, тогда установить
                // заголовок Content-Type и состояние 200 ОК. Затем
                // организовать канал между читаемым потоком и потоком
                // ответа. Канал автоматически вызовет response.end(),
                // когда поток закончится,
                response.setHeader('Content-Type', type);
                response.writeHead(200);
                stream.pipe(response);
            });
            stream.on('error', err => {
                // Если при попытке открыть поток мы получаем ошибку,
                //то файл, вероятно, не существует или не допускает
                // чтение. Послать простой текстовый ответ 404 Not Found
                //с сообщением об ошибке.
                response.setHeader('Content-Type', 'text/plain;charset=UTF-8');
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}
