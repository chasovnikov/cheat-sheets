// Пример ----------------------------
// Асинхронная (не блокирующая) ф-ия загрузки скрипта
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}

loadScript('/my/script.js');
// Ф-ия из скрипта '/my/script.js' (не сработает, т.к. скрипт еще не загружен)
newFunction(); // такой функции не существует!

// Перепишем, что бы сработало
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('/my/script.js', function () {
  // эта функция вызовется после того, как загрузится скрипт
  newFunction(); // теперь всё работает
  // ...
});

// Последовательное выполнение асинхронных операций через колбэки
// для большего количества не удобно
// Более 2-х колбэков внутри называется "Адская пирамида вызовов"
loadScript('/my/script.js', function (script) {
  loadScript('/my/script2.js', function (script) {
    loadScript('/my/script3.js', function (script) {
      // ...и так далее, пока все скрипты не будут загружены
    });
  });
});

// Перехват ошибок -----------------------
// «колбэк с первым аргументом-ошибкой» («error-first callback»).
// 1. Первый аргумент функции callback зарезервирован для ошибки: callback(err).
// 2. Второй и последующие аргументы — для результатов выполнения: callback(null, result1, result2…).
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));

  document.head.append(script);
}

loadScript('/my/script.js', function (error, script) {
  if (error) {
    // обрабатываем ошибку
  } else {
    // скрипт успешно загружен
  }
});
