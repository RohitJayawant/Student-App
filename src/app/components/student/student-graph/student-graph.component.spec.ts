import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGraphComponent } from './student-graph.component';

xdescribe('StudentGraphComponent', () => {
  let component: StudentGraphComponent;
  let fixture: ComponentFixture<StudentGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no data message is shown when localstorage is empty',()=>{

  })

  it('no data message should be hidden when localstorage has data',()=>{

  })

  it('graph should be displayed when data is saved from form',() =>{

  });

});
