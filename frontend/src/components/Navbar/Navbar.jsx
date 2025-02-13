import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RulesModal from "../Modals/RulesModal";
import NavDropdown from "react-bootstrap/NavDropdown";

function BasicExample() {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">{t("navbar.title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Button href="#home" onClick={handleShow}>
              {t("navbar.rules")}
              <RulesModal show={show} handleClose={handleClose} />
            </Button>
            <Nav.Link href="https://github.com/zyabridos">
              {t("navbar.aboutMe")}
            </Nav.Link>
            <NavDropdown
              title={t("navbar.contactMe.title")}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="mailto:zyabrina95@gmail.com">
                {t("navbar.contactMe.email")}
              </NavDropdown.Item>
              <NavDropdown.Item href="https://t.me/zyabridos">
                {t("navbar.contactMe.telegram")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
