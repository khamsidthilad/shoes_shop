import { useTranslation } from "react-i18next";
import { switchLanguage } from "../../utils/SwitchLang.util";
import { AppImage } from "../../config/constant";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-1 shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm  bg-white p-1.5 shadow-sm  lg:hidden"
          >
            <img src={AppImage.iconMenu} alt="Menu" className="h-5 w-5 " />
          </button>
        </div>
        <div />

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="flex items-center gap-2 2xsm:gap-4">
            <div onClick={switchLanguage} className="cursor-pointer">
              {i18n.language === "la" ? (
                <img
                  src={AppImage.flagEnglish}
                  alt="English"
                  className="h-8 w-8 object-cover rounded-full"
                  title="English"
                />
              ) : (
                <img
                  src={AppImage.flagLaos}
                  alt="ພາສາລາວ"
                  className="h-8 w-8 object-cover rounded-full"
                  title="ພາສາລາວ"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
