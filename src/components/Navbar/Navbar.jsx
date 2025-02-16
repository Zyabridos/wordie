import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RulesButton from "./RulesButton";
import "./Navbar.css";

const CustomNavbar = () => {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{t("navbar.title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links-container">
            <RulesButton />
            <Nav.Link
              href="https://github.com/zyabridos"
              className="nav-link-custom"
            >
              {t("navbar.aboutMe")}
            </Nav.Link>
            <NavDropdown
              title={t("navbar.contactMe.title")}
              id="basic-nav-dropdown"
              className="nav-dropdown-custom"
            >
              <NavDropdown.Item
                href="mailto:zyabrina95@gmail.com"
                className="nav-link-custom"
              >
                {t("navbar.contactMe.email")}
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://t.me/zyabridos"
                className="nav-link-custom"
              >
                {t("navbar.contactMe.telegram")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
