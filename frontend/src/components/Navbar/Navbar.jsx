import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RulesModal from "../Modals/RulesModal";

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
            <Nav.Link href="#link">{t("navbar.contactUs")}</Nav.Link>
            <Nav.Link href="https://github.com/zyabridos">
              {t("navbar.aboutUs")}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
