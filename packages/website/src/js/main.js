// animations on scroll
AOS.init()

// header
const body = document.body
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