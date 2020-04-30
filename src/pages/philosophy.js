import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const PhilosophyPage = ({ data }) => (
  <Layout>
    <div>
      <h4>{data.allMarkdownRemark.edges.filter(el => el.node.fields.slug.match(/\/philosophy/)).length} Posts</h4> {/* 효율적인 방법 찾기 */}
      {data.allMarkdownRemark.edges.filter(el => el.node.fields.slug.match(/\/philosophy/)).map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
)

export default PhilosophyPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
