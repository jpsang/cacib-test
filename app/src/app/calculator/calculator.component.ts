import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  _calculator: [];
  _operators: [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getOperators();
    this.getStack();
  }

  getOperators(){
    this.httpClient.get<any>('http://127.0.0.1:5000/rpn/op').subscribe(
      response => {
        this._operators = response;
        console.log(response);
      }
    );
  }

  getStack(){
    this.httpClient.get<any>('http://127.0.0.1:5000/rpn/stack').subscribe(
      response => {
        this._calculator = response;
        console.log(response);
      }
    )
  }

  cleanStack(){
    this.httpClient.delete<any>('http://127.0.0.1:5000/rpn/stack').subscribe(
      response => {
        this._calculator = response;
        console.log(response);
      }
    )
  }

  addValueToStack(value){
    this.httpClient.post('http://127.0.0.1:5000/rpn/stack?value=' + value, {}).subscribe(
      data => {
        console.log(data);
      }
    );
    window.location.reload();
  }

  applyOperator(op){
    if(op == '+'){
      this.httpClient.post('http://127.0.0.1:5000/rpn/op/stack?op=add', {}).subscribe(data => {
        window.location.reload();
      })
    }
    else if(op == '-'){
      this.httpClient.post('http://127.0.0.1:5000/rpn/op/stack?op=sub', {}).subscribe(data => {
        window.location.reload();
      })
    }
    else if(op == '*'){
      this.httpClient.post('http://127.0.0.1:5000/rpn/op/stack?op=mul', {}).subscribe(data => {
        window.location.reload();
      })
    }
    else if(op == '/'){
      this.httpClient.post('http://127.0.0.1:5000/rpn/op/stack?op=div', {}).subscribe(data => {
        window.location.reload();
      })
    }


  }

}
