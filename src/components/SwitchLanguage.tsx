import i18n from "../lang/i18n";
import { switchLanguage } from "../utils/SwitchLang.util";
import Lao from "@/assets/counties/la.png";
import English from "@/assets/counties/en.png";

export const SwitchLanguage = () => {
  return (
    <div onClick={switchLanguage} className="cursor-pointer">
      {i18n.language === "la" ? (
        <img src={English} alt="English" className="h-8 w-8" title="English" />
      ) : (
        <img src={Lao} alt="ພາສາລາວ" className="h-8 w-8" title="ພາສາລາວ" />
      )}
    </div>
  );
};
