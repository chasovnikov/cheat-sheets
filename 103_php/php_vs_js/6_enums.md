## Перечисления или "Enums"
(PHP 8 >= 8.1.0)
это особый вид объектов
это закрытый набор возможных значений для типа

enum Suit
{
    case Hearts;
    case Diamonds;
    case Clubs;
    case Spades;
}

function do_stuff(Suit $s) { ... }

do_stuff(Suit::Spades);