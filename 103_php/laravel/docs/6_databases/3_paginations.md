### Нумерацией страниц со смещением

```sql
select * from users order by id asc limit 15 offset 15;
```

```php

// подсчитывает общее количество записей
$users = User::paginate($perPage );
$users = DB::table('users')->paginate($perPage ); // $perPage  - кол-во элем-в на странице

// только простые ссылки "Next" и "Previous" без подсчета всех записей
$users = User::simplePaginate($perPage );

// отобразить два отдельных разбиения на страницы (использ-ся $pageName)
$users = User::paginate($perPage = 15, $columns = ['*'], $pageName = 'users');

```

### Разбивка на страницы на основе курсора

```sql
select * from users where id > 15 order by id asc limit 15;
```

Курсор - закодированная строка, содержащая местоположение след-го запроса
http://localhost/users?cursor=eyJpZCI6MTUsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0

Преимущества по сравнению со смещенной разбивкой на страницы:
- Для больших наборов данных обеспечит лучшую производительность, если столбцы для "order by" будут проиндексированы.
- Пагинация со смещением может пропускать записи или показывать дубликаты, если результаты были недавно добавлены или удалены со страницы.

Ограничения:
- Порядок д. б. основан на одном или неск-их уникальн. столбцах. Столбцы с null не поддерживаются.
- Выражения в "order by" должны иметь псевдонимы и добавлены в "select".

```php
$paginator = User::cursorPaginate($perPage );
$paginator->count()	// количество элементов для текущей страницы
$paginator->cursor()	// текущий экземпляр курсора
$paginator->getOptions()	// параметры разбивки на страницы
$paginator->hasPages()	// проверка на достаточное кол-во на разбиение
$paginator->hasMorePages()	// Определите, есть ли еще элементы в хранилище данных
$paginator->getCursorName()	// переменная строки запроса для хранения курсора
$paginator->items()	// элементы для текущей страницы
$paginator->nextCursor()	// экземпляр курсора для следующего набора элементов
$paginator->nextPageUrl()	// URL для следующей страницы
$paginator->onFirstPage()	// Определите, находится ли пагинатор на первой странице
$paginator->onLastPage()	// Определите, находится ли пагинатор на последней странице
$paginator->perPage()	// Количество элементов, которые должны отображаться на странице
$paginator->previousCursor()	// экземпляр курсора для предыдущего набора элементов
$paginator->previousPageUrl()	// URL-адрес предыдущей страницы
$paginator->setCursorName()	// Задать переменную строки запроса для хранения курсора
$paginator->url($cursor)	// URL-адрес для данного экземпляра курсора

```

### Создание пагинатора вручную

Можно сделать это, создав экземпляр одно этих классов: 
- Illuminate\Pagination\LengthAwarePaginator (соотв-ет методу paginate),
- Illuminate\Pagination\Paginator            (соотв-ет методу simplePaginate) - следует вручную "нарезать" массив результатов,
- Illuminate\Pagination\CursorPaginator      (соотв-ет методу cursorPaginate),

```php
$users = User::paginate(15);

// чтобы пагинатор генерировал ссылки, подобные http://example.com/admin/users?page=N
$users->withPath('/admin/users');

// Добавление значений строки запроса
$users->appends(['sort' => 'votes']);

// добавить все значения строки запроса текущего запроса к ссылкам пагинации
$users->withQueryString();

// Добавление фрагментов хэша
$users->fragment('users');

// Методы экземпляра Paginator / LengthAwarePaginator
$paginator->count()	// Получите количество элементов для текущей страницы.
$paginator->currentPage()	// Получите номер текущей страницы.
$paginator->firstItem()	// Получите номер результата первого элемента в результатах.
$paginator->getOptions()	// Получите параметры разбивки на страницы.
$paginator->getUrlRange($start, $end)	// Создайте диапазон URL-адресов для разбивки на страницы.
$paginator->hasPages()	// Определите, достаточно ли элементов для разделения на несколько страниц.
$paginator->hasMorePages()	// Определите, есть ли еще элементы в хранилище данных.
$paginator->items()	// Получите элементы для текущей страницы.
$paginator->lastItem()	// Получите номер результата последнего элемента в результатах.
$paginator->lastPage()	// Получите номер страницы последней доступной страницы. (Недоступен при использовании simplePaginate).
$paginator->nextPageUrl()	// Получите URL для следующей страницы.
$paginator->onFirstPage()	// Определите, находится ли разбиение на страницы на первой странице.
$paginator->perPage()	// Количество элементов, которые должны отображаться на странице.
$paginator->previousPageUrl()	// Получите URL-адрес предыдущей страницы.
$paginator->total()	// Определите общее количество совпадающих элементов в хранилище данных. (Недоступен при использовании simplePaginate).
$paginator->url($page)	// Получите URL-адрес для заданного номера страницы.
$paginator->getPageName()	// Получите переменную строки запроса, используемую для хранения страницы.
$paginator->setPageName($name)	// Задайте переменную строки запроса, используемую для хранения страницы.
```

### Отображение результатов разбивки на страницы

```bash
# разместить представления пагинации в resources/views/vendor/pagination
php artisan vendor:publish --tag=laravel-pagination
```

```php
// отобразит ссылки на остальные страницы
{{ $users->links() }}

// сколько дополнительных ссылок отображается с каждой стороны ссылки текущей страницы
{{ $users->onEachSide(5)->links() }}

// передать имя представления
{{ $paginator->links('view.name', ['foo' => 'bar']) }}


// назначить другой шаблон пагинацци по умолчанию
// AppServiceProvider:
public function boot()
{
    Paginator::defaultView('my-view');

    Paginator::defaultSimpleView('my-view');
}
```

### Использование bootstrap

```php
// AppServiceProvider:
public function boot()
{
    Paginator::useBootstrapFive();
    // или
    Paginator::useBootstrapFour();
}

```