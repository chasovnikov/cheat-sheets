### Конфигурация окружения

Все конфиг-файлы хранятся в папке config

- создать файл .env по примеру файла .env.example

```php
    // Получение конфигурации окружения
    $debug = env('APP_DEBUG', false);     # или из $_ENV
    // или
    $value = config('app.timezone', 'Asia/Seoul');

    // установить значения конфигурации во время выполнения скрипта
    config(['app.timezone' => 'America/Chicago']);


    // Определение текущего окружения:
    $environment = App::environment();

    if (App::environment('local')) {
        // Локальное окружение ...
    }

    if (App::environment(['local', 'staging'])) {
        // Окружение либо локальное, либо промежуточное ...
    }
```

```bash
    # кешировать все конфигурационные файлы
    # не следует запускать во время локальной разработки
    php artisan config:cache
```

---

### Режим отладки

Для локальной разработки - должен быть включен (.env: APP_DEBUG=true)
В эксплуатационном режиме - должен быть выключен (.env: APP_DEBUG=false)

---

### Режим обслуживания (отображение спец. страницы о тех. работах)

Выбрасывает HttpException с 503 кодом состояния

Определить свой шаблон режима обслуживания в resources/views/errors/503.blade.php

```bash
    # включить режим обслуживания
    php artisan down

    # отключение режима обслуживания
    php artisan up

    # обновлять страницу через каждые 15 сек
    php artisan down --refresh=15

    # установить значение в Retry-After HTTP
    php artisan down --retry=60

    # указать токен для обхода режима обслуживания
    # использовать: https://example.com/1630542a-246b-4b66-afa1-dd72a4c43515
    php artisan down --secret="1630542a-246b-4b66-afa1-dd72a4c43515"

    # предварительный рендеринг шаблона (отобразит в самом начале цикла запроса)
    php artisan down --render="errors::503"

    # перенаправить все запросы на URI /
    php artisan down --redirect=/
```

Альтернативы режиму обслуживания: Laravel Vapor и Envoyer
