const sectionTestimonials = body.querySelector('#testimonials')
const sectionExample = body.querySelector('#example')
const sectionFeatures = body.querySelector('#features')
const sectionResources = body.querySelector('#resources')
const sectionAboutUs = body.querySelector('#about-us')

const blurOffset = 8

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('navigation__link') && !event.target.classList.contains('navigation__link--external')) {
    event.preventDefault()
    const eventLink = event.target
    const eventSection = body.querySelector(eventLink.href.substring(eventLink.href.indexOf('#')))
    window.scrollTo({
      top: eventSection.offsetTop - header.offsetHeight + blurOffset,
      behavior: 'smooth'
    })
  }
})
