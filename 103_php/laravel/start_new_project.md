
###

```bash

composer create-project laravel/laravel new_project

php artisan key:generate --ansi

composer require laravel/ui

php artisan ui bootstrap

php artisan ui:auth

npm install         # уст-ка npm-завис-ти (см. package.jsoon)

npm audit fix --force  # если попросит

npm run dev         # запуск команды из package.json: scripts: dev

php artisan storage:link # создать симлинк папки storage в папке public

# создать БД

php artisan migrate --seed # запуск миграций + создание тестовых данных

```
