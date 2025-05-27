import * as React from "react"
import { graphql } from "gatsby"

import Characters from "../components/characters"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Glossary = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Characters />
    </Layout>
  )
}

export default Glossary

export const Head = () => <Seo title="silent valley" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`