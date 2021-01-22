const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { db, Page, User } = require('./models/index');
const routeWiki = require('./routes/wiki');
const routeUser = require('./routes/users');

db.authenticate().then(() => {
  console.log('connected to the database');
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public/stylesheets')));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', routeWiki);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  await db.sync({ force: true });
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Listening on PORT: ${PORT}`);
// });
