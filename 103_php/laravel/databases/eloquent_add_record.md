### Добавление записей в БД с помощью "artisan tinker"

### Использование связи "один ко многим"

```bash

>>> use Illuminate\Support\Facades\Hash;
>>> use App\Models\User;
>>>  $user = User::create(['name' => 'admin',
... 'email' => 'admin@bboard.ru',
... 'password' => Hash::make('admin')]);

```

# 1-й способ

```bash

>>> use App\Models\Bb;
>>> $bb = new BB();
>>> $bb->title = 'Пылесос';
>>> $bb->content = 'Старый, без шланга';
>>> $bb->price = 500;
>>> $user->bbs()->save($bb);

```

# 2-й способ

```bash

>>> $user->bbs()->create(['title' => 'Грузовик',
... 'content' => 'Грузоподъмность - 5 т',
... 'price' => 1000000]);

```

# 3-й способ

```bash

>>> $bb = new Bb(['title' => 'Шкаф',
... 'content' => 'Совсем новый, полированный, двухстворчатый',
... 'price' => 1000]);
>>> $bb->user()->associate($user);
>>> $bb->save();

```
