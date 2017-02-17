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

  describe('UPDATE /monsters/:id', (done) => {

    beforeEach(() => {
      app.locals.monsters = [{ id: 1, name: 'Steve', level: 2 }];
    });

    afterEach(() => {
      app.locals.monsters = [];
    });

    it('should update a record by id', (done) => {
      const monster = app.locals.monsters[0];

      request(app)
        .put(`/monsters/${monster.id}`)
        .send({ monster: {name: 'Louisa' }})
        .expect(204)
        .end(() => {
          assert.equal(app.locals.monsters[0].name, 'Louisa');
          done();;
        });
    });

    it('should return a 404 status if there is no monster', (done) => {
      request(app)
        .delete('/monsters/invalid')
        .expect(404, done);
    });
  });

  describe('DELETE /monster/:id', () => {

    beforeEach(() => {
      app.locals.monsters = [{ id: 1, name: 'Steve', level: 3 }];
    });

    afterEach(() => {
      app.locals.monsters = [];
    });

    it('should delete a monster', (done) => {
      const monster = app.locals.monsters[0];

      request(app)
        .delete(`/monsters/${monster.id}`)
        .expect(204)
        .end(() => {
          assert.equal(app.locals.monsters.length, 0);
          done();
        });
    });

    it('should return 404 if id is invalid', (done) => {
      request(app)
        .delete(`/monsters/invalid`)
        .expect(404, done);
    });

  });

});
