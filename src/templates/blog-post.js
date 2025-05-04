import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: {
    site,
    markdownRemark: post,
    allMarkdownRemark: { nodes: allPosts },
  },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  // Find the current post's index in the sorted list
  const currentIndex = allPosts.findIndex(p => p.id === post.id)

  // Determine previous and next posts based on the sorted list
  const previous = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const next =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
          <small>{post.frontmatter.year}</small>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div style={{ textAlign: "center" }}>
        <Link to="/guide">
          <span>📖</span>
        </Link>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        year
        description
        chapter
      }
    }
    allMarkdownRemark(sort: { frontmatter: { chapter: ASC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          chapter
        }
      }
    }
  }
`
