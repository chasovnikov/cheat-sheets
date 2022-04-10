CSRF - межсайтовая подделка запроса

Laravel автоматически генерирует CSRF "токен" для каждого активного сеанса пользователя (изменяется при каждом восстановлении сеанса)

```php
    // Доступ к CSRF-токену тек.сессии:
    $token = $request->session()->token();
    // или
    $token = csrf_token();

    // В каждую POST-форму нужно включать скрытое поле с токеном.
    <form method="POST" action="/profile">
        @csrf
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
    </form>
```

Мидлвар, отвечающий за проверку токена:
App\Http\Middleware\VerifyCsrfToken

### Исключение URI из CSRF Protection

```php
    class VerifyCsrfToken extends Middleware
    {
        // исключить маршруты, добавив их URI в $except
        protected $except = [
            'stripe/*',
        ];
    }
```

### X-CSRF-ТОКЕН

В дополнение к проверке токена CSRF:

```php
    <meta name="csrf-token" content="{{ csrf_token() }}">
```
