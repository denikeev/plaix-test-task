# Plaix test task

## About project
Фронтенд проекта сделан на React, вёрстка написана с использованием bootstrap, работа с формами построена через библиотеку formik. Бекенд написан на Express, данные пришедшие с фронтенда валидируются express-validator, подключение к базе данных выполняется через библиотеку pg, данные для БД защищены от SQL injection с помощью pg-format, тесты написаны на JEST.

## Dependencies:
* Node JS
* PostgreSQL
* Git
* Make [GNU utility](https://explainshell.com/explain/1/make)

## Install
```sh
git clone https://github.com/denikeev/plaix-test-task.git
cd plaix-test-task
make all
```

## Start
Runs the app in development mode.
```sh
make start-backend
```

## Task description
Сделать форму обратной связи с занесением в базу PostgreSQL.  
Фронт можно сделать на React, бек на NodeJS.
