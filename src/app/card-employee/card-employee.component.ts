import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styleUrls: ['./card-employee.component.css']
})
export class CardEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  follow(){
    this.employee.follow = !this.employee.follow;
    this.employeeService.updateEmployee(this.employee.id,this.employee)
    .subscribe(
      data => {
        this.reloadEmployee();
      }
    )
  }

  reloadEmployee(){
    this.employeeService.getEmployee(this.employee.id)
    .subscribe(
      data => this.employee = data
    )
  }

}
