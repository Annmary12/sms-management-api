import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

// util
import { contact } from '../utils/data';
import Message from '../models/message';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';
let firstToken, secondToken, user1, user2;

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
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('message sent successfully');
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
