### 1-й вариант установки

1. Установить пакеты

```bash
npm install --save vue@next && npm install --save-dev vue-loader@next

```

2.  Дописать строку ".vue()" в файле webpack.mix.js:

```js
mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        //
    ]);
```

3. Создать свой компонент Vue 3 (/resources/js/components/HelloWorld.vue)
4. Импортировать Vue в файл app.js:

```js
import { createApp } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp({});
app.component("hello-world", HelloWorld).mount("#app");

require("./bootstrap");
```

5. Добавить "id=app" в корневой контейнер и вставить компонент Vue:

```php
        <div id="app">
           <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center py-4 sm:pt-0">
               <hello-world/>
           </div>
        </div>
```

6. Подключить файл app.js вне тега с id=app:

```php
<script src="{{ asset('js/app.js') }}"></script>
```

8. Скомпилировать ресурсы

```bash
npm run watch
```

---

### 2-й вариант установки

```bash
npm install - g @vue/cli
npm install vue@next
composer create-project laravel/laravel project_name
composer require laravel/ui
php artisan ui vue --auth

# править package.json

npm install
npm run watch

# править /resources/js/app.js

npm install vue-router@4

```
