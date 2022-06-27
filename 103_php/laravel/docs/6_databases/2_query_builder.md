
PDO не поддерживает привязку имен столбцов

```php
// извлечь все записи
$all = DB::table('users')->get();

// извлечь одну строку
$first = DB::table('users')->where('name', 'John')->first();

// извлечь одно значение из записи
$value = DB::table('users')->where('name', 'John')->value('email');

// по id
$byId = DB::table('users')->find($id);

// значения одного столбца
$pluck = DB::table('users')->pluck('title'); // ...->pluck('title', 'name')

// Фрагментация результатов
// Для обновления используйте chunkById()
DB::table('users')->chunk(100, function ($users) {
    foreach ($users as $user) {
        //
    }
    return false;  // остановить обработку дальнейших фрагментов
});

// Ленивая потоковая передача результатов
// Для обновления используйте lazyById()
DB::table('users')->lazy()->each(function ($user) {
    //
});

// Агрегатные ф-ии
$users = DB::table('users')->count(); 
$price = DB::table('orders')->max('price');
$price = DB::table('orders')->avg('price');

// Определение наличия записей
if (DB::table('orders')->where('finalized', 1)->exists()) {
    // ...
} 
if (DB::table('orders')->where('finalized', 1)->doesntExist()) {
    // ...
}

// Select
$query = DB::table('users')->select('name', 'email as user_email');
$users = $query->addSelect('age')->get();

// Уникальные записи
$users = DB::table('users')->distinct()->get();

// Необработанные выражения
// DB::raw()
$users = DB::table('users')
    ->select(DB::raw('count(*) as user_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();

// selectRaw
$orders = DB::table('orders')
    ->selectRaw('price * ? as price_with_tax', [1.0825])
    ->get();

// whereRaw / orWhereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw / orHavingRaw
$orders = DB::table('orders')
    ->select('department', DB::raw('SUM(price) as total_sales'))
    ->groupBy('department')
    ->havingRaw('SUM(price) > ?', [2500])
    ->get();

// groupByRaw
$orders = DB::table('orders')
    ->orderByRaw('updated_at - created_at DESC')
    ->get();

// Inner Join
$users = DB::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'contacts.phone', 'orders.price')
    ->get();

// leftJoin
$users = DB::table('users')
    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();

// rightJoin
$users = DB::table('users')
    ->rightJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();

// crossJoin
$sizes = DB::table('sizes')
    ->crossJoin('colors')
    ->get();

// Расширенные объединения
DB::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')->orOn(/* ... */);
    })->get();

// union
$users = DB::table('users')
            ->whereNull('last_name')
            ->union( DB::table('users')->whereNull('first_name') )
            ->get();

// Отладка
DB::table('users')->where('votes', '>', 100)->dd(); 
DB::table('users')->where('votes', '>', 100)->dump();

// ...
```