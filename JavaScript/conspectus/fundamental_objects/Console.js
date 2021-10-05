
/**
 * Объект Console служит для доступа к средствам отладки браузера.
 * Window.console (как свойство глобального объекта).
 */

/**
 * Console.log().
 *      Выводит сообщение в веб-консоль.
 * Для форматирования вы можете использовать подстановочные символы (маски) 
 *      с дополнительными параметрами.
 * 
 * console.log(obj1 [, obj2, ..., objN]);
 * console.log(msg [, subst1, ..., substN]);
 * @param {object} [obj1 ... objN]  Список объектов JavaScript для вывода. 
 *      Сериализуется и выводится. 
 * @param {any} msg   Строка, с символами для замены.
 * @param {object} [subst1 ... substN]  Объекты, с помощью которых произойдёт 
 *      замена подстановочных символов в msg.
 * 
 * Отличия от console.dir:
 *      console.log выводит HTML-дерево
 *      console.dir выводит JSON-объект
 * 
 * Логирование объектов:
 *      Не используйте console.log(obj),
 *      Используйте console.log( JSON.parse( JSON.stringify(obj) ) ).
 */

/**
 * Console.dir(obj)
 *      Отображает интерактивный список свойств указанного объекта JavaScript. 
 *      Этот список позволит вам посмотреть дочерние объекты и их свойства.
 */