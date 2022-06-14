## Команды Laravel CLI

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

### Разное

```bash

php artisan ui:auth     # создаст контроллеры, шаблоны, маршруты

php artisan route:list

php artisan make:factory BbFactory

```

### Очистка кеша

```bash

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

```
