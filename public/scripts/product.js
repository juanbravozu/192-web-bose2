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

    var addButton = document.querySelector('.details__add');

    addButton.addEventListener('click', () => {
                        
        var url = window.location.href;
        var id = url.split('/')[url.split('/').length-1];
        console.log(id);
        
        var data = new URLSearchParams();
        data.append('_id', id);
        
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
}

window.addEventListener('load', handleLoad);