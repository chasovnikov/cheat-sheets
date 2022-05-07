```php

$users = DB::table('users')->get(); // Illuminate\Support\Collection
foreach ($users as $user) {
    echo $user->name;
}

// получить одну строку
$user = DB::table('users')->where('name', 'John')->first();

// получить одну строку по значению id = 3
$user = DB::table('users')->find(3);

// извлечь одно значение из записи
$email = DB::table('users')->where('name', 'John')->value('email');

// экземпляр, содержащий значения одного столбца
$titles = DB::table('users')->pluck('title');

// извлекает небольшой фрагмент результатов за раз
DB::table('users')->orderBy('id')->chunk(100, function ($users) {
    foreach ($users as $user) {
        //
    }
    // return false;  // остановить дальнейшую обработку фрагментов
});

// Если нужно обновлять записи во время фрагментации
DB::table('users')->where('active', false)->chunkById(100, function ($users) {
    foreach ($users as $user) {
        DB::table('users')
            ->where('id', $user->id)
            ->update(['active' => true]);
    }
});



```

### Потоковая передача результатов лениво

```php

DB::table('users')->orderBy('id')->lazy()->each(function ($user) {
    //
});

// Если нужно обновлять записи во время фрагментации при ленивой передачи
DB::table('users')->where('active', false)->lazyById()->each(function ($user) {
    DB::table('users')
        ->where('id', $user->id)
        ->update(['active' => true]);
});
```

### Агрегаты

```php

$users = DB::table('users')->count();
$price = DB::table('orders')->max('price');
$price = DB::table('orders')->where('finalized', 1)->avg('price');

```
