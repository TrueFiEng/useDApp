const githubStarsText = body.querySelector("#github-stars")
const githubDependentsText = body.querySelector("#github-dependents")

const githubPackageDependentsURL =
  "https://github.com/TrueFiEng/useDApp/network/dependents?package_id="
const githubPackageID = "UGFja2FnZS0xODg5OTgyMTY5"
const proxyURL = "https://api.allorigins.win/raw?url="

const showFetchedStars = async () => {
  githubStarsText.textContent = "1.2k"

  await fetch("https://api.github.com/repos/TrueFiEng/useDApp")
    .then((response) => response.status === 200 ? response : Promise.reject('Failed to load number of GitHub stars.'))
    .then((response) => response.json())
    .then(
      (data) =>
      (githubStarsText.textContent =
        Intl.NumberFormat("en-US", { notation: "compact" })
          .format(data.stargazers_count)
          .toLowerCase())
    )
}

const showFetchedDependents = async () => {
  githubDependentsText.textContent = "4.7k+"

  const githubPackageDependentsURL =
    "https://github.com/TrueFiEng/useDApp/network/dependents?package_id="
  const githubPackageID = "UGFja2FnZS0xODg5OTgyMTY5"
  const proxyURL = "https://api.allorigins.win/raw?url="

  fetch(proxyURL + githubPackageDependentsURL + githubPackageID)
    .then((response) => response.status === 200 ? response : Promise.reject('Failed to load number of GitHub dependents.'))
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser()
      const document = parser.parseFromString(html, "text/html")
      if (document) {
        const documentBody = document.querySelector("body")
        if (documentBody) {
          const numberOfDependentsLink = documentBody.querySelector(
            `.table-list-filters a[href$="${githubPackageID}"]`
          )
          const numberOfDependentsInnerText = `${numberOfDependentsLink.innerText.replace(/[^0-9]/g, "")}`
          if (numberOfDependentsLink && Number(numberOfDependentsInnerText) > 0) {
            const localNumberOfDependets = Math.floor(Number(numberOfDependentsInnerText) / 100) * 100
            githubDependentsText.textContent =
              new Intl.NumberFormat("en-US", { notation: "compact" })
                .format(localNumberOfDependets)
                .toLowerCase() + "+"
          }
        }
      }
    })
}

if (githubStarsText) {
  showFetchedStars()
}

if (githubDependentsText) {
  showFetchedDependents()
}
