import React, { useState } from "react";
import { pages } from "../router/routes";
import { NavLink } from "react-router-dom";
import BootStrapNav from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Logotype from "../assets/Logotype.svg";
import cacheService from "../service/CacheService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * @author Isac Zetterström
 * @description logic and render of the navbar.
 */

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [hasToken, setHasToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setHasToken(cacheService.isLoggedIn());
    if (hasToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  function logoutUser() {
    setHasToken(null);
    cacheService.removeLocalValue("token");
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
    navigate("/");
  }

  function renderUserMenu() {
    if (hasToken) {
      return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
        if (loggedIn) {
          return (
            inNav &&
            rightNav && (
              <NavLink key={path} className="nav-link text-nowrap" to={path}>
                {label}
              </NavLink>
            )
          );
        }
      });
    } else {
      return pages.map(({ label, path, inNav, rightNav, loggedIn }) => {
        if (!loggedIn) {
          return (
            inNav &&
            rightNav && (
              <NavLink key={path} className="nav-link text-nowrap" to={path}>
                {label}
              </NavLink>
            )
          );
        }
      });
    }
  }

  return (
    <>
      <BootStrapNav expand="md" className="navbar">
        <Container>
          <BootStrapNav.Brand className="d-md-none" href="/">
            <img src={Logotype} alt="" width="100px" />
          </BootStrapNav.Brand>
          <BootStrapNav.Toggle aria-controls="navbar-nav"></BootStrapNav.Toggle>
          <BootStrapNav.Collapse id="navbar-fixed-top" style={{ width: "50%" }}>
            <Nav className="navbar-fixed-top">
              {pages.map(({ label, path, inNav, rightNav }) => {
                return (
                  inNav &&
                  !rightNav && (
                    <NavLink
                      key={path}
                      className="nav-link text-nowrap"
                      to={path}>
                      {label}
                    </NavLink>
                  )
                );
              })}
              <Container className="d-flex flex-row justify-content-center align-items-center">
                <Container className="navline d-none d-md-block" />
                <BootStrapNav.Brand
                  href="/"
                  className="d-none d-md-block mx-auto px-2">
                  <img className="logo" src={Logotype} alt="" />
                </BootStrapNav.Brand>
                <Container className="navline d-none d-md-block" />
              </Container>

              {renderUserMenu()}
              {hasToken && (
                <NavLink
                  key={"logout"}
                  onClick={() => logoutUser()}
                  className="nav-link text-nowrap logout-btn">
                  Logga Ut
                </NavLink>
              )}
            </Nav>
          </BootStrapNav.Collapse>
        </Container>
      </BootStrapNav>
    </>
  );
}

export default Navbar;