
const http = require('http');

const users = {
    marcus: {name : 'Marcus', city: 'Rome', born: 121},
    mao: {name : 'mao', city: 'Shaoshan', born: 1893},
};

const routing = {
    '/api/user':     name => users[name],
    '/api/userBorn': name => users[name].born,
};

http.createServer((req, res) => {
    const url = req.url.split('/');
    const param = url.pop();
    const method = routing[url.join('/')];
    const result = method ? method(param) : { error: 'not found'};
    res.end(JSON.stringify(result));
}).listen(8000);


// api client (код на клиенте)
// const http = require('http');
const ajax = (base, methods) => {
    const api = {};
    for (const method of methods) {
        api[method] = (...args) => {
            const callback = args.pop;
            const url = base + method + '/' + args.join('/');
            console.log(url);
            http.get(url, res => {
                if (res.statusCode !== 200) {
                    callback(new Error(`Status Code: ${res.statusCode}`));
                    return;
                }
                const buffer = [];
                res.on('data', chunk => buffer.push(chunk));
                res.on('ebd', () => callback(null, JSON.parse(buffer.join()))) 
            });
        }
    }
}

// Usage
const api = ajax(
    'http://localhost:8000/api/',
    ['user', 'userBorn'],
);

api.user('marcus', (err, data) => {
    if (err) throw err;
    console.dir({ data });
});

api.userBorn('mao', (err, data) => {
    if (err) throw err;
    console.dir({ data });
});