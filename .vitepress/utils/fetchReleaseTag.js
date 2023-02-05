export function fetchReleaseTag(releases) {
  if (releases) {
    const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
    const docsReleaseTagSpan = document.createElement('samp')
    docsReleaseTagSpan.classList.add('docs-cn-github-release-tag')
    docsReleaseTagSpan.innerText = releases
    tagLineParagragh?.appendChild(docsReleaseTagSpan)
  }
}
