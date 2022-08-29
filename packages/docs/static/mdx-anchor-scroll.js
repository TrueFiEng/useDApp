window.addEventListener('load', () => {
  const destination = document.querySelector(window.location.hash)
  if (destination) {
    destination.scrollIntoView()
  }
})
