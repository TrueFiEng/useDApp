window.addEventListener('load', () => {
  if (!window.location.hash) return
  const destination = document.querySelector(window.location.hash)
  if (destination) {
    destination.scrollIntoView()
  }
})
