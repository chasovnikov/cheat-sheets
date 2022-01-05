// Установить модуль mongodb
// npm i mongodb

// В точке входа (например, index.js):
const { MongoClient } = require('mongodb');

const client = new MongoClient('... url ...');

const start = async () => {
  try {
    await client.connect();
    console.log('Соединение установлено');
    await client.db().createCollection('users');
    const users = client.db().collection('users');
    await users.insertOne({ name: 'ulbi tv', age: 21 });
    const user = await users.findOne({ name: 'ulbi tv' });
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

start();
