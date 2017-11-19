const passport = require('passport');
const LocalStartegy = require('passport-local').Strategy;
const init = require('./passport');
const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/study_buddy';
const db = pgp(connectionString);

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  db.one('select * from users where id = $1', id)
    .then((user) => {
      if (!user) return done(null, false);
      if (!authHelpers.comparePass(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
}));

module.exports = passport;
