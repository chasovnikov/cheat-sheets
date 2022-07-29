
###

```bash

composer create-project laravel/laravel new_project

php artisan key:generate --ansi

# debugbar install
composer require barryvdh/laravel-debugbar --dev

composer require laravel/ui

php artisan ui bootstrap

php artisan ui:auth

php artisan ui vue  # если нужен 

npm install         # уст-ка npm-завис-ти (см. package.jsoon)

npm audit fix --force  # если попросит

# Здесь можно вернуться к Mix вместо Vite (смотри back_to_mix.md)

npm run dev         # запуск команды из package.json: scripts: dev

php artisan storage:link # создать симлинк папки storage в папке public

# создать БД

php artisan migrate --seed # запуск миграций + создание тестовых данных

```
