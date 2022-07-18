# Работа с очередями в Laravel (конспект).

## Настройка подсистемы очередей 

В файле `config\queue.php`:

- `beanstalkd` — «легкий» сервер очередей (https://beanstalkd.
github.io/). Требуется установка: 

```bash
composer require pda/pheanstalk ~4.0 
```

- `sqs` — служба Amazon SQS. Требуется установка: 

```bash
composer require aws/aws-sdk-php ~3.0 
```
- `sync` — задания выполняются немедленно. Используется только при отладке;
- `null` — задания не выполняются. Используется только при отладке;
- `retry_after` - макс. время выполнения задания (в секундах);
- `block_for` — время между опросами базы данных на предмет появления задания;
- `failed` — настройки таблицы, хранящей список проваленных заданий;
- `dynamodb` — нереляционная база данных Amazon DynamoDB;
- `after_commit` - true - будет ждать, пока не будут зафиксированы транзакции (без транзакций задание будет отправлено немедленно).

```php
'redis' => [
    // ...
    'connection' => 'default', // из config/database.connections
    'retry_after' => 90, // макс. время выполнения задания (в секундах)
],
```

Проверить database драйвер в файле `.env`:
```
QUEUE_CONNECTION=database
```

## Создание очереди

```bash
# создать таблицу в БД
php artisan queue:table

# Если нужно отдельно создать таблицу проваленных заданий
php artisan queue:failed-table 
 
php artisan migrate
```

Если задания планируется хранить в другой базе данных, придется внести правки в код миграций.

Создать задание (в папке `app/Jobs`):
```bash
php artisan make:job <имя класса задания> [--sync] 

# sync - создать неотложное задание
```

## Особенности задания-класса
1) Реализует интерфейс `Illuminate\Contracts\Queue\ShouldQueue`, помечающий класс как
отложенное задание.

2) Включает следующие трейты:
- `Illuminate\Bus\Queueable` — сериализует объект задания и записывает в очередь
- `Illuminate\Queue\SerializesModels` — сериализует объекты моделей, хранящихся в свойствах объекта задания (можно удалить)
- `Illuminate\Foundation\Bus\Dispatchable` — статические методы, отдающие команды на выполнение задания; 
- `Illuminate\Queue\InteractsWithQueue` — позволяет заданию взаимодействовать с очередью (можно удалить).

3) Должны присутствовать методы: конструтор и handle().

4) Если задания должны быть уникальными, то нужно реализовать интерфейс `Illuminate\Contracts\Queue\ShouldBeUnique` 
или `Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing` (чтобы задание было разблокировано перед его обработкой)

Cериализуются и сохраняются в очереди только значения общедоступных и защищенных свойств.

Пример:
```php
class BbDeleteJob implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $bb;

    public function __construct(Bb $bb) {
        // $this->bb = $bb;
        $this->bb = $bb->withoutRelations(); // предотвратить сериализацию отношений
    }

    public function handle() {
        if ($this->bb->pic)
        Storage::delete($this->bb->pic);
        $this->bb->delete(); 
    }
}
// ===========================

// Запустить это задание на выполнение:

use App\Jobs\BbDeleteJob;
. . .
BbDeleteJob::dispatch($bb); 
```

## Свойства заданий-классов

- `failOnTimeout = true` - задание должно быть помечено как неудачное по таймауту;

- `uniqueFor` - время, пока задание будет уникальным;

- `tries` — количество попыток выполнения задания;

- `backoff` — время между попытками выполнить задание (в секундах);

- `maxExceptions` — максимальное количество исключений, которое может быть сгенерировано при выполнении задания;

- `timeout` — максимальное время ожидания завершения выполнения задания (в секундах). Значение timeout должно быть чуть меньше значения retry_after;

- `deleteWhenMissingModels` — true - не выбрасывать исключение при десериализации объекта модели удалённой записи;

## Методы заданий-классов

- `uniqueId()` - определить конкретный "ключ", который делает задание уникальным;

- `uniqueVia()` - использовать другой драйвер для получения уникальной блокировки

- `backoff()` — метод, должен возвращать время между попытками выполнить задание (в секундах);

- `retryUntil()` — метод, должен возвращать время следующей попытки выполнить задание, если текущая попытка завершилась неудачей;

-  `failed()` - метод для обработки проваленного задания.

## Методы для взаимодействие с очередью (трейт InteractsWithQueue)

- `attempts()` — возвращает количество попыток исполнения текущего задания;

- `release([<задержка>=0])` — вновь помещает текущее задание в очередь (задержка в секундах);

- `fail([$exception])` — помечает задание как проваленное;

- `delete()` — удаляет текущее задание из очереди. 

## Неотложные задания (не заносятся в очередь)

Создается с помощью ключа `--sync`:
```bash
php artisan make:job <имя класса задания> --sync
```

- не реализует интерфейс `ShouldQueue`;
- не содержит трейтов `InteractsWithQueue` и `SerializesModels`;
---

