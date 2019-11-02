const assert = require('assert');
const objectID = require('mongodb').ObjectID;

function createRoutes(app, db) {
    app.get('/', (request, response) => {
        response.sendFile(__dirname+'/public/index.html');
    });
    
    app.get('/tienda', (request, response) => {
        response.sendFile(__dirname+'/public/store.html');
    });

    app.get('/api/products', (request, response) => {
        var products = db.collection('products');
        
        products.find({})
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);
            });
    });
}

module.exports = createRoutes;