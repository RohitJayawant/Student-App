import { Component, OnInit } from '@angular/core';

//RxJs imports
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store' ;
import { Student } from '../../../models/student.model';

//chart imports
import { Chart } from 'chart.js';
import * as d3 from 'd3';

@Component({
  selector: 'app-student-graph',
  templateUrl: './student-graph.component.html',
  styleUrls: ['./student-graph.component.css'],  
})
export class StudentGraphComponent implements OnInit {

  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;


  refreshFlag = false;
  
  //Observables
  students$: Observable<Student[]>;
  studentsLoading$: Observable<boolean>;
  studentsLoaded$: Observable<boolean>;

  //chart arrays  
  BarChart : Chart;
  studentArray = [];
  nameData=[];
  friendsData=[];
  ageData=[];
  weightData=[]; 
  
  
  data=[];

  constructor(private store: Store<fromStore.ProjectState>) { }
 
  ngOnInit() {
    this.students$ = this.store.select(fromStore.getAllStudents);
    this.studentsLoading$ = this.store.select(fromStore.getStudentsLoading);
    this.studentsLoaded$ = this.store.select(fromStore.getStudentsLoaded);

    this.store.dispatch(new fromStore.LoadStudents());

    this.students$.subscribe(x=>
      {
        if(x.length != this.studentArray.length){
          this.refreshFlag = true;        
      }  
      
      if(this.refreshFlag){
        //refresh the graph
        this.clearArrays();        
        this.studentArray = x
        this.studentArray.forEach(student => {
          this.nameData.push(student.name);
          this.friendsData.push(student.friends); 
          this.weightData.push(student.weight);
          this.ageData.push(student.age);
          this.data.push([student.name, student.friends]);
        }); 
        //this.createBarChart('Student-Friends data display', this.nameData, this.friendsData); 
        //this.createLineChart('Age-weight data display', this.ageData, this.weightData); 
        this.createChart();
      }
    });    
}

//create bar chart
 createBarChart(label: string, labelsArray: any[], dataArray: any[]){
  var ctx = document.getElementById('barChart');
  this.BarChart = new Chart(ctx,{
    type: 'bar',
    data: {             
      labels: labelsArray,
      datasets: [{
          label: label,                  
          data: dataArray,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
 }

//create line chart
createLineChart(label: string, labelsArray: any[], dataArray: any[]){
 var ctx = document.getElementById('lineChart');
 this.BarChart = new Chart(ctx,{
   type: 'line',
   data: {              
     labels: labelsArray,
     datasets: [{
         label: label,                  
         data: dataArray,
         //backgroundColor: ['rgba(54, 162, 235, 0.2)'],
         borderColor: "rgb(200,0,0)",
         borderWidth: 1,
         showLine: true,        
     }]
   },
   options: {
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }       
   }
 });
}

//reset the graph to reflect new data
clearArrays(){
  if (this.BarChart != undefined || this.BarChart !=null) {
    this.BarChart.destroy();
  }

  d3.select('svg').remove();
  
  this.studentArray.length = 0;    
  this.nameData.length = 0;
  this.friendsData.length = 0;
  this.weightData.length = 0;
  this.ageData.length = 0;
}


createChart(): void {
  let element = document.getElementById("chart");
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

   // define X & Y domains
   let xDomain = this.data.map(d => d[0]);
   let yDomain = [0, d3.max(this.data, d => d[1])];

     // create scales
     this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
     this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
 
     // bar colors
     this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale)); 
      
      this.updateChart();
}

updateChart() {
  // update scales & axis
  this.xScale.domain(this.data.map(d => d[0]));
  this.yScale.domain([0, d3.max(this.data, d => d[1])]);
  this.colors.domain([0, this.data.length]);
  this.xAxis.transition().call(d3.axisBottom(this.xScale));
  this.yAxis.transition().call(d3.axisLeft(this.yScale));

  let update = this.chart.selectAll('.bar')
    .data(this.data);

  // remove exiting bars
  update.exit().remove();

  // update existing bars
  this.chart.selectAll('.bar').transition()
    .attr('x', d => this.xScale(d[0]))
    .attr('y', d => this.yScale(d[1]))
    .attr('width', d => this.xScale.bandwidth())
    .attr('height', d => this.height - this.yScale(d[1]))
    .style('fill', (d, i) => this.colors(i));

  // add new bars
  update
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => this.xScale(d[0]))
    .attr('y', d => this.yScale(0))
    .attr('width', this.xScale.bandwidth())
    .attr('height', 0)
    .style('fill', (d, i) => this.colors(i))
    .transition()
    .delay((d, i) => i * 10)
    .attr('y', d => this.yScale(d[1]))
    .attr('height', d => this.height - this.yScale(d[1]));
}

}