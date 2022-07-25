const body = document.body

body.querySelectorAll('.dependents__slide .slider__link').forEach((slide, index) => slide.dataset.aosDelay = (50 * index).toString())
// animations on scroll
AOS.init({
  once: true
})

// header
const header = body.querySelector("header")

const headerOffset = header.clientHeight

const handleHeaderStyles = () => {
  if (window.scrollY < headerOffset) {
    header.classList.remove("header--fixed")
  }
  if (window.scrollY >= headerOffset) {
    header.classList.add("header--fixed")
  }
}

document.addEventListener("scroll", handleHeaderStyles)

// motion path
const ethereumIllustration = body.querySelector('.hero__ethereum')
const reactIllustration = body.querySelector('.hero__react')

ethereumIllustration.querySelectorAll('.hero__ethereum > *').forEach(
  (item, index) => {
    item.style.setProperty('stroke-dasharray', (item.getTotalLength() + 1).toString())
    item.style.setProperty('stroke-dashoffset', (item.getTotalLength() + 1).toString())
    item.style.setProperty('animation-delay', `${10 * index / 100}s`)
  }
)
reactIllustration.querySelectorAll('.hero__react > *').forEach(
  (item, index) => {
    item.style.setProperty('stroke-dasharray', (item.getTotalLength() + 1).toString())
    item.style.setProperty('stroke-dashoffset', (item.getTotalLength() + 1).toString())
    item.style.setProperty('animation-delay', `${20 * index / 100}s`)
  }
)

// marquee
Marquee3k.init()