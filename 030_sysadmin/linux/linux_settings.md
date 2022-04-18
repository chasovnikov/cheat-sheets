
### Обновиться
sudo apt update
sudo apt upgrade

### Подключить диск из под винды
mkdir windows10
fdisk -l    (найти диск под виндой)
sudo mount /dev/sda5 /home/chas/windows10

sudo install mc

Скачать яндекс браузер через браузер и устан. через приложение

Скачать VSCode через браузер и устан. через приложение

sudo apt install git
sudo apt install docker-compose
sudo apt install npm

sudo apt install curl php-cli php-mbstring git unzip

### Установить Composer с оф.сайта (не "sudo apt install composer")
глобально
curl -sS https://getcomposer.org/installer -o composer-setup.php

sudo apt-get install php-curl

### Обновить php до 8
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update

sudo apt update
sudo apt upgrade
