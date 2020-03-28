import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  //get all students from local storage.
  getStudents() : Observable<Student[]>{     
    let studentArray : any[];
    try{      
      studentArray = [];
      for (let i = 0; i < localStorage.length; i++){
          let key = localStorage.key(i);              
          studentArray.push(JSON.parse(localStorage.getItem(key)));          
        }        

        return new Observable<Student[]>((subscriber) => {subscriber.next(studentArray); subscriber.complete(); });

      }catch(error){
        return new Observable().pipe((error : any) => Observable.throw(error.json));
    }
    //in real app there will be a API call here with httpclient.        
  }

  //save student record in local storage.
  saveStudents(studentRecord :Student) : Observable<boolean>{ 
    try{
        localStorage.setItem(studentRecord.name, JSON.stringify(studentRecord));
        return new Observable<boolean>((subscriber) => { subscriber.next(true); subscriber.complete();})
    }catch(error){
        return new Observable<boolean>().pipe((error : any) => Observable.throw(error.json));
    }
    
    //in real app there will be a API call here with httpclient.             
  }
}