import chai from 'chai';
import supertest from 'supertest';
import server from '../bin/www';
import mongoose from 'mongoose';

// util
import { contact } from '../utils/data';

const { expect } = chai;
const request = supertest(server);
const BASE_URL = '/api/v1';
let token;
let getUser;

describe('controllers : Contact', () => {
  describe('create() function', () => {
    it('should return a new user object and users token', (done) => {
      request.post(`${BASE_URL}/contacts/`)
      .send(contact)
      .end((err, res) => {
        token = res.body.token;
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

  describe('signIn() function', () => {
    it('should sign in a user', (done) => {
      request.post(`${BASE_URL}/contacts/sign-in`)
      .send(contact)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.user.name).to.equal(contact.name);
        expect(res.body.user.phoneNumber).to.equal(Number(contact.phoneNumber));
        done();
      })
    });

    it('should not sign in a user', (done) => {
      const user = {
        ...contact,
        phoneNumber: '0294789000'
      }
      request.post(`${BASE_URL}/contacts/sign-in`)
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('contact not found');
        done();
      })
    })
  });

  describe('getAll() function', () => {
    it('should get all contacts', (done) => {
      request.get(`${BASE_URL}/contacts/`)
      .set('Authorization', token)
      .end((err, res) => {
        getUser = res.body.docs[0];

        expect(res.statusCode).to.equal(200);
        expect(res.body.docs.length).to.equal(1);
        done();
      })
    });

    it('should not get all contact for non authorized users', (done) => {
      request.get(`${BASE_URL}/contacts/`)
      .set('Authorization', '1269ahjekek')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('Please, Kindly Signin Again');
        done();
      })
    })
  });

  describe('getOne() function', () => {
    it('should get one contact', (done) => {
      request.get(`${BASE_URL}/contacts/${getUser._id}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal(getUser.name);
        expect(res.body.phoneNumber).to.equal(getUser.phoneNumber);
        done();
      })
    });

    it('should not get a contact when wrong ID is passes', (done) => {
      request.get(`${BASE_URL}/contacts/12346789`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.message).to.equal('contact not found');
        done();
      })
    })
  });

  describe('deleteContact() function', () => {
    it('should check if contact exist', (done) => {
      request.delete(`${BASE_URL}/contacts/`)
      .set('Authorization', token)
      .send({ id: 'hfLjj2903030' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Contact does not exist');
        done();
      });
    })

    it('should delete a contact', (done) => {
      request.delete(`${BASE_URL}/contacts/`)
      .set('Authorization', token)
      .send({ id: getUser._id })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Contact deleted successfully');
        done();
      });
    })
  })
})