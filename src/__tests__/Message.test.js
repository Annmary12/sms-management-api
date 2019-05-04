import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

// util
import { contact } from '../utils/data';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';
let firstToken, secondToken, user1, user2, message;

describe('controllers: Message', () => {
  before((done) => {
    request.post(`${BASE_URL}/contacts/`)
    .send(contact)
    .end((err, res) => {
      firstToken = res.body.token;
      user1 = res.body.data;
      expect(res.statusCode).to.equal(201);
      done();
    })
  })

  describe('send() function', () => {
    before((done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send({
        name: 'Ihuoma',
        phoneNumber: '123456789087'
      })
      .end((err, res) => {
        secondToken = res.body.token;
        user2 = res.body.data;
        expect(res.statusCode).to.equal(201);
        done();
      })
    })

    it('should send a message', (done) => {
      request.post(`${BASE_URL}/message/`)
      .send({
        phoneNumber: user2.phoneNumber,
        message: 'Did you receive the alert'
      })
      .set('Authorization', firstToken)
      .end((err, res) => {
        message = res.body.data;
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('message sent successfully');
        done();
      })
    })

    it('should not send a message to a contact that does not exist', (done) => {
      request.post(`${BASE_URL}/message/`)
      .send({
        phoneNumber: '1264889930',
        message: 'Did you receive the alert'
      })
      .set('Authorization', firstToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Contact not found!');
        done();
      })
    })

    it('should not send a message to it\'s self', (done) => {
      request.post(`${BASE_URL}/message/`)
      .send({
        phoneNumber: user1.phoneNumber,
        message: 'Did you receive the alert'
      })
      .set('Authorization', firstToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('You can\'t send a message to your self');
        done();
      })
    })
  })

  describe('readOne() function', () => {
    it('should read one message', (done) => {
      request.get(`${BASE_URL}/message/read/${message._id}`)
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.updatedMessage.read).to.equal('true');
        done();
      })
    })

    it('should not read a message that does not exist', (done) => {
      request.get(`${BASE_URL}/message/read/0289030394`)
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.message).to.equal('Message not found!');
        done();
      })
    })

    it('should not read message that was not sent to the user', (done) => {
      request.get(`${BASE_URL}/message/read/${message._id}`)
      .set('Authorization', firstToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Message not found!');
        done();
      })
    })
  })

  describe('getSent() function', () => {
    it('should get all messages sent', (done) => {
      request.get(`${BASE_URL}/message/sent`)
      .set('Authorization', firstToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.messages.length).to.equal(1);
        done();
      })
    })

    it('should return no message when no message sent', (done) => {
      request.get(`${BASE_URL}/message/sent`)
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Message not found!');
        done();
      })
    })
  })

  describe('getRecieved() function', () => {
    it('should get all recieved message', (done) => {
      request.get(`${BASE_URL}/message/recieved`)
      .set('Authorization', secondToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.messages.length).to.equal(1);
        done();
      })
    })

    it('should return no message when no message recieved', (done) => {
      request.get(`${BASE_URL}/message/recieved`)
      .set('Authorization', firstToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Message not found!');
        done();
      })
    })
  })

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    })
  })
})
