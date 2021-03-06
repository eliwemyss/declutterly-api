
'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/declutterly-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-declutterly-app';
exports.API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api'
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'default';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';