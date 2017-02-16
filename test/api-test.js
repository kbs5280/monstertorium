const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');

describe('GET /monsters', () => {
  beforeEach(() => {
    app.locals.monsters = [{ id: 1, name: 'Steve', level: 2 }];
  });

  afterEach(() => {
    app.locals.monsters = [];
  });

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/monsters')
      .expect(200, done);
  });

  it('should return a set of monsters stored in app.locals.monsters', (done) => {
    request(app)
      .get('/monsters')
      .expect(200, {
        monsters: app.locals.monsters
      }, done);
  });
});

describe('POST /monsters', () => {

  beforeEach(() => {
    app.locals.monsters = [];
  });

  it('should create a new monster', (done) => {
    const monster = { id: 1, name: 'Steve', level: 2 };

    request(app)
      .post('/monsters')
      .send({ monster: monster })
      .expect(201)
      .end(() => {
        assert.deepEqual(app.locals.monsters, [monster]);
        done();
      });
  });
});
