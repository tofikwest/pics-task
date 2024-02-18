Pics.io test task

§Tech stack: nodejs, mongodb, mongoose, express, jsonwebtoken, chai, mocha, supertest§

To be successful with the project, you need to:
All our project will be uped with Docker ( we will use docker compose up);

IMPORTANT STAGE: 0. When you forked this project, you need to create .env with needable properties for doing this run command: yarn create:env ;

You have 2 options:

1.  just run this command: yarn docker:run
    after all dependencies will be installed and running and project will be uped, and you can test manually;

2.  I wrote important test cases (integration and unit tests) (test cases from your task also included) and you can run this with command: yarn tests:start;
    if "INTERGRATION TEST : EVENTS :: POST /api/event/" failed - make sure that in destination.config.json you use this config from your test case 1,
    because as test case i use this case (you can change this if you want, just change this in test file and use any config which you want ):

    config from your test case 1:

    {
    destinations: [
    {
    name: "destination1",
    url: "http://example.com/endpoint",
    transport: "http.post",
    },
    {
    name: "destination2",
    url: "http://example2.com/endpoint",
    transport: "http.put",
    },
    {
    name: "destination3",
    url: "http://example3.com/endpoint",
    transport: "http.get",
    },
    {
    name: "destination4",
    transport: "console.log",
    },
    ],
    strategy: "ALL",
    }

We have the following routes:

Plain registration route for using JWT [For task purpose]

- POST /api/auth/registration
  body: {
  "authorizePrivateKey": "test"
  }
  "test" - this is a private key which you wrote in .env
  in this field: AUTH_PRIVATE_KEY=test;

  STATUS: 201,
  RESPONSE: { message: "ok", accessToken }
  You will get Bearer Token which need for future request with events;
  Token lives - 20m

  STATUS: 400,
  RESPONSE: { message: "Use your authorizePrivateKey" };

  STATUS: 401,
  RESPONSE: { message: "Invalid or expired private key" };

- POST /api/event/
  needs: Authorization: Bearer <token>

  Default destination config on server: {
  "destinations": [
  {
  "name": "destination1",
  "url": "http://example.com/endpoint",
  "transport": "http.post"
  },
  {
  "name": "destination2",
  "url": "http://example2.com/endpoint",
  "transport": "http.put"
  },
  {
  "name": "destination3",
  "url": "http://example3.com/endpoint",
  "transport": "http.get"
  },
  {
  "name": "destination4",
  "transport": "console.log"
  }
  ],
  "strategy": "ALL"
  }

  Example body:
  body: {
  "payload": { "a": 1 },
  "possibleDestinations": [
  {
  "destination1": true,
  "destination2": true,
  "destination3": true
  },
  {
  "destination1": true,
  "destination3": false
  },
  {
  "destination1": true,
  "destination2": true,
  "destination4": false
  },
  {
  "destination5": true
  }
  ]
  }

  STATUS: 200,
  RESPONSE: {
  "answer": {
  "destination1": true,
  "destination2": true,
  "destination3": false,
  "destination4": false,
  "destination5": false
  },
  "error": null
  }

  STATUS: 400,
  validatePropertyEvent and validateStrategyFunction function will check all of your properties
  and return message, error[], status, res:
  [
  { field: "strategy", message: "Invalid strategy value" },
  { field: "strategy", message: "Invalid strategy format" },
  {
  field: `possibleDestinations.${key}`, message: `Value must be a boolean`,
  }
  ]
  RESPONSE: {
  "message": "Validation failed",
  "errors": [
  {
  "field": "possibleDestinations.destination1",
  "message": "Value must be a boolean"
  }
  ],
  "res": false
  }

  STATUS 403
  Without Authorization: Bearer <token>
  RESPONSE: {"error": "Invalid token"}

- GET /api/logger GIVES YOU ALL LOGS WITH OR WITHOUT ERROR
  needs Authorization: Bearer <token>

  STATUS 200
  RESPONSE: {"message": "ok", "allLogs": [
  {
  "\_id": "65d1d761cbd0dad114381a7f",
  "req": {
  "ip": "::ffff:",
  "url": "/api/event/",
  "method": "POST",
  "userAgent": "PostmanRuntime/7.33.0",
  "contentType": "application/json",
  "contentLength": "360",
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDgyNTA3NTksImV4cCI6MTcwODI1MTk1OX0.qC9ny0cTbTU404njYPaT_wyjKbr93hQgl766r7X4fe8"
  },
  "res": {
  "error": {
  "expose": true,
  "statusCode": 400,
  "status": 400,
  "body": "{\n \"payload\": { \"a\": 1 },\n \"possibleDestinations\": [\n {\n \"destination1\": asd,\n \"destination2\": true,\n \"destination3\": true\n },\n {\n \"destination1\": true,\n \"destination3\": false\n },\n {\n \"destination1\": true,\n \"destination2\": true,\n \"destination4\": false\n },\n {\n \"destination5\": true\n }\n ]\n}",
  "type": "entity.parse.failed"
  },
  "answer": null
  },
  "isError": true,
  "createdAt": "2024-02-18T10:09:37.507Z",
  "updatedAt": "2024-02-18T10:09:37.507Z",
  "\_\_v": 0
  }]}

  STATUS 403
  Without Authorization: Bearer <token>
  RESPONSE: {"error": "Invalid token"}

- GET /api/logger/:id GIVES YOU ONE LOG
  needs Authorization: Bearer <token>

  STATUS: 200
  RESPONSE: { message: "ok", log: {
  "\_id": "65d1d866cbd0dad114381a88",
  "req": {
  "ip": "::ffff:172.21.0.1",
  "url": "/api/event/",
  "method": "POST",
  "userAgent": "PostmanRuntime/7.33.0",
  "contentType": "application/json",
  "contentLength": "359",
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3MDgyNTA3NTksImV4cCI6MTcwODI1MTk1OX0.qC9ny0cTbTU404njYPaT_wyjKbr93hQgl766r7X4fe8"
  },
  "res": {
  "error": {
  "expose": true,
  "statusCode": 400,
  "status": 400,
  "body": "{\n \"payload\": { \"a\": 1 },\n \"possibleDestinations\": [\n {\n \"destination1\": ad,\n \"destination2\": true,\n \"destination3\": true\n },\n {\n \"destination1\": true,\n \"destination3\": false\n },\n {\n \"destination1\": true,\n \"destination2\": true,\n \"destination4\": false\n },\n {\n \"destination5\": true\n }\n ]\n}",
  "type": "entity.parse.failed"
  },
  "answer": null
  },
  "isError": true,
  "createdAt": "2024-02-18T10:13:58.197Z",
  "updatedAt": "2024-02-18T10:13:58.197Z",
  "\_\_v": 0
  } }

  STATUS: 404
  RESPONSE: { message: `Not found this id: ${id}` }

We have universal error handler {errorHandler}

if something unexpected we send
STATUS: 500
RESPONSE: {title: "INTERNAL SERVER", message: err.message, stackTrace: err.stack}
