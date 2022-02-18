<?php

interface State
{
    public function play();
}

class Radio7 implements State
{
    public function play()
    {
        echo 'Radio7';
    }
}

class RadioDFM implements State
{
    public function play()
    {
        echo 'RadioDFM';
    }
}

class VestiFM implements State
{
    public function play()
    {
        echo 'VestiFM';
    }
}

//Сделаем редактор:

class Radio
{
    private $state;

    public function __construct(State $state)
    {
        $this->state = new RadioDFM();
        $this->state = $state;
    }

    public function nextState()   //Фабричный метод
    {
        if ($this->state instanceof Radio7) {
            $this->state =  new RadioDFM() ;

        } elseif ($this->state instanceof RadioDFM) {
            $this->state = new VestiFM();

        } elseif ($this->state instanceof VestiFM) {
            $this->state = new Radio7();
        }
    }

    public function play()
    {
        $this->state->play();
    }
}

//Использование:

$radio = new Radio();
$radio->nextState();
$radio->play();
