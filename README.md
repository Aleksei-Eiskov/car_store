Car_store

Simple REST API for a car shop powered by json-server.

Quick start - Node

Install deps
npm install
Run
npm start
The service will be available at http://localhost:3001
Quick start - Docker
docker build -t car_store .
docker run -p 3001:3001 car_store
or
docker compose up --build
Handy endpoints

Healthcheck
GET /health
Reset to the initial state
POST /reset
Base resources
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
Relations and conveniences:
Expand related entities
GET /cars?_expand=brand&_embed=reviews
Search and filters
GET /cars?q=tesla
GET /cars?brandId=3&price_gte=30000&price_lte=40000
Sorting and pagination
GET /cars?_sort=price&_order=asc&_page=1&_limit=10
Request examples

Create a car
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
Fetch with brand and reviews expanded
GET /cars/1?_expand=brand&_embed=reviews
