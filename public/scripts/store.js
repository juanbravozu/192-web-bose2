function handleLoad() {

    var filter = document.querySelector('.filter');
    var range = document.querySelector('.filter__range');

    var displayValue = document.createElement('p');
    displayValue.classList.add('filter_rangeValue');

    displayValue.innerHTML = '$'+range.value;
    filter.appendChild(displayValue);

    range.addEventListener('input', () => {
        displayValue.innerHTML = '$'+range.value;
    });
    
    function getProducts() {
        fetch('/api/products').then((raw) => {
            return raw.json();
        })
        .then((info) => {
            var container = document.querySelector('.items');
            console.log(info);
            info.forEach((item) => {
                var product = document.createElement('div');
                product.classList.add('items__product');

                var topHalf = document.createElement('div');
                topHalf.classList.add('items__top');

                var img = document.createElement('img');
                img.classList.add('items__img');
                img.setAttribute('src', './images'+item.image);

                var bottomHalf = document.createElement('div');
                bottomHalf.classList.add('items__bottom');

                var title = document.createElement('h1');
                title.classList.add('items__title');
                title.innerHTML = item.name;

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
                detailsButton.setAttribute('href', '/productDetail/'+item._id);
                detailsButton.innerHTML = 'Ver detalles';

                var addButton = document.createElement('button');
                addButton.classList.add('fas', 'fa-cart-plus', 'items__cartButton');

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

    getProducts();
}

window.addEventListener('load', handleLoad);