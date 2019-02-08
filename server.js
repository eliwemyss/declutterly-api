'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('./config');


const app = express();
w
app.use(morgan('common'));
app.use(express.json());


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl,{ useNewUrlParser: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if(err) {
                    return reject(err)
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };