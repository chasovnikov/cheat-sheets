// Для ошибок при работе с сетью может понадобиться HttpError, для операций с
//      базой данных DbError, для поиска – NotFoundError и т.д

// Наши ошибки должны поддерживать базовые свойства:
//      message, name и stack

// "Псевдокод" встроенного класса Error, определённого самим JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Error'; // (разные имена для разных встроенных классов ошибок)
    this.stack = '<стек вызовов>'; // нестандартное свойство, но обычно поддерживается
  }
}

// Наша ошибка
class ValidationError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'ValidationError';
    this.name = this.constructor.name;
  }
}

// Использование
function readUser(json) {
  let user = JSON.parse(json);

  // пробрасываем свои ошибки
  if (!user.age) {
    throw new ValidationError('Нет поля: age');
  }
  if (!user.name) {
    throw new ValidationError('Нет поля: name');
  }

  return user;
}

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  // (err.name == "SyntaxError") - это условие не подходит т.к.
  // в будущем мы собираемся расширить ValidationError
  if (err instanceof ValidationError) {
    alert('Некорректные данные: ' + err.message); // Некорректные данные: Нет поля: name
  } else if (err instanceof SyntaxError) {
    alert('JSON Ошибка Синтаксиса: ' + err.message);
  } else {
    throw err; // неизвестная ошибка, пробросить исключение
  }
}

// Дальнейшее наследование ---------------------------
// для отсутствующих свойств сделаем более конкретный класс
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    // this.name = 'PropertyRequiredError'; // использ-ся this.name = this.constructor.name;
    this.property = property;
  }
}

// Обёртывание исключений -----------------------
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error {
  /*...*/
}
class PropertyRequiredError extends ValidationError {
  /* ... */
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }

  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError('Синтаксическая ошибка', err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError('Ошибка валидации', err);
    } else {
      throw err;
    }
  }
}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
    alert(e);
    // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
    alert('Исходная ошибка: ' + e.cause);
  } else {
    throw e;
  }
}
