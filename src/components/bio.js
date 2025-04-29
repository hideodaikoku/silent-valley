/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            instagram
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />

      <div className="footer">
        {author?.name && (
          <p>
            &copy; 2025,{" "}
            <a
              href={`https://instagram.com/` + social.instagram}
              target="_blank"
              noopener="true"
              rel="noreferrer"
            >
              {author.name}
            </a>
            , all rights reserved
          </p>
        )}
        <p>
          buy me a coffee ☕️ <a href="https://ko-fi.com/hideodaikoku">ko-fi</a>
        </p>
      </div>
    </div>
  )
}

export default Bio
