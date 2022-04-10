Middlewar обеспеч. проверку и фильтрацию HTTP-запросов (может выполнять задачи до или после передачи запроса в приложение)

Мидлвары - серия "слоев" HTTP-запросов, которые должны пройти, прежде чем они попадут в ваше приложение

```bash
    # создать мидлвар в app/Http/Middleware
    php artisan make:middleware EnsureTokenIsValid
```

Мидлвары регистрир-ся в app/Http/Kernel.php:

```php
    class Kernel extends HttpKernel
    {
        // список глобальных мидлваров, запускающихся при каждом запросе
        protected $middleware = [
            // ...
        ];

        // группы мидлваров
        protected $middlewareGroups = [
            // ...
        ];

        // список мидлваров для роутов
        protected $routeMiddleware = [
            // ...
        ];

        // задать свой порядок выполнения мидлваров
        protected $middlewarePriority = [
            // ...
        ];
    }

    // использование мидлвара
    Route::get('/', function () {
        //
    })->middleware(['first', 'second']);
```

```php
    // выполнит некоторую задачу до того, как запрос будет обработан приложением
    public function handle($request, Closure $next)
    {
        // Perform action

        return $next($request);
    }

    // будет выполнять свою задачу после обработки запроса приложением
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Perform action

        return $response;
    }
```
