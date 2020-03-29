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
  private margin: any = { top: 20, bottom: 20, left: 40, right: 20};
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
  Chart : Chart;
  studentArray = [];
  nameData=[];
  friendsData=[];
  ageData=[];
  weightData=[]; 
  
  //d3 chart arrays
  studentfriendsdata=[];
  ageweightdata=[];

  constructor(private store: Store<fromStore.ProjectState>) { }
 
  ngOnInit() {
    this.students$ = this.store.select(fromStore.getAllStudents);
    this.studentsLoading$ = this.store.select(fromStore.getStudentsLoading);
    this.studentsLoaded$ = this.store.select(fromStore.getStudentsLoaded);

    this.store.dispatch(new fromStore.LoadStudents());

    this.students$.subscribe(x=>
      {
        if(x.length != this.studentArray.length && x.length > 0){
          this.refreshFlag = true;        
      }  
      
      //if data has changed refresh the charts.
      if(this.refreshFlag){
        //refresh the graph
        this.clearArrays();        
        this.studentArray = x
        this.studentArray.forEach(student => {
          this.nameData.push(student.name);
          this.friendsData.push(student.friends); 
          this.weightData.push(student.weight);
          this.ageData.push(student.age);
          this.studentfriendsdata.push([student.name, student.friends]);
          this.ageweightdata.push({ age: student.age, weight: student.weight});
        }); 
        if(x.length > 0){
          this.createBarChart('Student-Friends data display', this.nameData, this.friendsData); 
          this.createLineChart('Age-weight data display', this.ageData, this.weightData); 
          this.createD3BarChart();
          this.createD3LineChart();
        }
      }
    });    
  }

  //Chart.js chart creation
  //create bar chart
  createBarChart(label: string, labelsArray: any[], dataArray: any[]){
    var ctx = document.getElementById('barChart');
    this.Chart = new Chart(ctx,{
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
  //sort array
  labelsArray.sort(function(a, b) {
    return a - b;
  });

  var ctx = document.getElementById('lineChart');
  this.Chart = new Chart(ctx,{
    type: 'line',
    data: {              
      labels: labelsArray,
      datasets: [{
          label: label,                  
          data: dataArray,         
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

  //D3 Chart creation
  //create D3 bar chart
  createD3BarChart() {
    let element = document.getElementById("barchart");
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
    let xDomain = this.studentfriendsdata.map(d => d[0]);
    let yDomain = [0, d3.max(this.studentfriendsdata, d => d[1])];

      // create scales
      this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
      this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
  
      // bar colors
      this.colors = d3.scaleLinear().domain([0, this.studentfriendsdata.length]).range(<any[]>['blue', 'blue']);

      // x & y axis
      this.xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
        .call(d3.axisBottom(this.xScale));
      this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale)); 
        
        this.updateD3BarChart();
  }

  //update D3 bar chart
  updateD3BarChart() {
    // update scales & axis
    this.xScale.domain(this.studentfriendsdata.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.studentfriendsdata, d => d[1])]);
    this.colors.domain([0, this.studentfriendsdata.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.studentfriendsdata);

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

  //create D3 line chart
  createD3LineChart() {
    //sort the data array
    this.ageweightdata.sort((a, b) => (a.age > b.age) ? 1 : -1)

    let element = document.getElementById("linechart");
      this.width = element.offsetWidth - this.margin.left - this.margin.right;
      this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
      let svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);

      // chart plot area
      this.chart = svg.append('g')    
        .attr('transform', `translate(${this.margin.left} , ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.ageweightdata.map(d => d.age);
    let yDomain = [112, d3.max(this.ageweightdata, d => d.weight)];   

      // create scales
      this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);   
      this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    //x & y axis
      this.xAxis = svg.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
        .call(d3.axisBottom(this.xScale));

      this.yAxis = svg.append('g')
        .attr('class', 'axis axis-y')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .call(d3.axisLeft(this.yScale));
         
      //Create line
      var line = d3.line<DataType>()   
        .x((d) => { return this.xScale(d.age)})   
        .y((d) => { return this.yScale(d.weight)})   
      
      //Max and Min for x and y axis
      var x = d3.scaleTime().rangeRound([0, this.width]);
      var y = d3.scaleLinear().rangeRound([this.height, 0]);
      x.domain([0, d3.max(this.ageweightdata, function(d) { return d.age; })]);
      y.domain([0, d3.max(this.ageweightdata, function(d) { return d.weight; })]);

      this.chart.append("path").datum(this.ageweightdata)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);      
  }

  //reset the graph to reflect new data
  clearArrays(){
    if (this.Chart != undefined || this.Chart !=null) {
      this.Chart.destroy();
    }

    d3.selectAll("svg").remove();
     
    this.studentArray.length = 0;    
    this.nameData.length = 0;
    this.friendsData.length = 0;
    this.weightData.length = 0;
    this.ageData.length = 0;
  }
}
 
export type DataType ={ age: any, weight: any};