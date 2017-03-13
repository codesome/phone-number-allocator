# phone-number-allocator
API to allocate phone numbers between `1111111111` and `9999999999`

Find API docs [here](https://github.com/thecodesome/phone-number-allocator/blob/master/Docs/API.md)

## Dependencies
* To run the server
  * [NodeJS](https://nodejs.org/en/download/)
  * [MongoDB](https://docs.mongodb.com/manual/installation/)
* To use testing provided with this
  * [Python](https://www.python.org/downloads/)

## Run
```
$ git clone https://github.com/thecodesome/phone-number-allocator.git
$ cd phone-number-allocator/
$ npm install
$ npm start
```

## Test
From the cloned repo, after starting the server
```
$ cd tests/
$ python test.py
```
Further instructions will be given during the execution.

### Folder structure
* `models/`: database collection structure
* `modules/allocator.js`: Phone number allocating logic
* `routes/index.js`: Handling routes
* `tests/test.py`: To test the API
