import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StudentFormComponent } from './student-form/student-form.component';
import { StudentGraphComponent } from './student-graph/student-graph.component';

//material components UI elements
import { MaterialModule } from '../../material';

//ngrx
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '../../store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [StudentFormComponent, StudentGraphComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([]),
    StoreModule.forFeature('student-app-store',reducers),
    EffectsModule.forFeature(effects),
    HttpClientModule 
  ]
})
export class StudentModule { }
