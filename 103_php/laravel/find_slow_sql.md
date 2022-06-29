### Поиск медленных запросов к будут

```php
// AppServiceProvider:
public function boot()
{
    DB::listen(function ($query) {
        $stackTrace = collect(debug_backtrace())->filter(function ($trace) {
            return !str_contains($trace['file'], 'vendor/');
        });
        
        dd($stackTrace);
    });
}

```

Логирование:

```php
public function boot()
{
    DB::listen(function ($query) {
        $location = collect(debug_backtrace())->filter(function ($trace) {
            return !str_contains($trace['file'], 'vendor/');
        })->first(); // берем первый элемент не из каталога вендора
        $bindings = implode(", ", $query->bindings); // форматируем привязку как строку
        Log::info("
               ------------
               Sql: $query->sql
               Bindings: $bindings
               Time: $query->time
               File: ${location['file']}
               Line: ${location['line']}
               ------------
        ");
    });
}

```