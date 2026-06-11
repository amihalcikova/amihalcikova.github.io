// Lišta menu:
//  1) po začátku scrollu (od ~4px) přidá na <html> třídu `scrolled`
//     → menu se z „součásti stránky" promění v přilepenou mléčnou lištu.
//  2) měří skutečnou výšku lišty a ukládá ji do --nav-height
//     → stránka si nahoře rezervuje přesně tolik místa (i na mobilu).
//  3) na mobilu přepíná hamburger (otevírá/zavírá menu).
const THRESHOLD = 4

function onScroll() {
  document.documentElement.classList.toggle("scrolled", window.scrollY > THRESHOLD)
}

function setNavHeight() {
  const header = document.querySelector(".page-header header") as HTMLElement | null
  if (header) {
    document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`)
  }
}

window.addEventListener("scroll", onScroll, { passive: true })
window.addEventListener("resize", setNavHeight, { passive: true })
document.addEventListener("nav", () => {
  onScroll()
  setNavHeight()
})

// hamburger (delegace → funguje i po SPA navigaci)
document.addEventListener("click", (e) => {
  const target = e.target as Element
  const btn = target.closest(".nav-toggle")
  if (btn) {
    const nav = btn.closest(".nav-links")
    if (nav) {
      const open = nav.classList.toggle("open")
      btn.setAttribute("aria-expanded", String(open))
    }
    return
  }
  // klik na odkaz v otevřeném menu → zavřít
  if (target.closest(".nav-menu a")) {
    document.querySelectorAll(".nav-links.open").forEach((n) => n.classList.remove("open"))
  }
})

onScroll()
setNavHeight()
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(setNavHeight)
}
