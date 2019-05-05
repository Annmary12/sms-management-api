[![Build Status](https://travis-ci.org/Annmary12/sms-management-api.svg?branch=development)](https://travis-ci.org/Annmary12/sms-management-api) [![Coverage Status](https://coveralls.io/repos/github/Annmary12/sms-management-api/badge.svg?branch=development)](https://coveralls.io/github/Annmary12/sms-management-api?branch=development)

# SMS MANAGEMENT

SMS MANAGEMENT is a API the enables users to create contact, send, recieve, read, and get message/s.

## Technology Stack Used

* Node Js
* Express Js
* MogonDB
* Mongoose
* Mocha
* Chai

## Feactures

* Users can register
* Users can SignUp
* Users can send a message
* Users can recieve a message
* Users can get all sent messages
* Users can get all recieved messages
* Users can get all read messages
* Users can get all unread messages
* Users can get both sent and recieved messages
* You can delete a user which will delete messages the user sent and recieved.

## Project Structure

```
├── src/
    ├── __test__
    |   └── App.test.js
    |   └── Contact.test.js
    |   └── Message.js
    ├── bin
    │   └── www.js
    ├── controllers
    │   └── ContactController.js
    |   └── MessageController.js
    ├── middlewares
    |   └── auth.js
    |   └── checkContact.js
    │   └── validateInput.js
    ├── models
    │   └── Contact.js
    |   └── Message.js
    ├── repository
    │   └── BaseRepository.js
    ├── routes
    │   └── contact.js
    │   └── index.js
    │   └── message.js
    ├── utils
    │   └── auth.js
    │   └── data.js
    │   └── errorHandler.js
    ├── app.js
```

## Setup

* Clone the project

```sh
> $ git clone https://github.com/Annmary12/sms-management-api.git
```

* Install dependencies by running

```sh
> $ npm install
```

## Running the app

To get the app up and running (and really see if it worked), run:

```sh
> $ npm run dev
```

## Running the tests

* To run the tests

```sh
> $ npm test
```

**NOTE:**: Create a `.env` following the `.env.example` configuration

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>
<tr><td>POST</td><td>/api/v1/contacts/</td><td>Creates a contact</td></tr>
<tr><td>POST</td><td>/api/v1/contacts/sign-in</td><td>Signin a contact</td></tr>
<tr><td>GET</td><td>/api/v1/contacts/</td><td>Gets all contact</td></tr>
<tr><td>GET</td><td>/api/v1/contacts/:id</td><td>Gets one contact</td></tr>
<tr><td>DELETE</td><td>/api/v1/contacts/</td><td>Deletes a contact</td></tr>
<tr><td>POST</td><td>/api/v1/message/</td><td>Sends message to a contact</td></tr>
<tr><td>GET</td><td>/api/v1/message/read/:messageId</td><td>Reads a message</td></tr>
<tr><td>GET</td><td>/api/v1/message/sent</td><td>Gets all sent messages</td></tr>
<tr><td>GET</td><td>/api/v1/message/recieved</td><td>Gets all received messages</td></tr>
<tr><td>GET</td><td>/api/v1/message/</td><td>Gets all messages</td></tr>
<tr><td>GET</td><td>/api/v1/message/unread</td><td>Gets all unread messages</td></tr>
<tr><td>GET</td><td>/api/v1/message/read</td><td>Gets all read messages</td></tr>