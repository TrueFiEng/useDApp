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

// marquee
Marquee3k.init()