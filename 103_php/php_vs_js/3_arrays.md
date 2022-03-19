
## Массивы

Массив - упорядоченная коллекция пар ключ значение


array(key  => value, key2 => value2);
[key  => value, key2 => value2];  

JS: 
  {'key': value}
  [value1, value2]
  new Array()

// удалить элемент/массив
unset($arr[5]);     // JS:  delete object.param | delete arr[i]
unset($arr);    
array_values();     // переиндексировать массив

    shift   - удалит из начала
    pop     - с конца
    splice  - из середины

key может быть либо типа int, либо типа string
value может быть любого типа
```php
// сравнить массивы
array_diff($arr1, $arr2);
// ещё можно с помощью ==, ===, <>, !=, !==

// объединить
$arr2 = [...$arr1, $arr2];
$arr2 = $arr1 + $arr2;
$arr2 += $arr2;
```

## Функции для работы с массивами (самые ходовые)
  
  PHP           JS
is_array()     Array.isArray(obj)   проверка на массив
count()        arr.length           кол-во элементов
print_r()      console.log()        вывод массива на экран

explode()      str.split()          разбивает строку по разделителю
preg_split()   str.split()          разбив строки по регулярке
implode()      arr.join()           соед. элем-ты в строку

sort()         arr.sort(fn)         сортировка
rsort()                             сортировка в обр. порядке
asort()                             сортировка асоц. массива
ksort()                             сортировка ключей

shuffle()                           перемешать массив

in_array()    arr.includes()        проверка на наличие элемента
array_search  arr.indexOf()         вернёт ключ по значению
array_merge() arr1.concat(arr2)     соединить массивы
array_slice() arr.slice()           выбрать срез массива
array_splice  arr.splice()          удал./заменяет часть массива

array_pop()   arr.pop()             извлекает последний элемент
array_shift() arr.shift()           извлекает первый элемент массива
array_unshift arr.unshift()         добавл. элем-ы в начало

## Перебор элементов

PHP:
  for ($i = 0; $i < count($userNames); $i++) { ... }
  foreach ($iterable as $value) { ... }

JS:
  for (let i = 0; i < arr.length; i++) { alert( arr[i] ); }
  for (let fruit of fruits) { alert( fruit ); }
  arr.forEach(function(item, index, array) { ... });