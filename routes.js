const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

function createRoutes(app, db) {
    app.get('/', (request, response) => {
        response.sendFile(__dirname+'/public/index.html');
    });
    
    app.get('/tienda', (request, response) => {
        response.sendFile(__dirname+'/public/store.html');
    });

    app.get('/api/products', (request, response) => {
        var products = db.collection('products');
        
        var order = request.query.orderBy;

        var cursor = products.find();

        if(order == 'rating') {
            cursor.sort({ rating: -1 })
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);

                return;
            });
        } else if(order == 'expensive') {
            cursor.sort({ price: -1 })
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);

                return;
            });
        } else if(order == 'cheaper') {
            cursor.sort({ rating: 1 })
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);

                return;
            });
        } else if(order == 'name') {
            cursor.sort({ name: 1 })
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);

                return;
            });
        } else {
        
            cursor
            .toArray((err, result) => {

                assert.equal(null, err);

                response.send(result);

                return;
            });
        
        }
        
    });

    app.get('/producto/:id', (request, response) => {
        var id = request.params.id;
        console.log(id);

        var products = db.collection('products');

        products.find({ "_id": new ObjectID(id)})
            .toArray((err, result) => {
                assert.equal(null, err);

                var context = {
                    product: result[0]
                };

                console.log(context);
                response.render('productDetails', context);
            });
    });
}

module.exports = createRoutes;