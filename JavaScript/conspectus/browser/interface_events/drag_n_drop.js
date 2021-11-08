
/// Drag’n’Drop

/*
Базовый алгоритм Drag’n’Drop:
1. При mousedown – готовим элемент к перемещению, если необходимо 
    (например, создаём его копию). 
2. Затем при mousemove передвигаем элемент на новые координаты путём смены left/top 
    и position:absolute. 
3. При mouseup – остановить перенос элемента и произвести все действия, 
    связанные с окончанием Drag’n’Drop.
*/

// Перенос мяча:
ball.onmousedown = function(event) { // (1) отследить нажатие

    // (2) подготовить к перемещению:
    // разместить поверх остального содержимого и в абсолютных координатах
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    // переместим в body, чтобы мяч был точно не внутри position:relative
    document.body.append(ball);
  
    // и установим абсолютно спозиционированный мяч под курсор
    moveAt(event.pageX, event.pageY);
  
    // запомним расстояние от курсора до левого верхнего угла шара
    // без этого шар будет прыгать своим центром под курсор при нажатии на край шара
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
  
    // передвинуть мяч (координаты: left, top) под координаты курсора (pageX, pageY)
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }
  
  //   это не окончательная функция (более лучшая версия находится еще ниже по коду)
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // (3) перемещать по экрану
    // mousemove отслеживается на document, а не на ball, потому что из-за быстрого 
    // движения указатель может спрыгнуть с мяча и оказаться в середине документа
    document.addEventListener('mousemove', onMouseMove);
  
    // (4) положить мяч, удалить более ненужные обработчики событий
    ball.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };
  };
  
  // отключить Drag’n’Drop браузера по умолчанию
  ball.ondragstart = function() {
    return false;
  };
  
  
  // Цели переноса (droppable)
  // перетаскиваемый (draggable)
  
  // события мыши срабатывают только на верхнем элементе, но не на нижнем.
  
  // document.elementFromPoint(clientX, clientY)
  //      возвращает наиболее глубоко вложенный элемент по заданным координатам окна 
  //      (или null, если указанные координаты находятся за пределами окна).
  
  // потенциальная цель переноса, над которой мы пролетаем прямо сейчас
  let currentDroppable = null;
  
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  
    ball.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false;
  
    // событие mousemove может произойти и когда указатель за пределами окна
    // (мяч перетащили за пределы экрана)
  
    // если clientX/clientY за пределами окна, elementFromPoint вернёт null
    if (!elemBelow) return;
  
    // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
    let droppableBelow = elemBelow.closest('.droppable');
  
    if (currentDroppable != droppableBelow) {
      // мы либо залетаем на цель, либо улетаем из неё
      // внимание: оба значения могут быть null
      //   currentDroppable=null,
      //     если мы были не над droppable до этого события (например, над пустым пространством)
      //   droppableBelow=null,
      //     если мы не над droppable именно сейчас, во время этого события
  
      if (currentDroppable) {
        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        // логика обработки процесса, когда мы "влетаем" в элемент droppable
        enterDroppable(currentDroppable);
      }
    }
  }