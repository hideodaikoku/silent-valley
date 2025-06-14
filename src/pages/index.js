import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Import the image from the src/images folder
import silentValleyImage from "../images/silent-valley.png"

// Helper function to chunk an array into groups of a given size
function chunkArray(array, size) {
  const result = []
  for (let i = 1; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  // Sort posts by chapter and chunk into acts of 8
  const sortedPosts = [...posts].sort((a, b) => a.frontmatter.chapter - b.frontmatter.chapter)
  const acts = chunkArray(sortedPosts, 8)

  return (
    <Layout location={location} title={siteTitle}>
      <img
        src={silentValleyImage}
        alt="Silent Valley"
        style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
      />
      <hr />
      <h2>table of contents</h2>
      {acts.map((actPosts, idx) => (
        <section key={idx} style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginTop: "2rem" }}>{`act 0${idx + 1}`}</h2>
          <ol style={{ listStyle: `none`, paddingLeft: 0 }}>
            {actPosts.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              return (
                <li key={post.fields.slug} style={{ marginBottom: "1.5rem" }}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2 style={{ marginBottom: 0 }}>
                        <Link to={post.fields.slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
      <div style={{ textAlign: "center" }}>
        <Link to="/glossary">
          <span>+glossary+</span>
        </Link>
      </div>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="silent valley" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          year
          title
          chapter
          description
        }
      }
    }
  }
`
