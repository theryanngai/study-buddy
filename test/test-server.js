const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const serverAddress = 'localhost:3000';

chai.use(chaiHttp);

describe('users', () => {
  it('should list ALL users on /users GET', (done) => {
    chai.request(serverAddress)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});
