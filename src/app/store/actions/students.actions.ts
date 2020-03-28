import { Action } from '@ngrx/store'

import { Student } from '../../models/student.model';

// load students
export const LOAD_STUDENTS = '[Project] Load Students';
export const LOAD_STUDENTS_FAIL = '[Project] Load Students Fail';
export const LOAD_STUDENTS_SUCCESS = '[Project] Load Students Success';

//save students
export const SAVE_STUDENTS = '[Project] Save Students';
export const SAVE_STUDENTS_FAIL = '[Project] Save Students Fail';
export const SAVE_STUDENTS_SUCCESS = '[Project] Save Students Success';

export class LoadStudents implements Action {
    readonly type = LOAD_STUDENTS;
}
export class LoadStudentsFail implements Action {
    readonly type = LOAD_STUDENTS_FAIL;
    constructor(public payload : any){}
}
export class LoadStudentsSuccess implements Action {
    readonly type = LOAD_STUDENTS_SUCCESS;
    constructor(public payload : Student[]){}
}


export class SaveStudents implements Action {
    readonly type = SAVE_STUDENTS;
    constructor(public payload : any){}
}
export class SaveStudentsFail implements Action {
    readonly type = SAVE_STUDENTS_FAIL;
    constructor(public payload : any){}
}
export class SaveStudentsSuccess implements Action {
    readonly type = SAVE_STUDENTS_SUCCESS;
    constructor(public payload : boolean){}
}

//Similarly there will be DELETE_STUDENT, DELETE_STUDENT_SUCCESS, DELETE_STUDENT_FAIL

//action types
export type StudentsAction = LoadStudents | LoadStudentsFail | LoadStudentsSuccess |
                             SaveStudents | SaveStudentsFail | SaveStudentsSuccess;

