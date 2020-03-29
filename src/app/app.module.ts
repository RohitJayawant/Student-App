import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//project components
import { AppComponent } from './app.component';
import { StudentModule } from './components/student/student.module';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { StudentGraphComponent } from './components/student/student-graph/student-graph.component';

//material components UI elements
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent, 
    StudentGraphComponent   
  ],
  imports: [
    //angular and material modules
    BrowserModule,
    BrowserAnimationsModule,    
    MaterialModule,

    //project modules
    StudentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  //required for angular elements in order to tell our project this components might be needed in future.
  entryComponents: [StudentFormComponent, StudentGraphComponent] 
})
export class AppModule { }
