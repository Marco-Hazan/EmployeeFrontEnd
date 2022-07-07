import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  employees: Employee[] = []

  constructor(private employeeService: EmployeeService) { }



  ngOnInit() {
    this.employeeService.getEmployeesList()
    .subscribe(
      data => this.employees = data
    );
  }

}
