import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/img/logo/logo.png";
import "./header.css";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <div id="main-menu" className="main-menu-container">
        <div className="main-menu">
          <div className="container">
            <div className="navbar-default">
              <div className="navbar-header float-left">
                <Link className="navbar-brand text-uppercase" to="/">
                  <h2 style={{ color: "#fff" }}>
                    <span>Indus Education World</span>
                  </h2>
                </Link>
              </div>

              {/* Hamburger Icon */}
              <div
                className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
                onClick={toggleMobileMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <nav
                className={`navbar-menu float-right ${
                  isMobileMenuOpen ? "open" : ""
                }`}
              >
                <div className="nav-menu ul-li">
                  <ul>
                    <li className="menu-item-has-children ul-li-block">
                      <Link to="/" onClick={toggleMobileMenu}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <a href="#about-us" onClick={toggleMobileMenu}>
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#message" onClick={toggleMobileMenu}>
                        Message
                      </a>
                    </li>
                    <li>
                      <a href="#contactus" onClick={toggleMobileMenu}>
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://forms.gle/rCJYPv9e26MUeeUv9"
                        target="_blank"
                        onClick={toggleMobileMenu}
                      >
                        Scholarship Test
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
