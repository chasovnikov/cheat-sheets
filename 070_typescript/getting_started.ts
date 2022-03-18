// https://typescript-handbook.ru/docs/ts-1

// Установка
// yarn global add tsc
// или
// npm i -g tsc

// Скомпилировать файл hello.ts в js-файл
// tsc hello.ts

// чтобы TS был более строгим, то можете указать флаг --noEmitOnError
// tsc --noEmitOnError hello.ts

// преобразование кода в код другой версии
// tsc --target es2015 hello.ts

// оставить tscзапуск в режиме просмотра с помощью, tsc -w -p . и он будет 
// генерировать .jsфайлы для вас в режиме реального времени

// Строгость (strictness)
// Флаг --strict или настройка "strict": true в tsconfig.json включает максимальную строгость
// noImplicitAny    - когда TS не может сделать точный вывод о типе значения, он присваивает такому значению наиболее мягкий тип any
// strictNullChecks - по умолчанию значения null и undefined могут присваиваться любым другим типам