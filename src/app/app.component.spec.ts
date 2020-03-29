import { TestBed, async } from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { MaterialModule } from './material';

//project components
import { AppComponent } from './app.component';
import { StudentModule } from './components/student/student.module';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { StudentGraphComponent } from './components/student/student-graph/student-graph.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent        
      ],
      imports:[
        MaterialModule,
        StudentModule
      ]      
    }).compileComponents();


    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [StudentFormComponent, StudentGraphComponent]
      }
    });

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
