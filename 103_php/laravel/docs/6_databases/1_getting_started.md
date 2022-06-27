
Laravel поддерживает 5 БД: 
    MariaDB, MySQL, PostgreSQL, SQLite, SQL Server

Конфигурация служб БД находится в 
    config/database.php

### Разные соединения для чтения и записи

```php
'mysql' => [
    'read' => [     // для операторов SELECT
        'host' => [
            '192.168.1.1',
            '196.168.1.2',
        ],
    ],
    'write' => [    // для операторов INSERT, UPDATE и DELETE
        'host' => [
            '196.168.1.3',
        ],
    ],
    'sticky' => true, // данные могут быть прочитаны сразу после записи (при том же запросе) из базы для 'write' (для ускорения)
    // ...
]
```
Подключиться к БД вручную

```bash
php artisan db mysql

```

### Выполнение сырых SQL-запросов
```php
// Неименованный параметр подстановки
$sqlStr = 'select * from users where active = ?';
$arParam = [1];

// Именованный параметр подстановки
$sqlStr = 'select * from users where id = :id';
$arParam = ['id' => 1];

DB::select($sqlStr, $arParam);

// Выбор скалярных значений
DB::scalar("select count(case when food = 'burger' then 1 end) as burgers from menu");

DB::insert('insert into users (id, name) values (?, ?)', [1, 'Marc']);

DB::update('update users set votes = 100 where name = ?', ['Anita']);

DB::delete('delete from users');

DB::statement('drop table users');

// без привязки значений
DB::unprepared('update users set votes = 100 where name = "Dries"');


// Использование нескольких подключений к базе данных
$users = DB::connection('sqlite')->select(/* ... */);

// доступ к исходному базовому экземпляру PDO
$pdo = DB::connection()->getPdo();

// ----------------------
class AppServiceProvider
{
    public function boot()
    {
        // Прослушивание событий запроса
        DB::listen(function ($query) {
            // $query->sql;
            // $query->bindings;
            // $query->time;
        });


        // контроль порогового времени запроса (в миллисекундах)
        DB::whenQueryingForLongerThan(500, function (Connection $connection) {
            // Уведомить команду разработчиков...
        });
    }
}
// ----------------------

// Транзакции базы данных
$countRepeat = 1;     // кол-во повторов при возникновении взаимоблокировки
DB::transaction(function () {
    // пример выполнения 2-х связанных операций
    DB::update('update users set votes = 1'); 
    DB::delete('delete from posts');
}, $countRepeat);

// Вручную с использованием транзакций
DB::beginTransaction(); // начать транзакцию вручную
DB::commit();           // совершить транзакцию
DB::rollBack();         // откатить транзакцию
DB::transactionLevel(); // возвращает количество активных транзакций

// Пример:
DB::beginTransaction();
try {
    Bb::where('created_at', '<', '2019-12-31')
        ->update(['publish' => false]);
    Bb::where('created_at', '<', '2017-12-31')->delete();
    DB::commit();
} catch {$e} {
    while (DB::transactionLevel() > 0) {
        DB::rollBack();
    }
} 

```
В транзакциях нужно избегать "неявных коммитов" при использовании методов
DB::statement() и DB::unprepared() 
