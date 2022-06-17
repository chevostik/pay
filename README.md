# Chevostik payment app

## Команды

Запуск для разработки:
```shell
npm run start
```

Клонирование репозитория на production:
```shell
ssh-agent bash -c 'ssh-add ~/.ssh/chevostik_payment_app; git clone git@github.com:mocdmi/chevostik_payment_app.git'
```
Деплой проекта на production:
```shell
ssh-agent bash -c 'ssh-add ~/.ssh/chevostik_payment_app; git pull'
npm run build
```
