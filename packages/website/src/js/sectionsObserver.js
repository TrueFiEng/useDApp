const sections = body.querySelectorAll('section.section')
const navigationLinks = document.querySelectorAll('.navigation__link')

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
}

function scrollEvents(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navigationLinks.forEach(navigationLink => {
        if (!navigationLink.classList.contains('navigation__link--external')) {
          navigationLink.classList.remove('navigation__link--active')
          if (navigationLink.href.substring(navigationLink.href.indexOf('#') + 1) == entry.target.id) {
            navigationLink.classList.add('navigation__link--active')
          }
        }
      })
    }
  })
}

const scrollObserver = new IntersectionObserver(scrollEvents, observerOptions)
sections.forEach(section => scrollObserver.observe(section))
