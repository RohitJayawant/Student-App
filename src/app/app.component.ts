import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';

import { StudentFormComponent } from '../app/components/student/student-form/student-form.component';
import { StudentGraphComponent } from '../app/components/student/student-graph/student-graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = null;

  constructor(private injector : Injector, private domSanitizer: DomSanitizer){}

  ngOnInit() {       
    //create angular element
    const StudentFormElement = createCustomElement(StudentFormComponent,{injector : this.injector});
    const StudentGraphElement = createCustomElement(StudentGraphComponent, {injector: this.injector})
    customElements.define('app-student-form', StudentFormElement);
    customElements.define('app-student-graph', StudentGraphElement);
   
    //insert the element into UI
    //by pass angular sanitation as it is a trusted HTML input.
    this.title = this.domSanitizer.bypassSecurityTrustHtml("<app-student-form></app-student-form><hr/><app-student-graph></app-student-graph>");
  }

}
