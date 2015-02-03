Блог
----
Есть регистрация, комментирование, редактирование и удаление  постов.
На клиенте используется EmberJS.
На сервере NodeJS с express, mongodb (через mongoose) для хранения данных и redis для хранения токенов авторизации.


Сборка и запуск
---------------
Для сборки необходимо в папке проекта выполнить команды
```
npm install
bower install
gulp --production
```

Для запуска:

Сервера mongodb и redis должны быть запущены
```
node ./app.js
```

Приложение будет доступно на 3000 порту (порт можно поменять переменной окружения PORT)

