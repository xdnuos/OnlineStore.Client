import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
@NgModule({
  exports: [
    NzButtonModule,
    NzTypographyModule,
    NzDividerModule,
    NzLayoutModule,
    NzSpaceModule,
    NzAffixModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzMenuModule,
    NzPaginationModule,
    NzStepsModule,
    NzAvatarModule,
    NzBadgeModule,
    NzRadioModule,
    NzDropDownModule,
    NzListModule,
    NzDrawerModule,
    NzDividerModule,
    NzSwitchModule,
    NzInputModule,
    NzButtonModule,
  ],
})
export class AntdModule {}