## Запуск отложенных заданий-классов (трейт Dispatchable)

- `dispatchSync()` — немедленно запускает текущее задание (как неотложное).
- `dispatchNow()` — немедленно запускает текущее задание (как неотложное).
- `dispatch()` — запускает отложенное задание;
- `dispatchIf()` — запуск при условии;
- `dispatchUnless()` — запуск при условии;
- `dispatchAfterResponse()` — запуск после отправки серверного ответа;

### Методы результата отправки в очередь:

- `afterCommit()` - позволяет временно включить `after_commit=true`;
- `beforeCommit()` - позволяет временно выключить `after_commit=true`;
- `onQueue(<имя очереди>)` — помещает текущее задание в очередь с указанным именем;
- `onConnection(<имя службы очередей>)` — помещает текущее задание в очередь, хранящуюся в службе с указанным именем;
- `delay(<задержка>)` — указывает выполнить задание по истечении заданной задержки.

```php
BbDeleteJob::dispatch($bb)
    ->onQueue('model-processing');
```
---

## Отложенные задания-функции 
В виде функций следует оформлять простые отложенные задания, выполняемые
только в одном месте кода сайта. 

```php
dispatch(function() {
    Mail::to($user)
        ->send(new AlertMail($user->name));
})->onConnection('database')
    ->onQueue('mail')
    ->afterResponse()
    ->catch(function ($e) {
        //  . . .
    }); 
```

---
### Цепочки отложенных заданий
```php
BbDeletePrepareJob::withChain([
    new BbFilesDeleteJob($bb),
    function () use ($bb) { . . . },
    new BbRecordDeleteJob($bb)
])->dispatch(); 
```
Передать конструктору класса ведущего (`BbDeletePrepareJob`) задания какие-либо параметры невозможно.

С попомщью фасада Bus:
```php
Bus::chain([
    new ProcessPodcast,
    function () {
        Podcast::update(/* ... */);
    },
])->onConnection('redis')
    ->onQueue('podcasts')
    ->catch(function (Throwable $e) {
        // A job within the chain has failed...
    })
    ->dispatch();
```

---

## Специфические разновидности отложенных заданий 

Отложенными можно делать `слушатели`, `электронные письма`, `оповещения`, при отправке сохраняя их в очереди, а их отсылку выполнять в отдельном процессе. Для этого они должны

- реализовывать интерфейс `Illuminate\Contracts\Queue\ShouldQueue`;
- содержать трейты `Queueable` и `SerializesModels`.

Свойства и методы:
- `queue` — имя очереди, куда будет помещен текущий слушатель; 
- `connection` — имя службы очередей, где будет храниться текущий слушатель; 
- `delay` — задержка перед выполнением отложенного слушателя (в секундах); 
- `shouldQueue()` — если вернет true, текущий слушатель будет выполняться как отложенный
- `failed()`

Что бы сделать слушатель-функцию отложенной используйте функцию `queueable()`:
```php
use function Illuminate\Events\queueable;
// . . .
Event::listen(queueable(
    function (\Illuminate\Auth\Events\Attempting $event) {
        //  . . .
    }))->onQueue('mail')
        ->onConnection('database')); 

```

Обычное письмо также можно отправить как отложенное, использовав вместо метода `send()` метод `queue()` или `later((<задержка>, ...)`

```php
$mail = new SimpleMail('user')->onQueue('mail')
    ->onConnection('database');
Mail::to('user@bboard.ru')->queue($mail); 
```

Отложенные оповещения (используется метод `viaQueues()`):
```php
class SimpleNotification extends Notification implements ShouldQueue {
    use Queueable, SerializesModels;
    // . . .
    public function viaQueues() {
        return ['mail' => 'mail-queue', 'slack' => 'slack-queue'];
    }
} 
```
---
## События, генерируемые при выполнении отложенных заданий

- Looping (метод `looping()`) — генерируется перед выборкой отложенного задания из очереди

- JobProcessing (`before()`) — перед выполнением отложенного задания

- JobProcessed (`after()`) — после успешного выполнения отложенного задания

- JobExceptionOccurred (`exceptionOccured()`) — когда в коде отложенного задания возникает исключение

- JobFailed (`failing()`) — когда отложенное задание помечается как проваленное

- WorkerStopping (`stopping()`)— перед остановкой процесса-обработчика заданий

Пример:
```php
class EventServiceProvider extends ServiceProvider {
//  . . .
    public function boot() {
        parent::boot();

        Queue::looping(function () {
            while (DB::transactionLevel() > 0) {
                DB::rollBack();
            }
        })
    }
//  . . .
} 
```
---
## Выполнение отложенных заданий 

```bash
php artisan queue:listen [<имя службы очередей>]
[--queue=<имя очереди>]
[--timeout=<максимальное время выполнения задания>]
[--tries=<количество попыток обработки задания>]
[--delay=<задержка перед обработкой проваленного задания>]
[--sleep=<время «сна»>] 
[--memory=<занимаемый объем памяти>] 
[--force] 
```

