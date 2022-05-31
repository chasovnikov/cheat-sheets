### 1-й вариант установки

```bash
npm install --save vue@next && npm install --save-dev vue-loader@next

```

-   дописать строку ".vue()" в файле webpack.mix.js

```js
mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        //
    ]);
```

-   создать свой компонент Vue 3 (/resources/js/components/HelloWorld.vue)
-   импортировать Vue в файл app.js

```js
import { createApp } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp({});
app.component("hello-world", HelloWorld).mount("#app");

require("./bootstrap");
```

-   добавить "id=app" в корневой тег
-   подключить файл app.js вне тега с id=app

```php
<script src="{{ asset('js/app.js') }}"></script>
```

-   скомпилировать ресурсы

```bash
npm run watch
```

-   используйте компонент Vue в Blade

```php
        <div id="app">
           <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center py-4 sm:pt-0">
               <hello-world/>
           </div>
        </div>
```

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
