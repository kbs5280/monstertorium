const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.monsters = [];

app.use(express.static('public'));

if (!module.parent) {
  app.listen(3000, () => {
    console.log('The Monstertorium is live! (http://localhost:3000)');
  });
}

app.get('/monsters', (request, response) => {
  response.send({ monsters: app.locals.monsters });
});


app.post('/monsters', (request, response) => {
  const monster = request.body.monster;

  monster.id = monster.id || Date.now();
  app.locals.monsters.push(monster);

  response.status(201).send({ monster: monster });
});

module.exports = app;
