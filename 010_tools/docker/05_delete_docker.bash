# https://qastack.ru/ubuntu/935569/how-to-completely-uninstall-docker
# смотреть - есть ли docker в системе
dpkg -l | grep -i docker

sudo apt-get purge -y docker-engine docker docker.io docker-ce  
sudo apt-get autoremove -y --purge docker-engine docker docker.io docker-ce

# Если вы хотите удалить все изображения, контейнеры и тома
sudo rm -rf /var/lib/docker /etc/docker
sudo rm /etc/apparmor.d/docker
sudo groupdel docker
sudo rm -rf /var/run/docker.sock

# Дополнительно пришлось удалить /usr/local/bin/docker-compose

# Ubuntu snap
sudo snap remove docker
# и удалить все связанные файлы
sudo find / -name "*docker*" -exec `rm -rf` {} +