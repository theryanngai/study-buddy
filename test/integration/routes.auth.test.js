process.env.NODE_ENV = 'test';

const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../server');
const knex = require('../../server/db/knex');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : auth', () => {
  beforeEach(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));
  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'frameoncue',
          password: 'superduperpassword',
          firstName: 'ryan',
          lastName: 'ngai',
          email: 'iremain@gmail.com',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should throw an error if a user is logged in', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123',
      });
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'ryan',
          password: 'passwordguy',
        })
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.status.should.eql('You are already logged in');
          done();
        });
    });

    it('should throw an error if the username is < 3 characters', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'yo',
          password: 'yoguogu',
          email: 'yo@yoyoyo.com',
          firstName: 'yoyoyo',
        })
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(400);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Username must be at least 3 characters');
          done();
        });
    });

    it('should throw an error if the password is < 6 characters', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'michael',
          password: 'na',
          email: 'mifhdlfjk@fjkdfjk.com',
          firstName: 'weirdo',
        })
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(400);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Password must be longer than 5 characters');
          done();
        });
    });

  });

  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should throw an error if a user is logged in', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123',
      });
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123',
        })
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.status.should.eql('You are already logged in');
          done();
        });
    });

  });

  describe('GET /auth/logout', () => {
    it('should logout a user', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123'
      });
      chai.request(server)
        .get('/auth/logout')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/auth/logout')
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Please log in');
          done();
        });
    });
  });

  describe('GET /loginCheck', () => {
    it('should return a success', (done) => {
      passportStub.login({
        username: 'jeremy',
        password: 'johnson123',
      });
      chai.request(server)
        .get('/api/loginCheck')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should throw an error if a user is not logged in', (done) => {
      chai.request(server)
        .get('/api/loginCheck')
        .end((err, res) => {
          should.exist(res.error);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Please log in');
          done();
        });
    });
  });
});

