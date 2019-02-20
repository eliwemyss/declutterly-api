// const chai = require('chai');

// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const {app, runServer, closeServer} = require('../server');
// const { TEST_DATABASE_URL } = require('../config');
// const { Inventory } = require('../inventory/models')

// const expect = chai.expect;

// chai.use(chaiHttp);

// function tearDownDb() {
//   return new Promise((resolve, reject) => {
//     console.warn('Deleting database');
//     mongoose.connection.dropDatabase()
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }

// function seedInventory() {
//   const seedData = [];
//   for(let i = 1; i <= 20; i++) {
//     seedData.push({
//     'item': 'book',
//     'description': 'black',
//     'location': 'here',
//     'category': 'books',
//     'decision': 'keep'
//   });
//     return Inventory.insertMany(seedData)
//   }
// }

// describe('API resource', function() {
//   before(function() {
//     return runServer(TEST_DATABASE_URL)
//   })
//   beforeEach(function() {
//     return seedInventory()
//   })
//   afterEach(function() {
//     return  tearDownDb()
//   })
//   after(function() {
//     return closeServer()
//   });

//  describe('GET endpoint', function () {

//     it('should return inventory', function () {
//       let res;
//       return chai.request(app)
//         .get('/api/inventory')
//         .then(_res => {
//           res = _res;
//           expect(res).to.have.status(200);
//     });
// });

// });
//     it('should return inventory with right fields', function () {

//       let resInv;
//       return chai.request(app)
//         .get('/api/inventory')
//         .then(function (res) {
//           expect(res).to.have.status(200)
//           expect(res).to.be.json;
//         });
//     });
//   });

//   describe('POST endpoint', function () {

//     it('should add a new inevntory item', function () {

//       const newItem = createFakeItem();

//       return chai.request(app)
//         .post('/api/inventory')
//         console.log(newItem)
//         .send(newItem)
//         .then(function (res) {
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.a('object')
//           expect(res.body).to.include.keys(
//             'id','item','description', 'location', 'category', 'description');
//           expect(res.body.item).to.equal(newItem.item);
//           expect(res.body.description).to.equal(newItem.description);
//           return Inventory.findById(res.body.id);
//         })
//         .then(function (inventory) {
//           expect(res.body.item).to.equal(newItem.item);
//           expect(res.body.description).to.equal(newItem.description);
//           expect(res.body.location).to.equal(newItem.location);
//           expect(res.body.category).to.equal(newItem.category);
//           expect(res.body.decision).to.equal(newItem.decision)
//         });
//     });
//   });

//   describe('PUT endpoint', function () {
//     it('should update fields you send over', function () {
//       let itemToUpdate;
//       const newItem = createFakeItem();
//       return Inventory.find()
//         .then(inventory => {
//           expect(inventory).to.be.a('array');
//           itemToUpdatem= inventory [0];
//         })
//       })
//   })

//   describe('DELETE endpoint', function () {

//     it('should delete a item by id', function () {

//       let item;

//       return Inventory
//         .findOne()
//         .then(_item => {
//           item = _item;
//           return chai.request(app).delete(`/api/inventory/${inventory.id}`);
//         })
//         .then(res => {
//           expect(res).to.have.status(204);
//           return Inventory.findById(item.id);
//         })
//         .then(_item => {
//           expect(_item).to.not.exist;
//         });
//     });
//   });

// function createFakeItem() {
//   return{
//     'item': faker.random.number(100),
//     'description': faker.random.number(100)
//   };
// }