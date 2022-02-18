/*
Composite (Компоновщик).
Это способ объединения и управления группами объектов, обращаясь с ними как с отдельными объектами.

Компоновщик позволяет обращаться к группе объектов также как и к отдельному объекту.
Реализуется единым интерфейсом для составных и несоставных объектов.

Объединяет объекты в древовидную структуру для представления
иерархии от частного к целому.

Основным назначением паттерна, является обеспе-
чение единого интерфейса как к составному так и конечному объекту, что бы клиент не заду-
мывался над тем, с каким объектом он работает. Общеизвестными примерами этого паттерна
является SimpleXML и jQuery.
*/

<?php

abstract class Unit
{
    /**
     * выполняется принцип шаблона
     * Composite, который заключается в том, что у элементарных классов ("листьев") та­
     * кой же интерфейс, как у композитов.
     * Метод не всем нужен, поэтому генерирует исключение
     */
    public function addUnit(Unit $unit)
    {
        throw new UnitException(get_class($this) . " относится к ' неделимому объекту' ");
    }

    /**
     * Метод не всем нужен, поэтому генерирует исключение
     */
    public function removeUnit(Unit $unit)
    {
        throw new UnitException(get_class($this) . " относится к 'неделимому объекту'");
    }

    abstract public function power();

}

class UnitException extends Exception
{

}

/**
 * Несостаные объекты
 */
class Archer extends Unit
{

    public function power()
    {
        return 4;
    }

}

/**
 * Составные объекты
 */
class Army extends Unit
{
    private $units = [];

    /**
     * Добавить юнита
     */
    public function addUnit(Unit $unit)
    {
        if ( in_array($unit, $this->units, true) ) {
            return;
        }
        $this->units [] = $unit;
    }

    /**
     * Удаление юнитов
     * Анонимная функция обратного вызова предназначена для проверки элементов массива,
     * содержащихся в свойстве $units, на эквивалентность (вернет TRUE или FALSE)
     * @param object $unit
     */
    public function removeUnit(Unit $unit)
    {
        $this->units = array_udiff($this->units, array($unit),
            function($а, $b) {
                return ($а === $b) ? 0 : 1;
            });
    }

    /**
     * Вычисляет общую ударную силу
     */
    public function power()
    {
        $ret = 0;
        foreach ($this->units as $unit) {
            $ret += $unit->power();
        }
        return $ret;
    }

}


// Создадим армию
$main_army = new Army();
// Добавим боевую единицу
$main_army->addUnit( new Archer() );

// Создадим еще одну армию
$sub_army = new Army();
// Добавим несколько боевых единиц
$sub_army->addUnit( new Archer() );
$sub_army->addUnit( new Archer() );
$sub_army->addUnit( new Archer() );

// Добавим вторую армию к первой
$main_army->addUnit($sub_army);
// Все вычисления выполняются за кулисами
print "Атакующая сила : { $main_army->power() } \n";
