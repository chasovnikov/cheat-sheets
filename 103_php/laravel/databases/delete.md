
## Eloquent: Удаление записи в БД. Конспект

Варианты:

```php
// 1)
$user = User::find(1);
$user->delete();

// 2)
User::destroy(1);
User::destroy([1, 2, 3]);
User::destroy(1, 2, 3);

// 3)
$affectedRows = User::where('votes', '>', 100)->delete();
```