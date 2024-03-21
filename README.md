# Fork the world

## Code structure
The codebase was developed using express and typescript with Prisma ORM that connects to a Postgres DB, this option improves performance and safety enforcing some of the best practices in the industry.
Alongside that, I used the MVC and SOLID principles that improve the code readability and maintainability diving the data layer from the controllers and the services following the latest industry standards.

## DB design
![DB design](game7.drawio.png)


## DOCKER
You have a docker compose file tha will launch the application on port 4000 and the postGres DB on another container on port 5432
You can use this link to access it
```
postgresql://admin:admin@localhost:5432/app_db?schema=public
```

## Setup and seed the DB
To start using the DB firt incorporate the schemas designed on Prima and seeed with some mock data running this commands once the postgres is up and running.
```
npx prisma migrate reset
yarn seed:db
```


## Existing routes
The whole API was built using express and support versioning, unfortunately, there's no swagger but will add it if I have permission to exceed the suggested time.
### Items
- Create a new item

POST http://localhost:4000/api/v1/items
```json
{
	"name": "super axe 2",
	"typeName": "strenght",
	"itemPerks":["one", "two"] // optional
}
```
- Get all the existing items

GET http://localhost:4000/api/v1/items

### Inventory
- Add item to user inventory

POST http://localhost:4000/api/v1/inventory
```json
{
	"userId": 1,
	"itemId": 2
}
```

- Delete item from user inventory

DELETE http://localhost:4000/api/v1/inventory

```json
{
	"userId": 1,
	"itemId": 2
}
```

- List all the items that an use has on the inventory

GET http://localhost:4000/api/v1/inventory/:USERID


- Transfer item between 2 user

POST http://localhost:4000/api/v1/inventory/transfer

```json
{
    "userIdOrigin": 1,
    "userIdDestination": 3,
    "itemId":  2
}
```

- Equip and unequip item 

POST http://localhost:4000/api/v1/inventory/equip

```json
{
	"userId": 3,
    "itemId":  2
}
```

### Users
- Get all the users

GET http://localhost:4000/api/v1/users

- Create a new user

POST http://localhost:4000/api/v1/users
```json
{
	"email": "roberto@mail.com"
}
```


## Unit tests
I created some unit tests using jest on some part of the code, due to time constrains it was possible o create a fully tested application but you can run the tests using
```
yarn test
```

and get a more detailed view of the test coverage with the graphic report using
```
yarn test:coverage
```

## Missing features
- Swagger
- Complete code coverage
- Authentication
- e2e test
- Improve Docker build size bundle