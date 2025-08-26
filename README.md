# Car_store

Простой REST API для магазина машин на базе json-server.

## Быстрый старт - Node
- Установи зависимости
```
npm install
```
- Запусти
```
npm start
```
Сервис поднимется на http://localhost:3001

## Быстрый старт - Docker
```
docker build -t car_store .
docker run -p 3001:3001 car_store
```
или
```
docker compose up --build
```

## Полезные эндпоинты
- Healthcheck
```
GET /health
```
- Сброс к начальному состоянию
```
POST /reset
```
- Базовые ресурсы
```
GET    /cars
POST   /cars
GET    /cars/:id
PUT    /cars/:id
PATCH  /cars/:id
DELETE /cars/:id

GET    /brands
GET    /brands/:id
GET    /brands/:id/cars

GET    /users
GET    /orders
GET    /cars/:id/reviews
```

## Реляции и удобства
- Вкладывать связанные сущности
```
GET /cars?_expand=brand&_embed=reviews
```
- Поиск и фильтры
```
GET /cars?q=tesla
GET /cars?brandId=3&price_gte=30000&price_lte=40000
```
- Сортировка и пагинация
```
GET /cars?_sort=price&_order=asc&_page=1&_limit=10
```

## Примеры запросов
- Создать машину
```
POST /cars
Content-Type: application/json

{
  "brandId": 4,
  "model": "Camry",
  "year": 2022,
  "price": 25990,
  "mileage": 15000,
  "fuel": "hybrid",
  "transmission": "automatic",
  "color": "grey",
  "images": ["https://placehold.co/600x400?text=Toyota+Camry"],
  "vin": "JTNB11HK7N3000001"
}
```
- Получить с разворотом бренда и отзывами
```
GET /cars/1?_expand=brand&_embed=reviews
```

## Замечания
- Поле price должно быть числом, id не передавай - json-server сгенерит сам.
- Для полной чистки базы используй `npm run reset` или `POST /reset`.
- Хранилище - обычный файл db.json - удобно для локальной разработки.

Удачи и приятного тестирования.
