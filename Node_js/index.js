Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 500)),
  new Promise(resolve => setTimeout(() => resolve(4), 1000)),
])
  .then(console.log)
  .catch(console.error); // 3
