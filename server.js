const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
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

app.delete('/api/nouns/:id', (req, res, next) => {
  db.deleteNoun(req.params.id)
    .then(response => {
      res.send(response);
    })
    .catch(next);
});

app.delete('/api/verbs/:id', (req, res, next) => {
  db.deleteVerb(req.params.id)
    .then(response => res.send(response))
    .catch(next);
});

app.delete('/api/adjectives/:id', (req, res, next) => {
  db.deleteAdjective(req.params.id)
    .then(response => res.send(response))
    .catch(next);
});

app.post('/api/nouns', (req, res, next) => {
  db.createNoun()
    .then(response => res.send(response))
    .catch(next);
});

app.post('/api/verbs', (req, res, next) => {
  db.createVerb()
    .then(response => res.send(response))
    .catch(next);
});

app.post('/api/adjectives', (req, res, next) => {
  db.createAdjective()
    .then(response => res.send(response))
    .catch(next);
});

db.sync().then(() => {
  console.log('synced');
  app.listen(port, () => console.log(`listening on port ${port}...`));
});
