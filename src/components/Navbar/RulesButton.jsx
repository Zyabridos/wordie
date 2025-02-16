import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RulesModal from "../Modals/RulesModal";
import "./Navbar.css";

const RulesButton = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <>
      <Nav.Link
        as="button"
        onClick={() => setShow(true)}
        className="nav-link-custom"
      >
        {t("navbar.rules")}
      </Nav.Link>
      <RulesModal show={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default RulesButton;
