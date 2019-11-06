function handleLoad() {

    
    
    function getProducts(route) {
        fetch('/api/products'+route).then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var container = document.querySelector('.items');

            container.innerHTML = '';

            console.log(info);
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
        });
    }

    getProducts('');

    var select = document.querySelector('.filter__select');
    var checkBoxes = document.querySelectorAll('.filter__inputCheckbox');

    var filter = document.querySelector('.filter');
    var range = document.querySelector('.filter__range');

    var displayValue = document.createElement('p');
    displayValue.classList.add('filter_rangeValue');

    displayValue.innerHTML = '$'+range.value;
    filter.appendChild(displayValue);

    function handleChange() {
        var route = '?orderBy='+select.value;
        getProducts(route);

        checkBoxes.forEach((checkBox) => {
            if(checkBox.checked) {
                
            }
        });
    };

    select.addEventListener('change', handleChange);
}

window.addEventListener('load', handleLoad);