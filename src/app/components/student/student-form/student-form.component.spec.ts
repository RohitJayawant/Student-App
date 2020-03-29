import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { StudentFormComponent } from './student-form.component';
import { MaterialModule } from '../../../material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//ngrx
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '../../../store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFormComponent ],
      imports: [
        ReactiveFormsModule, 
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}), 
        EffectsModule.forRoot([]),
        StoreModule.forFeature('student-app-store',reducers), //mocked store should be used here
        EffectsModule.forFeature(effects),
        HttpClientModule 
      ]
    })
    .compileComponents();
  }));

  let spyOnReset;
  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOnReset = spyOn(component,'onReset');
  });

  it('should create StudentFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should submit if the form has valid data',() => {
    component.studentForm.controls.name.setValue('');
    component.studentForm.controls.age.setValue('');
    component.studentForm.controls.friends.setValue('');
    component.studentForm.controls.weight.setValue('');

    component.onSubmit();

    //ngRx store should be mocked here
    //then check action and payload on mocked store
    //right now I am just testing if one of the inner function is called or not.
    expect(spyOnReset).not.toHaveBeenCalled();

    //Various combinations of input data can be tested here, considering the validation rules on each of the form control.

  });

  it('snack bar should be shown with proper error message for successfull or unsuccessful save',() => {

  });

  it('reset function should reset form model', () =>{

  });

  //We can also use By.css and native elements to check if the UI shows appropriate error messages on UI on
  //certain user actions or not.

});
