
const requestURL = 'https://jsonplaceholder.typicode.com/users';

/**
 * XMLHttpRequest.open(method, url[, async[, user[, password]]]);
 * @param {string} method:
 *      GET     - получение данных
 *      POST    - создание
 *      PUT     - полное обновление элемента
 *      PATCH   - частиное обновление элемента
 *      DELETE  - удаление
 * 
 */


function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest;

        xhr.open(method, url);     // откроет новое соединение

        xhr.responseType = 'json';      // хотим ответ json
        xhr.setRequestHeader('Content-Type', 'applicaton/json'); // для отправки POST
        
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };
        
        // обработка ошибок
        xhr.onerror = () => {
            console.log(xhr.response);
        };
        
        xhr.send( JSON.stringify(body) );     // отправка
    });
}

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const body = {
    name: 'Vasia',
    age: 26,
};
sendRequest('POST', requestURL, body)
    .then(data => console.log(data))
    .catch(err => console.log(err));