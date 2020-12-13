import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, 
  MatCheckboxModule, MatExpansionModule, MatCardModule, MatPaginatorModule, MatTableModule,
  MatSortModule,MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule, MatPaginatorIntl, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatRadioModule, } from '@angular/material';
import { getDutchPaginatorIntl } from 'src/app/french-paginator-intl';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { LayoutModule } from '@angular/cdk/layout';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class AngularMaterialModule { }
