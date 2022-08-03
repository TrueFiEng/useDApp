const body = document.body
const header = body.querySelector('header')
const footer = body.querySelector('footer')

body.querySelectorAll('.dependents__slide.slider__item').forEach((slide, index) => slide.dataset.aosDelay = (50 * index).toString())

// animations on scroll
AOS.init({
  once: true
})

// fixed header animation
const headerOffset = header.clientHeight

const handleHeaderStyles = () => {
  if (window.scrollY < headerOffset) {
    header.classList.remove('header--fixed')
  }
  if (window.scrollY >= headerOffset) {
    header.classList.add('header--fixed')
  }
}

document.addEventListener('scroll', handleHeaderStyles)

// motion path
const ethereumIllustration = body.querySelector('.hero__ethereum')
const reactIllustration = body.querySelector('.hero__react')

ethereumIllustration.querySelectorAll('.hero__ethereum .hero__ethereum-line').forEach(
  (item, index) => {
    item.style.setProperty('stroke-dasharray', (item.getTotalLength() + 1).toString())
    item.style.setProperty('stroke-dashoffset', (item.getTotalLength() + 1).toString())
    item.style.setProperty('animation-delay', `${10 * index / 100}s`)
  }
)
reactIllustration.querySelectorAll('.hero__react .hero__react-line').forEach(
  (item, index) => {
    item.style.setProperty('stroke-dasharray', (item.getTotalLength() + 1).toString())
    item.style.setProperty('stroke-dashoffset', (item.getTotalLength() + 1).toString())
    item.style.setProperty('animation-delay', `${20 * index / 100}s`)
  }
)

// marquee
Marquee3k.init()

// header menu
const headerBurgerButton = header.querySelector('.header__burger')

header.addEventListener('click', (event) => {
  let eventTarget = event.target
  if (eventTarget == headerBurgerButton) {
    body.classList.toggle('body--menu-open')
  }
  if (
    eventTarget.classList.contains('header__logo') ||
    eventTarget.classList.contains('header__link') ||
    eventTarget.classList.contains('header__social-link') ||
    eventTarget.classList.contains('header__docs')
  ) {
    body.classList.remove('body--menu-open')
  }
})

// handle visual height unit

const handleVisualHeightUnit = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

handleVisualHeightUnit()

window.addEventListener('resize', handleVisualHeightUnit);