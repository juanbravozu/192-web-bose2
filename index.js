const express = require('express');

var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

const app = express();

const port = 5000;

const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');

const createRoutes = require('./routes.js');

const url = 'mongodb://localhost:27017';

const dbName = 'store';

const client = new MongoClient(url);

app.use(bodyParser.urlencoded({ extended: true }));

client.connect((err) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    createRoutes(app, db);
});

/*MongoClient.connect('mongodb+srv://cluster0-s4v3e.mongodb.net/store?retryWrites=true&w=majority', {
        auth : {
            user: 'juanbravo',
            password: 'australia98'
        }
    }, (err, client) => {
        if(err) throw err;

        const db = client.db(dbName);

        createRoutes(app, db);
        
        app.listen(process.env.PORT || port);
});*/

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));



app.listen(port, () => {
    console.log(`Conexión iniciada en el puerto ${port}`);
});