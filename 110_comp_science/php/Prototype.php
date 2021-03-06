Прототип - это порождающий паттерн
Задает виды создаваемых объектов с помощью экземпляра-прототипа и создает новые объекты
путем копирования этого прототипа.

    Используется, когда инициализация объектов протекает в несколько стадий и
        отнимает много ресурсов и времени.
    Позволяет заранее создать новые экземпляры, а затем использовать их
        посредством копирования

Преимущества:
    - уменьшение числа подклассов;
    - добавление и удаление продуктов во время выполнения;
    - спецификация новых объектов путем изменения значений;

Минусы:
    - сложно добавить операцию __clone(), когда классы уже существуют.
    - проблема, если во внутреннем представлении объекта есть другие объекты.

<?php

class Sea
{}

class EarthSea extends Sea
{}

class MarsSea extends Sea
{}


class _Factory
{
    private $sea; // Хранит обект

    function __construct (Sea $sea)
    {
        $this->sea = $sea;
    }

    function getSea()
    {
        return clone $this->sea; // Клонирование !!!!
    }

}

$factory = new _Factory( new EarthSea () );

print_r ( $factory->getSea () );