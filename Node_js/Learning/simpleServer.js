const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {        // заголовки
        // 'Content-type': 'text/html; charset=utf-8'
        'Content-type': 'application/json'
    });
    if (req.url === '/users') {
        return res.end( JSON.stringify([
            {id: 1, name: 'sdasd'}
        ]));
    }
    if (req.url === '/posts') {
        return res.end('POSTS');
    }
    res.end('Сервер работает');
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));