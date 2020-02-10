<a name="top"></a>
Project Canvas: https://docs.google.com/document/d/1KHufBfOT3z5OFoRIDsgyXXV4QDPv2d2vkvw1iroqPMg/edit

# Gigapet backend

Gigapet API for PTCT Build Week, Jan 2020 deployed at `https://gigapet-backend.herokuapp.com/`

## Rate Limits

- 250 API calls per 15 min
- 1000ms Slowdown when over 100 API Calls
- 5 API calls to register and login routes per 15 minutes

- [Auth](#auth)
- [Logs in a registered parent](#logs-in-a-registered-parent)
- [Registers a New Parent](#registers-a-new-user)
- [Parent Router](#parent-router)
- [Child Router](#child-router)
- [Food Router](#food-router)

## <a name='auth'></a> Auth

Seed Users
{
username: test1,
password: test
}
{
username: test2,
password: test
}

## <a name='logs-in-a-registered-parent'></a> Logs in a registered parent

[Back to top](#top)

### <p>Log a parent in, receive token on successful login</p>

    POST /api/auth/login

### Requires

| Name     | Type   | Description                  |
| :------- | :----- | :--------------------------- |
| username | String | <p>The Parent's username</p> |
| password | String | <p>The Parent's password</p> |

### Sample-Request:

```
{
    "username": "johndoe",
    "password": "123456"
}
```

### Success Response

Success-Response:

```
{
    "message": "Welcome back johndoe!",
    "token": "Generated Token"
}
```

### 200

| Name    | Type | Description            |
| :------ | :--- | :--------------------- |
| message | json | <p>Welcome Message</p> |

### Error Response

Error-Response:

```
{
    "username": "Required"
}
```

Error-Response:

```
{
    "code": 404,
    "error": "User Not Found"
}
```

Error-Response:

```
{
    "code": 401,
    "error": "Invalid Credentials"
}
```

## <a name='registers-a-new-parent'></a> Registers a New Parent

[Back to top](#top)

### <p>Registers a New Parent to the Database</p>

    POST /api/auth/register

### Schema

| Name        | Type   | Description                  |
| :---------- | :----- | :--------------------------- |
| parent_name | String | <p>The Parent's Name         |
| username    | String | <p>The parent's Username</p> |
| password    | String | <p>The parent's Password</p> |
| email       | String | <p>The parent's Email</p>    |

### Sample-Request:

```
{
    "parent_name": "John Doe",
    "username": "johndoe",
    "password": "123456"
    "email": "john@doe.com",
}
```

### Success Response

Success-Response:

```
{
    "message": "Welcome to Gigapet John Doe"
}
```

### 201

| Name    | Type | Description            |
| :------ | :--- | :--------------------- |
| message | json | <p>Welcome Message</p> |

### Error Response

Error-Response:

```
{
    "username": "Required"
}
```

Error-Response:

```
{
    "code": 400,
    "error": "Username is already taken"
}
```

Error-Response:

```
{
    "code": 400,
    "error": "Email is already taken"
}
```

## <a name='parent-router'></a> Routes for Parents

[Back to top](#top)

### Base Route returns logged in user

    GET /api/parent/

```
{
  "parent_name": "test1",
  "username": "test1",
  "email": "test1@test.com"
}
```

### <p>Gets a parent by id</p>

    GET /api/parent/:id

### Request Returns:

```
{
  "parent_name": "test1",
  "username": "test1",
  "email": "test1@test.com"
}
```

### <p>Update parent</p>

    PUT /api/parent/:id

### Sample-Request:

```
{
    "parent_name": "testupdate",
    "username": "testupdate",
    "email": "test1@test.com"
}
```

## <a name='child-router'></a> Routes for Child

[Back to top](#top)

### <p>Gets a children that belongs to logged in parent</p>

    GET /api/child

### Example data

```
[
  {
    "id": 1,
    "name": "Bob",
    "monster_id": 1,
    "parent_id": 1,
    "co_parent_id": null
  },
  {
    "id": 2,
    "name": "Larry",
    "monster_id": 1,
    "parent_id": 1,
    "co_parent_id": null
  }
]
```

### <p>Gets a child by id</p>

    GET /api/child/:id

### Request Returns:

```
{
  "child": {
    "id": 1,
    "name": "Bob",
    "monster_id": 1,
    "parent_id": 1,
    "co_parent_id": null
  },
  "child_food": [
    {
      "id": 1,
      "name": "food",
      "created_at": "2020-02-01 16:48:49",
      "updated_at": "2020-02-01 16:48:49",
      "child_id": 1,
      "type": "fruits",
      "servings": 2
    },
    {
      "id": 2,
      "name": "food",
      "created_at": "2020-02-01 16:48:49",
      "updated_at": "2020-02-01 16:48:49",
      "child_id": 1,
      "type": "veggies",
      "servings": 3
    }
  ],
  "monster": [
    {
      "id": 1,
      "name": "monster-orange"
    }
  ]
}
```

### <p>Adds a child</p>

    POST /api/child

required data

```
{
	"name": "Bobby",
    "monster_id": 1
}
```

Returns the ID of the new child

### <p>Update a child</p>

    PUT /api/child/:id

required data

```
{
	"name": "Bobbina",
    "monster_id": 1
}
```

Returns:

```
{
    message: "Child Updated"
}
```

### <p>Delete a child</p>

    DELETE /api/child/:id

returns number of children deleted

## <a name='food-router'></a> Routes for Food

[Back to top](#top)

### Get food by id

    GET /api/foods/:id

### Add a food

    POST /api/foods

required fields

```
{
		"name": "apple",
		"child_id": 1,
		"type": "fruit",
		"servings": 2
}
```

Must include `child_id` in `req.body`

returns the `id` of the food created

### Update a food

    PUT /api/foods/:id

required fields

```
{
		"name": "apple",
		"child_id": 1,
		"type": "fruit",
		"servings": 2
}
```

Must include `child_id` in `req.body`

returns:

```
{
  "message": "Food Updated"
}
```

### Delete a food

    DELETE /api/foods/:id

returns:

```
{
  "message": "Food Deleted"
}
```
