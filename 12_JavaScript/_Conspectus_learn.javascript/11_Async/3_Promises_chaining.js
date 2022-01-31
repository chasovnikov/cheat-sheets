new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    alert(result); // 1
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 2
    return result * 2;
  })
  .then(function (result) {
    alert(result); // 4
    return result * 2;
  });

// Возвращаем промисы --------------------
// В этом случае дальнейшие обработчики ожидают, пока он выполнится,
// и затем получают его результат
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    alert(result); // 1
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 2 после паузы 1 сек
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    alert(result); // 4 после паузы 1 сек
  });

// загружать скрипты по очереди --------------------------------
loadScript('/article/promise-chaining/one.js')
  .then(script => loadScript('/article/promise-chaining/two.js'))
  .then(script => loadScript('/article/promise-chaining/three.js'))
  .then(script => {
    // скрипты загружены, мы можем использовать объявленные в них функции
    one();
    two();
    three();
  })
  .catch(error => console.log(error));

// Thenable ----------------------------------------------
// Thenable - это объекты, содержащие методы .then, и будет обработан как промис.
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // будет успешно выполнено с аргументом this.num*2 через 1 секунду
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result);
  })
  .then(alert); // показывает 2 через 1000мс

// Более сложный пример: fetch ------------------------------------
let promise = fetch(url);

// то же самое, что и раньше, только теперь response.json() читает данные в формате JSON
fetch('/article/promise-chaining/user.json')
  // .then в коде ниже выполняется, когда удалённый сервер отвечает
  // response.json() возвращает новый промис,
  // который выполняется и возвращает полный ответ сервера, когда он загрузится
  .then(response => response.json())
  // Делаем запрос к GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Загружаем ответ в формате json
  .then(response => response.json())
  // Показываем аватар (githubUser.avatar_url) в течение 3 секунд (возможно, с анимацией)
  // Чтобы сделать наш код расширяемым, нам нужно возвращать ещё один промис,
  // который выполняется после того, как завершается показ аватара
  .then(
    githubUser =>
      new Promise(function (resolve, reject) {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  // срабатывает через 3 секунды
  .then(githubUser => alert(`Закончили показ ${githubUser.name}`));

// Как правило, все асинхронные действия должны возвращать промис
// Это позволяет планировать после него какие-то дополнительные действия

// Разобьём написанный код на отдельные функции, пригодные для повторного использования:
function loadJson(url) {
  return fetch(url).then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = 'promise-avatar-example';
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Используем их:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Показ аватара ${githubUser.name} завершён`));

// По задачам -------------------

// позволит f2 поймать ошибку в самом промисе и в f1
promise.then(f1).catch(f2);

// f2 поймает только ошибку в самом промисе, но не в f1
promise.then(f1, f2);
