Точка входа - public/index.php

- index.php загружает автозагрузчик от Composer и созд. экземпляр приложения
- входящий запрос отправляется либо в HTTP/Kernel, либо Console/Kernel
- ...

### Service Providers

Отвечают за начальную загрузку всех компонентов.

- создание экземпляров всех провайдеров из config/app.php
- вызов метода register всех провайдеров
- вызов метод boot каждого из пров-в

### Маршрутизация

App\Providers\RouteServiceProvider загружает файлы маршрутов из routes/
