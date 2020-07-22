/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useRef, useEffect, FC } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../components/header";

import "../styles/tailwind.css";
import "./main.css";
import "../styles/scanlines.css";

const Main: FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const headerRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(headerRef.current === null || containerRef.current === null)
      return;
    const headerHeight = headerRef.current.offsetHeight;
    containerRef.current.style.marginTop = `${headerHeight}px`;
  }, [headerRef]);

  return (
    <>
      <Header ref={headerRef} className="header" siteTitle={data.site.siteMetadata.title} />
      <div
        ref={containerRef}
        className="xxl-container mx-auto my-0"
      >
        <main className="main">{children}</main>
        <footer className="pt-12 footer">
          <div>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </div>
        </footer>
      </div>
    </>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
