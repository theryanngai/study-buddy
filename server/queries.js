const knex = require('./db/knex');

// add query functions
// function getAllUsers(req, res, next) {
//   db.any('select * from users')
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved ALL users',
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
//
// function getSingleUser(req, res, next) {
//   const userId = parseInt(req.params.id);
//
//   db.one('select * from users where id = $1', userId)
//     .then(function (data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved one user',
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
//
function createUser(req, res, next) {


  db.none('insert into pups(name, breed, age, sex)' +
    'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//
// module.exports = {
//   getAllUsers,
//   getSingleUser,
//   // createUser,
//   // updateUser,
//   // removeUser,
// };
