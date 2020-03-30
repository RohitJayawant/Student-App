import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { StudentService } from './student.service';
import { Student } from '../models/student.model';

import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

describe('StudentService', () => {  
  beforeEach(() => TestBed.configureTestingModule({
    imports:[ HttpClientModule ]   
  }));

  //create mock for local storage    
  let store;  
  beforeEach(() =>{
    store = {};    
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      length: () => {
        return 1;
      }     
    };

    // fake calls for getting and setting item in local storage
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOnProperty(localStorage, 'length','get').and.callFake(mockLocalStorage.length);     
  });

  it('should be created', () => {
    const service: StudentService = TestBed.get(StudentService);
    expect(service).toBeTruthy();
  });

  it('should have function for fetching students',() =>{
    const service: StudentService = TestBed.get(StudentService);
    expect(service.getStudents).toBeDefined();
  });

  it('should have function for saving students',() =>{
    const service: StudentService = TestBed.get(StudentService);
    expect(service.saveStudents).toBeDefined();
  });

  it('get students function should return array of students from local storage',() =>{
    const service: StudentService = TestBed.get(StudentService);    
    let teststudentObject : Student={ name : 'student 1', age: 25, weight: 117, friends: 60};
    service.saveStudents(teststudentObject);
    
    return service.getStudents().toPromise().then( (result) => {         
      expect(result.length).toBeGreaterThan(0);   
    });   
  });

  it('save student function should return error if passed record is null or name is null', () => {
    const service: StudentService = TestBed.get(StudentService);
    let errorObject : any;
    service.saveStudents(null)
    .subscribe(  
      next => {  },    
      err => { errorObject= err; },
      () => { /*completed */ }
    );
        
    const mockObservable = new Observable<boolean>();       

    expect(errorObject).toBeTruthy();
    expect(errorObject).toEqual(mockObservable);
  });

  it('save student function should return true if record saved successfully',() =>{
    const service: StudentService = TestBed.get(StudentService);
    let teststudentObject : Student={ name : 'student 1', age: 25, weight: 117, friends: 60};
    service.saveStudents(teststudentObject).subscribe({
      next: (result) =>{ expect(result).toBe(true); }     
    });
  });

});