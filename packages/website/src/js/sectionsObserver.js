const sections = body.querySelectorAll('section.section')
const navigationLinks = document.querySelectorAll('.navigation__link')

const pageObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
}

function pageScrollEvents(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
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
    }
  })
}

const pageScrollObserver = new IntersectionObserver(pageScrollEvents, pageObserverOptions)
sections.forEach(section => pageScrollObserver.observe(section))
