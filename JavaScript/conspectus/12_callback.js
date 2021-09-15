
/**
 * Колбэк - ф-ия, передавая в аргументе другой ф-ии и вызываемая после какого-либо действия.
 */

// пример сихронного колбэка:
function greeting(name) {
    alert('Hello ' + name);
}
  
function processUserInput(callback) {
    var name = prompt('Please enter your name.');
    callback(name);
}
  
processUserInput(greeting);


// колбэк для асинхр. операций
function loadScript(scriptPath, callback) {
    let script = document.createElement('script');
    script.src = scriptPath;
    script.onload = () => callback(script); // вызов после загрузки скрипта
    document.head.append(script);
  }
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Здорово, скрипт ${script.src} загрузился`);
    alert( _ ); // функция, объявленная в загруженном скрипте
});

// Загрузка одного скрипта за другим (допускается не более 2-х вложенностей)
loadScript('/my/script.js', function(script) {

    loadScript('/my/script2.js', function(script) {
  
      loadScript('/my/script3.js', function(script) {
        // ...далее не рекомендуется (лучше разбить на ф-ии или применить промисы)
      });  
    })  
});


// перехват ошибок
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
  
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
  
    document.head.append(script);
}

// «колбэк с первым аргументом-ошибкой» («error-first callback»).
loadScript('/my/script.js', function(error, script) {
    if (error) {
      // обрабатываем ошибку
    } else {
      // скрипт успешно загружен
    }
});