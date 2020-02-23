const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
// const bodyParser = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.get('/api/nouns', (req, res, next) => {
  db.readNouns()
    .then(nouns => {
      console.log(nouns);
      res.send(nouns);
    })
    .catch(next);
});

app.get('/api/verbs', (req, res, next) => {
  db.readVerbs()
    .then(verbs => res.send(verbs))
    .catch(next);
});

app.get('/api/adjectives', (req, res, next) => {
  db.readAdjectives()
    .then(adjectives => res.send(adjectives))
    .catch(next);
});

app.delete('api/nouns/:id', (req, res, next) => {
  console.log('req.body is', req.body);
  db.deleteNoun(req.body.id)
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(next);
});

db.sync().then(() => {
  console.log('synced');
  app.listen(port, () => console.log(`listening on port ${port}...`));
});
