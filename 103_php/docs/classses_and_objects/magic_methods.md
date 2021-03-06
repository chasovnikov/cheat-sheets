Магические методы - переопределяют действия по умолчанию над объектами

### Перегрузка свойств

Перегрузка - создание динамически

```php
// Вы-ся при записи в недоступные свойства
__set()

// Выз-ся при чтении недоступного св-ва
__get()

// Выз-ся при использовании isset() или empty() на недоступных св-вах
__isset()

// Выз-ся при использовании unset() на недоступном свойстве
__unset()

```

## Перегрузка методов

```php
// Запускается при нестатическом вызове недоступных методов
__call()

// Запускается при статическом вызове недоступных методов
static __callStatic()
```

###

```php
// Выз-ся при создании объекта
// Для исполь-я родительского констр-ра требуется вызвать parent::__construct()
// освобождается от правил совместимости сигнатуры при наследовании методов
__construct()

// Выз-ся при освобождении всех ссылок на объект или при завершении скрипта
// Порядок выполнения деструкторов не гарантируется
// Для вызова деструктора родительского класса, требуется вызвать parent::__destruct()
__destruct()

// Выз-ся перед сериализацией объекта
// Исполь-зя для удобного представления сериализованного объекта
__serialize()

// Выз-ся перед сериализацией объекта, если нет метода __serialize()
// Использ-ся для завершения работы над данными, ждущими обработки
__sleep()

// Выз-ся перед десериализацией
__unserialize()

// Выз-ся перед десериализацией, если нет метода __unserialize()
// Использ-ся для восстановления соединений с базой данных
__wakeup()

// Выз-ся при попытке преобразовать объект к строке
// При испол-ии рекоменд-ся явно реализовать интерфейс Stringable
__toString()

// Выз-ся при попытке выполнить объект как функцию
__invoke()

// Выз-ся при использовании ключев. слова "clone"
__clone()

static __set_state()
// Выз-ся для классов, экспортированных функцией var_export()
// var_export — Выводит или возвращает строковое представление данных

__debugInfo()
// Выз-ся функцией var_dump()
// Если метод не определён, тогда будут выведены все свойства объекта
```
