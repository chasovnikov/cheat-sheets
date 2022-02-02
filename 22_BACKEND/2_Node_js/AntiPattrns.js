const { add } = require('lodash');

/*
Если в промисе вместо reject throw-нить ошибку в др. место, то 
NodeJS не сразу поймет, что мы не навесили обработчик

Может быть повторый вызов колбэков из-за "лапши" (тоже с промисами)

pipe в стримах не понимает при ошибке, что всё обрушилось.
Нужно везде поставить on('error', ...)

Нужно ограничивать конкурентность запросов.
Надо тестировать пропускную способность
(по теории очередей и системе массового обслуживания),
и ограничить на вход интенсивность запросов:
*/
const queue = metaSync
  .queue(3) // 3 потока исполнения
  .wait(2000) // ожидание не более 2 сек
  .timeout(5000) // ограничение по пропускной способности
  .throttle(100, 1000)
  .process((item, cb) => cb(err, result))
  .success(item => {})
  .failure(item => {})
  .done(() => {})
  .draine(() => {});

/*
Race Condition (состояние гонки): как только мы делаем await,
кто-то может менять  свойства объектов. Надо сделать критическую
секцию: блокировка ресурсов:
*/
// Блокиратор
class Lock {
  constructor() {
    this.active = false;
    this.queue = [];
  }

  // разлочивание
  leave() {
    if (!this.active) return;
    this.active = false;
    const next = this.queue.pop();
    if (next) next();
  }

  // залочивание
  enter() {
    return new Promise(resolve => {
      const start = () => {
        this.active = true;
        resolve();
      };
      if (!this.active) {
        start();
        return;
      }
      this.queue.push(start);
    });
  }
}
// использование:
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lock = new Lock();
  }

  async move(dx, dy) {
    await this.lock.enter(); // залочил данный объект
    this.x = await add(this.x, dx);
    this.y = await add(this.y, dy);
    this.lock.leave(); // разлочил данный объект
  }
}
