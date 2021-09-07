import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import DomainRoundedIcon from "@material-ui/icons/DomainRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";
import GamepadRoundedIcon from "@material-ui/icons/GamepadRounded";

import { paths } from "../../routes/paths";

export interface IMenuItem {
  icon: any;
  link: string;
  text: string;
}

export const MenuItems: IMenuItem[] = [
  { icon: DashboardRoundedIcon, link: paths.dashboard, text: "Dashboard" },
  {
    icon: SupervisorAccountRoundedIcon,
    link: paths.dashboard,
    text: "Sub-Admin",
  },
  { icon: DomainRoundedIcon, link: paths.dashboard, text: "Advertisement" },
  { icon: GroupRoundedIcon, link: paths.dashboard, text: "Car Owner" },
  { icon: DriveEtaRoundedIcon, link: paths.dashboard, text: "Car Listing" },
  { icon: GamepadRoundedIcon, link: paths.dashboard, text: "Car Features" },
  { icon: PersonAddRoundedIcon, link: paths.dashboard, text: "User/Buyer" },
];
