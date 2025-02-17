import { useTranslation } from "react-i18next";
import ModalBase from "./Mixins/ModalBase.jsx";

const VictoryModal = () => {
  const { t } = useTranslation();
  return (
    <ModalBase
      title={t("modals.victory.title")}
      message={t("modals.victory.message")}
      testId="victory-modal"
    />
  );
};

export default VictoryModal;
