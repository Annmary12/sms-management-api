import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

// util
import { contact } from '../utils/data';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1'

describe('controllers : Contact', () => {
  // before((done) => {
  //   mongoose.connect(process.env.DB_URL_TEST, { useNewUrlParser: true, useCreateIndex: true });
  //   done();
  // })
  describe('create() function', () => {
    it('should return a new user object and users token', (done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send(contact)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
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