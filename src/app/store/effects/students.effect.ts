import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';

import * as studentActions from '../actions/students.actions'
import { of } from 'rxjs';

@Injectable()
export class StudentsEffects{
    constructor(private actions$: Actions, private studentService: fromServices.StudentService ) {}

    @Effect()
    loadStudents$ = this.actions$.pipe(
        ofType(studentActions.LOAD_STUDENTS),
        switchMap(() => {
            return this.studentService.getStudents().pipe(
                map(students => new studentActions.LoadStudentsSuccess(students)),
                catchError(error => of(new studentActions.LoadStudentsFail(error)))
            )
        })    
    );

    @Effect()
    saveStudents$ = this.actions$.pipe(
        ofType<studentActions.SaveStudents>(studentActions.SAVE_STUDENTS),
        switchMap((action) => {
            return this.studentService.saveStudents(action.payload).pipe(
                map(students => new studentActions.SaveStudentsSuccess(students)),
                catchError(error => of(new studentActions.SaveStudentsFail(error)))
            )
        })
    );
}

