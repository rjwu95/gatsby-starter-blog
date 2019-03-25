/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

import "./layout.css"
const ListLink = props => (
  <li
    css={css`
      display: inline-block;
      margin-right: ${rhythm(1)};
    `}
  >
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Layout = ({ children }) => (
  <div
    css={css`
      margin: ${rhythm(3)} auto;
      max-width: 650px;
      padding: 0 ${rhythm(1)};
    `}
  >
    <header
      css={css`
        margin-bottom: ${rhythm(1.5)};
      `}
    >
      <Link
        to="/"
        css={css`
          text-shadow: none;
          background-image: none;
        `}
      >
        <h3
          css={css`
            display: inline;
          `}
        >
          oceas blog
        </h3>
      </Link>
      <ul
        css={css`
          list-style: none;
          float: right;
        `}
      >
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
