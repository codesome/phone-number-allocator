# API

## `/getNumber`
Used to get any available number

Make HTTP POST request to `{url}/getNumber` (Ex: http://localhost:3000/getNumber)

#### Example responses
* When number is available
    ```
    {
        status: true,
        number: '1234567890'
    }
    ```

* When number is not available
    ```
    {
        status: false,
        ECODE: 'ELIMIT'
    }
    ```

## `/getSpecialNumber`
Used to get required special number.

Make HTTP POST request to `{url}/getSpecialNumber` (Ex: http://localhost:3000/getSpecialNumber)

Have special number in the body of request with parameter name `number`

Ex: `{number: 1234567890}` or `{number: '1234567890'}` in the body

#### Example responses
* When special number is available
    ```
    {
        status: true,
        special: true,
        number: '1234567890'
    }
    ```

* When special number not is available and some number is available
    ```
    {
        status: true,
        special: false,
        ECODE: 'EINV'
        number: '1122334455' // or any available number
    }
    ```
    ```
    {
        status: true,
        special: false,
        ECODE: 'EEXISTS'
        number: '1122334455' // or any available number
    }
    ```

* When no number is available
    ```
    {
        status: false,
        special: false,
        ECODE: 'ELIMIT'
    }
    ```

### Error codes
* `ECODE='ELIMIT'`: No number is available. All numbers from `1111111111` to `9999999999` are in use.
* `ECODE='EINV'`: Invalid special number given.
* `ECODE='EEXISTS'`: Special number is already taken.
