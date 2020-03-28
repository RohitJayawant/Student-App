import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export interface ProjectState{
    students: fromStudents.StudentSate    
}

export const reducers : ActionReducerMap<ProjectState> = {
    students: fromStudents.reducer    
}

export const getProjectState = createFeatureSelector<ProjectState>('student-app-store')

export const getStudentState = createSelector(getProjectState,(state:ProjectState)=>state.students);
export const getAllStudents = createSelector(getStudentState,fromStudents.getStudents);
export const getStudentsLoaded = createSelector(getStudentState,fromStudents.getStudentsLoaded);
export const getStudentsLoading = createSelector(getStudentState,fromStudents.getStudentsLoading);