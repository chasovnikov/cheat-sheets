```bash
composer self-update    # обновить composer

php composer.phar require vendor/package # устн-ка пакета, если  файл «composer.phar» находится в текущем каталоге

composer require vendor/package   # установка пакета
composer require "twig/twig:^2.0"

composer install    # установка всех пакетов

composer update     # обновление зависимостей
composer update vendor/package

composer remove vendor/package    # удаление пакета

composer update --lock  # обновления файла «composer.lock» без обновления самих пакетов

composer create-project vendor/package # созд. новый проект

composer show     # показать все установленые библиотеки

composer init     # создание базового composer.json
```
