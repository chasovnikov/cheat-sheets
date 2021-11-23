
// Увеличить дату на 2 дня
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

date.setDate(0);    // последнее число предыдущего месяца


// Какой день месяца был много дней назад
let getDateAgo = (date, days) => {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - days);
    
    return dateCopy.getDate();
}
let date = new Date(2015, 0, 2);
alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)


// Последнее число месяца
let getLastDayOfMonth = (year, month) => {
    return (new Date(year, (month + 1), 0)).getDate();
}


// создаём объект с текущими днём/месяцем/годом
let now = new Date();
let today = new Date( now.getFullYear(), now.getMonth(), now.getDate() );