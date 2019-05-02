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
    });

    it('should return an error that a name filed is required', (done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send({
        name: '',
        phoneNumber: '098765432145'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('name is required');
        done();
      })
    })

    it('should return an error when a phone number field is not provided', (done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send({
        name: 'Annmary',
        phoneNumber: ''
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('phone number is required');
        expect(res.body.errors[1]).to.equal('phone number must be an integer');
        expect(res.body.errors[2]).to.equal('phone number must not exceed 12 digits');
        done();
      })
    });

    it('should return an error when a phone number is not an integer', (done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send({
        name: 'Annmary',
        phoneNumber: '124fg5'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0]).to.equal('phone number must be an integer');
        expect(res.body.errors[1]).to.equal('phone number must not exceed 12 digits');
        done();
      })
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(done);
    })
  })
})