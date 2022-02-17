
/**
 * Все ошибки, не словленные try_catch -ем и, которые остались
 *      не обработанными мы можем отловить:
 */
process.on('uncaughtException', err => {
    console.log('on uncaughtException: ' + err.message);
    process.exit(1);    // выход из приложения
});