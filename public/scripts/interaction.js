function handleLoad() {

    

    var button = document.querySelector('.interaction__playButton');

    button.addEventListener('click', () => {
        var tl = gsap.timeline();
        window.setTimeout(() => {
            var screen = document.querySelector('.screen');
            screen.classList.add('screen--inactive');

            var interaction = document.querySelector('.interactionContainer');
            interaction.classList.remove('interactionContainer--inactive');
        }, 1000);
        gsap.to('.interaction__image', {rotate: 360, duration: 1, transformOrigin: '50% 65%', ease: CustomEase.create("custom", "M0,0 C0,0 0.00217,-0.0296 0.00817,-0.0429 0.0132,-0.05404 0.022,-0.06506 0.03191,-0.07075 0.04179,-0.07642 0.05657,-0.07928 0.06783,-0.07714 0.08105,-0.07462 0.0967,-0.06816 0.10545,-0.05673 0.15033,0.00186 0.17488,0.05911 0.22458,0.12752 0.26924,0.189 0.29848,0.22324 0.34987,0.27975 0.40109,0.33608 0.43247,0.36584 0.4891,0.41844 0.59938,0.52089 0.66511,0.57183 0.77414,0.67388 0.8167,0.71372 0.84092,0.73809 0.87738,0.78188 0.90951,0.82048 0.92949,0.84662 0.95351,0.88934 0.9754,0.92828 1,1 1,1 ")});
        tl.to('.interaction__playButton', {scale: .7, duration:.3});
        tl.to('.interaction__playButton', {scale: 1, duration: .2});
    });
}

window.addEventListener('load', handleLoad);