// Обычно статические методы используются для реализации функций, принадлежащих классу

class User {
    // Статический метод
    static staticMethod() {
        return true;
    }
}
User.staticMethod(); // true

// Тоже самое
class User {}
User.staticMethod = function () {
    return true;
};

// this при вызове User.staticMethod() является сам конструктор класса User
//      (правило «объект до точки»)

// Статические методы также используются в классах, относящихся к базам данных,
//      для поиска/сохранения/удаления вхождений в базу данных

// ----------------- Статические свойства
class Article {
    static publisher = 'Илья Кантор';
}
alert(Article.publisher); // Илья Кантор

// Тоже самое
Article.publisher = 'Илья Кантор';

// Статические свойства и методы наследуются
