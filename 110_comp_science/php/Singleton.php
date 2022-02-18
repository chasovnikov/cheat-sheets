
1.1. Singleton. - порождающий паттерн.
	Цель применения: ограничить число создаваемых объектов.
	Примеры: класс-логгер, класс подключения к БД.
	Реализация: приватный конструктор и публичный статический метод getInstance(), возвращающий ссылку на единственный экземплярю

<?php
// Применяется для доступа к существующей ООП библиотеке.
// Создает объект и записывает в него подключение к базе.
// Можно использовать взамен глобальной переменной.
// Недостатки: мешает тестированию, повышает связанность кода.

class Single
{
	// private $props = []; // массив значений класса
	private function __construct(){} //запрещаем создание объекта через new
	private function __clone(){} //запрещаем создание объекта через клонирование
	private function __wakeup(){} //запрещаем использование unserialize()

	private static $_instance;

	public static function getInstance()  //Получаем объект(static-методы имеют доступ только к static-свойствам)
	{
		if( empty( self::$_instance ) ) {

			self::$_instance = new self();
		}
		return self::$_instance;

	}
	// public function setProperty($key, $val) {  //Можем задать значения
	// 	$this->props[$key] = $val;   //$this-> - текущий объект(помещаем значение в массив)
	// }
	// public function getProperty($key) {  //Можем получить значения
	// 	return $this->props[$key];   //значение содержится в массиве
	// }
}

$pp = Single::getInstance();  // Создаем или возвращаем существующий объект
// $pp->setProperty('variable', 12);  //Задаем пару ключ-значение
// echo 'From "pp" = ' . $pp->getProperty('variable').'<br>';  //Выводим значение


