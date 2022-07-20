# Cookie в Laravel

`Cookie` — файл с служебными данными (не более 4096 байтов), хранящийся на стороне клиента.

Настройка cookie в `config\session.php`: 

- `path` -  путь, с которым будут связаны cookie;
- `domain` — интернет-адрес, с которым будут связаны cookie (.env: SESSION_DOMAIN);
- `secure` — true - отправлять при HTTPS, если false - HTTP или HTTPS (.env: SESSION_SECURE_COOKIE);
- `http_only` — true - доступны лишь серверам, если false — также и клиентским веб-сценариям; 
- `same_site` — отправка сторонним сайтам:
    - '`none`' — разрешает отправку;
    - '`lax`' — разрешает только при переходе по гиперссылкам; 
    - '`strict`' — полностью запрещает отправку;
    - `null` — как задано в браузере;

Все cookie шифруются. Для обработки в клиентских веб-сценариях, следует `пометить` эти cookie как не подлежащие шифрованию, занеся имена в массив `$except` посредника `App\Http\Middleware\EncryptCookies`:

```php
class EncryptCookies extends Middleware {
    protected $except = ['counter', 'open_key'];
} 
```

## Методы для работы с cookie 

1) Методы класса `Response`:
- `cookie(...)` - создание и получение
- `hasCookie(...)` - true, если указанный cookie существует;

```php
    $counter = 0;
    return response()->view('index', ['bbs' => $bbs])
        ->cookie('counter', $counter, 60 * 24); 
```

2) Методы фасада `Cookie`:
- `make(...)` — создает cookie и возвращает его объект;
- `forever(...)` — создает объект cookie с временем сущ-я 5 лет;
- `queue(...)` — помещает cookie в очередь;
- `hasQueued(...)` — true, если указанный cookie присутствует в очереди;
- `unqueue(...)` — удаляет из очереди указанный cookie;
- `get()` — аналогичен `Response::cookie()`;
- `has()` — аналогичен `Response::hasCookie()`;
-  `forget()` - удалить указанный cookie (устанавливает время существования в –5 лет);

```php
use Illuminate\Support\Facades\Cookie;
    // . . .
    $cookie = Cookie::make('counter', 0, 60 * 24);
    Cookie::queue($cookie); 
```
