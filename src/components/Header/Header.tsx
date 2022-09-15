import { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { handleLogoutRedux } from "../../redux/slices/userSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import logo from "../../assets/images/logo.png";
import "./Header.scss";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { account, isError, isLoading } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(handleLogoutRedux());
      toast.success("Logout success");
    }
  };

  useEffect(() => {
    if (account && account.auth === false) {
      navigate("/");
    }
  }, [account]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((account && account.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  {account && account.auth ? (
                    <>
                      {" "}
                      <NavLink to={"/"} className="nav-link">
                        Home
                      </NavLink>
                      <NavLink to={"/users"} className="nav-link">
                        Users
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to={"/"} className="nav-link">
                        Home
                      </NavLink>
                    </>
                  )}
                </Nav>
                <Nav>
                  <span className="navbar-text">
                    {account && account.auth && account.email ? (
                      <p>
                        welcome:
                        <b> {account.email} </b>!
                      </p>
                    ) : (
                      ""
                    )}
                  </span>
                  <NavDropdown title="Setings" id="basic-nav-dropdown">
                    {account && account.auth ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to={"/login"} className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
