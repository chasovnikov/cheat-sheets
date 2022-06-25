### Настройка клонированного проекта на Laravel

```bash


composer install    # если есть composer.lock (composer.lock не позволяет автоматически получать последние версии)
? composer update     # если нужно обновиться до последних версий
npm install         # уст-ка npm-завис-ти (см. package.jsoon)
npm audit fix --force  # если попросит
npm run dev         # запуск команды из package.json: scripts: dev

# создать файл .env по примеру .env.example

php artisan key:generate    # записывает APP_KEY в файле .env

php artisan storage:link # создать симлинк папки storage в папке public

php artisan migrate --seed # запуск миграций + создание тестовых данных

? php artisan serve           # запуск встроенного сервера

```

проверить результат по url
