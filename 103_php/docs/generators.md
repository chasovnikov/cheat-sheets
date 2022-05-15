## Генераторы в PHP. Конспект

https://www.php.net/manual/ru/language.generators.php

-   позволяют сэкономить память (по сравнению, например, с сбором данных в массиве) и структурировать код
-   отличаются от обычных функций оператором yield
-   yield позволяет выйти из функции, но сохранить её состояние. При следующем вызове возвращается следующее значение
-   yield возращает итерируемый объект Generator (implements Iterator)
-   генераторы нельзя перемотать назад после старта итерации (в отличие от итераторов)

```php
$generator = (function() {
    yield 1;
    yield 2;

    return 3;
})();

foreach ($generator as $value) {
    echo $value, PHP_EOL;  // 1, 2, 3
}

// или
echo $generator->getReturn(), PHP_EOL;  // 1, 2, 3

```

### Методы работы с генераторами

```php
$generator->current();    // Получить текущее значение
$generator->key();        // Получить все значения по порядку
$generator->next();       // Возобновить работу генератора
$generator->send($value); // Передать значение в генератор
$generator->rewind();     // Перемотать итератор
$generator->throw($exc);  // Бросить исключение в генератор
$generator->valid();      // Проверка, закрыт ли итератор
$generator->__wakeup();   // Callback-функция сериализации
```
