## Команды Laravel CLI

### Start

```bash

composer require ui 

php artisan ui bootstrap  # установка bootstrap
php artisan ui:auth

```

### Миграции

```bash

# создать миграцию. --create=bbs - вставить в миграцию стартовый код
php artisan make:migration create_bbs_table --create=bbs

php artisan migrate             # запустить все миграции
php artisan migrate --force     # выполнить без подтверждения

php artisan migrate:status      # какие миграции были выполнены до сих пор

php artisan migrate:rollback    # для отката последней операции миграции
php artisan migrate:rollback --step=5   # на 5 шагов назад

php artisan migrate:reset       # откатит все миграции

php artisan migrate:refresh     # reset + migrate
php artisan migrate:refresh --seed  # ... + заполнить бд тестовыми данными
php artisan migrate:refresh --step=5

php artisan migrate:fresh       # удалить все таблицы + migrate
php artisan migrate:fresh --seed

php artisan db:wipe --database=mysql    # очистить всю БД

php artisan migrate:install     # Создание журнала миграций — таблицы в базе данных

php artisan scheme:dump         # создать дамп базы данных как альтернатива миграциям


```

---

### Модели

```bash
php artisan make:model Flight               # создать модель Flight
php artisan make:model Flight --migration   # ... + migrate

php artisan make:model Flight --factory     # ... + создать класс FlightFactory
php artisan make:model Flight -f

php artisan make:model Flight --seed        # ... + создать класс FlightSeeder
php artisan make:model Flight -s

php artisan make:model Flight --controller  # ... + создать класс FlightController
php artisan make:model Flight -c


php artisan make:model Flight --controller --resource --requests
php artisan make:model Flight -crR

php artisan make:model Flight --policy      # ... + создать класс FlightPolicy

# ... + migration, factory, seeder, and controller
php artisan make:model Flight -mfsc

# ... + migration, factory, seeder, policy, controller, form requests
php artisan make:model Flight --all

php artisan make:model Member --pivot # ... + создать промежуточную таблицу

```

### Тесты

```bash

php artisan make:test UserTest          # создать тест
php artisan make:test UserTest --unit   # создать тест в tests/Unitкаталоге
php artisan make:test UserTest --pest   # создать создать PHP-тест Pest

php artisan test                # выполнить тесты
php artisan test --parallel     # создаст столько процессов, сколько доступно ядер
php artisan test --parallel --processes=4
php artisan test --recreate-databases
php artisan test --coverage     # сколько кода приложения используется
php artisan test --coverage --min=80.3

```

### Seeders (тестовые данные)

```bash

php artisan make:seeder UserSeeder      # создать класс UserSeeder

php artisan db:seed      # запустить создание тестовых данных
php artisan db:seed --class=UserSeeder      # индивидуальный запуск для класса UserSeeder
php artisan db:seed --force     # принудительное выполнение
```

### Контроллеры

```bash

php artisan make:controller PhotoController --model=Photo --resource --requests
php artisan make:controller PhotoController --api
php artisan make:controller ProvisionServer --invokable     # контр-р одного действия ?

```

### Кеш

```bash

# включить кеш
php artisan config:cache
php artisan route:cache

# очистить кеш
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

```

### Разное

```bash

php artisan ui:auth     # создаст контроллеры, шаблоны, маршруты

php artisan route:list

php artisan make:factory BbFactory

# извлечь шаблон пагинатора из состава фреймворка в /resources/views/vendor/pagitation
php artisan vendor:publish --tag=laravel-pagination

```

# Перевод вывода команды "php artisan"

