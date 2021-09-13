import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import DomainRoundedIcon from "@material-ui/icons/DomainRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import GamepadRoundedIcon from "@material-ui/icons/GamepadRounded";

import { paths } from "../../routes/paths";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface IMenuItem {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  link: string;
  text: string;
}

export const MenuItems: IMenuItem[] = [
  { icon: DashboardRoundedIcon, link: paths.dashboard, text: "Dashboard" },
  {
    icon: SupervisorAccountRoundedIcon,
    link: paths.admin,
    text: "Admin",
  },
  { icon: DomainRoundedIcon, link: paths.adverstisements, text: "Advertisement" },
  { icon: GroupRoundedIcon, link: paths.dashboard, text: "Users" },
  { icon: DriveEtaRoundedIcon, link: paths.dashboard, text: "Car Brands" },
  { icon: GamepadRoundedIcon, link: paths.dashboard, text: "Car Features" },
];
