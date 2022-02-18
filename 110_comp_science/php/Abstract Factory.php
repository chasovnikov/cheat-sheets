Фабрика Фабрик
Создание семейств классов
<?php

abstract class AbstractFactory
{
    public static function getFactory($num)
    {
        switch ($num)
        {
            case 1:
                return new FirstFactory();
            case 2:
                return new SecondFactory();
        }
    }

    abstract public function getProduct();
}

class FirstFactory extends AbstractFactory
{
    public function getProduct()
    {
        return new FirstProduct();
    }
}

class SecondFactory extends AbstractFactory
{
    public function getProduct()
    {
        return new SecondProduct();
    }
}

class FirstProduct implements Product
{
    public function getName()
    {
        return 'The product from the first factory';
    }
}

class SecondProduct implements Product
{
    public function getName()
    {
        return 'The product from second factory';
    }
}

$firstProduct = AbstractFactory::getFactory()->getProduct();
Config::$factory = 2;
$secondProduct = AbstractFactory::getFactory()->getProduct();

print_r($firstProduct->getName());
// The first product from the first factory
print_r($secondProduct->getName()); 

// Second product from second factory