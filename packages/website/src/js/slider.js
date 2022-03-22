const slides = document.querySelectorAll('.window');
const slideActive = document.querySelector('.window--active');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let init = 0;
let initMax = slides.length;

btnRight.addEventListener('click', function () {
  if (init < initMax - 1) {
    init++;
    slides[init - 1].classList.remove('window--active');
    slides[init].classList.add('window--active');
    btnLeft.classList.add('slider__btn--active');
  } else {
    btnLeft.classList.remove('slider__btn--active');
    btnRight.classList.add('slider__btn--active');
    slides.forEach(slide => slide.classList.remove('window--active'));
    slides[0].classList.add('window--active');
    init = 0;
  }
  if (init === initMax - 1) btnRight.classList.remove('slider__btn--active');
});

btnLeft.addEventListener('click', function () {
  if (init > 0) {
    init--;
    slides[init + 1].classList.remove('window--active');
    slides[init].classList.add('window--active');
  }
  if (init <= 0) {
    btnLeft.classList.remove('slider__btn--active');
    btnRight.classList.add('slider__btn--active');
    init = 0;
  }
});
