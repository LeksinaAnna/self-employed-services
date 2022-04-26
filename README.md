____
Настройки .env:
```
HOST=
BASE_URL=
PORT=
BACKEND_PORT=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
TYPEORM_LOGGING=
AUTH_SECRET_KEY=
```
____
Yarn команды:
```json
{
  "yarn client": "docker:dev + DevServer от WebPack",
  "yarn client:build": "запускаем сборку клиента под прод",
  "yarn server": "поднимаем сервер",
  "yarn server:build": "запускаем сборку сервера под прод",
  "yarn docker:dev": "поднимаем nginx в контейнере для проксирования запрос с фронта на сервер",
  "yarn project:start": "полностью поднимается проект: БД, клиент, сервер, nginx"
}

```
____