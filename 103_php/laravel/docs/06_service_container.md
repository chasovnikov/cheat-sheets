Service Container (SC) - инструмент управления зависимостями классов

Используется внедрение зависимости через аргументы конструктора или сеттер

```php
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
```

### Неконфигурируемое внедрение

```php
    class Service
    {
        //
    }

    Route::get('/', function (Service $service) {
        //
    });
```

### Связывание

```php
    // используя метод bind
    $this->app->bind(Transistor::class, function ($app) {
        return new Transistor($app->make(PodcastParser::class));
    });

    // через фасад App
    App::bind(Transistor::class, function ($app) {
        // ...
    });

    // связ. класс, кот. должен быть извлечен только один раз
    $this->app->singleton(Transistor::class, function ($app) {
        return new Transistor($app->make(PodcastParser::class));
    });

    // Связывание singleton с заданной областью действия
    $this->app->scoped(Transistor::class, function ($app) {
        return new Transistor($app->make(PodcastParser::class));
    });

    // привязать существующий экземпляр
    $service = new Transistor(new PodcastParser);
    $this->app->instance(Transistor::class, $service);

    // связывание интерфейсов и реализаций
    $this->app->bind(EventPusher::class, RedisEventPusher::class);
```

```php

```
