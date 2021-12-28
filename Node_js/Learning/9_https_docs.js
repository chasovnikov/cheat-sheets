// HTTPS - это протокол HTTP через TLS / SSL

// Class: https.Agent ----------------------
// отвечает за управление сохранением и повторным использованием соединения для клиентов
// new Agent([options])

// Объект агента для HTTPS, аналогичный http.Agent.
// См. Https.request () для получения дополнительной информации

// Event: 'keylog' - генерируется, когда ключевой материал генерируется или
//      принимается соединением, управляемым этим агентом
https.globalAgent.on('keylog', (line, tlsSocket) => {
    fs.appendFileSync('/tmp/ssl-keys.log', line, { mode: 0o600 });
});

// Class: https.Server -------------------
// Расширяет: net.Server (используется для создания сервера TCP или IPC)
server.close([callback]); // Останавливает сервер от приема новых подключений
server.headersTimeout; // Ограничьте время ожидания парсером получения полных заголовков HTTP
server.listen(); //
server.maxHeadersCount; //
server.requestTimeout; //
server.setTimeout(msecs, callback); //
server.timeout; //
server.keepAliveTimeout; //
https.createServer(options, requestListener); //
https.get(options, callback); //
https.get(url, options, callback); //
https.globalAgent; //
https.request(options, callback); //
https.request(url, options, callback); //

// ---------------------------------------

https.createServer(options, requestListener);
https.get(options, callback);
https.get(url, options, callback);
https.globalAgent;
https.request(options, callback);
https.request(url, options, callback);
