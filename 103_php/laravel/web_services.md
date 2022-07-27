# Веб-сервисы в Laravel (REST API, RESTful). Конспект

Веб-сервисы - это серверные программы, выдающие данные в каком-либо формате, обычно JSON.
Строятся по принципам REST (Representational State Transfer, передача „самоописываемого“ состояния -  архитектурный стиль):

1) Ресурс идентифицируются интернет-адресом (пример: `api/rubrics`).
2) Действия с данными выполняются HTTP-методами (GET, POST, DELETE, PUT/PATCH).
3) Состояние клиента хранится на стороне клиента.

Ко всем маршрутам добавляется префикс /api.

## Выдача данных в формате JSON

Варианты отправки клиенту данных в формате JSON:

1) Вернуть из контроллера результат вызова `toJson(...)`:
```php
return Rubric::all()->toJson(JSON_UNESCAPED_UNICODE);
```

```php
class Rubric extends Model {
    // включить указанные связанные записи в состав выдачи
    protected $with = ['parent'];
    // . . .
} 
```

2) Использовать `toArray()`.

3) Если не нужны связанные записи — использовать метод `attributesToArray()`.

4) Привести к строковому типу:

```php
return (string) Rubric::all();
```

5) Вернуть непосредственно объект модели или коллекцию.

6) Отправка произвольных данных:
```php
public function rubric(Rubric $rubric) {

    return response()->json($rubric);

    // или JSONP
    return response()->jsonp('RubricFunction', $rubric);

    // или Laravel сам закодирует в JSON
    return ['Apache', 'PHP', 'Laravel'];
}
```

## Задание структуры JSON

- Ограничить состав полей JSON-объекта:

```php
// На уровне модели:

// исключить из JSON
protected $hidden = ['created_at', 'updated_at'];

// включить в JSON
protected $visible = ['created_at'];
```

```php
// На уровне текущего запроса:

// исключить из JSON
return Rubric::all()
    ->makeHidden(['created_at', 'updated_at'])
    ->toJson();

// включить в JSON
return Rubric::all()
    ->makeVisible(['created_at'])
    ->toJson();
```

- Добавить в JSON вычисляемые значения:

```php
class Rubric extends Model { 
    protected $appends = ['parent_name'];

    public function getParentNameAttribute() {
        return $this->parent->name . ' - ' . $this->name;
    }
}
```

- Добавить в JSON заданные поля:
```php
return $rubric->append('parent_name')->toJson(); 
```
`setAppends(...)` - перезатирает поля, заданные через `apend()`, `setAppends()`.

---
## Ресурсы 
Ресурс кодирует в JSON объект модели. Позволяет задавать произвольные имена, коллекции связанных записей, и др.

```bash
# Создать класс-ресурс в папке app/Http/Resources
php artisan make:resource <имя класса ресурса> [--collection]
# --collection - будет создана ресурсная коллекция
```
Ресурсный JSON, содержит единственное свойство `data` (можно переименовать или разложить):
```json
{"data":{
 "id":11,"name":"Бытовая"}
}
```

### Задание структуры ресурсных JSON

```php
public function toArray($request) {

    return [
        // 1) добавить значение в JSON при условии
        'bbs_count' => $this->when($this->bbs()->exists(), $this->bbs()->count()),

        // 2) добавить несколько значений при условии
        $this->mergeWhen($this->bbs()->exists(), [
            'has_bbs' => true,
            'bbs_count' => $this->bbs()->count()
        ]),

        // 3) единичная запись
        'parent' => new RubricResource($this->parent),

        // 4) коллекция записей
        'bbs' => new BbResourceCollection($this->bbs),

        // 5) значения из связующей таблицы
        'count' => $this->pivot->cnt,

        // 6) добавить поле, если удастся его получить
        'count' => $this->whenPivotLoaded('machine_spare',
            function () {
                return $this->pivot->cnt;
            }
        ),

        // 7) ... плюс указать имя поля 'connector'
        'count' => $this->whenPivotLoadedAs('connector', 'machine_spare',
            function () {
                return $this->connector->cnt;
            }
        ),

        // 8) произвольные данные
        'powered_by' => 'Laravel', 
    ]; 
}
```

### Дополнительные параметры ресурсов
```php
// Переименовать свойство "data" на "rubric":
public static $wrap = 'rubric';
```
или
```php
class AppServiceProvider extends ServiceProvider {
    // . . .
    public function boot() {
        // Переименовать свойство "data" на "rubric":
        RubricResource::wrap('rubric');

        // или убрать обёртку "data"
        MachineResource::withoutWrapping(); 
    }
} 
```

```php
// Указать заголовки, которые будут добавлены в ответ:
public function withResponse($request, $response) {
    $response->header('X-Data-Kind', 'rubric');
}
```

### Использование ресурсов 

```php
// В контроллере
public function show(Rubric $rubric) {
    return new RubricResource($rubric)
        ->additional(['powered_by' => 'Laravel'])
        ->response()    // если нужно добавить заголовки
        ->header('X-Data-Kind', 'rubric'); 
}
```

---
## Ресурсные коллекции

```php
// В контроллере
public function index() {
    // кодировать коллекцию записей
    return RubricResource::collection(Rubric::all());
} 
```
Преобразования в формат JSON отдельных записей:
```php
class RubricResourceCollection extends ResourceCollection {
    public $collect = 'App\Http\Resources\RubRes';
    // . . .
} 
```

### Пагинация в ресурсных коллекциях

