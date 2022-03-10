# список плученных образов
docker images

# создать образ из конт-ра
docker commit <NAME> <DOCKER ID (user_name)>/<IMAGES NAME>
docker commit myapp chasovnikov/myapp

# запустить свой образ
docker run chasovnikov/myapp cowsay "Hi"   # cowsay  - приложение

# запушить образ на hub.docker (репо автом-ки будет создано)
docker push chasovnikov/myapp
# или с тегом (по умолчанию latest)
docker push chasovnikov/myapp:beta

# удалить образ с локальн. машины
docker rmi <hash>