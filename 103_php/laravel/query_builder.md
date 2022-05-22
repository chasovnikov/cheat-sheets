## Сопоставление SQL с запросами QueryBuilder от Laravel. Конспект

```php

// select * from `users`
$users = User::all();

// select `id`, `name` from `users`
$users = User::all('id','title');

// select `name`, `email` as `user_email` from `users`
$users = User::select('name', 'email as user_email')->get();

// Выбрать уникальные записи
// select distinct * from `users`
$users = User::distinct()->get();

// Выбрать одну запись
// select * from `users` where `name` = 'John' limit 1
$users = User::where('name', 'John')->first();

// Выбрать значение одного столбца
// select `email` from `users` where `name` = 'John' limit 1
$users = User::where('name', 'John')->value('email');

// Поиск по id
// select * from `users` where `users`.`id` = 3 limit 1
$users = User::find(3);

// Получение списка значений столбцов
// select `name` from `users`
$users = User::pluck('name');

// Результаты фрагментации
// select * from `users` order by `id` asc limit 100 offset 0
$users = User::orderBy('id')->chunk(100, function ($users) {
            foreach ($users as $user) {
                echo $user->name;
            }
        });

// Обновление записей через метод "chunkById"
// select * from `users` where `active` = 0 order by `id` asc limit 100
// update `users` set `active` = 1, `users`.`updated_at` = '2022-05-20 04:18:44' where `id` = 1
// ...
$users = User::where('active', false)
    ->chunkById(100, function ($users) {
        foreach ($users as $user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update(['active' => true]);
        }
    });

```

### Агрегаты

```php
// select count(*) as aggregate from `users`
$users = User::count();

// select max(`age`) as aggregate from `users`
$users = User::max('age');

// и др.
```

### Определение наличия записей

```php
// select exists(select * from `users` where `active` = 0) as `exists`
$users = User::where('active', 0)->exists();
$users = User::where('active', 0)->doesntExist();

// select `name`, `email` as `user_email` from `users`
$users = User::select('name', 'email as user_email')->get();
```
