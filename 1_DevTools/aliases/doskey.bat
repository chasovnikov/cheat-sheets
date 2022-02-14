@echo off
 
DOSKEY ls=dir
 
doskey gs=git status
doskey gaa=git add -A
doskey gpl=git pull
doskey gps=git push
doskey gc=git commit $*
doskey gcm=git commit $*
doskey gck=git checkout $*
doskey gbr=git branch
doskey gmg=git merge $*
 
doskey ymg=php yii migrate $*
doskey ymgc=php yii migrate/create $*
doskey ymgd=php yii migrate/down $*
 
doskey yfxl=php yii fixture/load $*
 
doskey sfmgc=php bin/console doctrine:migrations:generate $*
doskey sfmg=php bin/console doctrine:migrations:migrate $*
 
doskey updb_cabinet = C:\doskey\scripts\updateCabinetDb.bat
doskey mysqldump = C:\xampp\mysql\bin\mysqldump.exe -uroot -p $*