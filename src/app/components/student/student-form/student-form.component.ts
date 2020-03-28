import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Angular material imports
import {MatSnackBar} from '@angular/material/snack-bar';

//RxJs imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store' ;
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit { 

//Observables
savestudents$: Observable<Student[]>;
savestudentsLoading$: Observable<boolean>;
savestudentsLoaded$: Observable<boolean>;

studentForm: FormGroup;

constructor(private store: Store<fromStore.ProjectState>, private _snackBar: MatSnackBar) { }

ngOnInit() {    
  this.savestudents$ = this.store.select(fromStore.getAllStudents);
  this.savestudentsLoading$ = this.store.select(fromStore.getStudentsLoading);
  this.savestudentsLoaded$ = this.store.select(fromStore.getStudentsLoaded);

  this.studentForm = new FormGroup({     
    name: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
    age: new FormControl('', [Validators.min(20)]),
    friends: new FormControl('',[Validators.min(0), Validators.max(100)]),
    weight: new FormControl('',[Validators.min(112), Validators.max(190)])
  });
}

//submit student form
onSubmit() {
  let student : Student;  
  if (this.studentForm.valid) {
        
    student = {
      name : this.studentForm.controls.name.value,
      age : this.studentForm.controls.age.value,
      friends : this.studentForm.controls.friends.value,
      weight : this.studentForm.controls.weight.value
    } 
   
    //service call here...
    this.store.dispatch(new fromStore.SaveStudents(student));     
    this.store.dispatch(new fromStore.LoadStudents());
    this.onReset();

    this.savestudentsLoaded$.subscribe(result => this.openSnackBar(result));   
  }
}

//reset student form
onReset(){
  this.studentForm.reset();
  this.studentForm.controls.name.setErrors(null);
  this.studentForm.controls.age.setErrors(null);
  this.studentForm.controls.friends.setErrors(null);
  this.studentForm.controls.weight.setErrors(null);
}

//open snack bar with save result.
openSnackBar(result : boolean){
  this._snackBar.open(result == true ? 'Saved succesfully.': 'Error in saving.', '', {
    duration: 2000,
  }); 
}

}
