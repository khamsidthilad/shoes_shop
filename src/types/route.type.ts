import { ReactElement } from "react";

export interface IRoute {
  path: string;
  title: string;
  permissions?: Array<string>;
  component: ReactElement;
  showInMenu?: boolean;
}

export interface IMenu {
  name: string;
  path: string;
  icon: any;
  subs?: Array<IMenu>;
}
