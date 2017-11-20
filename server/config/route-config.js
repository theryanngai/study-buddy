(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const api = require('../routes/api');
    const authRoutes = require('../routes/auth');
    const userRoutes = require('../routes/users');
    const quizRoutes = require('../routes/quizzes');

    // *** register routes *** //
    app.use('/api', api);
    app.use('/api', userRoutes);
    app.use('/auth', authRoutes);
    app.use('/quiz', quizRoutes);
  };

})(module.exports);
