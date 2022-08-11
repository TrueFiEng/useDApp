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
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes heroEthereumLine${index} {
        0% {
          opacity: 0.5;
          stroke-dashoffset: ${(item.getTotalLength() + 1).toFixed(2)};
        }
        100% {
          opacity: 1;
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
    item.style.setProperty('stroke-dasharray', ((item.getTotalLength() + 1)).toFixed(2).toString())
    item.style.setProperty('stroke-dashoffset', ((item.getTotalLength() + 1)).toFixed(2).toString())
    item.style.setProperty('animation', `heroEthereumLine${index} 1.5s ease forwards`)
    item.style.setProperty('animation-delay', `${10 * index / 100}s`)
  }
)

reactIllustration.querySelectorAll('.hero__react .hero__react-line').forEach(
  (item, index) => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes heroReactLine${index} {
        0% {
          opacity: 0.5;
          stroke-dashoffset: ${(item.getTotalLength() + 1).toFixed(2)};
        }
        100% {
          opacity: 1;
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
    item.style.setProperty('stroke-dasharray', ((item.getTotalLength() + 1)).toFixed(2).toString())
    item.style.setProperty('stroke-dashoffset', ((item.getTotalLength() + 1)).toFixed(2).toString())
    item.style.setProperty('animation', `heroReactLine${index} 1.5s ease forwards`)
    item.style.setProperty('animation-delay', `${20 * index / 100}s`)
  }
)

// testimonials pagination
const testimonials = body.querySelector('.testimonials')
const testimonialsList = testimonials.querySelector('.testimonials__list')
const testimonialsItems = testimonialsList.querySelectorAll('.testimonials__item')
const testimonialsPagination = testimonials.querySelector('.testimonials__paginations')

testimonialsItems.forEach((testimonial, index) => {
  testimonial.dataset.testimonialNumber = index
  const testimonialPaginationButton = document.createElement('button')
  testimonialPaginationButton.classList.add('testimonials__pagination')
  testimonialPaginationButton.dataset.testimonialButtonNumber = index
  testimonialsPagination.appendChild(testimonialPaginationButton)
})

const testimonialsObserverOptions = {
  threshold: 0.7,
}

const testimonialsPaginationButtons = testimonialsPagination.querySelectorAll('.testimonials__pagination')

function testimonialsSlideEvents(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (entry.isIntersecting) {
        testimonialsPaginationButtons.forEach((button, index) => {
          button.classList.remove('testimonials__pagination--active')
          testimonialsPaginationButtons[entry.target.dataset.testimonialNumber].classList.add('testimonials__pagination--active')
        })
      }
    }
  })
}

const testimonialsScrollObserver = new IntersectionObserver(testimonialsSlideEvents, testimonialsObserverOptions)
testimonialsItems.forEach((testimonial) => testimonialsScrollObserver.observe(testimonial))

testimonialsPagination.addEventListener('click', (event) => {
  if (event.target.classList.contains('testimonials__pagination')) {
    testimonialsList.querySelector(`[data-testimonial-number="${event.target.dataset.testimonialButtonNumber}"`).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
  }
})

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

// start terminals action

const startHeader = body.querySelector('.start__header')
const startSlidingHeader = startHeader.querySelector('.start__sliding-header')
const startTriggers = startSlidingHeader.querySelectorAll('.start__button')
const startTerminals = body.querySelectorAll('.start__terminal')
const npmTerminal = body.querySelector('.start__terminal[data-start-terminal="npm"]')
const boilerplateTerminal = body.querySelector('.start__terminal[data-start-terminal="boilerplate"]')

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

const ctx = setupCanvas(document.querySelector('.terminal__confetti'));
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(200, 200);
ctx.stroke();

const showTerminalResult = (terminal) => {
  terminal.querySelector('.terminal__result').classList.add('terminal__result--active')
  terminal.querySelector('.typed-cursor').classList.add('terminal__cursor--hidden')
  terminal.querySelector('.terminal__spinner').classList.add('terminal__spinner--active')
  const decorationTimeout = setTimeout(() => {
    terminal.querySelector('.terminal__spinner').classList.remove('terminal__spinner--active')
    terminal.querySelector('.terminal__notification').classList.add('terminal__notification--active')
    const terminalConfetti = confetti.create(terminal.querySelector('.terminal__confetti'), { resize: true })
    terminalConfetti({
      angle: 360,
      spread: 360,
      particleCount: 500,
      origin: { x: 0.5, y: 1.2, },
      useWorker: true,
    })
  }, 1500)
}

const terminalsSection = body.querySelector('.start__terminals')

const terminalsObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
}

const typeNpmTerminal = new Typed(npmTerminal.querySelector('.terminal__prompt'), {
  strings: ['npm i @usedapp/core ethers'],
  typeSpeed: 40,
  onStringTyped: (pos, self) => showTerminalResult(npmTerminal),
  cursorChar: '|'
})

const typeBoilerplateTerminal = new Typed(boilerplateTerminal.querySelector('.terminal__prompt'), {
  strings: ['yarn create eth-app dapp'],
  typeSpeed: 45,
  onStringTyped: (pos, self) => showTerminalResult(boilerplateTerminal),
  cursorChar: '|'
})

typeNpmTerminal.reset()
typeNpmTerminal.stop()
typeBoilerplateTerminal.reset()
typeBoilerplateTerminal.stop()

let firstEntry = true

function scrollEvents(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      if (entry.isIntersecting) {
        if (firstEntry !== false) {
          typeNpmTerminal.reset()
          typeNpmTerminal.start()
        }
        firstEntry = false
      }
    }
  })
}

const terminalsScrollObserver = new IntersectionObserver(scrollEvents, terminalsObserverOptions)
terminalsScrollObserver.observe(terminalsSection)

startHeader.addEventListener('click', (event) => {
  startSlidingHeader.style.transform = 'translateX(0)'

  startTriggers.forEach((button) => button.classList.remove('start__button--active'))
  event.target.classList.add('start__button--active')
  startTerminals.forEach((terminal) => {
    terminal.classList.remove('start__terminal--active')
    if (terminal.dataset.startTerminal === event.target.dataset.startTerminal) {
      terminal.classList.add('start__terminal--active')
      if (event.target.dataset.startTerminal === 'boilerplate') {
        typeBoilerplateTerminal.start()
        startSlidingHeader.style.transform = `translateX(-${Math.max(0, (startSlidingHeader.clientWidth - startHeader.clientWidth))}px)`
      }
    }
  })
})

// marquee
Marquee3k.init()

// handle visual height unit

const handleVisualHeightUnit = () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

handleVisualHeightUnit()

window.addEventListener('resize', handleVisualHeightUnit)