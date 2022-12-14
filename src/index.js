const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

//route
const route = require('./routes');
const db = require('./config/db');

//connect DB

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extened: true,
    }),
);

app.use(methodOverride('_method'));

app.use(express.json());
//http logger
const morgan = require('morgan');
app.use(morgan('combined'));

//template engine
const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
