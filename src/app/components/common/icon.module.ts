import { NgModule } from "@angular/core";
import { TablerIconsModule } from "angular-tabler-icons";
import { IconCategory, IconPlus, IconTablePlus, IconBuildingStore, IconStack3, IconReportMoney, IconTruckDelivery, IconSquareRoundedCheck, IconLogout, IconHelpCircle} from "angular-tabler-icons/icons";

const icons = {
  IconCategory,
  IconPlus,
  IconTablePlus,
  IconBuildingStore,
  IconStack3,
  IconReportMoney,
  IconTruckDelivery,
  IconSquareRoundedCheck,
  IconLogout,
  IconHelpCircle
};

@NgModule({imports: [TablerIconsModule.pick(icons)], exports: [TablerIconsModule],})
export class IconModule { }