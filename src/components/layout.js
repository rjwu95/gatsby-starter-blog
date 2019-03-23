/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
// import { StaticQuery, graphql } from "gatsby"

// import Header from "./header"
import "./layout.css"
const ListLink = props => (
  <li style={{ display: "inline-block", marginRight: "1rem" }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Layout = ({ children }) => (
  <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
    <header style={{ marginBottom: "1.5rem " }}>
      <Link to="/" style={{ textShadow: "none", backgroundImage: "none" }}>
        <h3 style={{ display: "inline" }}>gun's blog</h3>
      </Link>
      <ul style={{ listStyle: "none", float: "right" }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>
      </ul>
    </header>
    {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
