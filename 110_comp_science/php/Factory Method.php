	1.2. Factory Method (Фабричный метод) - определяет интерфейс для создания объектов, но оставляет подклассам решение о том, какой класс инсталлировать.
Не использует оператор "new".
	Применяется, когда неизветсно какой из классов нам надо инстанциировать

Взависимости от условия вызывается объект того или иного класса,
используя для создания объектов один статик метод.


Factory нарушает инкапсуляцию
Нарушается принципы GRASP:
	- Creator (объект не там создается, где используется)
	- Low Coupling (много связей)

<?php

abstract class Factory
{
	// private static $arr = ['A', 'B', 'C'];

	// public static function createObj( $num )
	// {
	// 	return new self::$arr[$num];
	// }

	public static function createObj( $num )
	{
		if ( $num > 1000 ) {
			return new A();
		} else {
			return new B();
		}
	}

	/**
	 * Альтернатива "if - else"
	 */
//	public static function createObj( $num )
//	{
//		$num = intval(  $num < 1000 );
//		return new self::$arr[$num];
//	}

	abstract public function get();
}

class A extends Factory
{
	public function get()
	{ echo "A";}
}

class B extends Factory
{
	public function get()
	{ echo "B";}
}

class C extends Factory
{
	public function get()
	{ echo "C";}
}


$uo = Factory::createObj( 0 );
echo $uo->get();   // A
?>
