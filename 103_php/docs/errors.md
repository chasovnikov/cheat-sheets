### Настройка обработки ошибок в PHP

Рекомендуемые установки при разработке:

-   в файле php.ini:

```bash
display_errors        = "1"
error_reporting       = E_ALL
error_log             = "%sprogdir%/userdata/logs/%phpdriver%_error.log"
```

-   или в начале скрита:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

---

Рекомендуемые установки в файле php.ini на готовом продукте:

```bash
display_errors        = "0"
error_reporting       = E_ALL & ~E_NOTICE & ~E_DEPRECATED
error_log             = "%sprogdir%/userdata/logs/%phpdriver%_error.log"
```

---

"error_reporting" задает уровень протоколирования ошибки (число или именованная константа).

Некоторые константы:

-   E_ALL - все ошибки, предупреждения и замечания
-   E_NOTICE - уведомления времени выполнения
-   E_DEPRECATED - уведомления времени выполнения об использовании устаревших конструкций
-   ~ - исключение

"display_errors" задает вывод ошибок вместе с остальным выводом (выключается на готовом продукте).

"error_log" указывает файл лога для записи ошибок.

Можно установить свой обработчик ошибок с помощью функции set_error_handler().
