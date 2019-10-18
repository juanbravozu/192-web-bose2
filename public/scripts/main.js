function handleLoad() {

    // Color Interaction ------------------------------------

    var colorButtons = document.querySelectorAll('.inter__color');
    var productImage = document.querySelector('.productModel');

    function iterateButtons(btn, index) {

        function handleColorClick() {

            productImage.setAttribute('src', './images/model'+index+'.png');
           
        }

        btn.addEventListener('click', handleColorClick);
    }

    colorButtons.forEach(iterateButtons);

    // Gallery Interaction ------------------------------------

    var gallery = document.querySelector('.gallery');
    var tape = gallery.querySelector('.gallery__tape');
    
    var firstImg = tape.querySelector('.gallery__img');
    var lastSlide = document.querySelector('.gallery__container:nth-of-type(5)');
    var lastImg = lastSlide.querySelector('.gallery__img');

    var prevButton = document.querySelector('.prev');
    var nextButton = document.querySelector('.next');
    var count = 1;

    var newLast = document.createElement('div');
    newLast.classList.add('gallery__container');
    var newLastImg = document.createElement('img');
    newLastImg.setAttribute('src', firstImg.getAttribute('src'));
    newLastImg.classList.add('gallery__img');

    newLast.appendChild(newLastImg);
    tape.appendChild(newLast);

    var newFirst = document.createElement('div');
    newFirst.classList.add('gallery__container');
    var newFirstImg = document.createElement('img');
    newFirstImg.setAttribute('src', lastImg.getAttribute('src'));
    newFirstImg.classList.add('gallery__img');

    newFirst.appendChild(newFirstImg);
    tape.insertBefore(newFirst, tape.firstChild);

    function handleLast(){
        console.log('cambio');
        tape.classList.add('gallery__tape--inactive');
        tape.style.transform = 'translate(-100vw, 0)';
        count = 1;
    }

    function handleFirst(){
        console.log('cambio');
        tape.classList.add('gallery__tape--inactive');
        tape.style.transform = 'translate(-500vw, 0)';
        count = 5;
    }

    function handleGalleryClick(event) {

        if(event.srcElement.classList.contains('next')) {
            count++;
        } else {
            count--;
        }

        if(count == 2 || count == 0 || count == 6 || count == 4) {
            tape.classList.remove('gallery__tape--inactive');
        }

        if(count > tape.childElementCount - 2){
            console.log('cambio'+count);
            setTimeout(handleLast, 300);
            
        } else if(count < 1) {
            console.log('cambio'+count);
            setTimeout(handleFirst, 300);
        }

        console.log(count);
        tape.style.transform = 'translate('+-1*100*count+'vw, 0)';
        
    }

    nextButton.addEventListener('click', handleGalleryClick);
    prevButton.addEventListener('click', handleGalleryClick);

    // Responsive menu display ------------------------------------

    var menuBtn = document.querySelector('.header__btn');
    var nav = document.querySelector('nav');

    function handleMenuClick() {
        nav.classList.toggle('nav--active');
    }

    menuBtn.addEventListener('click', handleMenuClick);
}

window.addEventListener('load', handleLoad);