Обработчик, запущенный командой `queue:listen`, отслеживает изменение модулей с программным кодом сайта и в этом случае автоматически перезапускается.

Обработчик можно запустить и другой командой (обеспечивает более высокую производительность):

```bash
php artisan queue:work [...]
[--once]    # выполнить только одно задание
[--stop-when-empty]     # завершить работу, если очередь «опустела»
```
Обработчик, запущенный командой `queue:work`, не отслеживает правку исходного кода сайта и не перезапускается после этого. Для рестарта использ-ся команда:

```bash
php artisan queue:restart
```

## Работа с проваленными заданиями 

```bash
php artisan queue:failed    # вывести список проваленных заданий

php artisan queue:retry <обозначения заданий>   # попытаться выполнить задания с указанными обозначениями

php artisan queue:forget <идентификатор задания>    # удалить задание с заданным идентификатором

php artisan queue:flush     # удалить все проваленные задания
```

---
## Использование посредников в заданиях

Посредник прикрепляется к заданию путём возврата из метода `middleware()`

```php
public function middleware()
{
    return [new RateLimited];   # RateLimited - посредник
}

```

Не повторять задание (`dontRelease()`):
```php
    return [(new RateLimited('backups'))->dontRelease()];
```

Если вы используете Redis, вы можете использовать `Illuminate\Queue\Middleware\RateLimitedWithRedis`.

Посредник `Illuminate\Queue\Middleware\WithoutOverlapping` позволяет предотвращать дублирование заданий на основе произвольного ключа: 
```php
    return [new WithoutOverlapping($this->user->id)];
```

Указать количество секунд перед повтором (`releaseAfter()`):
```php
    return [(new WithoutOverlapping($this->order->id))->releaseAfter(60)];
```
- `expireAfter()` - определить время истечения блокировки с помощью

---
## Регулирование исключений

Посредник `Illuminate\Queue\Middleware\ThrottlesExceptions` позволяет регулировать исключения.

```php
# 10 - кол-во исключений, 5 - минуты перед повтором после 10-го исключения
    return [(new ThrottlesExceptions(10, 5))->backoff(3)];  # 3 - минуты перед повтором после 1-го исключения
```

```php
    return [(new ThrottlesExceptions(10, 10))->by('key')];  # 'key' -  ключ для кеша
```
Если вы используете Redis, вы можете использовать `Illuminate\Queue\Middleware\ThrottlesExceptionsWithRedis`.

---
---
---

# Пакетирование заданий

Создание таблицы, содержащей метаинформацию о пакетах заданий:

```bash
php artisan queue:batches-table
```

Чтобы определить пакетируемое задание нужно добавить трейт Batchable. Он предоставляет доступ к методу `batch()`.
```php
    public function handle()
    {
        if ($this->batch()->cancelled()) {
            // ...
            return;
        } 
        // ...
    }
```

```php
    $batch = Bus::batch([
        new ImportCsv(1, 100),
        new ImportCsv(101, 200),
        new ImportCsv(201, 300),
    ])->then(function (Batch $batch) {
        // All jobs completed successfully...
    })->catch(function (Batch $batch, Throwable $e) {
        // First batch job failure detected...
    })->finally(function (Batch $batch) {
        // The batch has finished executing...
    })->name('Import CSV')      // именование пакета
    ->dispatch();
    
    return $batch->id;
```

Добавить задание в пакет:
```php
    $this->batch()->add(Collection::times(1000, function () {
        return new ImportContacts;
    }));
```

Проверка пакетов:
- `$batch->id`;
- `$batch->name` - имя пакета;
- `$batch->totalJobs` - Количество заданий, назначенных пакету;
- `$batch->pendingJobs` - Количество заданий, которые не были обработаны очередью;
- `$batch->failedJobs()` - Количество неудачных заданий;
- `$batch->processedJobs()` - Количество заданий, которые были обработаны на данный момент;
- `$batch->progress()` - Процент завершения партии (0-100);
- `$batch->finished()` - Указывает, завершилось ли выполнение пакета;
- `$batch->cancel()` - Отменит выполнение пакета;
- `$batch->cancelled()` - Указывает, был ли пакет отменен.

Получить пакет:
```php
    return Bus::findBatch($batchId);
```

Не отмечать пакет как "отмененный" при неудачном задании `allowFailures()`:

```php
$batch = Bus::batch([
    // ...
])->then(function (Batch $batch) {
    // All jobs completed successfully...
})->allowFailures()->dispatch();

```

Повторная попытка неудачных пакетных заданий:
```bash
php artisan queue:retry-batch <UUID>
```

Запланировать ежедневную обрезку пакетов:

```php
$schedule->command('queue:prune-batches --hours=48')->daily();

// ---------------
// обрезать незавершенные пакетные записи
$schedule->command('queue:prune-batches --hours=48 --unfinished=72')->daily();
```