## Callback (callable)
это ф-ии, передаваемые в аргументы другой ф-ии

В PHP функции передаются по имени в виде строки

function my_callback_function() {
    echo 'Привет, мир!';
}
call_user_func('my_callback_function');

Нельзя использовать конструкций языка, таких как: 
array(),    echo, 
empty(),    eval(), 
exit(),     isset(),
list(),     print 
unset()

ещё можно передавать анонимные функции, стрелочные функции
и объекты, реализующие __invoke()