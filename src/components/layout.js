import * as React from "react"
import { Link } from "gatsby"
import { Analytics } from "@vercel/analytics/react"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <Link className="header-link-home" to="/">❖</Link>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        ❖
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <Analytics/>
      <footer>
        © {new Date().getFullYear()}
        {` `}
        <a href="https://amphibianstudios.substack.com">amphibian studios inc.</a>
      </footer>
    </div>
  )
}

export default Layout
