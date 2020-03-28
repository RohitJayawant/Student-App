import  * as fromStudents from '../actions/students.actions';
import { Student } from '../../models/student.model';

export interface StudentSate{
    data: Student[];
    loaded: boolean;
    loading: boolean;
}

export const initialState : StudentSate = {
    data : [],
    loaded: false,
    loading: false
}

export function reducer(
    state = initialState, 
    action: fromStudents.StudentsAction
    ) : StudentSate{

    switch (action.type){
        case fromStudents.LOAD_STUDENTS: {
            return {
                ...state,                    
                loading: true
            }
        }
        case fromStudents.LOAD_STUDENTS_SUCCESS: {
            const data = action.payload;
            return {
                ...state,                    
                loading: false,
                loaded: true,
                data
            }
        }
        case fromStudents.LOAD_STUDENTS_FAIL: {
            return {
                ...state,                    
                loading: false,
                loaded: false
            }
        }    
        
        case fromStudents.SAVE_STUDENTS: {
            return {
                ...state,                    
                loading: true
            }
        }
        case fromStudents.SAVE_STUDENTS_SUCCESS: {            
            return {
                ...state,                    
                loading: false,
                loaded: true,                
            }
        }
        case fromStudents.SAVE_STUDENTS_FAIL: {
            return {
                ...state,                    
                loading: false,
                loaded: false
            }
        }    
    }

    return state;
}

export const getStudents = (state: StudentSate) => state.data;
export const getStudentsLoading = (state: StudentSate) => state.loading;
export const getStudentsLoaded = (state: StudentSate) => state.loaded;