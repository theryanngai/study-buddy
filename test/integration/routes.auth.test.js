process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server');
const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/study_buddy';
const db = pgp(connectionString);

describe('routes : auth', () => {

  beforeEach(() => {
    return
  })
})

