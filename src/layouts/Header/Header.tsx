import { useTranslation } from "react-i18next";
import { switchLanguage } from "../../utils/SwitchLang.util";
import { AppImage } from "../../config/constant";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
type MenuItem = {
  key: string;
  label: string;
  onClick: () => void;
};
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isClient?: boolean;
  menuBarClient?: MenuItem[];
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-999 flex w-full drop-shadow-1 bg-white shadow-md">
      <div className="flex flex-grow items-center  px-4 py-4 shadow-2 md:px-6 2xl:px-11">
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
        <div className="flex flex-grow items-center justify-start">
          {props.isClient && <h1 className="text-xl font-bold ">E-shop</h1>}
          {props.isClient && (
            <div className="hidden lg:flex items-center">
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                className="border-none"
                items={props.menuBarClient}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="flex items-center gap-2 2xsm:gap-4">
            {props.isClient && (
              <div className="flex justify-end items-center gap-2 w-full ">
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            )}
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
