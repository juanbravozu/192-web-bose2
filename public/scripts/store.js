function handleLoad() {

    function displayCart() {
        fetch('/api/shoppingCart').then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var totalAmount = 0;
            
            info.forEach((item) => {
                totalAmount += item.amount;
            });

            var amountText = document.querySelector('.cartAmount');
            amountText.innerHTML = totalAmount;
        });
    }

    displayCart();
    
    function getProducts(route) {
        fetch('/api/products'+route).then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var container = document.querySelector('.items');

            container.innerHTML = '';

            console.log(info);

            console.log('length: '+info.length);
            if(info.length > 0) {
                info.forEach((item) => {
                    var product = document.createElement('div');
                    product.classList.add('items__product');
    
                    var topHalf = document.createElement('div');
                    topHalf.classList.add('items__top');
    
                    topHalf.addEventListener('click', () => {
                        window.location = '/producto/'+item._id;
                    });
    
                    var img = document.createElement('img');
                    img.classList.add('items__img');
                    img.setAttribute('src', './images'+item.image);
    
                    var bottomHalf = document.createElement('div');
                    bottomHalf.classList.add('items__bottom');
    
                    var title = document.createElement('a');
                    title.classList.add('items__title');
                    title.innerHTML = item.name;
                    title.setAttribute('href', '/producto/'+item._id);
    
                    var price = document.createElement('p');
                    price.classList.add('items__body');
                    price.innerHTML = '$'+item.price;
    
                    var rating = document.createElement('div');
                    rating.classList.add('items__rating');
    
                    var ratingIcon = document.createElement('img');
                    ratingIcon.classList.add('items__ratingIcon');
                    ratingIcon.setAttribute('src', './images/rating.png');
    
                    var ratingScore = document.createElement('p');
                    ratingScore.classList.add('items__body', 'items__body--rating');
                    ratingScore.innerHTML = item.rating;
    
                    rating.appendChild(ratingIcon);
                    rating.appendChild(ratingScore);
    
                    var buttons = document.createElement('div');
                    buttons.classList.add('items__buttons');
    
                    var detailsButton = document.createElement('a');
                    detailsButton.classList.add('items__itemDetails');
                    detailsButton.setAttribute('href', '/producto/'+item._id);
                    detailsButton.innerHTML = 'Ver detalles';
    
                    var addButton = document.createElement('button');
                    addButton.classList.add('fas', 'fa-cart-plus', 'fa-lg', 'items__cartButton');
                    addButton.setAttribute('data-id', item._id);
    
                    addButton.addEventListener('click', () => {
                        
                        var data = new URLSearchParams();
                        data.append("_id", item._id);

                        var promise = fetch('/api/shoppingCart', {
                            method : 'POST', 
                            body : data
                        });

                        promise.then((raw) => {
                            return raw.json();
                        }).then((info) => {
                            displayCart();
                            console.log(info);
                        });
                    });

                    topHalf.appendChild(img);
                    bottomHalf.appendChild(title);
                    bottomHalf.appendChild(price);
                    bottomHalf.appendChild(rating);
                    buttons.appendChild(detailsButton);
                    buttons.appendChild(addButton);
                    bottomHalf.appendChild(buttons);
                    product.appendChild(topHalf);
                    product.appendChild(bottomHalf);
    
                    container.appendChild(product);
                });
            } else {
                var message = document.createElement('h1');
                message.classList.add('text__title');
                message.innerHTML = 'No se encontraron productos. Intenta con otros filtros.'
                var itemsContainer = document.querySelector('.items');

                itemsContainer.appendChild(message);
                console.log('No hay items');
            }
            
        });
    }

    getProducts('');

    var select = document.querySelector('.filter__select');
    var checkBoxes = document.querySelectorAll('.filter__inputCheckbox');

    var search = document.querySelector('.filter__textInput');
    var searchButton = document.querySelector('.filter__button');

    var filter = document.querySelector('.filter');
    var range = document.querySelector('.filter__range');

    var displayValue = document.createElement('p');
    displayValue.classList.add('filter__rangeValue');

    displayValue.innerHTML = '$'+range.value;
    filter.appendChild(displayValue);

    function handleChange() {
        var route = '?orderBy='+select.value;

        checkBoxes.forEach((checkBox) => {
            if(checkBox.checked) {
                route = route.concat('&type='+checkBox.value);
            }
        });

        route = route.concat('&price='+range.value);
        
        route = route.concat('&search='+search.value);

        console.log('Valor Búsqueda: '+search.value);

        getProducts(route);
    };

    select.addEventListener('change', handleChange);

    checkBoxes.forEach((checkBox) => {
        checkBox.addEventListener('change', handleChange);
    });

    range.addEventListener('input', () => {
        displayValue.innerHTML = '$'+range.value;
        filter.appendChild(displayValue);
    });

    range.addEventListener('change', handleChange);
    
    searchButton.addEventListener('click', handleChange);
}

window.addEventListener('load', handleLoad);