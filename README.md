# FamPayBackend

## Tech Stack Used

-  NodeJS
-  MongoDB (Atlas)

## Installation

```sh
git clone https://github.com/aryabharat/FamPayBackend.git
```
 #### Update docker-compose.yml
 - API_KEYS  (seperated by comma)
 - MONGO_URI (MongoDB connection string)
 
```sh
docker-compose up --build
```

##  APIs

#### GET DATA
----
  Returns json data from the database.

* **URL**

  /data/?page=1&limit=15

* **Method:**

  `GET`
  
#### SEARCH DATA
----
  Returns json data from the database according to the user's search.

* **URL**

  /data/search/?keywords=cricket

* **Method:**

  `GET`