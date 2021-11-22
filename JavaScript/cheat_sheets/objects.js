

// Получить сумму всех значений в объекте
let sumValues = Object.values(obj).reduce((a, b) => a + b, 0);

// Кол-во свойств без символьных
let countProp = Object.keys(obj).length;