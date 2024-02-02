# Chevostik payment app

## Команды

Запуск для разработки:
```shell
npm i && npm run start
```

Деплой проекта на production:
```shell
cd /srv/payment-app/ && \
ssh-agent bash -c 'ssh-add ~/.ssh/chevostik_payment_app; git pull origin master' && \
npm i && npm run build
```
Где `~/.ssh/chevostik_payment_app` — приватный ключ, который указывается в настройках репозитория