```bash
Usage:
  command [options] [arguments]

Options:
  -h, --help            Отображает справку для данной команды. Если команда не задана, отобразите справку для команды списка
  -q, --quiet           Не выводят никаких сообщений
  -V, --version         Отображение этой версии приложения
      --ansi|--no-ansi  Принудительно (или отключить --no-ansi) Вывод ANSI
  -n, --no-interaction  Не задавайте никаких интерактивных вопросов
      --env[=ENV]       Среда, в которой должна выполняться команда
  -v|vv|vvv, --verbose  Увеличьте детализацию сообщений: 1 для обычного вывода, 2 для более подробного вывода и 3 для отладки

Available commands:
  clear-compiled         Удалить скомпилированный файл класса
  completion             Dump the shell completion script
  db                     Запускает новый сеанс CLI базы данных
  down                   переводит приложение в режим обслуживания / демонстрации
  env                    Отображает текущую справку среды 
  help                   Отображает справку для команды
  inspire                Отображает вдохновляющую цитату
  list                   список команд
  migrate                Запуск миграции 
  optimize               оптимизируйте кэширование файлов начальной загрузки фреймворка
  serve                  обслуживайте приложение на сервере разработки PHP
  test                   запускайте тесты приложения
  tinker                 взаимодействуйте с пользовательским интерфейсом вашего приложения
  ui                     заменяйте интерфейсные строительные леса для приложения
  up                     Выводит приложение из режима обслуживания
 auth
  auth:clear-resets      сбрасывает токены сброса пароля с истекшим сроком действия
 breeze
  breeze:install         Установить контроллеры и ресурсы Breeze 
 cache
  cache:clear            Очистить кэш приложения
  cache:forget           Удалить элемент из кэша
  cache:table            Создать миграцию для таблицы базы данных кэша
 config
  config:cache           Создать файл кэша для более быстрой загрузки конфигурации
  config:clear           Удалить файл кэша конфигурации
 db
  db:seed                начальное заполнение базы данных записями
  db:wipe                стереть Все таблицы, представления и типы
 debugbar
  debugbar:clear         Очистить хранилище debugbar
 event
  event:cache            Обнаружение и кэширование событий и прослушивателей приложения
  event:clear            Очистить все кэшированные события и прослушиватели
  event:generate         Сгенерировать отсутствующие события и прослушиватели на основе регистрации
  event:list             Список событий и прослушивателей приложения
 key
  key:generate           Установить ключ приложения
 make
  make:cast              Создайте новый пользовательский класс Eloquent cast
  make:channel           Create a new channel class
  make:command           Create a new Artisan command
  make:component         Create a new view component class
  make:controller        Create a new controller class
  make:event             Create a new event class
  make:exception         Create a new custom exception class
  make:factory           Create a new model factory
  make:job               Create a new job class
  make:listener          Create a new event listener class
  make:mail              Create a new email class
  make:middleware        Create a new middleware class
  make:migration         Create a new migration file
  make:model             Create a new Eloquent model class
  make:notification      Create a new notification class
  make:observer          Create a new observer class
  make:policy            Create a new policy class
  make:provider          Create a new service provider class
  make:request           Create a new form request class
  make:resource          Create a new resource
  make:rule              Create a new validation rule
  make:scope             Create a new scope class
  make:seeder            Create a new seeder class
  make:test              Create a new test class
 migrate
  migrate:fresh          Drop all tables and re-run all migrations
  migrate:install        Create the migration repository
  migrate:refresh        Reset and re-run all migrations
  migrate:reset          Rollback all database migrations
  migrate:rollback       Rollback the last database migration
  migrate:status         Show the status of each migration
 model
  model:prune            Prune models that are no longer needed
 notifications
  notifications:table    Create a migration for the notifications table
 optimize
  optimize:clear         Remove the cached bootstrap files
 orchid
  orchid:admin           Create user administrator
  orchid:chart           Create a new chart layout class
  orchid:filter          Create a new filter class
  orchid:install         Install all of the Orchid files
  orchid:listener        Create a new listener class
  orchid:presenter       Create a new presenter class
  orchid:publish         Publish all of the Orchid resources
  orchid:rows            Create a new rows layout class
  orchid:screen          Create a new screen class
  orchid:selection       Create a new selection layout class
  orchid:tab-menu        Create a new TabMenu class
  orchid:table           Create a new table layout class
 package
  package:discover       Rebuild the cached package manifest
 queue
  queue:batches-table    Create a migration for the batches database table
  queue:clear            Delete all of the jobs from the specified queue
  queue:failed           List all of the failed queue jobs
  queue:failed-table     Create a migration for the failed queue jobs database table
  queue:flush            Flush all of the failed queue jobs
  queue:forget           Delete a failed queue job
  queue:listen           Listen to a given queue
  queue:monitor          Monitor the size of the specified queues
  queue:prune-batches    Prune stale entries from the batches database
  queue:prune-failed     Prune stale entries from the failed jobs table
  queue:restart          Restart queue worker daemons after their current job
  queue:retry            Retry a failed queue job
  queue:retry-batch      Retry the failed jobs for a batch
  queue:table            Create a migration for the queue jobs database table
  queue:work             Start processing jobs on the queue as a daemon
 route
  route:cache            Create a route cache file for faster route registration
  route:clear            Remove the route cache file
  route:list             List all registered routes
 sail
  sail:install           Install Laravel Sail's default Docker Compose file
  sail:publish           Publish the Laravel Sail Docker files
 sanctum
  sanctum:prune-expired  Prune tokens expired for more than specified number of hours.
 schedule
  schedule:clear-cache   Delete the cached mutex files created by scheduler
  schedule:list          List the scheduled commands
  schedule:run           Run the scheduled commands
  schedule:test          Run a scheduled command
  schedule:work          Start the schedule worker
 schema
  schema:dump            Dump the given database schema
 scout
  scout:delete-index     Delete an index
  scout:flush            Flush all of the model's records from the index
  scout:import           Import the given model into the search index
  scout:index            Create an index
 session
  session:table          Create a migration for the session database table
 storage
  storage:link           Create the symbolic links configured for the application
 stub
  stub:publish           Publish all stubs that are available for customization
 ui
  ui:auth                Scaffold basic login and registration views and routes
  ui:controllers         Scaffold the authentication controllers
 vendor
  vendor:publish         Publish any publishable assets from vendor packages
 view
  view:cache             Compile all of the application's Blade templates
  view:clear             Clear all compiled view files
```