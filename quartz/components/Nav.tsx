import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import navScrollScript from "./scripts/nav-scroll.inline"

type NavLink = { title: string; slug: string }

// rozdělí titulek kolem znaku "&" a ten obalí <span class="amp"> (jiný font)
function renderTitle(title: string) {
  return title.split("&").flatMap((part, i) => (i === 0 ? [part] : [<span class="amp">&amp;</span>, part]))
}

const css = `
.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav-menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.2rem;
  align-items: center;
}
.nav-menu a {
  font-family: var(--titleFont);
  font-size: 1rem;
  color: var(--darkgray);
  text-decoration: none;
  background-color: transparent;
  transition: color 0.2s ease;
}
.nav-menu a:hover {
  color: var(--secondary);
}
/* hamburger – skrytý na desktopu */
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: var(--darkgray);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
`

export default ((opts?: { links?: NavLink[] }) => {
  const NavWithLinks: QuartzComponent = (props: QuartzComponentProps) => {
    const links = opts?.links ?? []
    const baseDir = pathToRoot(props.fileData.slug!)
    return (
      <nav class={classNames(props.displayClass, "nav-links")}>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="nav-menu">
          {links.map((link) => (
            <a href={`${baseDir}/${link.slug}`}>{renderTitle(link.title)}</a>
          ))}
        </div>
      </nav>
    )
  }
  NavWithLinks.css = css
  NavWithLinks.afterDOMLoaded = navScrollScript
  return NavWithLinks
}) satisfies QuartzComponentConstructor
