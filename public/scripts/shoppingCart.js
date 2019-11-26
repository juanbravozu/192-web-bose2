function handleLoad() {
    console.log('Carga');
    function displayItems() {
        var container = document.querySelector('.itemsContainer');

        fetch('/api/shoppingCart').then((raw) => {
            return raw.json();
        })
        .then((info) => {
            
            container.innerHTML = '';

            info.forEach(item => {
                if(item.amount > 0) {
                    fetch('/api/products?id='+item._id).then((raw) => {
                        return raw.json();
                    })
                    .then((products) => {
                        console.log(products);
                        

                        var containerItem = document.createElement('div');
                        containerItem.classList.add('itemsContainer__item');
                       
                        var imgContainer = document.createElement('div');
                        imgContainer.classList.add('itemsContainer__imageContainer');

                        var img = document.createElement('img');
                        img.setAttribute('src', '/images'+products[0].image);
                        img.classList.add('itemsContainer__image');

                        var infoContainer = document.createElement('div');

                        var name = document.createElement('a');
                        name.classList.add('itemsContainer__title');
                        name.setAttribute('href', '/producto/'+item._id);
                        name.innerHTML = products[0].name;

                        var price = document.createElement('p');
                        price.classList.add('itemsContainer__body');
                        price.innerHTML = '<strong>Precio: </strong>$' + products[0].price;

                        var rating = document.createElement('div');
                        rating.classList.add('itemsContainer__rating');

                        var ratingIcon = document.createElement('img');
                        ratingIcon.classList.add('itemsContainer__ratingIcon');
                        ratingIcon.setAttribute('src', '/images/ratingBlack.png');

                        var ratingScore = document.createElement('p');
                        ratingScore.classList.add('itemsContainer__body');
                        ratingScore.innerHTML = products[0].rating;

                        infoContainer.appendChild(name);
                        infoContainer.appendChild(price);
                        rating.appendChild(ratingIcon);
                        rating.appendChild(ratingScore);
                        infoContainer.appendChild(rating);

                        var amount = document.createElement('p');
                        amount.innerHTML = item.amount;

                        var erase = document.createElement('button');
                        erase.setAttribute('data-id', item._id);
                        erase.classList.add('itemsContainer__eraseButton');
                        erase.innerHTML = '<i class="fas fa-times fa-lg"></i>';
                        erase.addEventListener('click', () => {

                            var data = new URLSearchParams();
                            data.append('_id', item._id);

                            fetch('/api/shoppingCart', {
                                method: 'DELETE',
                                body: data
                            })
                            .then((raw) => {
                                return raw.json();
                            }) .then((info) => {
                                console.log('borrar: '+item._id);
                                displayItems();
                            });
                        });

                        imgContainer.appendChild(img);
                        containerItem.appendChild(imgContainer);
                        containerItem.appendChild(infoContainer);
                        containerItem.appendChild(amount);
                        containerItem.appendChild(erase);

                        container.appendChild(containerItem);
                    });
                }
            });
        });
    }

    displayItems();
}

window.addEventListener('load', handleLoad);