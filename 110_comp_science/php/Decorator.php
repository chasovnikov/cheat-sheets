Декоратор / wrapper - структурный паттерн.
	Decorator позволяет добавлять новые функции к объектам без наследования. 
		Динамически добавляет объекту функциональность.
		Является гибкой альтернативой порождению подклассов с целью расширения функциональности.


<?php

// Декораторы декорторов

interface IText
{
    public function show();
}

class TextHello implements  IText
{
    protected $object;

    public function __construct(IText $text) {
        $this->object = $text;
    }

    public function show() {
        echo 'Hello';
        $this->object->show();
    }
}

class TextWorld implements  IText
{
    protected $object;

    public function __construct(IText $text) {
        $this->object = $text;
    }

    public function show() {
        echo 'world';
        $this->object->show();
    }
}

class TextSpace implements  IText
{
    protected $object;

    public function __construct(IText $text) {
        $this->object = $text;
    }

    public function show() {
        echo ' ';
        $this->object->show();
    }
}

class TextEmpty implements IText
{
    public function show() {
    }
}

$decorator = new TextHello(
				new TextSpace(
					new TextWorld(
						new TextEmpty())));
$decorator->show(); // Hello world
echo '<br />' . PHP_EOL;
$decorator = new TextWorld(
				new TextSpace(
					new TextHello(
						new TextEmpty())));
$decorator->show(); // world Hello

/////////////////////////

abstract class ParentClass
{
	abstract public function getFactor();
}

class Real extends ParentClass
{
	private $factor = 2;

	public function getFactor()
	{
		return $this->factor;
	}
}

abstract class Decorator extends ParentClass
{
	protected $parentClass;

	public function __construct( ParentClass $parentClass)
	{
		$this->parentClass = $parentClass;
	}
}

class FirstDecorator extends Decorator
{
	public function getFactor()
	{
		return $this->parentClass->getFactor() + 2;
	}
}

class SecondDecorator extends Decorator
{
	public function getFactor()
	{
		return $this->parentClass->getFactor() - 4;
	}
}

$parentClass = new Real();
print $parentClass->getFactor(); // 2

$parentClass = new FirstDecorator();
print $parentClass->getFactor(); // 4

$parentClass = new SecondDecorator();
print $parentClass->getFactor(); // 0

