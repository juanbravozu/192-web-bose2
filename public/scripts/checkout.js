function handleLoad() {

    var products = [];

    function getProducts() {
        

        fetch('/api/shoppingCart').then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var price = document.querySelector('.form__priceValue');
            var priceValue = 0;

            info.forEach((product) => {
                if(product.amount > 0){
                    
                    for(var i = 0; i < product.amount; i++) {
                        products.push(product._id);
                    }

                    fetch('/api/products?id='+product._id).then((raw) => {
                        return raw.json();
                    })
                    .then((item) => {
                        priceValue += item[0].price*product.amount;
                        price.innerHTML = '$'+priceValue;
                    });
                }                
            });

 
        });
    }

    getProducts();

    var form = document.querySelector('.checkout__form');

    form.addEventListener('submit', () => {
        event.preventDefault();

        getProducts();

        var formInfo = new FormData(form);

        var data = new URLSearchParams(formInfo);
        console.log(products);
        data.append('products', products);

        products = [];
        fetch('/api/checkout', {
            method: 'POST',
            body: data
        }).then((raw) => {
            return raw.json();
        })
        .then((info) => {
            console.log(info);
        });
    });
}

window.addEventListener('load', handleLoad);