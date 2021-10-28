# [위코드 x 원티드] 백엔드 프리온보딩 선발 과제

## Description
- Framework: Nestjs
- Database: sqlite3
게시물을 Delete 또는 Update 하기 위해서는 해당 유저의 글만 가능하기 때문에 유저와 게시물 두 개의 모듈로 나눴습니다. 유저의 모듈에서는 유저의 생성 또는 회원가입하고 가입한 유저를 인증하기 위해서 로그인 기능을 구현하였습니다. 유저가 정상적으로 회원가입을 하고 로그인에 성공하면 JWT 토큰을 부여받아 게시물의 CRUD 오퍼레이션을 가능하도록 구현하였습니다. READ는 다른 유저들의 모든 게시물 또는 게시물의 ID로 조회할 수 있도록 구현하였고 모든 게시물을 조회할 때에 query로 limit과 offset을 option으로 request 하여 pagination을 가능하도록 하였습니다. 유저는 게시물을 one-to-many 관계를 갖도록 형성하여 해당 유저의 게시물만 update 또는 delete 하게끔 구현하였습니다. WRITE 오퍼레이션도 마찬가지로 유저가 게시물을 작성하면 데이터베이스에 유저의 게시물로 저장됩니다. 따라서 글 작성, 글 확인, 글 목록 확인, 글 수정, 글 삭제가 되는 API 모두 구현하였습니다.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start

# watch mode
$ npm run start:dev
```


## API Endpoint
### User(유저)
#### Sign Up (유저생성 or 회원가입)
- Method: POST
- Endpoint: http://localhost:3000/user/signup
- Body:
  - username: string (required)
    - (Min 4 & Max 20 letters)
  - password: string (required)
    - (Min 8 & Max 20 letters)
- Request
```bash
curl --location --request POST 'http://localhost:3000/user/signup' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=user1' \
--data-urlencode 'password=password'
```
- Response
```bash
# 201
{ "message": "User Created" }

# 400
{
    "statusCode": 400,
    "message": [
        "username must be longer than or equal to 4 characters"
    ],
    "error": "Bad Request"
}
```
***

#### Sign In (로그인)
- Method: POST
- Endpoint: http://localhost:3000/user/signin
- Body:
  - username: string (required)
  - password: string (required)
- Request
```bash
curl --location --request POST 'http://localhost:3000/user/signin' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=user1' \
--data-urlencode 'password=password'
```
- Response
```bash
# 200
{ 
    "message": "Logged In",
    "accessToken": "eyJhbGciOiJI..."
}

# 401
{
    "statusCode": 401,
    "message": "Please check your sign in credentials",
    "error": "Unauthorized"
}
```

***

### Post(게시물)
#### Create Post (글 작성)
- Method: POST
- Endpoint: http://localhost:3000/posts
- Header:
  - Authorization(token): string (required)
- Body:
  - post: string (required)
- Request
```bash
curl --location --request POST 'http://localhost:3000/posts' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI...' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'post=test'
```
- Response
```bash
# 200
{
    "data": {
        "post": "test",
        "author": "user1",
        "created_at": "2021-10-27T07:47:00.451Z",
        "updated_at": null,
        "id": "6719b4bf-39d9-4dc6-b746-d18a7924fdbd"
    }
}

# 400
{
    "statusCode": 400,
    "message": [
        "post must be a string",
        "post should not be empty"
    ],
    "error": "Bad Request"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
***

#### Update Post (글 수정)
- Method: PATCH
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Body:
  - post: string (required)
- Request
```bash
curl --location --request PATCH 'http://localhost:3000/posts/6719b4bf-39d9-4dc6-b746-d18a7924fdbd' \
--header 'Authorization: Bearer eyJhbGc...' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'post=update test'
```
- Response
```bash
# 200
{
    "data": {
        "id": "6719b4bf-39d9-4dc6-b746-d18a7924fdbd",
        "post": "update test",
        "author": "user1",
        "created_at": "2021-10-27T07:47:00.451Z",
        "updated_at": "2021-10-27T07:54:04.772Z"
    }
}

# 400
{
    "statusCode": 400,
    "message": [
        "post must be a string",
        "post should not be empty"
    ],
    "error": "Bad Request"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"6719b4bf-39d9-4dc6-b746-d18a7924fdb\" not found",
    "error": "Not Found"
}
```
***

#### Delete Post (글 삭제)
- Method: DELETE
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Request
```bash
curl --location --request DELETE 'http://localhost:3000/posts/6719b4bf-39d9-4dc6-b746-d18a7924fdbd' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiI...'
```
- Response
```bash
# 200
{
    "message": "Successfully deleted"
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"6719b4bf-39d9-4dc6-b746-d18a7924fdb\" not found",
    "error": "Not Found"
}
```
***

#### Get A Post by ID (아이디로 글 하나 읽기)
- Method: GET
- Endpoint: http://localhost:3000/posts/:id
- Header:
  - Authorization(token): string (required)
- Param:
  - id(글 id): string (required)
- Request
```bash
curl --location --request GET 'http://localhost:3000/posts/9701bbf7-030c-48fc-962a-c036c88bc34c' \
--header 'Authorization: Bearer eyJhbGciOiJIU...'
```
- Response
```bash
# 200
{
    "id": "9701bbf7-030c-48fc-962a-c036c88bc34c",
    "post": "test",
    "author": "user1",
    "created_at": "2021-10-27T08:13:30.105Z",
    "updated_at": null
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}

# 404
{
    "statusCode": 404,
    "message": "Post with ID \"9701bbf7-030c-48fc-962a-c036c88bc34\" not found",
    "error": "Not Found"
}
```
***

#### Get All Posts (전체 글 일기)
- Method: GET
- Endpoint: http://localhost:3000/posts
- Header:
  - Authorization(token): string (required)
- Query:
  - limit: string (optional)
  - offset: string (optional)
- Request
```bash
curl --location --request GET 'http://localhost:3000/posts?limit=10&offset=0' \
--header 'Authorization: Bearer eyJhbGciOiJIU...'
```
- Response
```bash
# 200
{
    "count": 10,
    "data": [
        {
            "id": "9701bbf7-030c-48fc-962a-c036c88bc34c",
            "post": "test",
            "author": "user1",
            "created_at": "2021-10-27T08:13:30.105Z",
            "updated_at": null
        },
        ...
    ]
}

# 401 (Bad Token)
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
