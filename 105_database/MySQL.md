
### Установка на Ubuntu

```bash
sudo apt update
sudo apt install mysql-server mysql-client
mysql -V
```

### Установка на Fedora

- sudo dnf install  php-mysqlnd

### На всех Linux

- проверить, запущенна ли служба MySQL:
```bash
sudo systemctl status mysql
```

- запустить сервис mysql
```bash
sudo service mysql start
```

Консоль:
```bash
cd MySQL
cd bin
mysql -u root p
пароль
```

### Подключение к MySQL через VS Code

- установить расширение "MySQL management tool"
- подключиться к MySQL (+): 
    * host: localhost
    * user: root
    * password:
    * port: по умолчанию
    * по умолчанию
- если вместо списка баз - ошибка
```bash
ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```
то выполняем следующие действия:
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```