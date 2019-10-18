const express = require('express');

var bodyParser = require('body-parser');

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile(__dirname+'/public/index.html');
});


app.listen(port, () => {
    console.log(`Conexión iniciada en el puerto ${port}`);
})