import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UiFeatureModule } from '../ui-feature/ui-feature.module';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { GstinValidatorDirective } from './directives/gstin-validator.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { TrimValidatorDirective } from './directives/trim-validator.directive';
import { FooterComponent } from './footer/footer.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SuccessComponent } from './success/success.component';
import { DeatilViewComponent } from './deatil-view/deatil-view.component';
import { SettingsReconComponent } from './settings/settings.component';




@NgModule({
  declarations: [
    FooterComponent,
    ListViewComponent,
    DialogBoxComponent,
    SpinnerComponent,
    NumberOnlyDirective,
    SuccessComponent,
    GstinValidatorDirective,
    TrimValidatorDirective,
    SimpleTableComponent,
    DeatilViewComponent,
    SettingsReconComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UiFeatureModule,
    MatDatepickerModule
  ],
  exports:[
    UiFeatureModule,
    FooterComponent,
    ReactiveFormsModule,
    FormsModule,
    ListViewComponent,
    DialogBoxComponent,
    NumberOnlyDirective,
    SuccessComponent,
    GstinValidatorDirective,
    TrimValidatorDirective,
    SimpleTableComponent,
    MatDatepickerModule,
    SpinnerComponent,
    DeatilViewComponent,
    SettingsReconComponent
  ]
})
export class SharedModule { }
