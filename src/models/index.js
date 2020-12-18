'use strict';

const dbConnector = require('../database/index.js');

let dbRepo = {};

dbConnector.addSequelizeConnectionToRepo(dbRepo, 'default');

module.exports = dbRepo
