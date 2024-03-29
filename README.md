<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Project Description
This project is a straightforward API designed to meet essential functionalities, including:

Authentication Module: Implements secure user authentication and authorization.

Users Module with Address Book: Manages user data and includes a convenient address book feature.

Postman Collection: A comprehensive Postman collection is provided, simplifying API testing and ensuring seamless integration.

## Project Structure

```plaintext
src
|-- app.controller.spec.ts
|-- app.controller.ts
|-- app.module.ts
|-- app.service.ts
|-- auth
|   |-- auth.controller.ts
|   |-- auth.module.ts
|   |-- auth.service.spec.ts
|   |-- auth.service.ts
|   |-- dto
|   |   |-- change-pwd-auth.dto.ts
|   |   |-- forgot-pwd-auth.dto.ts
|   |   |-- index.ts
|   |   |-- login-auth.dto.ts
|   |   `-- reset-pwd-auth.dto.ts
|   `-- strategies
|       |-- index.ts
|       `-- jwt.strategy.ts
|-- common
|   |-- db
|   |   `-- mongo.service.ts
|   |-- decorators
|   |   `-- roles.decorator.ts
|   |-- envs
|   |-- guards
|   |   |-- index.ts
|   |   |-- jwt.guard.ts
|   |   `-- roles.guard.ts
|   `-- types
|       |-- index.ts
|       |-- jwtPayload.ts
|       `-- userModel.ts
|-- main.ts
|-- providers
|   `-- email
|       |-- email.module.ts
|       |-- email.service.spec.ts
|       `-- email.service.ts
`-- user
    |-- dto
    |   |-- additional-user.dto.ts
    |   |-- create-user.dto.ts
    |   |-- index.ts
    |   `-- update-user.dto.ts
    |-- entities
    |   `-- user.entity.ts
    |-- user.controller.ts
    |-- user.module.ts
    |-- user.service.spec.ts
    `-- user.service.ts
```

# Postman Collection

https://winter-comet-154069.postman.co/workspace/e6cbf17f-bc97-4449-8255-ce52aa2ca1f8/collection/23125475-e57101d8-0b08-46f5-9bff-73104a62cbf6?action=share&creator=23125475


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
