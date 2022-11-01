const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extened: true
}));
app.use(express.json());
//http logger
const morgan = require('morgan');
app.use(morgan('combined'));

//template engine
const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
app.engine("hbs", engine(
  {
    extname: ".hbs"
  }
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/search', (req, res) => {
  res.render('search')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})