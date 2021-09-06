
// call - вызов функции с подменой контекста - this внутри функции. Пример:
function f(arg) {
    alert(arg);
    alert(this);
}

f('abc');             // abc, [object Window]

f.call('123', 'abc'); // abc, 123


// apply - вызов функции с переменным количеством аргументов и с подменой контекста
function f() {
    alert(this);
    for (var i = 0; i < arguments.length; i++) {
        alert(arguments[i]);
    }
}

f(1, 2, 3);                   // [object Window], 1, 2, 3

f.apply('abc', [1, 2, 3, 4]); // abc, 1, 2, 3, 4


/**
 * bind - создаёт "обёртку" над функцией, которая подменяет контекст 
 * этой функции. Поведение похоже на call и apply, но, в отличие 
 * от них, bind не вызывает функцию, а лишь возвращает "обёртку", 
 * которую можно вызвать позже.
 */
function f() {
    alert(this);
}

var wrapped = f.bind('abc');

f();         // [object Window]
wrapped();   // abc


/**
 * Также bind умеет подменять не только контекст, но и аргументы функции, 
 * осуществляя каррирование:
 */
function add(a, b) {
    return a + b;
}

var addOne = add.bind(null, 1);

alert(add(1, 2));   // 3

alert(addOne(2));   // 3